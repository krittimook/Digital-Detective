import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Camera, 
  Bot, 
  RotateCcw, 
  Home, 
  ChevronRight, 
  Flame, 
  Trophy, 
  Eye, 
  Layers,
  Award
} from 'lucide-react';
import { Question, GameMode, PlayerAnswerRecord, GameResult } from '../types/game';
import { QUESTIONS_DATASET } from '../data/questions';
import { ImageInspector } from '../components/ImageInspector';
import { sound } from '../utils/audio';
import { saveGameResult, getRankTitle } from '../utils/storage';

interface GamePageProps {
  initialMode: GameMode;
  onReturnHome: () => void;
  personalBestScore: number;
}

// Fisher-Yates Shuffle algorithm for no-duplicate fair questions
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const GamePage: React.FC<GamePageProps> = ({
  initialMode,
  onReturnHome,
  personalBestScore
}) => {
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'AI_GENERATED' | 'REAL_PHOTO' | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState<PlayerAnswerRecord[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showClueDetails, setShowClueDetails] = useState(false);
  const [finalResult, setFinalResult] = useState<GameResult | null>(null);

  // Initialize a new game session
  const startSession = (selectedGameMode: GameMode) => {
    setMode(selectedGameMode);
    const targetCount = selectedGameMode === 'QUICK' ? 5 : 10;
    const shuffled = shuffleArray(QUESTIONS_DATASET).slice(0, targetCount);
    
    setSessionQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerLocked(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setPlayerAnswers([]);
    setIsGameOver(false);
    setShowClueDetails(false);
    setFinalResult(null);
  };

  useEffect(() => {
    startSession(initialMode);
  }, [initialMode]);

  const currentQuestion = sessionQuestions[currentIndex];
  const totalQuestions = sessionQuestions.length;

  // Answer handler
  const handleAnswer = (choice: 'AI_GENERATED' | 'REAL_PHOTO') => {
    if (isAnswerLocked || !currentQuestion) return;

    setIsAnswerLocked(true);
    setSelectedAnswer(choice);

    const isCorrect = choice === currentQuestion.groundTruth;
    let newScore = score;
    let newStreak = streak;

    if (isCorrect) {
      sound.playCorrect();
      const points = 100;
      newScore = score + points;
      newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
    } else {
      sound.playIncorrect();
      newStreak = 0;
      setStreak(0);
    }

    const answerRecord: PlayerAnswerRecord = {
      questionId: currentQuestion.id,
      selected: choice,
      isCorrect,
      question: currentQuestion
    };

    setPlayerAnswers(prev => [...prev, answerRecord]);
  };

  // Next Question or Finish
  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
      setShowClueDetails(false);
    } else {
      // Calculate final results
      const totalCorrect = playerAnswers.filter(a => a.isCorrect).length + (selectedAnswer === currentQuestion.groundTruth ? 0 : 0);
      const accuracy = Math.round((totalCorrect / totalQuestions) * 100);
      const rankInfo = getRankTitle(accuracy);

      const result: GameResult = {
        id: `session-${Date.now()}`,
        date: new Date().toLocaleDateString('th-TH', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        missionId: 'mission-1',
        mode,
        score,
        totalQuestions,
        correctCount: totalCorrect,
        accuracyPercentage: accuracy,
        maxStreak,
        rankTitle: rankInfo.title,
        answers: playerAnswers
      };

      saveGameResult(result);
      setFinalResult(result);
      setIsGameOver(true);
      sound.playVictoryFanfare();
    }
  };

  // Keyboard accessibility (1 for AI, 2 for Real, Space or Enter for Next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (!isAnswerLocked) {
        if (e.key === '1') {
          handleAnswer('AI_GENERATED');
        } else if (e.key === '2') {
          handleAnswer('REAL_PHOTO');
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerLocked, isGameOver, currentQuestion, currentIndex, totalQuestions]);

  // If in Results state
  if (isGameOver && finalResult) {
    const rankInfo = getRankTitle(finalResult.accuracyPercentage);
    return (
      <div className="max-w-4xl mx-auto py-8 space-y-10">
        
        {/* Results Header Card */}
        <div className="rounded-3xl border border-purple-800/50 bg-[#16112C] p-6 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
          
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Award className="w-8 h-8 text-purple-400" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-purple-400 tracking-wider uppercase">
              สรุปผลการสืบสวน
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {rankInfo.title}
            </h1>
            <p className="text-sm text-purple-300/80 max-w-md mx-auto">
              {rankInfo.subtitle}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
            <div className="rounded-2xl border border-purple-900/40 bg-[#1E1738] p-4 text-center">
              <span className="text-xs text-purple-400">คะแนนรวม</span>
              <p className="text-2xl font-bold text-white mt-1 tabular-nums">
                {finalResult.score}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-900/40 bg-[#1E1738] p-4 text-center">
              <span className="text-xs text-purple-400">ตอบถูกต้อง</span>
              <p className="text-2xl font-bold text-white mt-1 tabular-nums">
                {finalResult.correctCount} / {finalResult.totalQuestions}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-900/40 bg-[#1E1738] p-4 text-center">
              <span className="text-xs text-purple-400">ความแม่นยำ</span>
              <p className="text-2xl font-bold text-purple-300 mt-1 tabular-nums">
                {finalResult.accuracyPercentage}%
              </p>
            </div>

            <div className="rounded-2xl border border-purple-900/40 bg-[#1E1738] p-4 text-center">
              <span className="text-xs text-purple-400">คอมโบสูงสุด</span>
              <p className="text-2xl font-bold text-amber-400 mt-1 tabular-nums flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-current" />
                {finalResult.maxStreak}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => startSession(mode)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-purple-600 text-white font-semibold text-sm shadow-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>เล่นใหม่อีกครั้ง</span>
            </button>

            <button
              onClick={onReturnHome}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/60 text-purple-200 hover:text-white font-medium text-sm transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>กลับสู่หน้าแรก</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>ทบทวนผลการสืบสวนรายข้อ ({finalResult.answers.length} ข้อ)</span>
            </h2>
            <span className="text-xs text-purple-400">
              คลิกเพื่อดูคำอธิบายและเบาะแสสำคัญ
            </span>
          </div>

          <div className="space-y-4">
            {finalResult.answers.map((ans, idx) => {
              const isCorrect = ans.isCorrect;
              const truthText = ans.question.groundTruth === 'AI_GENERATED' ? 'สร้างโดย AI' : 'ภาพถ่ายจริง';
              const selectedText = ans.selected === 'AI_GENERATED' ? 'สร้างโดย AI' : 'ภาพถ่ายจริง';

              return (
                <div
                  key={ans.question.id}
                  className={`rounded-2xl border p-5 transition-all ${
                    isCorrect 
                      ? 'border-emerald-800/40 bg-[#132223]/40' 
                      : 'border-rose-900/40 bg-[#25121B]/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    
                    {/* Thumbnail */}
                    <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-purple-950/60 border border-purple-900/40 shrink-0">
                      <img
                        src={ans.question.imagePath}
                        alt={ans.question.titleTh}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-purple-400 font-medium">
                          ข้อที่ {idx + 1} · {ans.question.categoryLabelTh}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          {isCorrect ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> ถูกต้อง (+100)
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> ไม่ถูกต้อง (0)
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white">
                        {ans.question.titleTh}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-purple-300/80">
                        <span>คำตอบของคุณ: <strong className="text-white">{selectedText}</strong></span>
                        <span>·</span>
                        <span>ความจริง: <strong className={ans.question.groundTruth === 'AI_GENERATED' ? 'text-purple-300' : 'text-emerald-300'}>{truthText}</strong></span>
                      </div>

                      <p className="text-xs text-purple-200/90 leading-relaxed pt-1">
                        {ans.question.shortExplanation}
                      </p>

                      <div className="pt-2 text-[11px] text-purple-400/80 border-t border-purple-900/30">
                        <strong>ที่มาของภาพ:</strong> {ans.question.provenance}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // Active Game State
  if (!currentQuestion) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-purple-300 text-sm">กำลังจัดเตรียมหลักฐานสำหรับการสืบสวน...</p>
        <button
          onClick={() => startSession('CLASSIC')}
          className="px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold"
        >
          เริ่มใหม่
        </button>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const isCorrectAnswer = selectedAnswer === currentQuestion.groundTruth;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      
      {/* Top HUD: Round, Progress, Score, Streak */}
      <div className="rounded-2xl border border-purple-900/40 bg-[#17122E] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">
              คำถาม {currentIndex + 1} จาก {totalQuestions}
            </span>
            <span className="text-purple-400/60">·</span>
            <span className="text-purple-300">
              {currentQuestion.categoryLabelTh}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {streak > 1 && (
              <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs animate-bounce">
                <Flame className="w-4 h-4 fill-current" />
                <span>คอมโบ x{streak}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-purple-200 font-bold tabular-nums">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>{score} คะแนน</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Challenge Image Box */}
      <div className="space-y-4">
        <ImageInspector
          imageSrc={currentQuestion.imagePath}
          altText={`ภาพสืบสวนหมวด ${currentQuestion.categoryLabelTh}`}
        />
      </div>

      {/* Question & Answer Controls */}
      <div className="rounded-2xl border border-purple-900/40 bg-[#191333] p-6 space-y-6 shadow-xl">
        
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            ภาพนี้สร้างโดย AI หรือเป็นภาพถ่ายจริง?
          </h2>
          <p className="text-xs text-purple-400">
            พิจารณาแสงเงา รายละเอียดพื้นผิว และความสมจริงเชิงฟิสิกส์ (กด 1 หรือ 2 บนคีย์บอร์ดได้)
          </p>
        </div>

        {/* Two Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Button 1: สร้างโดย AI */}
          <button
            type="button"
            disabled={isAnswerLocked}
            onClick={() => handleAnswer('AI_GENERATED')}
            className={`group flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-200 ${
              isAnswerLocked
                ? currentQuestion.groundTruth === 'AI_GENERATED'
                  ? 'border-purple-400 bg-purple-900/50 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                  : selectedAnswer === 'AI_GENERATED'
                  ? 'border-rose-500/60 bg-rose-950/30'
                  : 'border-purple-950/50 bg-[#161228] opacity-60'
                : 'border-purple-900/50 bg-[#1C1538] hover:border-purple-500 hover:bg-purple-900/30 cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-300 group-hover:text-white transition-colors">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-purple-400 font-mono block">ตัวเลือก [1]</span>
                <span className="text-base font-bold text-white">สร้างโดย AI</span>
              </div>
            </div>

            {isAnswerLocked && currentQuestion.groundTruth === 'AI_GENERATED' && (
              <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
            )}
            {isAnswerLocked && selectedAnswer === 'AI_GENERATED' && currentQuestion.groundTruth !== 'AI_GENERATED' && (
              <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
            )}
          </button>

          {/* Button 2: ภาพถ่ายจริง */}
          <button
            type="button"
            disabled={isAnswerLocked}
            onClick={() => handleAnswer('REAL_PHOTO')}
            className={`group flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-200 ${
              isAnswerLocked
                ? currentQuestion.groundTruth === 'REAL_PHOTO'
                  ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : selectedAnswer === 'REAL_PHOTO'
                  ? 'border-rose-500/60 bg-rose-950/30'
                  : 'border-purple-950/50 bg-[#161228] opacity-60'
                : 'border-purple-900/50 bg-[#1C1538] hover:border-emerald-500/60 hover:bg-emerald-950/20 cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-emerald-300 group-hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-purple-400 font-mono block">ตัวเลือก [2]</span>
                <span className="text-base font-bold text-white">ภาพถ่ายจริง</span>
              </div>
            </div>

            {isAnswerLocked && currentQuestion.groundTruth === 'REAL_PHOTO' && (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            )}
            {isAnswerLocked && selectedAnswer === 'REAL_PHOTO' && currentQuestion.groundTruth !== 'REAL_PHOTO' && (
              <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
            )}
          </button>

        </div>

        {/* Answer Reveal Feedback & Explanations */}
        {isAnswerLocked && (
          <div className="rounded-2xl border border-purple-800/40 bg-[#140F27] p-5 space-y-4 animate-fadeIn">
            
            {/* Status Header */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-purple-900/40">
              <div className="flex items-center gap-2">
                {isCorrectAnswer ? (
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>คำตอบถูกต้อง! (+100 คะแนน)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <XCircle className="w-5 h-5" />
                    <span>ยังไม่ถูกต้อง (0 คะแนน)</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-purple-300">
                เฉลยจริง: <strong className={currentQuestion.groundTruth === 'AI_GENERATED' ? 'text-purple-400' : 'text-emerald-400'}>
                  {currentQuestion.groundTruth === 'AI_GENERATED' ? 'สร้างโดย AI' : 'ภาพถ่ายจริง'}
                </strong>
              </div>
            </div>

            {/* Explanation & Learning Clues */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">
                {currentQuestion.titleTh}
              </h3>
              
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                {currentQuestion.shortExplanation}
              </p>

              {/* Detailed Clues Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowClueDetails(!showClueDetails)}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showClueDetails ? 'ซ่อนเบาะแสระดับไมโคร' : 'แสดงจุดสังเกตระดับไมโคร (3 เบาะแส)'}</span>
                </button>

                {showClueDetails && (
                  <ul className="mt-2.5 space-y-1.5 pl-4 border-l-2 border-purple-600/50 text-xs text-purple-300/90">
                    {currentQuestion.detailedClues.map((clue, idx) => (
                      <li key={idx} className="leading-relaxed">
                        · {clue}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Verified Provenance Badge */}
              <div className="pt-2 text-[11px] text-purple-400/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-purple-900/30">
                <span><strong>ที่มาและหลักฐาน:</strong> {currentQuestion.provenance}</span>
                <span className="text-purple-500">{currentQuestion.license}</span>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-purple-600 text-white font-semibold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{currentIndex + 1 < totalQuestions ? 'ข้อต่อไป' : 'ดูผลการสืบสวน'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Mode Indicator & Fast Restart Toolbar */}
      <div className="flex items-center justify-between text-xs text-purple-400 px-2">
        <div className="flex items-center gap-2">
          <span>โหมด: {mode === 'CLASSIC' ? 'Classic (10 ข้อ)' : mode === 'QUICK' ? 'Quick (5 ข้อ)' : 'Learning Mode'}</span>
        </div>

        <button
          onClick={() => {
            if (confirm('คุณต้องการเริ่มเกมรอบใหม่หรือไม่? คะแนนในรอบนี้จะถูกรีเซ็ต')) {
              startSession(mode);
            }
          }}
          className="hover:text-purple-200 transition-colors cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>รีสตาร์ตรอบนี้</span>
        </button>
      </div>

    </div>
  );
};

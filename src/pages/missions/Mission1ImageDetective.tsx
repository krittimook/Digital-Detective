import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Camera, 
  HelpCircle, 
  RotateCcw, 
  ArrowLeft, 
  ChevronRight, 
  Trophy, 
  Eye, 
  Award,
  Layers,
  Info
} from 'lucide-react';
import { Question, GroundTruth, PlayerAnswerRecord } from '../../types/game';
import { QUESTIONS_DATASET } from '../../data/questions';
import { ImageInspector } from '../../components/ImageInspector';
import { sound } from '../../utils/audio';
import { saveMissionScore, getDetectiveRank } from '../../utils/storage';

interface Mission1Props {
  onReturnToMissions: () => void;
  onNavigateToKnowledge: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Mission1ImageDetective: React.FC<Mission1Props> = ({
  onReturnToMissions,
  onNavigateToKnowledge
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<GroundTruth | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState<PlayerAnswerRecord[]>([]);
  const [showDetailedClues, setShowDetailedClues] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize a randomized session of 10 questions
  const startNewSession = () => {
    const shuffled = shuffleArray(QUESTIONS_DATASET).slice(0, 10);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedChoice(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setPlayerAnswers([]);
    setShowDetailedClues(false);
    setIsGameOver(false);
  };

  useEffect(() => {
    startNewSession();
  }, []);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSubmit = () => {
    if (!selectedChoice || isAnswerSubmitted || !currentQuestion) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedChoice === currentQuestion.groundTruth;
    
    let newScore = score;
    let newStreak = streak;

    if (isCorrect) {
      sound.playCorrect();
      const points = 100 + streak * 10;
      newScore = score + points;
      newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
    } else {
      sound.playIncorrect();
      newStreak = 0;
      setStreak(0);
    }

    const answerRecord: PlayerAnswerRecord = {
      questionId: currentQuestion.id,
      selected: selectedChoice,
      isCorrect,
      question: currentQuestion
    };

    setPlayerAnswers(prev => [...prev, answerRecord]);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoice(null);
      setIsAnswerSubmitted(false);
      setShowDetailedClues(false);
    } else {
      // Game Over
      setIsGameOver(true);
      sound.playVictoryFanfare();
      
      const correctAnswers = playerAnswers.filter(a => a.isCorrect).length + (selectedChoice === currentQuestion.groundTruth ? 1 : 0);
      saveMissionScore(
        'mission-1',
        score,
        true,
        totalQuestions,
        correctAnswers,
        streak
      );
    }
  };

  if (!currentQuestion && !isGameOver) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
        <div className="w-10 h-10 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-[#756B86]">กำลังเตรียมหลักฐานคดี...</p>
      </div>
    );
  }

  // Summary / Game Over View
  if (isGameOver) {
    const correctCount = playerAnswers.filter(a => a.isCorrect).length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const rankInfo = getDetectiveRank(accuracy);

    return (
      <div className="max-w-3xl mx-auto py-6 space-y-8">
        {/* Results Card */}
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-[0_4px_25px_rgba(124,58,237,0.08)] text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] mx-auto shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
              ภารกิจที่ 1: สิ้นสุดการสืบสวน
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
              สรุปผลการสืบคดีภาพ AI หรือภาพถ่ายจริง
            </h2>
            <p className="text-sm text-[#756B86]">
              คุณได้ตรวจสอบหลักฐานภาพทั้งหมด {totalQuestions} คดีเสร็จสิ้นแล้ว
            </p>
          </div>

          {/* Score & Accuracy Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3]">
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">คะแนนรวม</span>
              <p className="text-2xl font-bold text-[#7C3AED]">{score.toLocaleString()}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">ความแม่นยำ</span>
              <p className="text-2xl font-bold text-[#5B21B6]">{accuracy}%</p>
            </div>
            <div className="col-span-2 sm:col-span-1 space-y-0.5">
              <span className="text-xs text-[#756B86]">ตอบถูกต้อง</span>
              <p className="text-2xl font-bold text-[#16A34A]">{correctCount} / {totalQuestions}</p>
            </div>
          </div>

          {/* Detective Rank Award */}
          <div className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 ${rankInfo.badgeColor}`}>
            <Award className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider">ระดับนักสืบที่ได้รับ</span>
              <h4 className="text-base font-bold mt-0.5">{rankInfo.rankTh}</h4>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">{rankInfo.description}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#E4DDF3]">
            <button
              type="button"
              onClick={startNewSession}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-sm font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>เล่นรอบใหม่ (New Round)</span>
            </button>

            <button
              type="button"
              onClick={onReturnToMissions}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F7F5FF] border border-[#E4DDF3] text-[#241B35] text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 text-[#7C3AED]" />
              <span>กลับไปหน้ารวมภารกิจ</span>
            </button>
          </div>
        </div>

        {/* Detailed Case Review List */}
        <div className="rounded-2xl border border-[#E4DDF3] bg-white p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#241B35] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#7C3AED]" />
            <span>บันทึกทบทวนคดี (Case Evidence Review)</span>
          </h3>

          <div className="divide-y divide-[#E4DDF3]">
            {playerAnswers.map((record, idx) => (
              <div key={record.questionId} className="py-4 flex flex-col sm:flex-row items-start gap-4">
                <img
                  src={record.question.imagePath}
                  alt={record.question.titleTh}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#E4DDF3]"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#7C3AED]">คดี #{idx + 1}</span>
                    <span className="text-xs text-[#756B86]">·</span>
                    <span className="text-sm font-semibold text-[#241B35]">{record.question.titleTh}</span>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      record.isCorrect ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#DC2626]'
                    }`}>
                      {record.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{record.isCorrect ? 'ถูกต้อง' : 'ตอบผิด'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#756B86] leading-relaxed">
                    {record.question.shortExplanation}
                  </p>
                  <p className="text-[11px] text-[#5B21B6] font-medium pt-0.5">
                    ที่มาที่พิสูจน์แล้ว: {record.question.provenance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active Gameplay View
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isCorrectAnswer = selectedChoice === currentQuestion.groundTruth;

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onReturnToMissions}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#756B86] hover:text-[#7C3AED] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับหน้ารวมภารกิจ</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-[#756B86]">
            คดีที่ <span className="text-[#7C3AED] font-bold text-sm">{currentIndex + 1}</span> / {totalQuestions}
          </span>
          <span className="text-[#E4DDF3]">|</span>
          <span className="inline-flex items-center gap-1 text-[#7C3AED]">
            <Trophy className="w-3.5 h-3.5" />
            <span>{score} คะแนน</span>
          </span>
          {streak > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold">
              คอมโบ x{streak}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#EDE9FE] h-2 rounded-full overflow-hidden">
        <div 
          className="bg-[#7C3AED] h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Investigation Split Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Image Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="rounded-2xl bg-white border border-[#E4DDF3] p-3 shadow-sm">
            <ImageInspector
              imageSrc={currentQuestion.imagePath}
              altText={currentQuestion.titleTh}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#756B86] px-1">
            <span className="font-medium text-[#5B21B6]">{currentQuestion.categoryLabelTh}</span>
            <span>ใบอนุญาต: {currentQuestion.license}</span>
          </div>
        </div>

        {/* Right Column: Choices & Decision Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Case Information Header */}
          <div className="rounded-2xl border border-[#E4DDF3] bg-white p-5 shadow-sm space-y-2">
            <div className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
              ภารกิจที่ 1: ภาพ AI หรือภาพจริง?
            </div>
            <h2 className="text-lg font-bold text-[#241B35]">
              {currentQuestion.titleTh}
            </h2>
            <p className="text-xs text-[#756B86] leading-relaxed">
              ส่องขยายภาพ ตรวจดูแสงเงา พื้นผิว และความสมจริง จากนั้นเลือกการตัดสินของคุณ
            </p>
          </div>

          {/* Three Mandatory Choices */}
          <div className="space-y-2.5">
            <button
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => {
                sound.playClick();
                setSelectedChoice('AI_GENERATED');
              }}
              className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                selectedChoice === 'AI_GENERATED'
                  ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6] font-semibold ring-2 ring-[#7C3AED]/30'
                  : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF] hover:border-[#7C3AED]/40'
              } ${isAnswerSubmitted ? 'cursor-default opacity-90' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  selectedChoice === 'AI_GENERATED' ? 'bg-[#7C3AED] text-white' : 'bg-[#EDE9FE] text-[#7C3AED]'
                }`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">ภาพสร้างโดย AI (AI-Generated)</p>
                  <p className="text-[11px] text-[#756B86]">มีรอยสังเคราะห์ จุดบิดเบี้ยว หรือผิวเคลือบสังเคราะห์</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => {
                sound.playClick();
                setSelectedChoice('REAL_PHOTO');
              }}
              className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                selectedChoice === 'REAL_PHOTO'
                  ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6] font-semibold ring-2 ring-[#7C3AED]/30'
                  : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF] hover:border-[#7C3AED]/40'
              } ${isAnswerSubmitted ? 'cursor-default opacity-90' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  selectedChoice === 'REAL_PHOTO' ? 'bg-[#7C3AED] text-white' : 'bg-[#EDE9FE] text-[#7C3AED]'
                }`}>
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">ภาพถ่ายจริง (Real Photograph)</p>
                  <p className="text-[11px] text-[#756B86]">มีนอยส์กล้องจริง กฎฟิสิกส์ถูกต้อง และมีจุดไม่สมบูรณ์ตามธรรมชาติ</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => {
                sound.playClick();
                setSelectedChoice('NOT_ENOUGH_EVIDENCE');
              }}
              className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                selectedChoice === 'NOT_ENOUGH_EVIDENCE'
                  ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6] font-semibold ring-2 ring-[#7C3AED]/30'
                  : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF] hover:border-[#7C3AED]/40'
              } ${isAnswerSubmitted ? 'cursor-default opacity-90' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  selectedChoice === 'NOT_ENOUGH_EVIDENCE' ? 'bg-[#7C3AED] text-white' : 'bg-[#EDE9FE] text-[#7C3AED]'
                }`}>
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">หลักฐานไม่เพียงพอ (Not Enough Evidence)</p>
                  <p className="text-[11px] text-[#756B86]">ภาพถูกบีบอัดจนสูญเสียรายละเอียด ไม่สามารถฟันธงด้วยตาเปล่า</p>
                </div>
              </div>
            </button>
          </div>

          {/* Submit Answer Button (Before submission) */}
          {!isAnswerSubmitted && (
            <button
              type="button"
              disabled={!selectedChoice}
              onClick={handleSubmit}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                selectedChoice
                  ? 'bg-[#7C3AED] hover:bg-[#5B21B6] text-white cursor-pointer shadow-[0_2px_12px_rgba(124,58,237,0.3)]'
                  : 'bg-[#E4DDF3] text-[#756B86] cursor-not-allowed opacity-70'
              }`}
            >
              ยืนยันคำตอบ (Submit Answer)
            </button>
          )}

          {/* Post-submission Feedback Panel */}
          {isAnswerSubmitted && (
            <div className={`rounded-2xl border p-4 space-y-3 transition-all ${
              isCorrectAnswer
                ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]'
                : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#7F1D1D]'
            }`}>
              <div className="flex items-start gap-3">
                {isCorrectAnswer ? (
                  <CheckCircle2 className="w-6 h-6 text-[#16A34A] shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-[#DC2626] shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">
                    {isCorrectAnswer ? 'ยอดเยี่ยม! คุณตอบถูกต้อง (+100 คะแนน)' : 'ยังไม่ถูกต้องในคดีนี้'}
                  </h4>
                  <p className="text-xs leading-relaxed">
                    {currentQuestion.shortExplanation}
                  </p>
                  <p className="text-[11px] font-semibold text-[#5B21B6] mt-1">
                    คำตอบที่แท้จริง: {currentQuestion.groundTruth === 'AI_GENERATED' ? 'ภาพสร้างโดย AI' : currentQuestion.groundTruth === 'REAL_PHOTO' ? 'ภาพถ่ายจริง' : 'หลักฐานไม่เพียงพอ'}
                  </p>
                </div>
              </div>

              {/* Clues Accordion */}
              <div className="pt-2 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setShowDetailedClues(!showDetailedClues)}
                  className="text-xs font-semibold text-[#5B21B6] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{showDetailedClues ? 'ซ่อนเบาะแสระดับไมโคร' : 'ดูเบาะแสระดับไมโครและที่มา'}</span>
                </button>

                {showDetailedClues && (
                  <div className="mt-2.5 p-3 rounded-xl bg-white/80 border border-black/5 text-xs text-[#241B35] space-y-2">
                    <p className="font-semibold text-[#5B21B6]">จุดสังเกตสำคัญ:</p>
                    <ul className="list-disc list-inside space-y-1 text-[#756B86]">
                      {currentQuestion.detailedClues.map((clue, idx) => (
                        <li key={idx} className="leading-relaxed">{clue}</li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-black/5 text-[11px] text-[#756B86]">
                      <span className="font-medium text-[#241B35]">แหล่งที่มา:</span> {currentQuestion.provenance}
                    </div>
                  </div>
                )}
              </div>

              {/* Next Question Button */}
              <button
                type="button"
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap mt-3"
              >
                <span>{currentIndex + 1 < totalQuestions ? 'คดีถัดไป (Next Image)' : 'ดูผลการสืบสวนทั้งหมด'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Clock, 
  RotateCcw, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Award, 
  AlertTriangle, 
  Layers,
  Sparkles,
  Search,
  ShieldAlert,
  Lock,
  ChevronLeft
} from 'lucide-react';
import { MASTER_CHALLENGE_BANK } from '../../data/masterChallengeData';
import { MasterChallengeQuestion, ChallengeCategory } from '../../types/game';
import { sound } from '../../utils/audio';
import { saveGameResult, getDetectiveRank, saveMissionScore } from '../../utils/storage';

interface Mission5Props {
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

const TOTAL_TIME_SECONDS = 240; // 4 minutes

export const Mission5MasterChallenge: React.FC<Mission5Props> = ({
  onReturnToMissions,
  onNavigateToKnowledge
}) => {
  const [questions, setQuestions] = useState<MasterChallengeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isChallengeFinished, setIsChallengeFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Initialize session
  const initChallenge = () => {
    const shuffled = shuffleArray(MASTER_CHALLENGE_BANK);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setTimeLeft(TOTAL_TIME_SECONDS);
    setIsChallengeFinished(false);
    setHasStarted(false);
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    initChallenge();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer tick
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0 && !isChallengeFinished) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishChallenge(true); // time out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isChallengeFinished]);

  const handleStartChallenge = () => {
    sound.playClick();
    setHasStarted(true);
    setIsTimerRunning(true);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    if (isChallengeFinished) return;
    sound.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleFinishChallenge = (isTimeOut = false) => {
    setIsTimerRunning(false);
    setIsChallengeFinished(true);

    if (isTimeOut) {
      sound.playIncorrect();
    } else {
      sound.playVictoryFanfare();
    }

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const totalQuestions = questions.length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const finalScore = correctCount * 100;

    // Save
    saveMissionScore('mission-5', finalScore, true, totalQuestions, correctCount);
    saveGameResult({
      id: `master-challenge-${Date.now()}`,
      date: new Date().toISOString(),
      missionId: 'mission-5',
      mode: 'CLASSIC',
      score: finalScore,
      totalQuestions,
      correctCount,
      accuracyPercentage: accuracy,
      maxStreak: correctCount,
      rankTitle: getDetectiveRank(accuracy).rank,
      answers: []
    });
  };

  // Format time display MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Pre-challenge Welcome Intro Screen
  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8">
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-[0_4px_25px_rgba(124,58,237,0.08)] text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] mx-auto shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
              ภารกิจที่ 5: การทดสอบระดับมาสเตอร์ (Final Investigation)
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
              Master Detective Challenge
            </h1>
            <p className="text-sm text-[#756B86] max-w-xl mx-auto leading-relaxed">
              แบบทดสอบรวมทักษะความรู้ครบทั้ง 4 ด้าน: การแยกแยะภาพ AI, การวิเคราะห์เบาะแสและที่มา, การจับไต๋กลโกงฟิชชิง, และการปกป้องข้อมูลส่วนบุคคล เพื่อวัดระดับตราสัญลักษณ์นักสืบของคุณ
            </p>
          </div>

          {/* Rules & Requirements Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] text-left text-xs">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#241B35]">เวลาทำข้อสอบ</p>
                <p className="text-[#756B86]">4:00 นาที (จับเวลาถอยหลัง)</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#241B35]">จำนวนข้อสอบ</p>
                <p className="text-[#756B86]">10 ข้อสุ่มจากทุกหมวดหมู่</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#241B35]">เกณฑ์การจัดอันดับ</p>
                <p className="text-[#756B86]">80%+ รับตำแหน่ง Master</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleStartChallenge}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-sm font-semibold shadow-lg shadow-[#7C3AED]/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <Trophy className="w-4 h-4" />
              <span>เริ่มการทดสอบจับเวลา (Start Challenge)</span>
            </button>

            <button
              type="button"
              onClick={onReturnToMissions}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7F5FF] border border-[#E4DDF3] text-[#241B35] text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 text-[#7C3AED]" />
              <span>กลับไปหน้ารวมภารกิจ</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  if (isChallengeFinished) {
    let correctCount = 0;
    const categoryStats: Record<ChallengeCategory, { total: number; correct: number; label: string }> = {
      IMAGE_DETECTION: { total: 0, correct: 0, label: 'การตรวจจับภาพ AI' },
      IMAGE_PUZZLE: { total: 0, correct: 0, label: 'การวิเคราะห์เบาะแส & ที่มา' },
      SCAM_DECODER: { total: 0, correct: 0, label: 'การจับไต๋กลโกงฟิชชิง' },
      PRIVACY_GUARDIAN: { total: 0, correct: 0, label: 'การปกป้องความเป็นส่วนตัว' }
    };

    questions.forEach((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctIndex;
      if (isCorrect) correctCount++;
      if (categoryStats[q.category]) {
        categoryStats[q.category].total++;
        if (isCorrect) categoryStats[q.category].correct++;
      }
    });

    const totalQuestions = questions.length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const finalScore = correctCount * 100;
    const rankInfo = getDetectiveRank(accuracy);

    return (
      <div className="max-w-4xl mx-auto py-6 space-y-8">
        
        {/* Main Results Card */}
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-[0_4px_25px_rgba(124,58,237,0.08)] text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] mx-auto shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
              ผลการประเมินทักษะสืบสวนดิจิทัล
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
              Master Detective Challenge Results
            </h2>
            <p className="text-sm text-[#756B86]">
              {timeLeft === 0 ? 'หมดเวลาการทดสอบ!' : 'ส่งผลการทดสอบเรียบร้อยแล้ว'}
            </p>
          </div>

          {/* Detective Rank Badge Box */}
          <div className={`p-6 rounded-2xl border text-center space-y-2 max-w-lg mx-auto ${rankInfo.badgeColor}`}>
            <span className="text-xs font-bold uppercase tracking-wider">ตราสัญลักษณ์ระดับที่ได้รับ</span>
            <h3 className="text-xl sm:text-2xl font-black text-[#5B21B6]">{rankInfo.rankTh}</h3>
            <p className="text-xs sm:text-sm opacity-90 leading-relaxed max-w-md mx-auto">{rankInfo.description}</p>
          </div>

          {/* Score & Accuracy Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] max-w-lg mx-auto">
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">คะแนนที่ได้</span>
              <p className="text-2xl font-bold text-[#7C3AED]">{finalScore.toLocaleString()}</p>
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

          {/* Category Breakdown (Identify Strengths & Improvement Areas) */}
          <div className="pt-4 border-t border-[#E4DDF3] text-left space-y-4">
            <h4 className="text-sm font-bold text-[#241B35] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#7C3AED]" />
              <span>การวิเคราะห์ความเชี่ยวชาญรายหมวดหมู่ (Category Breakdown):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(categoryStats) as ChallengeCategory[]).map((catKey) => {
                const stat = categoryStats[catKey];
                if (stat.total === 0) return null;
                const catPercent = Math.round((stat.correct / stat.total) * 100);
                const isStrong = catPercent >= 75;

                return (
                  <div key={catKey} className="p-3.5 rounded-xl border border-[#E4DDF3] bg-[#F7F5FF] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#241B35]">{stat.label}</span>
                      <span className={`font-bold ${isStrong ? 'text-[#16A34A]' : 'text-[#D97706]'}`}>
                        {stat.correct}/{stat.total} ({catPercent}%)
                      </span>
                    </div>

                    <div className="w-full bg-[#E4DDF3] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isStrong ? 'bg-[#16A34A]' : 'bg-[#D97706]'}`}
                        style={{ width: `${catPercent}%` }}
                      />
                    </div>

                    <span className="text-[11px] text-[#756B86] block">
                      {isStrong ? '🌟 จุดแข็งของคุณ: มีความเชี่ยวชาญสูง' : '⚠️ แนะนำศึกษาเพิ่มเติมใน Knowledge Center'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#E4DDF3]">
            <button
              type="button"
              onClick={initChallenge}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-sm font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ลองท้าทายใหม่อีกครั้ง (Retry Challenge)</span>
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

        {/* Detailed Question Review List */}
        <div className="rounded-2xl border border-[#E4DDF3] bg-white p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#241B35]">
            เฉลยและคำอธิบายโดยละเอียด (Detailed Review)
          </h3>

          <div className="divide-y divide-[#E4DDF3]">
            {questions.map((q, idx) => {
              const playerChoice = selectedAnswers[idx];
              const isCorrect = playerChoice === q.correctIndex;
              return (
                <div key={q.id} className="py-4 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#7C3AED]">ข้อ #{idx + 1}</span>
                    <span className="text-xs text-[#756B86]">·</span>
                    <span className="text-xs font-medium text-[#5B21B6]">{q.categoryLabelTh}</span>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      isCorrect ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#DC2626]'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{isCorrect ? 'ถูกต้อง' : 'ตอบผิด'}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#241B35]">
                    {q.prompt}
                  </p>

                  <div className="text-xs space-y-1 pt-1">
                    <p className="text-[#16A34A] font-medium">
                      คำตอบที่ถูกต้อง: {q.options[q.correctIndex]}
                    </p>
                    <p className="text-[#756B86] leading-relaxed">
                      💡 คำอธิบาย: {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // Active Challenge Gameplay
  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isTimeCritical = timeLeft <= 60;

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 space-y-6">
      
      {/* Top Header Bar with Live Countdown Timer */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onReturnToMissions}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#756B86] hover:text-[#7C3AED] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ออกจากภารกิจ</span>
        </button>

        {/* Live Timer Pill */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold shadow-sm transition-colors ${
          isTimeCritical
            ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#DC2626] animate-pulse'
            : 'bg-white border-[#E4DDF3] text-[#7C3AED]'
        }`}>
          <Clock className="w-4 h-4" />
          <span>เหลือเวลา: {formatTime(timeLeft)}</span>
        </div>

        <div className="text-xs font-semibold text-[#756B86]">
          ข้อที่ <span className="text-[#7C3AED] font-bold text-sm">{currentIndex + 1}</span> / {totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#EDE9FE] h-2 rounded-full overflow-hidden">
        <div 
          className="bg-[#7C3AED] h-full transition-all duration-300 rounded-full"
          style={{ width: `${Math.round(((currentIndex + 1) / totalQuestions) * 100)}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Category Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
            หมวดหมู่: {currentQ?.categoryLabelTh}
          </span>
          <span className="text-xs text-[#756B86]">
            ตอบแล้ว {answeredCount} / {totalQuestions} ข้อ
          </span>
        </div>

        {/* Question Prompt */}
        <h3 className="text-base sm:text-lg font-bold text-[#241B35] leading-snug">
          {currentQ?.prompt}
        </h3>

        {/* Optional Image */}
        {currentQ?.imagePath && (
          <div className="rounded-2xl overflow-hidden border border-[#E4DDF3] max-h-64 flex items-center justify-center bg-[#F7F5FF]">
            <img
              src={currentQ.imagePath}
              alt="Challenge Evidence"
              className="max-h-64 w-auto object-contain"
            />
          </div>
        )}

        {/* Optional Message Snippet */}
        {currentQ?.messageSnippet && (
          <div className="p-3.5 rounded-xl bg-[#F7F5FF] border border-[#E4DDF3] font-mono text-xs text-[#241B35]">
            {currentQ.messageSnippet}
          </div>
        )}

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQ?.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIndex] === optIdx;
            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectAnswer(optIdx)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6] font-semibold ring-2 ring-[#7C3AED]/30'
                    : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs mt-0.5 ${
                    isSelected ? 'border-[#7C3AED] bg-[#7C3AED] text-white' : 'border-[#C4B5FD] bg-white text-[#7C3AED]'
                  }`}>
                    {isSelected ? '✓' : ''}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E4DDF3]">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => {
              sound.playClick();
              setCurrentIndex(prev => Math.max(0, prev - 1));
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              currentIndex > 0
                ? 'text-[#241B35] hover:bg-[#F7F5FF] border border-[#E4DDF3] cursor-pointer'
                : 'text-[#E4DDF3] cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ข้อย้อนหลัง</span>
          </button>

          {currentIndex + 1 < totalQuestions ? (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setCurrentIndex(prev => prev + 1);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <span>ข้อถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleFinishChallenge(false)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ส่งข้อสอบทั้งหมด (Finish)</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

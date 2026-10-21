import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  RotateCcw, 
  ArrowLeft, 
  ChevronRight, 
  Trophy, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  Lightbulb,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { PUZZLE_CASES } from '../../data/puzzleData';
import { PuzzleCase } from '../../types/game';
import { ImageInspector } from '../../components/ImageInspector';
import { sound } from '../../utils/audio';
import { saveMissionScore, getDetectiveRank } from '../../utils/storage';

interface Mission2Props {
  onReturnToMissions: () => void;
  onNavigateToKnowledge: () => void;
}

export const Mission2ImagePuzzle: React.FC<Mission2Props> = ({
  onReturnToMissions,
  onNavigateToKnowledge
}) => {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedSubAnswers, setSelectedSubAnswers] = useState<Record<string, number>>({});
  const [selectedVerification, setSelectedVerification] = useState<string | null>(null);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isHintRevealed, setIsHintRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ caseId: string; title: string; isCorrect: boolean }[]>([]);

  const currentCase: PuzzleCase = PUZZLE_CASES[caseIndex];
  const totalCases = PUZZLE_CASES.length;

  const handleSelectSubAnswer = (questionId: string, optionIndex: number) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedSubAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSelectVerification = (verId: string) => {
    if (isAnswerSubmitted) return;
    sound.playClick();
    setSelectedVerification(verId);
  };

  // Submit Answer validation
  const handleSubmit = () => {
    if (isAnswerSubmitted) return;

    // Check all sub-questions answered
    const allQuestionsAnswered = currentCase.subQuestions.every(
      q => selectedSubAnswers[q.id] !== undefined
    );
    if (!allQuestionsAnswered) return;

    setIsAnswerSubmitted(true);

    // Calculate score for this puzzle case
    let correctSubCount = 0;
    currentCase.subQuestions.forEach(q => {
      if (selectedSubAnswers[q.id] === q.correctIndex) {
        correctSubCount++;
      }
    });

    const isVerificationCorrect = currentCase.verificationOptions.find(
      v => v.id === selectedVerification
    )?.isBestChoice;

    const caseSuccess = correctSubCount === currentCase.subQuestions.length;

    let pointsAwarded = correctSubCount * 50;
    if (isVerificationCorrect) pointsAwarded += 50;

    if (caseSuccess) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    setScore(prev => prev + pointsAwarded);
    setSessionResults(prev => [
      ...prev,
      {
        caseId: currentCase.id,
        title: currentCase.title,
        isCorrect: caseSuccess
      }
    ]);
  };

  const handleNextPuzzle = () => {
    sound.playClick();
    if (caseIndex + 1 < totalCases) {
      setCaseIndex(prev => prev + 1);
      setSelectedSubAnswers({});
      setSelectedVerification(null);
      setActiveHotspotId(null);
      setIsAnswerSubmitted(false);
      setIsHintRevealed(false);
    } else {
      setIsGameOver(true);
      sound.playVictoryFanfare();

      const passedCases = sessionResults.filter(r => r.isCorrect).length;
      saveMissionScore('mission-2', score, true, totalCases, passedCases);
    }
  };

  const restartSession = () => {
    setCaseIndex(0);
    setSelectedSubAnswers({});
    setSelectedVerification(null);
    setActiveHotspotId(null);
    setIsAnswerSubmitted(false);
    setIsHintRevealed(false);
    setScore(0);
    setIsGameOver(false);
    setSessionResults([]);
  };

  if (isGameOver) {
    const accuracy = totalCases > 0 ? Math.round((sessionResults.filter(r => r.isCorrect).length / totalCases) * 100) : 0;
    const rankInfo = getDetectiveRank(accuracy);

    return (
      <div className="max-w-3xl mx-auto py-6 space-y-8">
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-[0_4px_25px_rgba(124,58,237,0.08)] text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] mx-auto shadow-inner">
            <Search className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
              ภารกิจที่ 2: สิ้นสุดการไขปริศนา
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
              สรุปผลการวิเคราะห์เบาะแสและเจาะลึกที่มา
            </h2>
            <p className="text-sm text-[#756B86]">
              คุณได้ตรวจสอบจุดน่าสงสัยและแนวทางการสืบค้นครบทั้ง {totalCases} ปริศนา
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3]">
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">คะแนนรวม</span>
              <p className="text-2xl font-bold text-[#7C3AED]">{score.toLocaleString()}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">ผ่านการวิเคราะห์</span>
              <p className="text-2xl font-bold text-[#16A34A]">
                {sessionResults.filter(r => r.isCorrect).length} / {totalCases} คดี
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 ${rankInfo.badgeColor}`}>
            <Lightbulb className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider">บทเรียนสำคัญของนักสืบ</span>
              <h4 className="text-base font-bold mt-0.5">{rankInfo.rankTh}</h4>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">
                การสังเกตจุดผิดปกติของนิ้วมือ ฟันเฟือง หรือตัวอักษร เป็นเพียงจุดเริ่มต้น การยืนยันความจริงที่มั่นคงที่สุดต้องอาศัยการสืบค้นที่มา (Provenance) และบริบทการเผยแพร่เสมอ
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#E4DDF3]">
            <button
              type="button"
              onClick={restartSession}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-sm font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>เล่นรอบใหม่ (Restart Puzzles)</span>
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
      </div>
    );
  }

  const allReadyToSubmit = currentCase.subQuestions.every(
    q => selectedSubAnswers[q.id] !== undefined
  );

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
            ปริศนาที่ <span className="text-[#7C3AED] font-bold text-sm">{caseIndex + 1}</span> / {totalCases}
          </span>
          <span className="text-[#E4DDF3]">|</span>
          <span className="inline-flex items-center gap-1 text-[#7C3AED]">
            <Trophy className="w-3.5 h-3.5" />
            <span>{score} คะแนน</span>
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#EDE9FE] h-2 rounded-full overflow-hidden">
        <div 
          className="bg-[#7C3AED] h-full transition-all duration-300 rounded-full"
          style={{ width: `${Math.round(((caseIndex + 1) / totalCases) * 100)}%` }}
        />
      </div>

      {/* Scenario Callout */}
      <div className="rounded-2xl border border-[#C4B5FD] bg-[#F5F3FF] p-5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
            สถานการณ์สืบสวนจริง (Investigation Scenario)
          </span>
          <span className="text-xs font-semibold text-[#5B21B6]">{currentCase.groundTruthLabel}</span>
        </div>
        <h2 className="text-lg font-bold text-[#241B35]">{currentCase.title}</h2>
        <p className="text-xs sm:text-sm text-[#756B86] leading-relaxed">
          {currentCase.scenarioContext}
        </p>
      </div>

      {/* Image & Interactive Clue Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Image with Hotspot Pins (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative rounded-2xl bg-white border border-[#E4DDF3] p-3 shadow-sm">
            <ImageInspector
              imageSrc={currentCase.imagePath}
              altText={currentCase.title}
            />

            {/* Hotspot Indicators overlay */}
            <div className="mt-3 p-3 rounded-xl bg-[#F7F5FF] border border-[#E4DDF3]">
              <span className="text-xs font-bold text-[#5B21B6] block mb-2">
                🔍 แตะเลือกจุดที่ต้องสงสัยเพื่อเจาะลึกเบาะแส:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentCase.hotspots.map((hs) => {
                  const isActive = activeHotspotId === hs.id;
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveHotspotId(isActive ? null : hs.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#7C3AED] text-white shadow-sm ring-2 ring-[#7C3AED]/30'
                          : 'bg-white border border-[#E4DDF3] text-[#241B35] hover:border-[#7C3AED] hover:text-[#7C3AED]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{hs.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Hotspot Clue Description */}
              {activeHotspotId && (
                <div className="mt-3 p-3 rounded-lg bg-white border border-[#C4B5FD] text-xs text-[#241B35] space-y-1">
                  {(() => {
                    const activeHs = currentCase.hotspots.find(h => h.id === activeHotspotId);
                    if (!activeHs) return null;
                    return (
                      <>
                        <p className="font-bold text-[#7C3AED]">{activeHs.label}:</p>
                        <p className="text-[#756B86]">{activeHs.description}</p>
                        <p className="text-[11px] text-[#5B21B6] font-medium pt-1">
                          💡 คำอธิบายเชิงวิเคราะห์: {activeHs.explanation}
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Hint Trigger */}
          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsHintRevealed(!isHintRevealed);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#7C3AED] hover:underline font-semibold cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-[#D97706]" />
              <span>{isHintRevealed ? 'ซ่อนคำใบ้' : 'ขอคำใบ้นักสืบ (Hint)'}</span>
            </button>

            {isHintRevealed && (
              <span className="text-xs text-[#D97706] font-medium bg-[#FEF3C7] px-3 py-1 rounded-lg border border-[#FDE68A]">
                {currentCase.hint}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Detective Analysis Questions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Sub-questions List */}
          {currentCase.subQuestions.map((q, idx) => {
            const selectedOpt = selectedSubAnswers[q.id];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div key={q.id} className="rounded-2xl border border-[#E4DDF3] bg-white p-4 shadow-sm space-y-3">
                <div className="text-xs font-bold text-[#7C3AED]">
                  คำถามที่ {idx + 1}:
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#241B35] leading-snug">
                  {q.question}
                </h4>

                <div className="space-y-1.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectSubAnswer(q.id, optIdx)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6] font-semibold ring-1 ring-[#7C3AED]'
                            : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF]'
                        } ${isAnswerSubmitted ? 'cursor-default' : ''}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Question Feedback after Submit */}
                {isAnswerSubmitted && (
                  <div className={`p-2.5 rounded-xl text-xs space-y-1 ${
                    isCorrect ? 'bg-[#F0FDF4] text-[#14532D] border border-[#86EFAC]' : 'bg-[#FEF2F2] text-[#7F1D1D] border border-[#FCA5A5]'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold">
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" /> : <XCircle className="w-3.5 h-3.5 text-[#DC2626]" />}
                      <span>{isCorrect ? 'วิเคราะห์ถูกต้อง' : 'ยังไม่ถูกต้อง'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Verification Step Question */}
          <div className="rounded-2xl border border-[#E4DDF3] bg-white p-4 shadow-sm space-y-3">
            <div className="text-xs font-bold text-[#5B21B6] flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>ขั้นตอนการยืนยันที่มาที่มีประสิทธิภาพที่สุด:</span>
            </div>

            <div className="space-y-1.5">
              {currentCase.verificationOptions.map((ver) => {
                const isSelected = selectedVerification === ver.id;
                return (
                  <button
                    key={ver.id}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectVerification(ver.id)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6] font-semibold ring-1 ring-[#7C3AED]'
                        : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF]'
                    }`}
                  >
                    {ver.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit or Next Puzzle Controls */}
          {!isAnswerSubmitted ? (
            <button
              type="button"
              disabled={!allReadyToSubmit}
              onClick={handleSubmit}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                allReadyToSubmit
                  ? 'bg-[#7C3AED] hover:bg-[#5B21B6] text-white cursor-pointer shadow-md'
                  : 'bg-[#E4DDF3] text-[#756B86] cursor-not-allowed opacity-70'
              }`}
            >
              ส่งผลการสืบสวนคดีนี้ (Submit Answer)
            </button>
          ) : (
            <div className="space-y-3">
              {/* Short Educational Takeaway */}
              <div className="p-3.5 rounded-xl bg-[#EDE9FE] border border-[#C4B5FD] text-xs text-[#241B35] space-y-1">
                <p className="font-bold text-[#5B21B6] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>ข้อคิดประจำคดี (Detective Takeaway):</span>
                </p>
                <p className="text-[#756B86] leading-relaxed">
                  {currentCase.keyTakeaway}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNextPuzzle}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{caseIndex + 1 < totalCases ? 'ปริศนาถัดไป (Next Puzzle)' : 'ดูผลสรุปภารกิจ'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

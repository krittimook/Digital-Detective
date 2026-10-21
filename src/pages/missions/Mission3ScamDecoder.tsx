import React, { useState } from 'react';
import { 
  ShieldAlert, 
  RotateCcw, 
  ArrowLeft, 
  ChevronRight, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Smartphone,
  Mail,
  MessageSquare,
  Share2,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { SCAM_CASES } from '../../data/scamData';
import { ScamMessageCase, MessageClassification } from '../../types/game';
import { sound } from '../../utils/audio';
import { saveMissionScore, getDetectiveRank } from '../../utils/storage';

interface Mission3Props {
  onReturnToMissions: () => void;
  onNavigateToKnowledge: () => void;
}

export const Mission3ScamDecoder: React.FC<Mission3Props> = ({
  onReturnToMissions,
  onNavigateToKnowledge
}) => {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedClassification, setSelectedClassification] = useState<MessageClassification | null>(null);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [highlightedIndices, setHighlightedIndices] = useState<Set<number>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ id: string; sender: string; isCorrect: boolean }[]>([]);

  const currentCase: ScamMessageCase = SCAM_CASES[caseIndex];
  const totalCases = SCAM_CASES.length;

  const togglePhraseHighlight = (index: number) => {
    sound.playClick();
    setHighlightedIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (!selectedClassification || !selectedActionId || isSubmitted) return;

    setIsSubmitted(true);

    const isClassCorrect = selectedClassification === currentCase.classification;
    const isActionCorrect = currentCase.actionOptions.find(a => a.id === selectedActionId)?.isSafest || false;
    const isAllCorrect = isClassCorrect && isActionCorrect;

    let points = 0;
    if (isClassCorrect) points += 75;
    if (isActionCorrect) points += 75;

    if (isAllCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    setScore(prev => prev + points);
    setSessionResults(prev => [
      ...prev,
      {
        id: currentCase.id,
        sender: currentCase.senderName,
        isCorrect: isAllCorrect
      }
    ]);
  };

  const handleNextCase = () => {
    sound.playClick();
    if (caseIndex + 1 < totalCases) {
      setCaseIndex(prev => prev + 1);
      setSelectedClassification(null);
      setSelectedActionId(null);
      setHighlightedIndices(new Set());
      setIsSubmitted(false);
    } else {
      setIsGameOver(true);
      sound.playVictoryFanfare();

      const passedCases = sessionResults.filter(r => r.isCorrect).length;
      saveMissionScore('mission-3', score, true, totalCases, passedCases);
    }
  };

  const restartSession = () => {
    setCaseIndex(0);
    setSelectedClassification(null);
    setSelectedActionId(null);
    setHighlightedIndices(new Set());
    setIsSubmitted(false);
    setScore(0);
    setIsGameOver(false);
    setSessionResults([]);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'SMS': return <Smartphone className="w-4 h-4" />;
      case 'EMAIL': return <Mail className="w-4 h-4" />;
      case 'CHAT': return <MessageSquare className="w-4 h-4" />;
      default: return <Share2 className="w-4 h-4" />;
    }
  };

  if (isGameOver) {
    const accuracy = totalCases > 0 ? Math.round((sessionResults.filter(r => r.isCorrect).length / totalCases) * 100) : 0;
    const rankInfo = getDetectiveRank(accuracy);

    return (
      <div className="max-w-3xl mx-auto py-6 space-y-8">
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-[0_4px_25px_rgba(124,58,237,0.08)] text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
              ภารกิจที่ 3: สิ้นสุดการถอดรหัสกลโกง
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
              สรุปผลการถอดรหัสข้อความและฟิชชิง
            </h2>
            <p className="text-sm text-[#756B86]">
              คุณได้ตรวจสอบข้อความต้องสงสัยครบทั้ง {totalCases} สถานการณ์จำลองแล้ว
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3]">
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">คะแนนรวม</span>
              <p className="text-2xl font-bold text-[#7C3AED]">{score.toLocaleString()}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">การตัดสินที่ถูกต้อง</span>
              <p className="text-2xl font-bold text-[#16A34A]">
                {sessionResults.filter(r => r.isCorrect).length} / {totalCases} ข้อความ
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 ${rankInfo.badgeColor}`}>
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider">เกราะป้องกันไซเบอร์ของคุณ</span>
              <h4 className="text-base font-bold mt-0.5">{rankInfo.rankTh}</h4>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">
                การไม่คลิกลิงก์แปลกปลอม ไม่เปิดเผยรหัส OTP และการตรวจสอบผ่านช่องทางทางการด้วยตนเองเสมอ คือ 3 หัวใจสำคัญที่จะปกป้องบัญชีและเงินของคุณได้ 100%
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
              <span>เล่นรอบใหม่ (Restart)</span>
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

  const isClassCorrect = selectedClassification === currentCase.classification;
  const isActionCorrect = currentCase.actionOptions.find(a => a.id === selectedActionId)?.isSafest || false;

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
            ข้อความที่ <span className="text-[#7C3AED] font-bold text-sm">{caseIndex + 1}</span> / {totalCases}
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

      {/* Main Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Simulated Device Message Frame (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          
          <div className="rounded-3xl border border-[#E4DDF3] bg-white p-4 sm:p-5 shadow-sm space-y-4">
            
            {/* Simulated Phone/App Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DDF3] text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#EDE9FE] text-[#7C3AED]">
                  {getChannelIcon(currentCase.channel)}
                </span>
                <div>
                  <p className="font-bold text-[#241B35] leading-tight">{currentCase.senderName}</p>
                  <p className="text-[11px] text-[#756B86]">{currentCase.senderAddress}</p>
                </div>
              </div>
              <span className="text-[11px] text-[#756B86]">{currentCase.timestamp}</span>
            </div>

            {/* Message Bubble Container */}
            <div className="p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] text-sm text-[#241B35] leading-relaxed relative">
              <p className="font-mono text-xs text-[#756B86] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <span>จำลองข้อความที่ได้รับ</span>
                <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Fictional Simulation
                </span>
              </p>
              
              <div className="text-xs sm:text-sm text-[#241B35] leading-relaxed whitespace-pre-line">
                {currentCase.messageBody}
              </div>
            </div>

            {/* Interactive Clue Finder in Message */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#5B21B6] block mb-2">
                🔎 แตะข้อความด้านล่างเพื่อวิเคราะห์สัญญาณอันตราย (Red Flags):
              </span>
              <div className="space-y-1.5">
                {currentCase.highlightablePhrases.map((phrase, pIdx) => {
                  const isHighlighted = highlightedIndices.has(pIdx);
                  return (
                    <div key={pIdx} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => togglePhraseHighlight(pIdx)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer border flex items-center justify-between ${
                          isHighlighted
                            ? phrase.isRedFlag
                              ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#991B1B] font-semibold'
                              : 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534] font-semibold'
                            : 'bg-white border-[#E4DDF3] text-[#241B35] hover:bg-[#F7F5FF]'
                        }`}
                      >
                        <span className="truncate pr-2">"{phrase.text}"</span>
                        <span className="text-[10px] uppercase font-bold shrink-0">
                          {isHighlighted ? (phrase.isRedFlag ? '🚨 สัญญาณอันตราย' : '✔️ ปกติ') : 'แตะตรวจ'}
                        </span>
                      </button>

                      {isHighlighted && (
                        <p className="text-[11px] text-[#756B86] pl-2 leading-relaxed">
                          ↳ {phrase.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Detective Decision & Safest Action Deck (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Step 1: Classify Message */}
          <div className="rounded-2xl border border-[#E4DDF3] bg-white p-4 shadow-sm space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
              ขั้นตอนที่ 1: การจำแนกประเภทข้อความ
            </span>
            <h4 className="text-xs sm:text-sm font-semibold text-[#241B35]">
              ข้อความนี้จัดเป็นข้อความประเภทใด?
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                disabled={isSubmitted}
                onClick={() => {
                  sound.playClick();
                  setSelectedClassification('SUSPICIOUS');
                }}
                className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                  selectedClassification === 'SUSPICIOUS'
                    ? 'border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] font-bold ring-2 ring-[#DC2626]/20'
                    : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF]'
                } ${isSubmitted ? 'cursor-default' : ''}`}
              >
                🚨 น่าสงสัย / หลอกลวง (Suspicious)
              </button>

              <button
                type="button"
                disabled={isSubmitted}
                onClick={() => {
                  sound.playClick();
                  setSelectedClassification('LEGITIMATE');
                }}
                className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                  selectedClassification === 'LEGITIMATE'
                    ? 'border-[#16A34A] bg-[#DCFCE7] text-[#16A34A] font-bold ring-2 ring-[#16A34A]/20'
                    : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF]'
                } ${isSubmitted ? 'cursor-default' : ''}`}
              >
                ✅ น่าจะถูกต้องตามจริง (Legitimate)
              </button>

              <button
                type="button"
                disabled={isSubmitted}
                onClick={() => {
                  sound.playClick();
                  setSelectedClassification('INSUFFICIENT_INFO');
                }}
                className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                  selectedClassification === 'INSUFFICIENT_INFO'
                    ? 'border-[#D97706] bg-[#FEF3C7] text-[#D97706] font-bold ring-2 ring-[#D97706]/20'
                    : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF]'
                } ${isSubmitted ? 'cursor-default' : ''}`}
              >
                ❓ ข้อมูลไม่เพียงพอ (Insufficient)
              </button>
            </div>
          </div>

          {/* Step 2: Choose Safest Next Action */}
          <div className="rounded-2xl border border-[#E4DDF3] bg-white p-4 shadow-sm space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B21B6]">
              ขั้นตอนที่ 2: การปฏิบัติที่ปลอดภัยที่สุด
            </span>
            <h4 className="text-xs sm:text-sm font-semibold text-[#241B35]">
              หากคุณได้รับข้อความนี้ การกระทำใดปลอดภัยที่สุด?
            </h4>

            <div className="space-y-2">
              {currentCase.actionOptions.map((act) => {
                const isSelected = selectedActionId === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => {
                      sound.playClick();
                      setSelectedActionId(act.id);
                    }}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6] font-semibold ring-1 ring-[#7C3AED]'
                        : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF]'
                    } ${isSubmitted ? 'cursor-default' : ''}`}
                  >
                    {act.actionText}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Answer */}
          {!isSubmitted ? (
            <button
              type="button"
              disabled={!selectedClassification || !selectedActionId}
              onClick={handleSubmit}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                selectedClassification && selectedActionId
                  ? 'bg-[#7C3AED] hover:bg-[#5B21B6] text-white cursor-pointer shadow-md'
                  : 'bg-[#E4DDF3] text-[#756B86] cursor-not-allowed opacity-70'
              }`}
            >
              ยืนยันการตัดสินคดีนี้ (Submit Answer)
            </button>
          ) : (
            <div className="space-y-3">
              {/* Detailed Feedback & Red Flag Breakdown */}
              <div className={`rounded-2xl border p-4 space-y-2 text-xs ${
                isClassCorrect && isActionCorrect
                  ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]'
                  : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#7F1D1D]'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isClassCorrect && isActionCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#DC2626]" />
                  )}
                  <span>
                    {isClassCorrect && isActionCorrect 
                      ? 'ยอดเยี่ยม! คุณจำแนกและเลือกวิธีรับมือได้อย่างปลอดภัยสมบูรณ์ (+150 คะแนน)'
                      : 'ยังมีการตัดสินใจบางส่วนที่ต้องระมัดระวังเพิ่มขึ้น'}
                  </span>
                </div>

                <p className="leading-relaxed text-[#241B35]">
                  {currentCase.detailedExplanation}
                </p>

                <div className="pt-2 border-t border-black/10">
                  <p className="font-bold text-[#5B21B6] mb-1">สรุปจุดสังเกตสำคัญในคดีนี้:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-[#756B86]">
                    {currentCase.redFlagSummary.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Case Button */}
              <button
                type="button"
                onClick={handleNextCase}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{caseIndex + 1 < totalCases ? 'ข้อความถัดไป (Next Case)' : 'ดูผลการถอดรหัสทั้งหมด'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

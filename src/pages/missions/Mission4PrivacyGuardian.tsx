import React, { useState } from 'react';
import { 
  Lock, 
  RotateCcw, 
  ArrowLeft, 
  ChevronRight, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  KeyRound, 
  Smartphone, 
  Wifi, 
  Share2, 
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { PRIVACY_SCENARIOS } from '../../data/privacyData';
import { PrivacyScenario } from '../../types/game';
import { sound } from '../../utils/audio';
import { saveMissionScore, getDetectiveRank } from '../../utils/storage';

interface Mission4Props {
  onReturnToMissions: () => void;
  onNavigateToKnowledge: () => void;
}

export const Mission4PrivacyGuardian: React.FC<Mission4Props> = ({
  onReturnToMissions,
  onNavigateToKnowledge
}) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ id: string; title: string; isCorrect: boolean }[]>([]);

  const currentScenario: PrivacyScenario = PRIVACY_SCENARIOS[scenarioIndex];
  const totalScenarios = PRIVACY_SCENARIOS.length;

  const handleSubmit = () => {
    if (!selectedChoiceId || isSubmitted) return;

    setIsSubmitted(true);
    const selectedOption = currentScenario.choices.find(c => c.id === selectedChoiceId);
    const isSafest = selectedOption?.isSafest || false;

    if (isSafest) {
      sound.playCorrect();
      setScore(prev => prev + 100);
    } else {
      sound.playIncorrect();
    }

    setSessionResults(prev => [
      ...prev,
      {
        id: currentScenario.id,
        title: currentScenario.scenarioTitle,
        isCorrect: isSafest
      }
    ]);
  };

  const handleNext = () => {
    sound.playClick();
    if (scenarioIndex + 1 < totalScenarios) {
      setScenarioIndex(prev => prev + 1);
      setSelectedChoiceId(null);
      setIsSubmitted(false);
    } else {
      setIsGameOver(true);
      sound.playVictoryFanfare();

      const passedCount = sessionResults.filter(r => r.isCorrect).length;
      saveMissionScore('mission-4', score, true, totalScenarios, passedCount);
    }
  };

  const restartSession = () => {
    setScenarioIndex(0);
    setSelectedChoiceId(null);
    setIsSubmitted(false);
    setScore(0);
    setIsGameOver(false);
    setSessionResults([]);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'PASSWORD': return <KeyRound className="w-5 h-5 text-[#7C3AED]" />;
      case '2FA':
      case 'OTP': return <Smartphone className="w-5 h-5 text-[#7C3AED]" />;
      case 'PUBLIC_WIFI': return <Wifi className="w-5 h-5 text-[#7C3AED]" />;
      case 'SOCIAL_MEDIA': return <Share2 className="w-5 h-5 text-[#7C3AED]" />;
      default: return <Shield className="w-5 h-5 text-[#7C3AED]" />;
    }
  };

  if (isGameOver) {
    const accuracy = totalScenarios > 0 ? Math.round((sessionResults.filter(r => r.isCorrect).length / totalScenarios) * 100) : 0;
    const rankInfo = getDetectiveRank(accuracy);

    return (
      <div className="max-w-3xl mx-auto py-6 space-y-8">
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-[0_4px_25px_rgba(124,58,237,0.08)] text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
              ภารกิจที่ 4: สิ้นสุดการปกป้องความเป็นส่วนตัว
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
              สรุปผลการปกป้องตัวตนและความปลอดภัยดิจิทัล
            </h2>
            <p className="text-sm text-[#756B86]">
              คุณได้ผ่านสถานการณ์จำลองเพื่อความปลอดภัยไซเบอร์ครบทั้ง {totalScenarios} สถานการณ์แล้ว
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3]">
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">คะแนนรวม</span>
              <p className="text-2xl font-bold text-[#7C3AED]">{score.toLocaleString()}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#756B86]">การตัดสินใจที่ปลอดภัย</span>
              <p className="text-2xl font-bold text-[#16A34A]">
                {sessionResults.filter(r => r.isCorrect).length} / {totalScenarios} ข้อ
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 ${rankInfo.badgeColor}`}>
            <Shield className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider">ระดับผู้พิทักษ์ข้อมูลของคุณ</span>
              <h4 className="text-base font-bold mt-0.5">{rankInfo.rankTh}</h4>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">
                การตั้ง Passphrase ยาว, การเปิดใช้งาน Authenticator App 2FA, การไม่แชร์ข้อมูลอ่อนไหว และการหวงแหนรหัส OTP จะเป็นเกราะกำบังให้คุณใช้ชีวิตในยุคดิจิทัลได้อย่างไร้กังวล
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
              <span>เล่นรอบใหม่ (Restart Scenarios)</span>
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

  const selectedOption = currentScenario.choices.find(c => c.id === selectedChoiceId);
  const isSafest = selectedOption?.isSafest || false;

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 space-y-6">
      
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
            สถานการณ์ที่ <span className="text-[#7C3AED] font-bold text-sm">{scenarioIndex + 1}</span> / {totalScenarios}
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
          style={{ width: `${Math.round(((scenarioIndex + 1) / totalScenarios) * 100)}%` }}
        />
      </div>

      {/* Scenario Card */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Scenario Header with Category Badge */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] border border-[#DDD6FE] flex items-center justify-center shrink-0">
            {getCategoryIcon(currentScenario.category)}
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
              หมวดหมู่: {currentScenario.categoryLabelTh}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#241B35] leading-snug">
              {currentScenario.scenarioTitle}
            </h2>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] text-sm text-[#241B35] leading-relaxed">
          {currentScenario.scenarioDescription}
        </div>

        {/* Choices List */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-[#5B21B6] uppercase tracking-wider">
            เลือกคำตอบหรือแนวทางปฏิบัติที่ปลอดภัยที่สุด:
          </p>

          <div className="space-y-2.5">
            {currentScenario.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              return (
                <button
                  key={choice.id}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => {
                    sound.playClick();
                    setSelectedChoiceId(choice.id);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6] font-semibold ring-2 ring-[#7C3AED]/30'
                      : 'border-[#E4DDF3] bg-white text-[#241B35] hover:bg-[#F7F5FF] hover:border-[#7C3AED]/30'
                  } ${isSubmitted ? 'cursor-default' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs mt-0.5 ${
                      isSelected ? 'border-[#7C3AED] bg-[#7C3AED] text-white' : 'border-[#C4B5FD] bg-white text-[#7C3AED]'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                    <span className="leading-relaxed">{choice.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit or Next Controls */}
        {!isSubmitted ? (
          <button
            type="button"
            disabled={!selectedChoiceId}
            onClick={handleSubmit}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all ${
              selectedChoiceId
                ? 'bg-[#7C3AED] hover:bg-[#5B21B6] text-white cursor-pointer shadow-md'
                : 'bg-[#E4DDF3] text-[#756B86] cursor-not-allowed opacity-70'
            }`}
          >
            ยืนยันคำตอบ (Submit Answer)
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            
            {/* Feedback Box */}
            <div className={`p-4 rounded-2xl border space-y-2 text-xs sm:text-sm ${
              isSafest ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]' : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#7F1D1D]'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {isSafest ? (
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#DC2626]" />
                )}
                <span>{isSafest ? 'ยอดเยี่ยม! นี่คือการตัดสินใจที่ปลอดภัยที่สุด (+100 คะแนน)' : 'ยังไม่ใช่ทางเลือกที่ปลอดภัยที่สุด'}</span>
              </div>
              
              <p className="leading-relaxed text-[#241B35]">
                {selectedOption?.feedback}
              </p>
            </div>

            {/* Why It Matters & Golden Rule */}
            <div className="p-4 rounded-2xl bg-[#EDE9FE] border border-[#C4B5FD] text-xs text-[#241B35] space-y-2">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#5B21B6]">ทำไมเรื่องนี้ถึงสำคัญ: </span>
                  <span className="text-[#756B86] leading-relaxed">{currentScenario.whyItMatters}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#C4B5FD]/40 text-[11px] font-semibold text-[#5B21B6]">
                🛡️ กฎเหล็กประจำบทเรียน: {currentScenario.goldenRule}
              </div>
            </div>

            {/* Next Scenario Button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-sm font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{scenarioIndex + 1 < totalScenarios ? 'สถานการณ์ถัดไป (Next Scenario)' : 'ดูผลสรุปภารกิจ'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

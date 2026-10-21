import React from 'react';
import { 
  LucideIcon, 
  CheckCircle2, 
  ArrowRight, 
  Trophy, 
  Sparkles, 
  Clock, 
  HelpCircle 
} from 'lucide-react';
import { MissionId, MissionProgress } from '../types/game';
import { sound } from '../utils/audio';

interface MissionCardProps {
  missionId: MissionId;
  missionNumber: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'ปกติ (Normal)' | 'ปานกลาง (Intermediate)' | 'ท้าทาย (Advanced)' | 'มาสเตอร์ (Master)';
  estimatedTime: string;
  icon: LucideIcon;
  progress?: MissionProgress;
  onStart: (id: MissionId) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  missionId,
  missionNumber,
  title,
  subtitle,
  description,
  difficulty,
  estimatedTime,
  icon: Icon,
  progress,
  onStart
}) => {
  const isCompleted = progress?.completed || false;
  const bestScore = progress?.bestScore || 0;

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'ปกติ (Normal)':
        return 'text-[#16A34A] bg-[#DCFCE7] border-[#BBF7D0]';
      case 'ปานกลาง (Intermediate)':
        return 'text-[#7C3AED] bg-[#EDE9FE] border-[#DDD6FE]';
      case 'ท้าทาย (Advanced)':
        return 'text-[#D97706] bg-[#FEF3C7] border-[#FDE68A]';
      case 'มาสเตอร์ (Master)':
        return 'text-[#5B21B6] bg-[#F5F3FF] border-[#C4B5FD] font-semibold';
      default:
        return 'text-[#756B86] bg-[#F7F5FF] border-[#E4DDF3]';
    }
  };

  return (
    <div className="group relative rounded-2xl border border-[#E4DDF3] bg-white p-6 shadow-[0_2px_12px_rgba(124,58,237,0.06)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.12)] hover:border-[#7C3AED]/40 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white transition-colors duration-200">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                ภารกิจที่ {missionNumber}
              </span>
              <h3 className="text-lg font-bold text-[#241B35] leading-snug group-hover:text-[#5B21B6] transition-colors">
                {title}
              </h3>
            </div>
          </div>

          {/* Completion Badge */}
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ผ่านแล้ว</span>
            </span>
          ) : (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getDifficultyColor()}`}>
              {difficulty}
            </span>
          )}
        </div>

        {/* Subtitle & Description */}
        <p className="text-xs font-semibold text-[#5B21B6] mb-1.5">
          {subtitle}
        </p>
        <p className="text-xs sm:text-sm text-[#756B86] leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>
      </div>

      {/* Bottom Metadata & Start Button */}
      <div className="pt-4 border-t border-[#E4DDF3] space-y-3">
        <div className="flex items-center justify-between text-xs text-[#756B86]">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{estimatedTime}</span>
          </span>
          {bestScore > 0 && (
            <span className="inline-flex items-center gap-1 font-semibold text-[#7C3AED]">
              <Trophy className="w-3.5 h-3.5" />
              <span>สถิติสูงสุด: {bestScore} คะแนน</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onStart(missionId);
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs sm:text-sm font-semibold shadow-[0_2px_10px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.35)] transition-all cursor-pointer whitespace-nowrap"
        >
          <span>{isCompleted ? 'เล่นภารกิจนี้อีกครั้ง' : 'เริ่มภารกิจ (Start Mission)'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

    </div>
  );
};

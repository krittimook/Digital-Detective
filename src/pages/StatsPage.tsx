import React, { useState } from 'react';
import { 
  Trophy, 
  Trash2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award,
  Sparkles,
  Search,
  ShieldAlert,
  Lock,
  Layers,
  ArrowRight,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { UserStats, MissionId } from '../types/game';
import { clearUserStats, getDetectiveRank } from '../utils/storage';
import { sound } from '../utils/audio';

interface StatsPageProps {
  userStats: UserStats;
  onStatsUpdated: (stats: UserStats) => void;
  onStartMission: (id: MissionId) => void;
}

export const StatsPage: React.FC<StatsPageProps> = ({
  userStats,
  onStatsUpdated,
  onStartMission
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const totalAnswered = userStats.totalQuestionsAnswered;
  const correctCount = userStats.totalCorrectAnswers;
  const incorrectCount = Math.max(0, totalAnswered - correctCount);
  const overallAccuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const currentRank = getDetectiveRank(overallAccuracy);
  const completedMissionsCount = Object.values(userStats.missionProgress).filter(m => m.completed).length;
  const completionPercentage = Math.round((completedMissionsCount / 5) * 100);

  const handleReset = () => {
    sound.playClick();
    const clean = clearUserStats();
    onStatsUpdated(clean);
    setShowConfirmReset(false);
  };

  const missionsInfo: { id: MissionId; num: number; title: string; category: string; icon: React.ReactNode }[] = [
    { id: 'mission-1', num: 1, title: 'AI หรือภาพจริง? (Image Detective)', category: 'การวิเคราะห์ภาพ AI', icon: <Sparkles className="w-4 h-4 text-[#7C3AED]" /> },
    { id: 'mission-2', num: 2, title: 'ปริศนาภาพ AI — เจาะลึกเบาะแส (Image Puzzle)', category: 'การวิเคราะห์เบาะแส & ที่มา', icon: <Search className="w-4 h-4 text-[#7C3AED]" /> },
    { id: 'mission-3', num: 3, title: 'ถอดรหัสข้อความหลอกลวง (Scam Decoder)', category: 'การตรวจจับกลโกงฟิชชิง', icon: <ShieldAlert className="w-4 h-4 text-[#7C3AED]" /> },
    { id: 'mission-4', num: 4, title: 'ผู้พิทักษ์ความเป็นส่วนตัว (Privacy Guardian)', category: 'การปกป้องความเป็นส่วนตัว', icon: <Lock className="w-4 h-4 text-[#7C3AED]" /> },
    { id: 'mission-5', num: 5, title: 'บททดสอบยอดนักสืบดิจิทัล (Master Challenge)', category: 'การประเมินทักษะรวม', icon: <Trophy className="w-4 h-4 text-[#7C3AED]" /> }
  ];

  const achievementBadges = [
    {
      id: 'FIRST_STEP',
      title: 'ก้าวแรกสู่วงการสืบสวน',
      desc: 'เริ่มเล่นภารกิจใดก็ได้สำเร็จ 1 ครั้ง',
      isUnlocked: userStats.totalGamesCompleted > 0
    },
    {
      id: 'ACCURACY_STAR',
      title: 'สายตาเหยี่ยว (Eagle Eye)',
      desc: 'ทำความแม่นยำรวมได้มากกว่า 75%',
      isUnlocked: overallAccuracy >= 75 && totalAnswered >= 10
    },
    {
      id: 'MISSION_MASTER',
      title: 'ผู้พิชิต 5 ภารกิจ',
      desc: 'ปฏิบัติการผ่านครบทั้ง 5 ภารกิจ',
      isUnlocked: completedMissionsCount === 5
    },
    {
      id: 'MASTER_CHALLENGE',
      title: 'ตราเกียรติยศยอดนักสืบ (Master Badge)',
      desc: 'ได้ตำแหน่ง Master Detective ในบททดสอบจับเวลา',
      isUnlocked: (userStats.missionProgress['mission-5']?.bestScore || 0) >= 800
    }
  ];

  // Friendly Empty State when player hasn't played any activities yet
  if (userStats.totalGamesCompleted === 0) {
    return (
      <div className="max-w-3xl mx-auto py-10 space-y-8 text-center">
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-8 sm:p-12 shadow-[0_4px_25px_rgba(124,58,237,0.06)] space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] mx-auto shadow-inner">
            <TrendingUp className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
              ยังไม่มีประวัติการสืบสวน
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
              เริ่มทำภารกิจเพื่อดูสถิติของคุณ
            </h2>
            <p className="text-xs sm:text-sm text-[#756B86] max-w-md mx-auto leading-relaxed">
              เมื่อคุณเริ่มปฏิบัติการในภารกิจใดภารกิจหนึ่ง คะแนน ความแม่นยำ ข้อที่ตอบถูก และตราสัญลักษณ์นักสืบจะถูกบันทึกและแสดงที่หน้านี้โดยอัตโนมัติ
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onStartMission('mission-1');
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-bold text-sm shadow-md shadow-[#7C3AED]/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>เริ่มภารกิจแรก (Start Mission 1)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#241B35] tracking-tight">
            สถิติและความคืบหน้า (Statistics & Progress)
          </h1>
          <p className="text-xs sm:text-sm text-[#756B86] mt-1">
            บันทึกผลงานการสืบสวนจริงที่บันทึกไว้ในเบราว์เซอร์ของคุณ (LocalStorage)
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowConfirmReset(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#DC2626] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FCA5A5] transition-colors cursor-pointer w-fit"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>รีเซ็ตสถิติทั้งหมด (Reset Progress)</span>
        </button>
      </div>

      {/* Rank Showcase Card */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] shadow-inner shrink-0">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1.5 flex-1">
            <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider block">
              อันดับนักสืบปัจจุบันของคุณ (Detective Rank)
            </span>
            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
              <h2 className="text-xl sm:text-2xl font-black text-[#5B21B6]">
                {currentRank.rankTh}
              </h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${currentRank.badgeColor}`}>
                {currentRank.percentageRange}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#756B86] leading-relaxed">
              {currentRank.description}
            </p>
          </div>
        </div>

        {/* 6 Key Stat Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-[#E4DDF3]">
          <div className="p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] text-center space-y-0.5">
            <span className="text-xs text-[#756B86]">คะแนนสูงสุด</span>
            <p className="text-xl font-black text-[#7C3AED]">{userStats.highestScore.toLocaleString()}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] text-center space-y-0.5">
            <span className="text-xs text-[#756B86]">ความแม่นยำรวม</span>
            <p className="text-xl font-black text-[#5B21B6]">{overallAccuracy}%</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] text-center space-y-0.5">
            <span className="text-xs text-[#756B86]">ภารกิจที่ผ่าน</span>
            <p className="text-xl font-black text-[#16A34A]">{completedMissionsCount} / 5</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] text-center space-y-0.5">
            <span className="text-xs text-[#756B86]">ความคืบหน้ารวม</span>
            <p className="text-xl font-black text-[#5B21B6]">{completionPercentage}%</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-center space-y-0.5">
            <span className="text-xs text-[#16A34A]">ตอบถูกต้อง</span>
            <p className="text-xl font-black text-[#16A34A]">{correctCount}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] text-center space-y-0.5">
            <span className="text-xs text-[#DC2626]">ตอบผิด</span>
            <p className="text-xl font-black text-[#DC2626]">{incorrectCount}</p>
          </div>
        </div>
      </div>

      {/* Performance by Mission & Learning Category */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-[#241B35] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#7C3AED]" />
          <span>ผลการปฏิบัติการรายภารกิจ (Performance by Mission)</span>
        </h3>

        <div className="divide-y divide-[#E4DDF3]">
          {missionsInfo.map((m) => {
            const prog = userStats.missionProgress[m.id];
            const isDone = prog?.completed;
            const best = prog?.bestScore || 0;

            return (
              <div key={m.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-[#241B35]">{m.title}</p>
                      <span className="text-[11px] text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-md font-medium">
                        {m.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#756B86] mt-0.5">
                      {isDone ? `เล่นไปแล้ว ${prog.attempts} ครั้ง · สถิติสูงสุด: ${best} คะแนน` : 'ยังไม่ได้ปฏิบัติการภารกิจนี้'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    isDone ? 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]' : 'bg-[#F7F5FF] text-[#756B86] border-[#E4DDF3]'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                    <span>{isDone ? 'ผ่านแล้ว' : 'ยังไม่ผ่าน'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onStartMission(m.id);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    {isDone ? 'เล่นซ้ำ' : 'เริ่มเล่น'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-[#241B35] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#7C3AED]" />
          <span>เหรียญเกียรติยศนักสืบ (Achievements)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievementBadges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                badge.isUnlocked
                  ? 'bg-[#F5F3FF] border-[#C4B5FD] text-[#241B35]'
                  : 'bg-[#F9FAFB] border-[#E5E7EB] opacity-60'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${
                badge.isUnlocked ? 'bg-[#7C3AED] text-white shadow-sm' : 'bg-gray-200 text-gray-400'
              }`}>
                {badge.isUnlocked ? '★' : '🔒'}
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-[#5B21B6]">{badge.title}</p>
                <p className="text-xs text-[#756B86]">{badge.desc}</p>
                <span className={`text-[10px] font-bold uppercase tracking-wider block pt-1 ${
                  badge.isUnlocked ? 'text-[#16A34A]' : 'text-[#756B86]'
                }`}>
                  {badge.isUnlocked ? 'ปลดล็อกแล้ว ✓' : 'ยังไม่ปลดล็อก'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Reset Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 bg-[#241B35]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E4DDF3] p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center text-[#DC2626] mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-[#241B35]">ยืนยันการรีเซ็ตสถิติ?</h4>
              <p className="text-xs text-[#756B86]">
                ประวัติการสืบสวนและคะแนนที่บันทึกไว้ในเบราว์เซอร์นี้ทั้งหมดจะถูกล้าง ไม่สามารถกู้คืนได้
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E4DDF3] text-xs font-semibold text-[#241B35] hover:bg-[#F7F5FF] cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold text-white shadow-md cursor-pointer"
              >
                ยืนยันการล้างข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

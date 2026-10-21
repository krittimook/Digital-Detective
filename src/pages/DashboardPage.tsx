import React from 'react';
import { 
  Play, 
  Sparkles, 
  Search, 
  ShieldAlert, 
  Lock, 
  Trophy, 
  BookOpen, 
  Award, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { UserStats, MissionId } from '../types/game';
import { getDetectiveRank } from '../utils/storage';
import { sound } from '../utils/audio';

interface DashboardPageProps {
  userStats: UserStats;
  onNavigate: (tab: string) => void;
  onStartMission: (id: MissionId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  userStats,
  onNavigate,
  onStartMission
}) => {
  const completedMissionsCount = Object.values(userStats.missionProgress).filter(m => m.completed).length;
  const overallAccuracy = userStats.totalQuestionsAnswered > 0
    ? Math.round((userStats.totalCorrectAnswers / userStats.totalQuestionsAnswered) * 100)
    : 0;
  const detectiveRank = getDetectiveRank(overallAccuracy);

  const missionsSummary = [
    {
      id: 'mission-1' as MissionId,
      num: 1,
      title: 'AI หรือภาพจริง? (Image Detective)',
      desc: 'ทดสอบสายตาแยกแยะภาพถ่ายจริงออกจากภาพสังเคราะห์ AI',
      difficulty: 'ปกติ',
      time: '3-5 นาที',
      icon: Sparkles
    },
    {
      id: 'mission-2' as MissionId,
      num: 2,
      title: 'ปริศนาภาพ AI — เจาะลึกเบาะแส (Image Puzzle)',
      desc: 'วิเคราะห์สถานการณ์ไวรัล ตรวจสอบนิ้วมือ ฟันเฟือง และที่มา',
      difficulty: 'ปานกลาง',
      time: '4-6 นาที',
      icon: Search
    },
    {
      id: 'mission-3' as MissionId,
      num: 3,
      title: 'ถอดรหัสข้อความหลอกลวง (Scam Decoder)',
      desc: 'ตรวจจับฟิชชิง ลิงก์อันตราย และกลโกงวิศวกรรมสังคม',
      difficulty: 'ปานกลาง',
      time: '4-6 นาที',
      icon: ShieldAlert
    },
    {
      id: 'mission-4' as MissionId,
      num: 4,
      title: 'ผู้พิทักษ์ความเป็นส่วนตัว (Privacy Guardian)',
      desc: 'เรียนรู้วิธีปกป้องรหัสผ่าน 2FA สิทธิ์แอป และ Wi-Fi สาธารณะ',
      difficulty: 'ท้าทาย',
      time: '5-7 นาที',
      icon: Lock
    },
    {
      id: 'mission-5' as MissionId,
      num: 5,
      title: 'บททดสอบยอดนักสืบดิจิทัล (Master Challenge)',
      desc: 'แบบทดสอบรวม 10 ข้อจับเวลา 4 นาที เพื่อวัดระดับตรานักสืบ',
      difficulty: 'มาสเตอร์',
      time: '4 นาที',
      icon: Trophy
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2 sm:py-4">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(124,58,237,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#5B21B6] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span>หน้าหลักระบบ (Investigation Dashboard)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#241B35] tracking-tight">
            ยินดีต้อนรับสู่ศูนย์บัญชาการสืบสวนดิจิทัล
          </h1>
          <p className="text-xs sm:text-sm text-[#756B86] max-w-xl leading-relaxed">
            เลือกภารกิจเพื่อเริ่มปฏิบัติการสืบหาความจริง หรือศึกษาเทคนิคการตรวจสอบในศูนย์ความรู้ ทุกคะแนนจะถูกบันทึกเพื่อประเมินตราสัญลักษณ์นักสืบของคุณ
          </p>
          
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigate('missions');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#7C3AED]/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>เริ่มทำภารกิจ (Start Missions)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigate('knowledge');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F7F5FF] hover:bg-[#EDE9FE] border border-[#E4DDF3] text-[#5B21B6] font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-[#7C3AED]" />
              <span>อ่านคู่มือความรู้ (Knowledge Center)</span>
            </button>
          </div>
        </div>

        {/* Player Rank Card */}
        <div className="p-5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] flex items-center gap-4 shrink-0 max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] shrink-0 shadow-inner">
            <Award className="w-7 h-7" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-[#756B86] uppercase tracking-wider block">
              ระดับนักสืบของคุณ
            </span>
            <p className="text-base font-extrabold text-[#5B21B6] leading-tight">
              {detectiveRank.rankTh}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#756B86] pt-0.5">
              <span>ผ่านแล้ว {completedMissionsCount}/5 ภารกิจ</span>
              <span>·</span>
              <span className="font-semibold text-[#7C3AED]">{userStats.highestScore.toLocaleString()} คะแนน</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Missions Quick Launch Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#241B35] flex items-center gap-2">
            <span>ภารกิจทั้งหมด 5 ด่าน (Missions Overview)</span>
          </h2>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigate('missions');
            }}
            className="text-xs sm:text-sm text-[#7C3AED] hover:text-[#5B21B6] font-bold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>ดูหน้ารวมภารกิจแบบละเอียด</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {missionsSummary.map((m) => {
            const Icon = m.icon;
            const isCompleted = userStats.missionProgress[m.id]?.completed || false;
            const bestScore = userStats.missionProgress[m.id]?.bestScore || 0;

            return (
              <div
                key={m.id}
                className="rounded-2xl border border-[#E4DDF3] bg-white p-5 shadow-sm hover:border-[#7C3AED]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] block">
                          ภารกิจที่ {m.num}
                        </span>
                        <h3 className="text-sm font-bold text-[#241B35] leading-snug">
                          {m.title}
                        </h3>
                      </div>
                    </div>

                    {isCompleted && (
                      <span className="text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#BBF7D0] shrink-0">
                        ผ่านแล้ว ✓
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#756B86] leading-relaxed line-clamp-2">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4DDF3] mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-[#756B86] inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#7C3AED]" />
                    <span>{m.time}</span>
                    {bestScore > 0 && <span className="text-[#5B21B6] font-semibold">· สูงสุด {bestScore} คะแนน</span>}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onStartMission(m.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    {isCompleted ? 'เล่นซ้ำ' : 'เริ่มเล่น'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Shortcuts Deck: Knowledge & Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        
        {/* Knowledge Shortcut */}
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#241B35]">
              ศูนย์ความรู้และคู่มือนักสืบ (Knowledge Center)
            </h3>
            <p className="text-xs text-[#756B86] leading-relaxed">
              ศึกษา 7 บทเรียนความรู้ ได้แก่ การสังเกตภาพ AI, ทำไมตาเปล่าจึงไม่ใช่หลักฐานเด็ดขาด, เครื่องมือสืบค้นที่มา C2PA, วิธีจับไต๋ฟิชชิง, และการตั้งรหัสผ่านที่ปลอดภัย
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigate('knowledge');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#C4B5FD] bg-[#F7F5FF] hover:bg-[#EDE9FE] text-[#5B21B6] text-xs font-bold transition-colors cursor-pointer mt-2"
          >
            <span>เปิดอ่าน 7 บทเรียน</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Statistics Shortcut */}
        <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#241B35]">
              สถิติและความคืบหน้า (My Statistics)
            </h3>
            <p className="text-xs text-[#756B86] leading-relaxed">
              ตรวจสอบสถิติการเล่น ความแม่นยำรวม ข้อที่ตอบถูก และเหรียญรางวัลเกียรติยศที่ปลดล็อกแล้ว หรือจัดการรีเซ็ตสถิติส่วนบุคคล
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigate('stats');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#C4B5FD] bg-[#F7F5FF] hover:bg-[#EDE9FE] text-[#5B21B6] text-xs font-bold transition-colors cursor-pointer mt-2"
          >
            <span>ดูประวัติและสถิติ</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

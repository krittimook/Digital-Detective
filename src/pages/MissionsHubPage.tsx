import React from 'react';
import { 
  Sparkles, 
  Search, 
  ShieldAlert, 
  Lock, 
  Trophy, 
  Award,
  CheckCircle2,
  Flame,
  ArrowRight
} from 'lucide-react';
import { MissionId, UserStats } from '../types/game';
import { MissionCard } from '../components/MissionCard';
import { getDetectiveRank } from '../utils/storage';

interface MissionsHubPageProps {
  userStats: UserStats;
  onStartMission: (id: MissionId) => void;
  onNavigateToKnowledge: () => void;
}

export const MissionsHubPage: React.FC<MissionsHubPageProps> = ({
  userStats,
  onStartMission,
  onNavigateToKnowledge
}) => {
  const completedMissionsCount = Object.values(userStats.missionProgress).filter(m => m.completed).length;
  const overallAccuracy = userStats.totalQuestionsAnswered > 0
    ? Math.round((userStats.totalCorrectAnswers / userStats.totalQuestionsAnswered) * 100)
    : 0;
  const currentRank = getDetectiveRank(overallAccuracy);

  const missionsList = [
    {
      missionId: 'mission-1' as MissionId,
      missionNumber: 1,
      title: 'AI หรือภาพจริง? (The Image Detective)',
      subtitle: 'แยกแยะภาพถ่ายจริงออกจากภาพสังเคราะห์ด้วย AI',
      description: 'ทดสอบสายตากับคลังภาพคัดสรร เลือกระหว่าง AI-Generated, Real Photograph, หรือ Not Enough Evidence พร้อมส่องขยายระดับพิกเซลและศึกษาที่มาที่ได้รับการตรวจสอบแล้ว',
      difficulty: 'ปกติ (Normal)' as const,
      estimatedTime: '3-5 นาที',
      icon: Sparkles
    },
    {
      missionId: 'mission-2' as MissionId,
      missionNumber: 2,
      title: 'ปริศนาภาพ AI — เจาะลึกเบาะแส (Image Puzzle)',
      subtitle: 'วิเคราะห์รายละเอียด ตรวจสอบแสงเงา ข้อความ และที่มา',
      description: 'รับบทนักสืบวิเคราะห์ภาพจากสถานการณ์ไวรัล ค้นหาจุดน่าสงสัย เช่น ฟันเฟือง นิ้วมือ หรือตัวอักษร ตอบคำถามเชิงลึก และเลือกขั้นตอนการสืบค้นที่มาอย่างถูกวิธี',
      difficulty: 'ปานกลาง (Intermediate)' as const,
      estimatedTime: '4-6 นาที',
      icon: Search
    },
    {
      missionId: 'mission-3' as MissionId,
      missionNumber: 3,
      title: 'ถอดรหัสข้อความหลอกลวง (Scam Decoder)',
      subtitle: 'ตรวจจับฟิชชิง ลิงก์อันตราย และกลโกงวิศวกรรมสังคม',
      description: 'สำรวจสถานการณ์จำลอง SMS ขนส่ง, แชตยืมเงิน, อีเมลขู่ระงับบัญชี และการขอรหัส OTP แตะวิเคราะห์สัญญาณอันตราย จำแนกประเภท และเลือกแนวทางรับมือที่ปลอดภัยที่สุด',
      difficulty: 'ปานกลาง (Intermediate)' as const,
      estimatedTime: '4-6 นาที',
      icon: ShieldAlert
    },
    {
      missionId: 'mission-4' as MissionId,
      missionNumber: 4,
      title: 'ผู้พิทักษ์ความเป็นส่วนตัว (Privacy Guardian)',
      subtitle: 'ปกป้องตัวตน บัญชี รหัสผ่าน และข้อมูลส่วนบุคคลออนไลน์',
      description: 'เผชิญหน้ากับสถานการณ์จำลองความปลอดภัยไซเบอร์ เช่น การตั้ง Passphrase, การเลือก 2FA, สิทธิ์แอปที่ไม่จำเป็น, และความเสี่ยงจาก Wi-Fi สาธารณะ',
      difficulty: 'ท้าทาย (Advanced)' as const,
      estimatedTime: '5-7 นาที',
      icon: Lock
    },
    {
      missionId: 'mission-5' as MissionId,
      missionNumber: 5,
      title: 'บททดสอบยอดนักสืบดิจิทัล (Master Challenge)',
      subtitle: 'ท้าทายความรู้ครบทุกมิติภายใต้การจับเวลาถอยหลัง',
      description: 'ข้อสอบประเมินทักษะรวม 10 ข้อจากทุกหมวดหมู่ภายใต้เวลา 4 นาที เพื่อประเมินตราสัญลักษณ์นักสืบ: Rookie, Junior, Skilled, หรือ Master Detective พร้อมรายงานวิเคราะห์จุดแข็ง',
      difficulty: 'มาสเตอร์ (Master)' as const,
      estimatedTime: '4 นาที',
      icon: Trophy
    }
  ];

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(124,58,237,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
            คลังภารกิจสืบสวนดิจิทัล (Investigation Operations)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
            เลือกภารกิจที่คุณต้องการปฏิบัติการ
          </h1>
          <p className="text-sm text-[#756B86] max-w-xl">
            ฝึกฝนทักษะการรู้เท่าทันสื่อดิจิทัลตั้งแต่ระดับพื้นฐานจนถึงขั้นมาสเตอร์ เพื่อให้คุณไม่ตกเป็นเหยื่อของข่าวปลอม ภาพลวง และมิจฉาชีพออนไลน์
          </p>
        </div>

        {/* Player Snapshot Badge */}
        <div className="p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] border border-[#C4B5FD] flex items-center justify-center text-[#7C3AED] shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#756B86] uppercase tracking-wider block">
              ระดับนักสืบปัจจุบัน
            </span>
            <p className="text-sm font-bold text-[#5B21B6]">{currentRank.rankTh}</p>
            <p className="text-xs text-[#756B86]">ผ่านแล้ว {completedMissionsCount} จาก 5 ภารกิจ</p>
          </div>
        </div>
      </div>

      {/* Grid of 5 Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missionsList.map((m) => (
          <MissionCard
            key={m.missionId}
            missionId={m.missionId}
            missionNumber={m.missionNumber}
            title={m.title}
            subtitle={m.subtitle}
            description={m.description}
            difficulty={m.difficulty}
            estimatedTime={m.estimatedTime}
            icon={m.icon}
            progress={userStats.missionProgress[m.missionId]}
            onStart={onStartMission}
          />
        ))}
      </div>

      {/* Knowledge CTA strip */}
      <div className="rounded-2xl border border-[#C4B5FD] bg-[#EDE9FE]/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[#5B21B6]">ต้องการอ่านเทคนิคและคู่มือนักสืบก่อนเริ่ม?</p>
            <p className="text-[#756B86]">ศึกษา 7 บทเรียนความรู้ AI และความปลอดภัยไซเบอร์ใน Knowledge Center</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNavigateToKnowledge}
          className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-semibold whitespace-nowrap cursor-pointer transition-colors"
        >
          เปิดอ่านคู่มือความรู้
        </button>
      </div>

    </div>
  );
};

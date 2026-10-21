import React from 'react';
import { 
  Play, 
  Eye, 
  Search, 
  CheckCircle2, 
  BookOpen, 
  Trophy, 
  AlertTriangle,
  ZoomIn,
  Sparkles,
  ShieldAlert,
  Lock,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';

interface HowToPlayPageProps {
  onStartMissions: () => void;
}

export const HowToPlayPage: React.FC<HowToPlayPageProps> = ({ onStartMissions }) => {
  const missionGuides = [
    {
      num: '01',
      title: 'ภารกิจที่ 1: AI หรือภาพจริง? (The Image Detective)',
      desc: 'ตรวจดูภาพทีละภาพ เลือกระหว่าง "ภาพสร้างโดย AI", "ภาพถ่ายจริง", หรือ "หลักฐานไม่เพียงพอ" หากภาพเบลอจนมองไม่เห็นรายละเอียด อย่าลืมใช้เครื่องมือแว่นขยายเพื่อส่องดูระดับพิกเซล',
      icon: Sparkles
    },
    {
      num: '02',
      title: 'ภารกิจที่ 2: ปริศนาภาพ AI — เจาะลึกเบาะแส (Image Puzzle)',
      desc: 'รับบทนักสืบวิเคราะห์ภาพจากสถานการณ์ไวรัล แตะจุด Hotspot เพื่อตรวจสอบนิ้วมือ ฟันเฟือง หรือตัวอักษร ตอบคำถามวิเคราะห์ และเลือกขั้นตอนการสืบค้นที่มาอย่างถูกต้อง',
      icon: Search
    },
    {
      num: '03',
      title: 'ภารกิจที่ 3: ถอดรหัสข้อความหลอกลวง (Scam Decoder)',
      desc: 'สำรวจจำลอง SMS, แชต, หรืออีเมล แตะเพื่อวิเคราะห์สัญญาณอันตราย (Red Flags) เช่น การเร่งรัดเวลา หรือการขอ OTP จากนั้นจำแนกประเภทข้อความและเลือกวิธีปฏิบัติที่ปลอดภัยที่สุด',
      icon: ShieldAlert
    },
    {
      num: '04',
      title: 'ภารกิจที่ 4: ผู้พิทักษ์ความเป็นส่วนตัว (Privacy Guardian)',
      desc: 'เผชิญหน้ากับสถานการณ์จำลองความปลอดภัย เช่น การตั้งรหัสผ่านยาว (Passphrase), 2FA, สิทธิ์แอป, และ Wi-Fi สาธารณะ เลือกทางเลือกที่ปลอดภัยที่สุดเพื่อปกป้องตัวตนดิจิทัล',
      icon: Lock
    },
    {
      num: '05',
      title: 'ภารกิจที่ 5: บททดสอบยอดนักสืบดิจิทัล (Master Challenge)',
      desc: 'แบบทดสอบรวม 10 ข้อจากทุกหมวดหมู่ภายใต้การจับเวลาถอยหลัง 4 นาที ทำคะแนนให้ได้ 80% ขึ้นไปเพื่อรับตราสัญลักษณ์ "Master Detective"',
      icon: Trophy
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-xs font-bold text-[#5B21B6]">
          <BookOpen className="w-4 h-4 text-[#7C3AED]" />
          <span>คู่มือปฏิบัติการสืบสวน</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#241B35] tracking-tight">
          วิธีเล่นและคำแนะนำสำหรับนักสืบดิจิทัล
        </h1>
        <p className="text-xs sm:text-base text-[#756B86] max-w-xl mx-auto leading-relaxed">
          เตรียมความพร้อมก่อนลงพื้นที่จริง ทำความเข้าใจกฎ กติกา และวิธีเก็บคะแนนในทั้ง 5 ภารกิจ
        </p>
      </div>

      {/* 5 Missions Step by Step */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missionGuides.map((guide) => {
          const Icon = guide.icon;
          return (
            <div 
              key={guide.num}
              className="p-5 rounded-3xl border border-[#E4DDF3] bg-white shadow-sm space-y-3 hover:border-[#7C3AED]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-[#7C3AED]">
                  STEP {guide.num}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#241B35]">
                {guide.title}
              </h3>
              <p className="text-xs text-[#756B86] leading-relaxed">
                {guide.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Ranks Criteria Table */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#241B35]">เกณฑ์การจัดอันดับตราสัญลักษณ์นักสืบ (Detective Ranks)</h3>
            <p className="text-xs text-[#756B86]">คำนวณจากเปอร์เซ็นต์ความถูกต้องจริงในการทดสอบ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] text-center space-y-1">
            <span className="font-bold text-[#4B5563]">0–39%</span>
            <p className="font-bold text-[#241B35]">Rookie Detective</p>
            <p className="text-[11px] text-[#756B86]">นักสืบฝึกหัด</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] text-center space-y-1">
            <span className="font-bold text-[#D97706]">40–59%</span>
            <p className="font-bold text-[#92400E]">Junior Detective</p>
            <p className="text-[11px] text-[#B45309]">นักสืบสายตาไว</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-center space-y-1">
            <span className="font-bold text-[#2563EB]">60–79%</span>
            <p className="font-bold text-[#1E40AF]">Skilled Detective</p>
            <p className="text-[11px] text-[#3B82F6]">นักสืบชำนาญการ</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EDE9FE] border border-[#C4B5FD] text-center space-y-1">
            <span className="font-bold text-[#7C3AED]">80–100%</span>
            <p className="font-bold text-[#5B21B6]">Master Detective</p>
            <p className="text-[11px] text-[#7C3AED]">ยอดนักสืบระดับมาสเตอร์</p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onStartMissions();
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-bold text-sm shadow-md shadow-[#7C3AED]/25 transition-all cursor-pointer whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>พร้อมแล้ว ไปที่หน้าภารกิจเลย!</span>
        </button>
      </div>

    </div>
  );
};

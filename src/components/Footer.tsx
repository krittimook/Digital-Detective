import React from 'react';
import { ShieldCheck, Info, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E4DDF3] bg-white text-[#756B86] text-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#241B35] font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Digital Detective</span>
            </div>
            <p className="text-[#5B21B6] font-semibold text-sm">
              “Think Smart. Spot the Fake.”
            </p>
            <p className="text-xs text-[#756B86] leading-relaxed">
              เกมการศึกษาแบบโต้ตอบเพื่อส่งเสริมการรู้เท่าทัน AI การรู้ทันกลโกงออนไลน์ และการปกป้องข้อมูลส่วนบุคคลในโลกดิจิทัล
            </p>
          </div>

          {/* Educational Disclaimer */}
          <div className="space-y-2 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] p-4 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#5B21B6] uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>คำชี้แจงเพื่อการศึกษา (Educational Disclaimer)</span>
            </div>
            <p className="text-[#756B86] leading-relaxed">
              เบาะแสทางสายตาเป็นเพียงเครื่องมือเบื้องต้น สื่อในโลกจริงต้องตรวจสอบบริบทและแหล่งที่มาดั้งเดิมเสมอ สถานการณ์และข้อความทั้งหมดในเกมนี้เป็นข้อมูลจำลองเพื่อการศึกษา ไม่มีการเก็บข้อมูลส่วนบุคคลของผู้เล่น
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2 md:items-end text-xs">
            <span className="font-bold text-[#5B21B6] uppercase tracking-wider">
              แผนผังเว็บไซต์
            </span>
            <div className="flex flex-col space-y-2 md:text-right">
              <button 
                type="button"
                onClick={() => onNavigate('home')} 
                className="hover:text-[#7C3AED] transition-colors text-left md:text-right cursor-pointer"
              >
                หน้าแรก (Home)
              </button>
              <button 
                type="button"
                onClick={() => onNavigate('missions')} 
                className="hover:text-[#7C3AED] transition-colors text-left md:text-right cursor-pointer"
              >
                ภารกิจทั้งหมด 5 ด่าน (Missions)
              </button>
              <button 
                type="button"
                onClick={() => onNavigate('knowledge')} 
                className="hover:text-[#7C3AED] transition-colors text-left md:text-right cursor-pointer"
              >
                ศูนย์ความรู้ 7 บทเรียน (Knowledge Center)
              </button>
              <button 
                type="button"
                onClick={() => onNavigate('stats')} 
                className="hover:text-[#7C3AED] transition-colors text-left md:text-right cursor-pointer"
              >
                สถิติและผลงาน (My Progress)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E4DDF3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#756B86]">
          <p>© {new Date().getFullYear()} Digital Detective. เพื่อการศึกษาและการรู้เท่าทันสื่อดิจิทัล</p>
          <p className="flex items-center gap-1">
            <span>ขับเคลื่อนการเรียนรู้ด้วยความตระหนักรู้และความปลอดภัย</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

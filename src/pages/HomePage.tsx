import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  Eye, 
  Lock, 
  Compass, 
  Users, 
  GraduationCap
} from 'lucide-react';
import { sound } from '../utils/audio';
import aiRobotDetectiveImg from '../assets/images/ai_robot_detective_1792603652330.jpg';

interface HomePageProps {
  onEnterWebsite: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onEnterWebsite }) => {
  const [imageError, setImageError] = useState(false);

  const handleEnter = () => {
    sound.playClick();
    onEnterWebsite();
  };

  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto py-6 sm:py-10">
      
      {/* 1. Website Branding & Welcome Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(124,58,237,0.06)]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Branding, Title, Introduction & Enter Button */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            
            {/* Detective-themed Brand Logo & Tagline */}
            <div className="flex flex-col items-center lg:items-start space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED] shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-[#5B21B6] text-xs sm:text-sm font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>Think Smart. Spot the Fake.</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#241B35] tracking-tight leading-tight">
                Digital Detective
              </h1>
            </div>

            {/* Brief Introduction */}
            <p className="text-sm sm:text-base text-[#756B86] leading-relaxed max-w-xl">
              เว็บไซต์การศึกษาออนไลน์เพื่อพัฒนาทักษะการรู้เท่าทันปัญญาประดิษฐ์ (AI Awareness), การคิดเชิงวิพากษ์ (Critical Thinking), การตรวจสอบความน่าเชื่อถือของภาพถ่าย, การตรวจจับกลโกงฟิชชิง, และการเสริมสร้างความปลอดภัยในโลกดิจิทัล
            </p>

            {/* Prominent Purple "Enter Website" Button */}
            <div className="pt-2 pb-1">
              <button
                type="button"
                onClick={handleEnter}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-2xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-extrabold text-base sm:text-lg shadow-[0_6px_25px_rgba(124,58,237,0.35)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.45)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <span>เข้าสู่เว็บไซต์ (Enter Website)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#756B86]">
              คลิกเพื่อเข้าสู่ระบบศูนย์การเรียนรู้ ภารกิจสืบสวน และเครื่องมือการเรียนรู้ทั้งหมด
            </p>
          </div>

          {/* Right Column: AI Detective Mascot Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square rounded-2xl overflow-hidden border border-[#E4DDF3] bg-[#F7F5FF] shadow-[0_8px_25px_rgba(124,58,237,0.08)] group">
              {!imageError ? (
                <img
                  src={aiRobotDetectiveImg}
                  alt="หุ่นยนต์นักสืบ AI ผู้ช่วยอัจฉริยะในการตรวจสอบความจริง (AI Robot Detective Assistant)"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7C3AED] bg-[#EDE9FE]/50">
                  <ShieldCheck className="w-16 h-16 mb-2" />
                  <p className="font-bold text-sm">Digital Detective AI Assistant</p>
                </div>
              )}
              {/* Subtle badge overlay on image */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#E4DDF3] text-[11px] font-semibold text-[#5B21B6] flex items-center justify-between shadow-sm">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  <span>AI Detective Assistant</span>
                </span>
                <span className="text-[#7C3AED] font-mono text-[10px]">SMART & SECURE</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 2. About the Website (เกี่ยวกับ Digital Detective) */}
      <section className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>เกี่ยวกับโครงการ (About Digital Detective)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
            ทำความรู้จักกับ Digital Detective
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#756B86] leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#241B35] text-sm sm:text-base">
              เป้าหมายของเว็บไซต์
            </h3>
            <p>
              สร้างพื้นที่การเรียนรู้ที่สนุก เข้าใจง่าย และเปิดโอกาสให้ผู้เรียนได้ฝึกฝนทักษะการสืบหาความจริง ผ่านสถานการณ์จำลองที่สะท้อนปัญหาจริงในยุคสารสนเทศ
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#241B35] text-sm sm:text-base">
              ทำไมการรู้เท่าทัน AI จึงสำคัญ?
            </h3>
            <p>
              ในยุคที่โมเดลสังเคราะห์ภาพและข้อความมีความสมจริงยิ่งขึ้น ภาพลวงและข่าวปลอมสามารถสร้างความเข้าใจผิด การมีภูมิคุ้มกันทางดิจิทัลจึงเป็นทักษะชีวิตที่จำเป็นสำหรับทุกคน
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#241B35] text-sm sm:text-base">
              การเรียนรู้ผ่านภารกิจเสมือนจริง
            </h3>
            <p>
              ผู้ใช้จะได้ฝึกตรวจจับความผิดปกติของภาพถ่าย ถอดรหัสข้อความฟิชชิง และเลือกแนวทางปกป้องข้อมูลส่วนบุคคล เพื่อนำทักษะไปปรับใช้ในชีวิตจริงได้อย่างปลอดภัย
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Purpose (ที่มาและความสำคัญ) */}
      <section className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#5B21B6] uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-[#7C3AED]" />
            <span>ที่มาและความสำคัญ (Our Purpose)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241B35]">
            พลังแห่งการคิดวิเคราะห์ก่อนกดเชื่อและกดแชร์
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#756B86] leading-relaxed">
          <p>
            เว็บไซต์ <strong>Digital Detective</strong> ได้รับการพัฒนาขึ้นเพื่อเป็นสื่อการเรียนรู้เชิงการศึกษา (Educational Learning Resource) มุ่งเน้นการส่งเสริมเยาวชน นักเรียน นักศึกษา และบุคคลทั่วไป ให้ตระหนักถึงความสำคัญของการคิดวิเคราะห์ (Critical Thinking) และการตรวจสอบแหล่งที่มาของข้อมูล (Information Verification) ก่อนที่จะตัดสินใจเชื่อ ส่งต่อ หรือส่งต่อเนื้อหาในสื่อสังคมออนไลน์
          </p>
          <p>
            ด้วยการผสมผสานแนวคิดเกมจำลองบทบาทนักสืบ (Detective Gamification) เข้ากับหลักการรู้เท่าทันสื่อสากล เว็บไซต์นี้จึงไม่ได้เป็นเพียงแบบทดสอบ แต่เป็นคู่มือเชิงโต้ตอบที่ชี้แนะให้ผู้เรียนเข้าใจทั้งจุดแข็ง ข้อจำกัดของเทคโนโลยี และวิธีการปกป้องสิทธิความเป็นส่วนตัวของตนเอง
          </p>
        </div>

        {/* Editable Creator & Institution Placeholders */}
        <div className="p-5 rounded-2xl bg-[#EDE9FE]/50 border border-[#C4B5FD] space-y-2 text-xs">
          <p className="font-bold text-[#5B21B6] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#7C3AED]" />
            <span>ข้อมูลโครงการและผู้จัดทำ (Project & Institutional Attribution):</span>
          </p>
          <div className="space-y-1 text-[#241B35] pl-6">
            <p>• <strong>สถาบัน / หน่วยงาน:</strong> [ระบุชื่อสถาบันการศึกษา / หน่วยงาน / โครงการวิจัยเพื่อการศึกษา]</p>
            <p>• <strong>ทีมผู้พัฒนา:</strong> [ระบุชื่อผู้จัดทำ / คณะผู้จัดทำ / ที่ปรึกษาโครงการ]</p>
            <p>• <strong>วัตถุประสงค์:</strong> โครงการพัฒนาสื่อการเรียนรู้ด้านการรู้เท่าทันสื่อดิจิทัลและปัญญาประดิษฐ์</p>
          </div>
        </div>

        {/* Secondary Enter Website Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={handleEnter}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-bold text-sm sm:text-base shadow-md shadow-[#7C3AED]/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>เข้าสู่ระบบสืบสวน (Enter Investigation Hub)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Copyright and Credits Footer for Homepage */}
      <footer className="border-t border-[#E4DDF3] pt-6 pb-2 text-xs text-[#756B86] space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-medium text-[#241B35]">
            © 2026 Digital Detective. All rights reserved.
          </p>
          <p className="text-[#5B21B6]">
            “Think Smart. Spot the Fake.”
          </p>
        </div>

        <p className="text-center sm:text-left leading-relaxed">
          <strong>คำชี้แจงเพื่อการศึกษา:</strong> เว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและการเรียนรู้ด้านการรู้เท่าทันปัญญาประดิษฐ์และความปลอดภัยทางไซเบอร์ ข้อมูลและกรณีศึกษาทั้งหมดเป็นข้อมูลจำลองเพื่อการเรียนรู้ ไม่มีการรวบรวมข้อมูลส่วนตัว
        </p>

        <div className="p-3.5 rounded-xl bg-white border border-[#E4DDF3] text-[11px] space-y-1">
          <p className="font-semibold text-[#5B21B6]">เครดิตและแหล่งอ้างอิง (Credits & Attribution):</p>
          <p>• ภาพประกอบและแบบทดสอบ: [ชุดข้อมูลภาพทดสอบ Original Educational Benchmark และภาพจากแหล่งเปิดเพื่อการศึกษา]</p>
          <p>• มาตรฐานการตรวจสอบ: อ้างอิงแนวทาง C2PA (Coalition for Content Provenance and Authenticity) และหลักสูตร Media Literacy สากล</p>
        </div>
      </footer>

    </div>
  );
};

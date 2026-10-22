import React from 'react';
import { 
  User, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Landmark, 
  Hash, 
  Home, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  Lightbulb, 
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';
import creatorPhoto from '../assets/images/creator_profile.png';

interface AboutCreatorPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutCreatorPage: React.FC<AboutCreatorPageProps> = ({ onNavigate }) => {
  const handleNav = (tab: string) => {
    sound.playClick();
    onNavigate(tab);
  };

  return (
    <div className="space-y-8 sm:space-y-12 max-w-5xl mx-auto py-4 sm:py-8">
      
      {/* Top Banner & Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-[#5B21B6] text-xs sm:text-sm font-bold tracking-wide shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>ABOUT THE CREATOR • DIGITAL DETECTIVE</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#241B35] tracking-tight">
          ผู้จัดทำเว็บไซต์
        </h1>
        
        <p className="text-base sm:text-lg font-medium text-[#7C3AED]">
          “ผู้สร้างประสบการณ์การเรียนรู้ผ่านโลกของ AI”
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_10px_40px_rgba(124,58,237,0.08)]">
        
        {/* Subtle decorative purple glow background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#EDE9FE]/60 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#EDE9FE]/50 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Creator Photograph (Preserving 100% original identity & aspect ratio) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              
              {/* Outer Glowing Ring */}
              <div className="relative rounded-3xl p-1.5 bg-gradient-to-tr from-[#7C3AED] via-[#A78BFA] to-[#EDE9FE] shadow-[0_0_35px_rgba(124,58,237,0.22)]">
                
                {/* Photo Container */}
                <div className="relative w-[260px] sm:w-[310px] aspect-[596/708] rounded-[22px] overflow-hidden bg-[#F7F5FF] border border-white">
                  <img
                    src={creatorPhoto}
                    alt="รูปโปรไฟล์ นางสาวกฤติมุข สงวนศรี ผู้จัดทำเว็บไซต์ Digital Detective"
                    className="w-full h-full object-cover object-top transform group-hover:scale-102 transition-transform duration-500"
                  />
                  
                  {/* Subtle Tech Badge on Image */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#E4DDF3] shadow-md flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                      <span className="font-bold text-[#241B35]">Verified Developer</span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-[#7C3AED]">Silpakorn Univ.</span>
                  </div>
                </div>

              </div>

              {/* Decorative Corner Icon */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-white border border-[#DDD6FE] shadow-lg flex items-center justify-center text-[#7C3AED]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <p className="mt-4 text-xs text-[#756B86] text-center font-medium">
              ภาพถ่ายผู้จัดทำโครงการ Digital Detective
            </p>
          </div>

          {/* Right Column: Detailed Creator Credentials & Academic Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Name & Title Header */}
            <div className="space-y-1 text-center lg:text-left border-b border-[#E4DDF3] pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
                Developer & Content Creator
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#241B35] mt-2">
                นางสาวกฤติมุข สงวนศรี
              </h2>
              <p className="text-sm font-semibold text-[#5B21B6]">
                Krittimook Sanguansri
              </p>
            </div>

            {/* Structured Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Student ID */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] hover:border-[#DDD6FE] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center shrink-0">
                  <Hash className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-medium text-[#756B86]">เลขที่ประจำตัวนักศึกษา</span>
                  <p className="text-sm sm:text-base font-bold text-[#241B35] font-mono tracking-wide">
                    670610446
                  </p>
                </div>
              </div>

              {/* Academic Year */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] hover:border-[#DDD6FE] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-medium text-[#756B86]">ระดับการศึกษา</span>
                  <p className="text-sm sm:text-base font-bold text-[#241B35]">
                    นักศึกษาชั้นปีที่ 3
                  </p>
                </div>
              </div>

              {/* Faculty */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] hover:border-[#DDD6FE] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-medium text-[#756B86]">คณะ</span>
                  <p className="text-sm sm:text-base font-bold text-[#241B35]">
                    คณะศึกษาศาสตร์
                  </p>
                </div>
              </div>

              {/* Department / Major */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] hover:border-[#DDD6FE] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-medium text-[#756B86]">สาขาวิชา</span>
                  <p className="text-sm sm:text-base font-bold text-[#241B35]">
                    เทคโนโลยีการศึกษา
                  </p>
                </div>
              </div>

              {/* University (Full Width) */}
              <div className="sm:col-span-2 flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#EDE9FE]/70 to-[#F7F5FF] border border-[#DDD6FE]">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-[#5B21B6] uppercase tracking-wider">
                    สถาบันการศึกษา
                  </span>
                  <p className="text-base sm:text-lg font-extrabold text-[#241B35]">
                    มหาวิทยาลัยศิลปากร
                  </p>
                  <p className="text-xs text-[#756B86]">
                    Silpakorn University
                  </p>
                </div>
              </div>

            </div>

            {/* Creator Vision & Philosophy */}
            <div className="p-4 rounded-2xl bg-[#F7F5FF] border border-[#E4DDF3] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5B21B6]">
                <Lightbulb className="w-4 h-4 text-[#7C3AED]" />
                <span>วิสัยทัศน์และการพัฒนาสื่อการเรียนรู้</span>
              </div>
              <p className="text-xs sm:text-sm text-[#756B86] leading-relaxed">
                โครงการเว็บไซต์ <strong>Digital Detective</strong> มุ่งพัฒนาขึ้นเพื่อเป็นนวัตกรรมสื่อการเรียนรู้ที่บูรณาการศาสตร์แห่ง <em>เทคโนโลยีการศึกษา (Educational Technology)</em> เข้ากับการรู้เท่าทันปัญญาประดิษฐ์และความปลอดภัยไซเบอร์ เพื่อให้ผู้เรียนได้ลงมือฝึกทักษะการตรวจสอบความจริงอย่างมีวิจารณญาณและสนุกสนาน
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Project Key Features Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="p-5 rounded-2xl bg-white border border-[#E4DDF3] shadow-sm space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#241B35] text-sm">
            พัฒนาด้วยเทคโนโลยีเว็บสมัยใหม่
          </h3>
          <p className="text-xs text-[#756B86] leading-relaxed">
            สร้างด้วย React, TypeScript และ Tailwind CSS เพื่อการตอบสนองที่รวดเร็ว ลื่นไหล และรองรับทุกขนาดหน้าจอ
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E4DDF3] shadow-sm space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#241B35] text-sm">
            5 ภารกิจจำลองการสืบสวน
          </h3>
          <p className="text-xs text-[#756B86] leading-relaxed">
            ครอบคลุมการวิเคราะห์ภาพ AI, จับผิดภาพตัดต่อ, ตรวจสอบข้อความหลอกลวง และปกป้องข้อมูลส่วนบุคคล
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E4DDF3] shadow-sm space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#241B35] text-sm">
            มาตรฐานการรู้เท่าทันสื่อสากล
          </h3>
          <p className="text-xs text-[#756B86] leading-relaxed">
            สอดแทรกศูนย์ความรู้ 7 บทเรียน เพื่อเสริมสร้างภูมิคุ้มกันทางดิจิทัลที่ใช้งานได้จริงในชีวิตประจำวัน
          </p>
        </div>

      </div>

      {/* Navigation Buttons: Return to Home / Go to Missions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white hover:bg-[#EDE9FE]/50 text-[#5B21B6] border-2 border-[#DDD6FE] font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <Home className="w-4 h-4 text-[#7C3AED]" />
          <span>กลับหน้าแรก (Back to Home)</span>
        </button>

        <button
          type="button"
          onClick={() => handleNav('missions')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-extrabold text-sm sm:text-base shadow-md shadow-[#7C3AED]/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>ไปที่ภารกิจสืบสวน (Missions Hub)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

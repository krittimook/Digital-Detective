import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Home, 
  ArrowRight,
  LayoutDashboard,
  Layers,
  BookOpen,
  BarChart3,
  User
} from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onEnterWebsite: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab, 
  onNavigate, 
  onEnterWebsite 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const isWelcomeHome = currentTab === 'home';

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) {
      sound.playClick();
    }
  };

  // Main application navigation items
  const appNavItems = [
    { id: 'dashboard', label: 'หน้าหลักระบบ (Dashboard)', icon: LayoutDashboard },
    { id: 'missions', label: 'ภารกิจ (Missions)', icon: Layers },
    { id: 'knowledge', label: 'ศูนย์ความรู้ (Knowledge Center)', icon: BookOpen },
    { id: 'stats', label: 'สถิติ (Statistics)', icon: BarChart3 },
    { id: 'creator', label: 'ผู้จัดทำเว็บไซต์ (About Creator)', icon: User }
  ];

  const handleNavClick = (id: string) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4DDF3] shadow-[0_1px_8px_rgba(124,58,237,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick(isWelcomeHome ? 'home' : 'dashboard')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:ring-2 focus-visible:ring-[#7C3AED] rounded-lg p-1 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white transition-colors shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-[#241B35] whitespace-nowrap group-hover:text-[#5B21B6] transition-colors">
                Digital Detective
              </span>
            </div>
          </button>

          {!isWelcomeHome && (
            <span className="hidden lg:inline-flex text-[11px] font-semibold text-[#5B21B6] bg-[#EDE9FE] px-2.5 py-0.5 rounded-full border border-[#DDD6FE]">
              ระบบสืบสวน
            </span>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        {isWelcomeHome ? (
          // Welcome Homepage Navigation: Clean & minimal, with Creator link
          <div className="hidden md:flex items-center gap-4 text-xs font-medium text-[#756B86]">
            <span>แหล่งเรียนรู้การรู้เท่าทัน AI และความปลอดภัยไซเบอร์</span>
            <button
              onClick={() => handleNavClick('creator')}
              className="inline-flex items-center gap-1.5 py-1 px-3 rounded-lg text-[#5B21B6] bg-[#F7F5FF] hover:bg-[#EDE9FE] transition-colors cursor-pointer border border-[#DDD6FE] font-semibold"
            >
              <User className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>ผู้จัดทำเว็บไซต์</span>
            </button>
          </div>
        ) : (
          // Main Application Navigation: 4 App Sections + Return to Welcome Homepage
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs sm:text-sm font-medium text-[#756B86]">
            {/* Return to Welcome Homepage Link */}
            <button
              onClick={() => handleNavClick('home')}
              className="inline-flex items-center gap-1.5 py-1 text-[#756B86] hover:text-[#7C3AED] transition-colors cursor-pointer border-r border-[#E4DDF3] pr-4 mr-1"
              title="กลับสู่หน้าแรกของเว็บไซต์"
            >
              <Home className="w-4 h-4 text-[#7C3AED]" />
              <span>กลับหน้าแรก (Home)</span>
            </button>

            {/* 4 Core Application Sections */}
            {appNavItems.map((item) => {
              const isActive = currentTab === item.id || (item.id === 'missions' && currentTab.startsWith('mission-'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                    isActive
                      ? 'text-[#5B21B6] font-bold'
                      : 'text-[#756B86] hover:text-[#7C3AED]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sound Synthesizer Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2 rounded-xl text-[#756B86] hover:text-[#5B21B6] hover:bg-[#EDE9FE]/50 border border-[#E4DDF3] transition-colors cursor-pointer"
            title={isMuted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์'}
            aria-label={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#DC2626]" /> : <Volume2 className="w-4 h-4 text-[#7C3AED]" />}
          </button>

          {/* If on Homepage: Show Enter Website button */}
          {isWelcomeHome && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onEnterWebsite();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#5B21B6] rounded-xl transition-all shadow-md shadow-[#7C3AED]/20 whitespace-nowrap cursor-pointer"
            >
              <span>เข้าสู่เว็บไซต์</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#756B86] hover:text-[#5B21B6] hover:bg-[#EDE9FE]/50 rounded-xl border border-[#E4DDF3] cursor-pointer"
            aria-label="เมนูหลัก"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E4DDF3] bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {isWelcomeHome ? (
            <div className="space-y-3 py-2">
              <p className="text-xs text-[#756B86]">
                ยินดีต้อนรับสู่ Digital Detective
              </p>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                  onEnterWebsite();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#7C3AED] rounded-xl shadow-md cursor-pointer"
              >
                <span>เข้าสู่เว็บไซต์ (Enter Website)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('creator')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#5B21B6] bg-[#EDE9FE] rounded-xl border border-[#DDD6FE] cursor-pointer hover:bg-[#DDD6FE] transition-colors"
              >
                <User className="w-4 h-4 text-[#7C3AED]" />
                <span>ผู้จัดทำเว็บไซต์ (About the Creator)</span>
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#5B21B6] bg-[#EDE9FE] flex items-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#7C3AED]" />
                <span>กลับหน้าแรก (Home)</span>
              </button>

              <div className="pt-1 border-t border-[#E4DDF3] space-y-1">
                {appNavItems.map((item) => {
                  const isActive = currentTab === item.id || (item.id === 'missions' && currentTab.startsWith('mission-'));
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-[#EDE9FE] text-[#5B21B6] font-bold'
                          : 'text-[#756B86] hover:bg-[#F7F5FF] hover:text-[#241B35]'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#7C3AED]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { 
  BookOpen, 
  Eye, 
  AlertTriangle, 
  Search, 
  ShieldAlert, 
  KeyRound, 
  Lock, 
  Share2, 
  Lightbulb, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { KNOWLEDGE_ARTICLES, KnowledgeArticle } from '../data/knowledge';
import { sound } from '../utils/audio';

export const KnowledgePage: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(KNOWLEDGE_ARTICLES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = KNOWLEDGE_ARTICLES.filter(a => 
    a.titleTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.summaryTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.categoryTh.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentArticle = KNOWLEDGE_ARTICLES.find(a => a.id === selectedArticleId) || filteredArticles[0] || KNOWLEDGE_ARTICLES[0];

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye': return <Eye className="w-5 h-5 text-[#7C3AED]" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-[#D97706]" />;
      case 'Search': return <Search className="w-5 h-5 text-[#7C3AED]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#DC2626]" />;
      case 'KeyRound': return <KeyRound className="w-5 h-5 text-[#7C3AED]" />;
      case 'Lock': return <Lock className="w-5 h-5 text-[#7C3AED]" />;
      default: return <Share2 className="w-5 h-5 text-[#7C3AED]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 space-y-8">
      
      {/* Header */}
      <div className="rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-10 shadow-[0_4px_25px_rgba(124,58,237,0.06)] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-xs font-bold text-[#5B21B6]">
          <BookOpen className="w-4 h-4 text-[#7C3AED]" />
          <span>คู่มือนักสืบดิจิทัล (Knowledge Center)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#241B35] tracking-tight">
          ศูนย์ความรู้: เทคนิคจับสังเกต AI และความปลอดภัยไซเบอร์
        </h1>
        <p className="text-xs sm:text-base text-[#756B86] max-w-2xl mx-auto leading-relaxed">
          สรุปบทเรียนสำคัญ 7 หัวข้อที่เข้าใจง่าย เหมาะสำหรับนักเรียน นักศึกษา และบุคคลทั่วไป เพื่อเสริมสร้างภูมิคุ้มกันในการใช้ชีวิตบนโลกออนไลน์
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto pt-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#756B86] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาหัวข้อความรู้ (เช่น AI, รหัสผ่าน, OTP, ฟิชชิง)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4DDF3] bg-[#F7F5FF] text-xs sm:text-sm text-[#241B35] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar List (4 cols) + Reader Deck (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 7 Sections Navigator */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-[#5B21B6] uppercase tracking-wider block px-1">
            สารบัญบทเรียน (7 Sections)
          </span>

          <div className="space-y-2">
            {filteredArticles.map((article) => {
              const isSelected = article.id === currentArticle.id;
              return (
                <button
                  key={article.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedArticleId(article.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#7C3AED] bg-[#EDE9FE] shadow-sm ring-1 ring-[#7C3AED]'
                      : 'border-[#E4DDF3] bg-white hover:border-[#7C3AED]/40 hover:bg-[#F7F5FF]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-[#756B86] mb-1">
                    <span className="font-semibold text-[#7C3AED]">{article.categoryTh}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className={`text-xs sm:text-sm font-bold leading-snug ${
                    isSelected ? 'text-[#5B21B6]' : 'text-[#241B35]'
                  }`}>
                    {article.titleTh}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Article Reader Deck */}
        <div className="lg:col-span-8 rounded-3xl border border-[#E4DDF3] bg-white p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Article Header */}
          <div className="space-y-2 pb-4 border-b border-[#E4DDF3]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center shrink-0">
                {getSectionIcon(currentArticle.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                  บทที่ {currentArticle.sectionNumber} · {currentArticle.categoryTh}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#241B35] leading-snug">
                  {currentArticle.titleTh}
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#756B86] pt-1 leading-relaxed">
              {currentArticle.summaryTh}
            </p>
          </div>

          {/* Article Content Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-[#241B35] leading-relaxed">
            {currentArticle.contentParagraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Practical Tips Card */}
          <div className="rounded-2xl border border-[#C4B5FD] bg-[#F5F3FF] p-5 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-[#5B21B6] flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#D97706]" />
              <span>เทคนิคและข้อปฏิบัติสำคัญ (Actionable Tips):</span>
            </h4>

            <ul className="space-y-2 text-xs text-[#241B35]">
              {currentArticle.keyTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Takeaways */}
          <div className="p-4 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-xs space-y-1.5">
            <p className="font-bold text-[#5B21B6] uppercase tracking-wider text-[11px]">
              สรุปใจความสำคัญ (Key Takeaways):
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#756B86]">
              {currentArticle.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="leading-relaxed font-medium text-[#241B35]">
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};

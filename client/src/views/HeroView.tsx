import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Flame,
  Camera,
  ExternalLink,
  ChevronRight,
  CheckSquare,
  Square,
  Award,
} from 'lucide-react';
import type { AppLanguage, UserProfileState } from '../types/settings.js';
import { HCMCVisualMap } from '../components/common/HCMCVisualMap.js';

interface HeroViewProps {
  userProfile: UserProfileState;
  language: AppLanguage;
  selectedContext?: string;
  onSelectContext?: (ctx: any) => void;
  mockScenario?: 'low_score' | 'high_score' | 'cyberpunk';
  onSelectMockScenario?: (scenario: 'low_score' | 'high_score' | 'cyberpunk') => void;
  onStartScanner: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  userProfile,
  language,
  onStartScanner,
}) => {
  const isEn = language === 'en';

  // Dynamic Comic Speech Bubble rotation every 4 seconds
  const speechLines = isEn
    ? [
        "Hello! I'm Lumi, your personal AI stylist ✨",
        "Ready to slay the town today? Let's check your drip! 💅",
        "Spotted 15 aesthetic spots in Saigon open right now! ☕",
      ]
    : [
        "Hế nhô! Lumi đây nè, stylist AI của bạn ✨",
        "Sẵn sàng lên đồ cháy phố chưa? Bật máy quét thôi! 💅",
        "Vừa cập nhật 15 quán cafe siêu xinh mở cửa tại Sài Gòn! ☕",
      ];

  const [currentSpeechIndex, setCurrentSpeechIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpeechIndex((prev) => (prev + 1) % speechLines.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [speechLines.length]);

  // Interactive Checklist for Local Brand Recommendations
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'item-1': true,
    'item-3': true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const recommendedBrandItems = [
    {
      id: 'item-1',
      brand: 'LIDER Closet',
      name: 'Cyber Structured Boxy Blazer',
      price: '890,000 ₫',
      category: 'Outerwear',
      tag: 'Cyber-Pop',
      link: 'https://lider.vn',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-2',
      brand: 'She By Shj',
      name: 'Acid Hologram Silver Tube Top',
      price: '380,000 ₫',
      category: 'Top',
      tag: 'Y2K',
      link: 'https://shebyshj.com',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-3',
      brand: 'Hades Studio',
      name: 'Neon Matrix Oval Sunglasses',
      price: '320,000 ₫',
      category: 'Accessory',
      tag: 'Cyber-Pop',
      link: 'https://hades.vn',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-4',
      brand: 'Dirty Coins',
      name: 'Industrial Chrome Chain Necklace',
      price: '250,000 ₫',
      category: 'Jewelry',
      tag: 'Streetwear',
      link: 'https://dirtycoins.vn',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const streakDays = [
    { day: 'Mon', active: true, label: 'T2' },
    { day: 'Tue', active: true, label: 'T3' },
    { day: 'Wed', active: true, label: 'T4' },
    { day: 'Thu', active: true, label: 'T5' },
    { day: 'Fri', active: true, label: 'T6' },
    { day: 'Sat', active: true, label: 'T7' },
    { day: 'Sun', active: true, today: true, label: 'CN' },
  ];

  const genderTitle = userProfile.genderTitle || 'King';

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO SECTION: UNBOXED, "MY KING ALEX" ON SECOND LINE & ZERO-SHIFT BUBBLE */}
      {/* ========================================================================= */}
      <div className="relative pt-2 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left: Big Primary Heading & Action CTA */}
          <div className="lg:col-span-7 space-y-3">
            {/* PRIMARY HEADING: "Welcome Back," on Top, "my King Alex" on Line 2 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.1]">
              <div className="text-gray-950">
                {isEn ? 'Welcome Back,' : 'Chào mừng trở lại,'}
              </div>
              <div className="flex flex-wrap items-baseline gap-2 mt-1">
                <span className="text-gray-900 font-extrabold text-3xl sm:text-4xl lg:text-5xl">
                  {isEn ? `my ${genderTitle}` : genderTitle}
                </span>
                <span className="bg-gradient-to-r from-[#FF2E93] via-[#7C3AED] to-[#D4FF00] bg-clip-text text-transparent font-black">
                  {userProfile.name}
                </span>
                <span>✨</span>
              </div>
            </h1>

            {/* SECONDARY STATEMENT UNDERNEATH */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gray-700 tracking-tight pt-1">
              Ready to slay your{' '}
              <span className="highlight-circle font-black text-black">vibe</span>{' '}
              today?
            </h2>

            {/* Big Action CTA Button */}
            <div className="pt-4">
              <button
                onClick={onStartScanner}
                className="py-4.5 px-8 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-base lg:text-lg shadow-2xl active:scale-98 transition-all flex items-center justify-between sm:justify-center gap-4 cursor-pointer group w-full sm:w-auto"
              >
                <Camera className="w-5 h-5 text-[#D4FF00]" />
                <span>{isEn ? 'Launch Camera Scanner (Drip Check)' : 'Bật Thấu Kính (Drip Check ⚡)'}</span>
                <ChevronRight className="w-5 h-5 text-[#D4FF00] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Unboxed Seamless Mascot + ZERO LAYOUT SHIFT Comic Bubble */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative min-h-[250px]">
            
            {/* FIXED HEIGHT CONTAINER to prevent page jumping/layout shift */}
            <div className="h-16 flex items-center justify-center relative w-full mb-1">
              <div
                key={currentSpeechIndex}
                className="comic-bubble px-4 py-2 max-w-xs text-xs font-black text-gray-950 text-center leading-snug z-20"
              >
                {speechLines[currentSpeechIndex]}
              </div>
            </div>

            {/* 100% Seamless Mascot Blending into Background (Pure white isolated image) */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 animate-lumi-sway flex items-center justify-center">
              {/* Soft Radial Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4FF00]/40 to-[#FF2E93]/35 rounded-full blur-2xl pointer-events-none" />
              <img
                src="/lumi.jpg"
                alt="Lumi AI Stylist"
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP KPI CARDS: DAILY FIT STREAK & AVERAGE FIT SCORE INSIGHTS           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD 1: DAILY FIT STREAK */}
        <div className="calm-card-elevated p-6 rounded-3xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-gray-400">
              {isEn ? 'Daily Fit Streak' : 'Chuỗi Fit Check Liên Tục'}
            </span>
            <div className="p-2 rounded-2xl bg-amber-50 text-amber-500">
              <Flame className="w-5 h-5 fill-amber-500 animate-bounce [animation-duration:2s]" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl lg:text-5xl font-black text-gray-950 tracking-tight">7</span>
              <span className="text-lg font-black text-amber-600">{isEn ? 'Days Streak 🔥' : 'Ngày Cháy 🔥'}</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              {isEn ? 'Top 3% most consistent stylers in Saigon!' : 'Top 3% người dùng chăm lên đồ nhất Sài Gòn!'}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            {streakDays.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-gray-400">{d.label}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-transform ${
                    d.today
                      ? 'bg-gray-950 text-[#D4FF00] ring-3 ring-[#D4FF00] scale-110 shadow-sm'
                      : d.active
                      ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {d.active ? '🔥' : '·'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: AVERAGE FIT SCORE */}
        <div className="calm-card-elevated p-6 rounded-3xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-gray-400">
              {isEn ? 'Average Aura Index' : 'Điểm Fit Trung Bình'}
            </span>
            <div className="p-2 rounded-2xl bg-purple-50 text-purple-600">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl lg:text-5xl font-black text-gray-950 tracking-tight">92.4</span>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                +6.8% vs last week
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-gray-950 text-[#D4FF00] text-xs font-black rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
              <span>{isEn ? 'Elite Drip Tier (90-100)' : 'Hạng Khí Chất Xuất Sắc'}</span>
            </div>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#D4FF00] via-[#00F5FF] to-[#7C3AED] w-[92.4%]" />
          </div>
        </div>

        {/* CARD 3: VERIFIED SPOTS & BRAND SYNERGY */}
        <div className="calm-card-elevated p-6 rounded-3xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-gray-400">
              {isEn ? 'Experience & Wardrobe' : 'Trải Nghiệm & Tủ Đồ'}
            </span>
            <div className="p-2 rounded-2xl bg-blue-50 text-blue-600">
              <span className="text-base">📍</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] font-bold text-gray-400 block uppercase">
                {isEn ? 'Spots Visited' : 'Quán Đã Ghé'}
              </span>
              <span className="text-3xl font-black text-gray-950">15</span>
              <span className="text-[10px] font-semibold text-blue-600 block">
                {isEn ? 'Confirmed Check-ins' : 'Đã check-in thực tế'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-gray-400 block uppercase">
                {isEn ? 'Brand Matches' : 'Món Đồ Khớp'}
              </span>
              <span className="text-3xl font-black text-gray-950">20</span>
              <span className="text-[10px] font-semibold text-purple-600 block">
                {isEn ? 'VN Local Brands' : 'Thương hiệu Việt'}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isEn ? 'Weather & Opening Hours Grounded' : 'Khớp 100% thời tiết & giờ mở cửa'}</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE SECTION: MULTI-LINE CHART (WITH Y-AXIS) & HCMC VISUAL MAP       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT: OOTD ACTIVITY CHART WITH ACCURATE Y-AXIS (cols 1-7 on lg) */}
        <div className="lg:col-span-7 calm-card-elevated p-6 lg:p-7 rounded-3xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                {isEn ? 'OOTD Activity Trend (7 Days)' : 'Tần Suất Lên Đồ Qua Các Ngày'}
              </span>
              <h3 className="text-lg lg:text-xl font-black text-gray-950">
                {isEn ? 'Outfit Checks by Style Category' : 'Phân Bổ Phong Cách Hàng Ngày'}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-700">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isEn ? '18 Outfits Checked' : '18 Bộ Đồ Đã Chấm'}</span>
            </div>
          </div>

          {/* SVG Multi-Line Chart with Clear Y-Axis Values */}
          <div className="relative w-full h-64 bg-gray-50/80 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between">
            
            {/* Chart Area with Left Y-Axis */}
            <div className="relative flex-1 flex">
              <div className="flex flex-col justify-between text-[10px] font-extrabold text-gray-400 pr-2 select-none">
                <span>10</span>
                <span>8</span>
                <span>6</span>
                <span>4</span>
                <span>2</span>
                <span>0</span>
              </div>

              <div className="relative flex-1 h-full">
                <div className="absolute inset-x-0 top-[0%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 top-[20%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 top-[40%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 top-[60%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 top-[80%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 bottom-0 border-b border-gray-300" />

                <svg className="w-full h-full overflow-visible" viewBox="0 0 450 140" preserveAspectRatio="none">
                  {/* Line 1: Cyber-Pop (Green-Lime) */}
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,110 85,85 150,30 220,60 290,20 360,50 430,15"
                  />
                  <circle cx="20" cy="110" r="4" fill="#10B981" />
                  <circle cx="85" cy="85" r="4" fill="#10B981" />
                  <circle cx="150" cy="30" r="5" fill="#047857" stroke="#fff" strokeWidth="2" />
                  <circle cx="220" cy="60" r="4" fill="#10B981" />
                  <circle cx="290" cy="20" r="4" fill="#10B981" />
                  <circle cx="360" cy="50" r="4" fill="#10B981" />
                  <circle cx="430" cy="15" r="6" fill="#10B981" stroke="#fff" strokeWidth="2" />

                  {/* Line 2: Y2K / Streetwear (Pink) */}
                  <polyline
                    fill="none"
                    stroke="#FF2E93"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,125 85,105 150,65 220,90 290,50 360,40 430,60"
                  />
                  <circle cx="150" cy="65" r="4" fill="#FF2E93" />
                  <circle cx="360" cy="40" r="4" fill="#FF2E93" />
                  <circle cx="430" cy="60" r="5" fill="#FF2E93" stroke="#fff" strokeWidth="2" />

                  {/* Line 3: Minimalist (Purple) */}
                  <polyline
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2.5"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,135 85,120 150,110 220,95 290,85 360,75 430,70"
                  />
                </svg>
              </div>
            </div>

            {/* X-Axis Days Label */}
            <div className="flex justify-between text-[11px] font-bold text-gray-500 pl-6 pt-2">
              <span>Mon (T2)</span>
              <span>Tue (T3)</span>
              <span>Wed (T4)</span>
              <span>Thu (T5)</span>
              <span>Fri (T6)</span>
              <span>Sat (T7)</span>
              <span className="text-gray-950 font-black">Sun (CN)</span>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs font-extrabold text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs" />
              <span>Cyber-Pop (8 Outfits)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF2E93] shadow-xs" />
              <span>Y2K / Streetwear (6 Outfits)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#7C3AED] shadow-xs" />
              <span>Minimalist (4 Outfits)</span>
            </div>
          </div>
        </div>

        {/* RIGHT: HCMC INTERACTIVE VISUAL MAP RADAR (cols 8-12 on lg) */}
        <div className="lg:col-span-5 calm-card-elevated p-6 lg:p-7 rounded-3xl">
          <HCMCVisualMap />
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM SECTION: TOP RECOMMENDED LOCAL BRANDS CHECKLIST                 */}
      {/* ========================================================================= */}
      <div className="calm-card-elevated p-6 lg:p-8 rounded-3xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
              {isEn ? 'Stylist Upgrade Wishlist' : 'Danh Mục Đồ Local Brand Đề Xuất Cho Bạn'}
            </span>
            <h3 className="text-xl lg:text-2xl font-black text-gray-950">
              {isEn ? 'Top Recommended Fashion & Accessories Checklist' : 'Top Trang Phục & Phụ Kiện Local Brand Khuyên Dùng'}
            </h3>
          </div>

          <span className="text-xs font-bold text-gray-500">
            {Object.values(checkedItems).filter(Boolean).length} / {recommendedBrandItems.length} {isEn ? 'Items Owned / Tried' : 'Món đã có / đã thử'}
          </span>
        </div>

        {/* 4-Column Grid of Interactive Brand Cards with Checkbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedBrandItems.map((item) => {
            const isChecked = !!checkedItems[item.id];

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-3xl border-2 transition-all flex flex-col justify-between group ${
                  isChecked
                    ? 'border-gray-950 bg-gray-50/80 shadow-md'
                    : 'border-gray-100 bg-white hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 text-[#D4FF00] text-[9px] font-black rounded-full">
                      {item.tag}
                    </span>

                    <button
                      onClick={() => toggleCheck(item.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md transition-transform active:scale-90 cursor-pointer ${
                        isChecked
                          ? 'bg-gray-950 text-[#D4FF00]'
                          : 'bg-white/90 text-gray-400 hover:text-gray-900'
                      }`}
                      title={isChecked ? 'Marked as Owned' : 'Click to Mark as Owned'}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 fill-current" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <span className="text-[10px] font-extrabold text-purple-600 uppercase block truncate">
                    {item.brand}
                  </span>
                  <h4 className="text-xs font-extrabold text-gray-950 line-clamp-2 leading-snug">
                    {item.name}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                  <span className="text-xs font-black text-[#FF2E93]">
                    {item.price}
                  </span>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-bold text-gray-900 hover:text-purple-600"
                  >
                    <span>{isEn ? 'Shop' : 'Mua'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

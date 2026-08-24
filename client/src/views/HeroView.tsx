import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Flame,
  CheckCircle2,
  MapPin,
  Camera,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  Award,
  CheckSquare,
  Square,
} from 'lucide-react';
import type { AppLanguage, UserProfileState } from '../types/settings.js';

interface HeroViewProps {
  userProfile: UserProfileState;
  language: AppLanguage;
  selectedContext: string;
  onSelectContext: (ctx: any) => void;
  mockScenario: 'low_score' | 'high_score' | 'cyberpunk';
  onSelectMockScenario: (scenario: 'low_score' | 'high_score' | 'cyberpunk') => void;
  onStartScanner: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  userProfile,
  language,
  onStartScanner,
}) => {
  const isEn = language === 'en';

  // Interactive Checklist for Local Brand Recommendations
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'item-1': true,
    'item-3': true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Recommended Local Brand Items with Prices and Status
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

  // Confirmed Visited vs Recommended Spots by District
  const districtVenues = [
    {
      id: 'v-1',
      name: 'Danshari Coffee',
      district: 'Quận 1',
      type: 'Minimalist Wabi-Sabi Cafe',
      status: 'visited',
      vibe: 'Clean-Fit',
      date: 'Yesterday, 15:30',
    },
    {
      id: 'v-2',
      name: 'Blank Lounge Landmark 81',
      district: 'Bình Thạnh',
      type: 'Sky Lounge (350m View)',
      status: 'visited',
      vibe: 'Old Money',
      date: 'Aug 21, 20:00',
    },
    {
      id: 'v-3',
      name: 'Neo Saigon Cyber Bar',
      district: 'Quận 1 (Pasteur)',
      type: 'Neon Speakeasy Bar',
      status: 'recommended',
      vibe: 'Cyber-Pop',
      match: '98% Match',
    },
    {
      id: 'v-4',
      name: 'Rang Rang Coffee',
      district: 'Thủ Đức (Thảo Điền)',
      type: 'Futuristic Inox Cafe',
      status: 'recommended',
      vibe: 'Minimalist',
      match: '94% Match',
    },
  ];

  // Streak Days Data
  const streakDays = [
    { day: 'Mon', active: true, label: 'T2' },
    { day: 'Tue', active: true, label: 'T3' },
    { day: 'Wed', active: true, label: 'T4' },
    { day: 'Thu', active: true, label: 'T5' },
    { day: 'Fri', active: true, label: 'T6' },
    { day: 'Sat', active: true, label: 'T7' },
    { day: 'Sun', active: true, today: true, label: 'CN' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER: USER GREETING, 3D LUMI MASCOT & BIG ACTION CTA        */}
      {/* ========================================================================= */}
      <div className="calm-card-elevated p-6 lg:p-8 rounded-3xl relative overflow-hidden">
        {/* Radiant Ambient Gradient Backdrops */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4FF00]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#FF2E93]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left: Greeting & Mission */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-950 text-white text-xs font-extrabold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>{isEn ? `Hi, ${userProfile.name} 👋` : `Chào, ${userProfile.name} 👋`}</span>
              <span className="text-[10px] text-gray-400">· @{userProfile.handle}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-[1.15]">
              {isEn ? 'Ready to slay your ' : 'Sẵn sàng bắt trọn '}
              <span className="highlight-circle font-black text-black">
                {isEn ? 'vibe' : 'khí chất'}
              </span>{' '}
              {isEn ? 'today?' : 'hôm nay?'}
            </h1>

            <p className="text-sm lg:text-base text-gray-600 font-medium leading-relaxed max-w-xl">
              {isEn
                ? 'Your personal AI Stylist & verified HCMC Experience Graph. Instant outfit evaluation, curated local brand upgrades, and rain-proof cafe itineraries.'
                : 'Trợ lý Stylist Đa phương thức & Bản đồ trải nghiệm thực tế. Chấm điểm outfit tức thì, gợi ý Local Brand và lịch trình ăn chơi chống AI Slop 100%.'}
            </p>

            {/* Big Action CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onStartScanner}
                className="py-4 px-8 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-base shadow-xl active:scale-98 transition-all flex items-center justify-between sm:justify-center gap-3 cursor-pointer group"
              >
                <Camera className="w-5 h-5 text-[#D4FF00]" />
                <span>{isEn ? 'Launch Camera Scanner (Drip Check)' : 'Bật Thấu Kính (Drip Check ⚡)'}</span>
                <ChevronRight className="w-5 h-5 text-[#D4FF00] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/80 border border-gray-200 text-xs font-bold text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isEn ? '100% Zero AI Slop' : 'Đồ Thị Thực Tế 100%'}</span>
              </div>
            </div>
          </div>

          {/* Right: Floating 3D Lumi Mascot Showcase */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 animate-lumi-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4FF00]/50 to-[#FF2E93]/50 rounded-full blur-2xl pointer-events-none" />
              <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] shadow-2xl overflow-hidden">
                <img
                  src="/lumi.jpg"
                  alt="Lumi 3D Mascot"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="mt-2 text-xs font-black text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
              Lumi AI Companion
            </span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP KPI CARDS: DAILY FIT STREAK & AVERAGE FIT SCORE INSIGHTS           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD 1: DAILY FIT STREAK (Locket / TikTok style) */}
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

          {/* 7 Days Visual Circles */}
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

        {/* CARD 2: AVERAGE FIT SCORE & COLOR INSIGHT */}
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

            {/* Score Tier Badge */}
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-gray-950 text-[#D4FF00] text-xs font-black rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
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
              <MapPin className="w-5 h-5 text-blue-600" />
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
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isEn ? 'Deterministic Graph Grounded' : 'Khớp 100% thời tiết & giờ mở cửa'}</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE SECTION: MULTI-LINE OOTD CHART & DISTRICT SPOTS RADAR           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT: OOTD FIT CHECK HISTORY MULTI-LINE CHART (cols 1-7 on lg) */}
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

          {/* SVG Multi-Line Chart */}
          <div className="relative w-full h-56 bg-gray-50/70 rounded-2xl p-4 border border-gray-100 overflow-hidden flex flex-col justify-between">
            {/* Grid Background Lines */}
            <div className="absolute inset-x-4 top-10 border-b border-dashed border-gray-200" />
            <div className="absolute inset-x-4 top-24 border-b border-dashed border-gray-200" />
            <div className="absolute inset-x-4 top-38 border-b border-dashed border-gray-200" />

            <svg className="w-full h-40 overflow-visible" viewBox="0 0 500 150">
              {/* Line 1: Cyber-Pop (#D4FF00 / Green-Lime) */}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="20,110 90,80 160,30 230,60 300,20 370,50 450,15"
              />
              {/* Points for Line 1 */}
              <circle cx="20" cy="110" r="4" fill="#10B981" />
              <circle cx="90" cy="80" r="4" fill="#10B981" />
              <circle cx="160" cy="30" r="5" fill="#047857" stroke="#fff" strokeWidth="2" />
              <circle cx="230" cy="60" r="4" fill="#10B981" />
              <circle cx="300" cy="20" r="4" fill="#10B981" />
              <circle cx="370" cy="50" r="4" fill="#10B981" />
              <circle cx="450" cy="15" r="6" fill="#10B981" stroke="#fff" strokeWidth="2" />

              {/* Line 2: Y2K / Streetwear (#FF2E93 / Pink) */}
              <polyline
                fill="none"
                stroke="#FF2E93"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="20,130 90,110 160,70 230,90 300,50 370,40 450,60"
              />
              <circle cx="160" cy="70" r="4" fill="#FF2E93" />
              <circle cx="370" cy="40" r="4" fill="#FF2E93" />
              <circle cx="450" cy="60" r="5" fill="#FF2E93" stroke="#fff" strokeWidth="2" />

              {/* Line 3: Minimalist / Clean-Fit (#7C3AED / Purple) */}
              <polyline
                fill="none"
                stroke="#7C3AED"
                strokeWidth="2.5"
                strokeDasharray="5,5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="20,140 90,130 160,110 230,100 300,90 370,80 450,75"
              />
            </svg>

            {/* Days Label Axis */}
            <div className="flex justify-between text-[11px] font-bold text-gray-400 px-2 pt-2 border-t border-gray-200">
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
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-extrabold text-gray-700">
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

        {/* RIGHT: DISTRICT RADAR & VISITED VENUES LIST (cols 8-12 on lg) */}
        <div className="lg:col-span-5 calm-card-elevated p-6 lg:p-7 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                {isEn ? 'HCMC District Radar' : 'Bản Đồ Điểm Đến Đã Khớp'}
              </span>
              <h3 className="text-lg lg:text-xl font-black text-gray-950">
                {isEn ? 'Confirmed & Recommended' : 'Địa Điểm Đã Ghé & Đề Xuất'}
              </h3>
            </div>
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>

          {/* Venue List */}
          <div className="space-y-3">
            {districtVenues.map((v) => (
              <div
                key={v.id}
                className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-between gap-3 hover:border-gray-300 transition-all"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-xs text-gray-950 truncate">
                      {v.name}
                    </h4>
                    <span className="text-[9px] font-black px-2 py-0.2 bg-gray-100 text-gray-700 rounded-full">
                      {v.district}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                    {v.type}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  {v.status === 'visited' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {isEn ? 'Visited' : 'Đã Đến'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      {v.match}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-400 text-center pt-1">
            {isEn
              ? 'Locations are verified with live Google Maps & operating hours.'
              : 'Địa điểm được xác thực trực tiếp qua Google Maps & giờ mở cửa thực tế.'}
          </p>
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
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 text-[#D4FF00] text-[9px] font-black rounded-full">
                      {item.tag}
                    </span>

                    {/* Interactive Checkbox Button */}
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

                  {/* Brand & Item Info */}
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

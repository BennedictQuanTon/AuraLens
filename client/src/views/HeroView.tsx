import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Camera,
  MapPin,
  ExternalLink,
  ChevronRight,
  CheckSquare,
  Square,
  Check,
  Coffee,
  Wine,
  Palette,
} from 'lucide-react';
import type { AppLanguage, UserProfileState } from '../types/settings.js';
import { HCMCVisualMap } from '../components/common/HCMCVisualMap.js';

interface HeroViewProps {
  userProfile: UserProfileState;
  language: AppLanguage;
  onStartScanner: () => void;
  onExplorePlaces: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  userProfile,
  language,
  onStartScanner,
  onExplorePlaces,
}) => {
  const isEn = language === 'en';

  // Dynamic Comic Speech Bubble rotation every 4 seconds (NO emojis/icons)
  const speechLines = isEn
    ? [
        "Hello! I'm Lumi, your personal AI stylist",
        "Ready to slay the town today? Let's check your drip",
        "Spotted 15 aesthetic spots in Saigon open right now",
      ]
    : [
        "Hế nhô! Lumi đây nè, stylist AI của bạn",
        "Sẵn sàng lên đồ cháy phố chưa? Bật máy quét thôi",
        "Vừa cập nhật 15 quán cafe siêu xinh mở cửa tại Sài Gòn",
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

  // Weekday Streak Tracker Data matching Reference Design
  const streakWeekDays = [
    { letter: 'M', completed: true, date: '18' },
    { letter: 'T', completed: true, date: '19' },
    { letter: 'W', completed: true, date: '20' },
    { letter: 'T', completed: true, date: '21' },
    { letter: 'F', completed: true, date: '22' },
    { letter: 'S', completed: true, date: '23' },
    { letter: 'S', completed: false, today: true, date: '24' },
  ];

  // 4 Contributing Pillars to Aura Score (92.4)
  const auraPillars = [
    { name: isEn ? 'Color Harmony' : 'Hài hòa màu sắc', score: 96, color: 'from-[#FF2E93] to-[#EC4899]' },
    { name: isEn ? 'Silhouette & Cut' : 'Phom dáng & Tỉ lệ', score: 94, color: 'from-[#7C3AED] to-[#8B5CF6]' },
    { name: isEn ? 'Vibe Match' : 'Độ chuẩn Vibe', score: 98, color: 'from-[#00F5FF] to-[#06B6D4]' },
    { name: isEn ? 'Accessories & Details' : 'Chi tiết & Phụ kiện', score: 90, color: 'from-[#10B981] to-[#059669]' },
  ];

  // Spot Categories contributing to 15 Spots
  const spotCategories = [
    { name: isEn ? 'Aesthetic Cafes' : 'Cafe Check-in', count: 8, icon: Coffee, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { name: isEn ? 'Cocktail & Bars' : 'Quán Bar & Pub', count: 4, icon: Wine, color: 'text-purple-500 bg-purple-50 border-purple-200' },
    { name: isEn ? 'Art & Concept' : 'Không gian Art', count: 3, icon: Palette, color: 'text-teal-500 bg-teal-50 border-teal-200' },
  ];

  const currentScore = 92.4;
  const genderTitle = userProfile.genderTitle || 'King';

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO SECTION: BALANCED FONT SIZES, LARGER SHIFTED LUMI & 2 BUTTONS */}
      {/* ========================================================================= */}
      <div className="relative pt-2 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          
          {/* Left: Primary Heading & 2 Action Buttons */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* PRIMARY HEADING with wider word spacing */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-tight [word-spacing:0.35rem]">
                {isEn ? 'Welcome Back,' : 'Chào mừng trở lại,'}
              </h1>
              
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight [word-spacing:0.35rem] flex flex-wrap items-baseline gap-3">
                <span className="text-gray-950">
                  {isEn ? `My ${genderTitle}` : `My ${genderTitle}`}
                </span>
                <span className="bg-gradient-to-r from-[#FF2E93] via-[#7C3AED] to-[#D4FF00] bg-clip-text text-transparent">
                  {userProfile.name}
                </span>
              </div>
            </div>

            {/* GEN-Z SUBTITLE */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-800 tracking-wide [word-spacing:0.25rem] pt-2">
              Ready to{' '}
              <span className="text-[#FF2E93] font-black">slay</span>{' '}
              your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#00F5FF] to-[#10B981] font-black underline decoration-[#FF2E93] decoration-wavy decoration-2 underline-offset-4">
                vibe
              </span>{' '}
              today?
            </h2>

            {/* TWO SHORT CLEAN ACTION BUTTONS (Drip Check ⚡ & Vibe Map 📍) */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Button 1: Drip Check */}
              <button
                onClick={onStartScanner}
                className="py-4 px-7 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-base shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Camera className="w-5 h-5 text-[#D4FF00]" />
                <span>Drip Check</span>
                <ChevronRight className="w-4 h-4 text-[#D4FF00] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Vibe Map */}
              <button
                onClick={onExplorePlaces}
                className="py-4 px-7 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:opacity-95 text-white font-extrabold text-base shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <MapPin className="w-5 h-5 text-[#D4FF00]" />
                <span>Vibe Map</span>
                <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Larger Lumi Shifted Left & Clean Backdrop */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start lg:-translate-x-10 justify-center relative min-h-[300px]">
            
            {/* FIXED HEIGHT CONTAINER (Zero layout shift on text change) */}
            <div className="h-16 flex items-center justify-center relative w-full mb-1">
              <div
                key={currentSpeechIndex}
                className="comic-bubble px-4 py-2.5 max-w-xs text-xs font-black text-gray-950 text-center leading-snug z-20"
              >
                {speechLines[currentSpeechIndex]}
              </div>
            </div>

            {/* Enlarger Transparent Cutout Lumi Mascot */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 animate-lumi-sway flex items-center justify-center">
              <div className="absolute inset-0 bg-white/50 rounded-full blur-2xl pointer-events-none" />
              <img
                src="/lumi.png"
                alt="Lumi AI Stylist"
                className="w-full h-full object-contain drop-shadow-2xl z-10"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP KPI CARDS: 3 PERFECTLY BALANCED, UNIFIED HEIGHT DASHBOARD WIDGETS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        
        {/* CARD 1: STREAK & STYLE STATS (3D Clay Flame) */}
        <div className="calm-card-elevated p-6 lg:p-7 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white shadow-xl border border-gray-100 space-y-5 h-full">
          
          {/* Central 3D Flame Emblem & Large Titles */}
          <div className="flex flex-col items-center text-center space-y-2 pt-1">
            <div className="relative w-24 h-24 rounded-full bg-white border border-gray-100 shadow-[0_12px_32px_rgba(249,115,22,0.16)] flex items-center justify-center p-3">
              <div className="absolute inset-0 bg-radial from-orange-400/15 via-amber-300/5 to-transparent rounded-full pointer-events-none" />
              <img
                src="/flame_3d.png"
                alt="3D Streak Flame"
                className="w-16 h-16 object-contain drop-shadow-md z-10 animate-pulse [animation-duration:3s]"
              />
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-none">
                7
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-gray-950 tracking-tight">
                {isEn ? 'Day Fit Streak' : 'Chuỗi Fit Check 7 Ngày'}
              </h3>
              <p className="text-sm lg:text-base font-semibold text-gray-500">
                {isEn ? `You are slaying your style, ${userProfile.name}!` : `Lên đồ quá cháy luôn, ${userProfile.name}!`}
              </p>
            </div>
          </div>

          {/* Weekday Tracker Row with Checkmark Circle Pills */}
          <div className="flex items-center justify-between px-1 py-3 border-t border-gray-100">
            {streakWeekDays.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className={`text-[11px] font-extrabold ${d.today ? 'text-gray-950 font-black' : 'text-gray-400'}`}>
                  {d.letter}
                </span>
                {d.completed ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                    d.today ? 'bg-gray-950 text-[#D4FF00] ring-2 ring-[#D4FF00]' : 'text-gray-400 bg-gray-50'
                  }`}>
                    {d.date}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Embedded Sub-Card: "YOUR STYLE STATS" */}
          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-100 space-y-3">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                {isEn ? 'YOUR STYLE STATS' : 'CHỈ SỐ THỜI TRANG CỦA BẠN'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 text-center py-1">
              <div>
                <span className="text-[11px] font-bold text-gray-400 block uppercase">
                  {isEn ? 'DAYS' : 'NGÀY'}
                </span>
                <span className="text-2xl lg:text-3xl font-black text-gray-950">28</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="text-[11px] font-bold text-gray-400 block uppercase">
                  {isEn ? 'FITS' : 'OUTFIT'}
                </span>
                <span className="text-2xl lg:text-3xl font-black text-gray-950">42</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="text-[11px] font-bold text-gray-400 block uppercase">
                  {isEn ? 'SPOTS' : 'QUÁN'}
                </span>
                <span className="text-2xl lg:text-3xl font-black text-gray-950">15</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="text-[11px] font-bold text-gray-400 block uppercase">
                  {isEn ? 'AURA' : 'ĐIỂM'}
                </span>
                <span className="text-2xl lg:text-3xl font-black text-purple-600">92.4</span>
              </div>
            </div>
          </div>

        </div>

        {/* CARD 2: AVERAGE AURA INDEX (Borderless Floating Diamond Laurel Medal & Shimmering Rank) */}
        <div className="calm-card-elevated p-6 lg:p-7 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white shadow-xl border border-gray-100 space-y-5 h-full">
          
          {/* Central Borderless Floating Medal & Sized Titles */}
          <div className="flex flex-col items-center text-center space-y-1.5 pt-1">
            
            {/* Borderless Floating Diamond Laurel Medal (No white circle frame) */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <img
                src="/medal_diamond.png"
                alt="Diamond Rank Medal"
                className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Big 92.4 and Centered Titles */}
            <div className="space-y-1">
              <div className="text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-none">
                {currentScore}
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-gray-950 tracking-tight">
                {isEn ? 'Average Aura Index' : 'Điểm Fit Trung Bình'}
              </h3>
              
              {/* "You achieved" in clean black + "Top 3%" & "Diamond Rank" in Shimmering Iridescent Diamond Gradient */}
              <p className="text-sm lg:text-base font-bold text-gray-900">
                {isEn ? 'You achieved ' : 'Bạn đạt '}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent font-black underline decoration-cyan-400 decoration-2 underline-offset-2">
                  Top 3%
                </span>
                {isEn ? ' & ' : ' & '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent font-black">
                  {isEn ? 'Diamond Rank' : 'Hạng Kim Cương'}
                </span>
                <span> ✨</span>
              </p>
            </div>
          </div>

          {/* 4 Fashion Pillars with Clean Title (No +6.8% badge) */}
          <div className="space-y-3.5 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between pb-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                {isEn ? 'Contributing Fashion Pillars' : 'Trọng Số Cấu Thành Điểm'}
              </span>
            </div>

            {/* 4 Progress Bars with Bold Labels */}
            <div className="space-y-3">
              {auraPillars.map((pillar, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm sm:text-base font-extrabold">
                    <span className="text-gray-800">{pillar.name}</span>
                    <span className="text-gray-950 font-black">{pillar.score}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${pillar.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CARD 3: CURATED SPOTS & CITY RADAR (Category Breakdown & District Matrix) */}
        <div className="calm-card-elevated p-6 lg:p-7 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white shadow-xl border border-gray-100 space-y-5 h-full">
          
          {/* Top Big Spots Count & Weather Live Status */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/80">
                {isEn ? 'Saigon Experience Map' : 'Bản Đồ Điểm Đến Sài Gòn'}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isEn ? 'Live Verified' : 'Khớp Thời Tiết'}</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <div>
                <div className="text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-none">
                  15
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-gray-950 tracking-tight mt-1">
                  {isEn ? 'Curated Spots Visited' : 'Quán Đã Trải Nghiệm'}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 block uppercase">
                  {isEn ? 'Weather Fit' : 'Thời Tiết'}
                </span>
                <span className="text-base font-black text-gray-900">
                  29°C Nắng Đẹp
                </span>
              </div>
            </div>
          </div>

          {/* Category Split: Cafes, Bars, Art Spaces */}
          <div className="space-y-2 py-2 border-t border-gray-100">
            <div className="text-[11px] font-black uppercase tracking-wider text-gray-400">
              {isEn ? 'Verified Spots by Experience Type' : 'Phân Bổ Loại Hình Điểm Ghé'}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {spotCategories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-2xl border flex flex-col items-center text-center justify-between ${cat.color}`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span className="text-xs font-black text-gray-950">{cat.count} Quán</span>
                    <span className="text-[9px] font-bold text-gray-600 truncate w-full">{cat.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Embedded Sub-Card: "DISTRICT CONCENTRATION & BRANDS" */}
          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-100 space-y-2.5">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                {isEn ? 'DISTRICT RADAR & LOCAL BRANDS' : 'MẬT ĐỘ QUẬN & LOCAL BRAND'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 text-center py-1">
              <div>
                <span className="text-[10px] font-bold text-gray-400 block uppercase">
                  Quận 1
                </span>
                <span className="text-sm lg:text-base font-black text-gray-950">6 Quán</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 block uppercase">
                  Thảo Điền
                </span>
                <span className="text-sm lg:text-base font-black text-gray-950">4 Quán</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 block uppercase">
                  Quận 3
                </span>
                <span className="text-sm lg:text-base font-black text-gray-950">3 Quán</span>
              </div>
              <div className="border-l border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 block uppercase">
                  Brands
                </span>
                <span className="text-sm lg:text-base font-black text-purple-600">20 Món</span>
              </div>
            </div>
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

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
} from 'lucide-react';
import type { AppLanguage, UserProfileState } from '../types/settings.js';
import { HCMCVisualMap } from '../components/common/HCMCVisualMap.js';

interface HeroViewProps {
  userProfile: UserProfileState;
  language: AppLanguage;
  onStartScanner: () => void;
  onExplorePlaces: () => void;
}

// Helper to generate precise, non-overlapping SVG Donut Arc Paths
function createDonutArc(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number
): string {
  const rad = Math.PI / 180;
  const startRad = startAngle * rad;
  const endRad = endAngle * rad;

  const x1 = cx + rOuter * Math.cos(startRad);
  const y1 = cy + rOuter * Math.sin(startRad);
  const x2 = cx + rOuter * Math.cos(endRad);
  const y2 = cy + rOuter * Math.sin(endRad);

  const x3 = cx + rInner * Math.cos(endRad);
  const y3 = cy + rInner * Math.sin(endRad);
  const x4 = cx + rInner * Math.cos(startRad);
  const y4 = cy + rInner * Math.sin(startRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${x1} ${y1}`,
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
    'Z',
  ].join(' ');
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

  // 5 Gen-Z Spot Categories with Exact Angular Arcs (Total 360 deg)
  const spotCategories = [
    {
      id: 0,
      name: isEn ? 'Aesthetic Cafes' : 'Cafe Sống Ảo',
      count: 5,
      percent: '33.3%',
      colorHex: '#FF6B00',
      startAngle: -90,
      endAngle: 30, // 120 deg
    },
    {
      id: 1,
      name: isEn ? 'Speakeasy Bars' : 'Quán Bar & Pub',
      count: 3,
      percent: '20.0%',
      colorHex: '#4F46E5',
      startAngle: 30,
      endAngle: 102, // 72 deg
    },
    {
      id: 2,
      name: isEn ? 'Art Hubs' : 'Không Gian Art',
      count: 3,
      percent: '20.0%',
      colorHex: '#10B981',
      startAngle: 102,
      endAngle: 174, // 72 deg
    },
    {
      id: 3,
      name: isEn ? 'Streetwear Flagships' : 'Local Brand Hub',
      count: 2,
      percent: '13.3%',
      colorHex: '#D946EF',
      startAngle: 174,
      endAngle: 222, // 48 deg
    },
    {
      id: 4,
      name: isEn ? 'Photobooth Studios' : 'Photobooth Studios',
      count: 2,
      percent: '13.3%',
      colorHex: '#84CC16',
      startAngle: 222,
      endAngle: 270, // 48 deg
    },
  ];

  const [hoveredSpotIndex, setHoveredSpotIndex] = useState<number | null>(null);
  const [hoveredChartPoint, setHoveredChartPoint] = useState<{
    day: string;
    style: string;
    value: number;
    color: string;
    x: number;
    y: number;
  } | null>(null);

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
        
        {/* CARD 1: STREAK & STYLE STATS (3-Column Clean Stats) */}
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

          {/* Embedded Sub-Card: "YOUR STYLE STATS" (3 Columns: DAYS, FITS, SPOTS) */}
          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-100 space-y-3">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                {isEn ? 'YOUR STYLE STATS' : 'CHỈ SỐ THỜI TRANG CỦA BẠN'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 text-center py-1">
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
            </div>
          </div>

        </div>

        {/* CARD 2: AVERAGE AURA INDEX (Consistent Platinum Silver Diamond Text Color) */}
        <div className="calm-card-elevated p-6 lg:p-7 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white shadow-xl border border-gray-100 space-y-5 h-full">
          
          {/* Central Sized Floating Medal */}
          <div className="flex flex-col items-center text-center space-y-2 pt-1">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <img
                src="/medal_diamond.png"
                alt="Diamond Rank Medal"
                className="w-22 h-22 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Big 92.4 horizontally aligned with number 7 on Card 1 */}
            <div className="space-y-1 pt-1">
              <div className="text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-none">
                {currentScore}
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-gray-950 tracking-tight">
                {isEn ? 'Average Aura Index' : 'Điểm Fit Trung Bình'}
              </h3>
              
              {/* Consistent Brilliant Silver-Diamond Platinum Text */}
              <p className="text-sm lg:text-base font-bold text-gray-900">
                {isEn ? 'You achieved ' : 'Bạn đạt '}
                <span className="text-slate-400 font-black">
                  Top 3%
                </span>
                {isEn ? ' & ' : ' & '}
                <span className="text-slate-400 font-black">
                  {isEn ? 'Diamond Rank' : 'Hạng Kim Cương'}
                </span>
              </p>
            </div>
          </div>

          {/* 4 Fashion Pillars with Clean Title */}
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

        {/* CARD 3: CURATED VIBE SPOTS (Individual SVG Path Sectors: 100% Reliable Hit Testing) */}
        <div className="calm-card-elevated p-6 lg:p-7 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-white shadow-xl border border-gray-100 space-y-5 h-full">
          
          {/* Top Section: SVG Donut Chart with Exact SVG Path Sectors */}
          <div className="flex flex-col items-center text-center space-y-2 pt-1">
            
            {/* SVG Donut Chart with 100% Independent Geometry Paths */}
            <div className="relative w-56 h-56 sm:w-60 sm:h-60 flex items-center justify-center">
              <svg
                className="w-full h-full overflow-visible select-none"
                viewBox="0 0 200 200"
                onMouseLeave={() => setHoveredSpotIndex(null)}
              >
                {/* 5 Distinct Non-Overlapping Path Slices */}
                {spotCategories.map((cat) => {
                  const isHovered = hoveredSpotIndex === cat.id;
                  const pathD = createDonutArc(100, 100, 69, 91, cat.startAngle, cat.endAngle);

                  return (
                    <path
                      key={cat.id}
                      d={pathD}
                      fill={cat.colorHex}
                      onMouseEnter={() => setHoveredSpotIndex(cat.id)}
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        opacity: hoveredSpotIndex === null || isHovered ? 1 : 0.4,
                        filter: isHovered ? `drop-shadow(0 0 12px ${cat.colorHex}EE)` : 'none',
                        transformOrigin: '100px 100px',
                        transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                      }}
                    />
                  );
                })}
              </svg>

              {/* Center Metrics (Always Accurate on Any Slice Hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-3 transition-all duration-200">
                {hoveredSpotIndex !== null ? (
                  <div className="animate-fadeIn flex flex-col items-center">
                    <span
                      className="text-5xl sm:text-6xl font-black tracking-tight leading-none"
                      style={{ color: spotCategories[hoveredSpotIndex].colorHex }}
                    >
                      {spotCategories[hoveredSpotIndex].count}
                    </span>
                    <span className="text-sm sm:text-base font-black text-gray-950 mt-0.5">
                      {spotCategories[hoveredSpotIndex].percent}
                    </span>
                    <span className="text-[11px] font-extrabold text-gray-500 truncate max-w-[140px] text-center mt-0.5">
                      {spotCategories[hoveredSpotIndex].name}
                    </span>
                  </div>
                ) : (
                  <div className="animate-fadeIn flex flex-col items-center">
                    <span className="text-6xl sm:text-7xl font-black text-gray-950 tracking-tight leading-none">
                      15
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400 mt-1">
                      {isEn ? 'Total Spots' : 'Tổng Điểm'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-black text-gray-950 tracking-tight pt-1">
              {isEn ? 'Curated Vibe Spots' : 'Tọa Độ Săn Vibe'}
            </h3>

          </div>

          {/* Symmetrical Legend: Fitted Compact Frames + Centered Photobooth Studios */}
          <div className="space-y-3 py-3 border-t border-gray-100 flex-1 flex flex-col justify-around">
            <div className="flex items-center justify-between pb-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                {isEn ? 'Categories Legend' : 'Danh Mục Địa Điểm'}
              </span>
            </div>

            {/* Symmetrical & Centered Layout with Fitted Frames & Larger Font */}
            <div className="space-y-2.5">
              {/* Row 1: 2 items */}
              <div className="grid grid-cols-2 gap-2.5">
                {spotCategories.slice(0, 2).map((cat) => (
                  <div
                    key={cat.id}
                    className="py-2.5 px-3.5 rounded-2xl bg-gray-50/90 border border-gray-100 flex items-center gap-2.5 select-none justify-center"
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: cat.colorHex }}
                    />
                    <span className="text-xs sm:text-sm font-black text-gray-900 truncate">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 2: 2 items */}
              <div className="grid grid-cols-2 gap-2.5">
                {spotCategories.slice(2, 4).map((cat) => (
                  <div
                    key={cat.id}
                    className="py-2.5 px-3.5 rounded-2xl bg-gray-50/90 border border-gray-100 flex items-center gap-2.5 select-none justify-center"
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: cat.colorHex }}
                    />
                    <span className="text-xs sm:text-sm font-black text-gray-900 truncate">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 3: 5th item (Photobooth Studios) perfectly centered with fitted frame */}
              <div className="flex justify-center">
                <div
                  className="py-2.5 px-5 rounded-2xl bg-gray-50/90 border border-gray-100 flex items-center gap-2.5 select-none w-fit"
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: spotCategories[4].colorHex }}
                  />
                  <span className="text-xs sm:text-sm font-black text-gray-900">
                    {spotCategories[4].name}
                  </span>
                </div>
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
              <h3 className="text-xl lg:text-2xl font-black text-gray-950">
                {isEn ? 'Outfit Checks by Style Category' : 'Phân Bổ Phong Cách Hàng Ngày'}
              </h3>
            </div>
          </div>

          {/* SVG Multi-Line Chart with Clear Y-Axis Values & Larger Height */}
          <div className="relative w-full h-72 sm:h-80 bg-gray-50/80 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between">
            
            {/* Chart Area with Left Y-Axis */}
            <div className="relative flex-1 flex">
              {/* Y-Axis Column with (Fits) Unit */}
              <div className="flex flex-col justify-between text-[10px] font-extrabold text-gray-400 pr-3 select-none pb-1">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">
                  (Fits)
                </span>
                <span>10</span>
                <span>8</span>
                <span>6</span>
                <span>4</span>
                <span>2</span>
                <span>0</span>
              </div>

              {/* Grid & SVG Area */}
              <div className="relative flex-1 h-full">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-x-0 top-[12%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 top-[28%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 top-[46%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 top-[64%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 top-[82%] border-b border-dashed border-gray-200" />
                <div className="absolute inset-x-0 bottom-0 border-b border-gray-300" />

                {/* Floating Interactive Hover Tooltip */}
                {hoveredChartPoint && (
                  <div
                    className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full mb-3 px-3 py-1.5 rounded-xl bg-gray-950 text-white shadow-2xl border border-gray-800 text-xs font-extrabold flex items-center gap-2 animate-fadeIn select-none"
                    style={{
                      left: `${(hoveredChartPoint.x / 450) * 100}%`,
                      top: `${(hoveredChartPoint.y / 150) * 100}%`,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: hoveredChartPoint.color }}
                    />
                    <span>{hoveredChartPoint.style}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-300">{hoveredChartPoint.day}</span>
                    <span className="text-[#D4FF00] font-black">{hoveredChartPoint.value} Fits</span>
                  </div>
                )}

                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 450 150"
                  preserveAspectRatio="none"
                  onMouseLeave={() => setHoveredChartPoint(null)}
                >
                  {/* Line 1: Cyber-Pop (Green-Lime) */}
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,115 88,90 156,35 224,65 292,20 360,50 428,10"
                  />
                  {[
                    { day: 'Mon', value: 2, x: 20, y: 115 },
                    { day: 'Tue', value: 4, x: 88, y: 90 },
                    { day: 'Wed', value: 8, x: 156, y: 35 },
                    { day: 'Thu', value: 6, x: 224, y: 65 },
                    { day: 'Fri', value: 9, x: 292, y: 20 },
                    { day: 'Sat', value: 7, x: 360, y: 50 },
                    { day: 'Sun', value: 10, x: 428, y: 10 },
                  ].map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredChartPoint?.day === pt.day && hoveredChartPoint?.style === 'Cyber-Pop' ? 7 : 5}
                      fill="#10B981"
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="cursor-pointer transition-all duration-200 hover:scale-125"
                      onMouseEnter={() =>
                        setHoveredChartPoint({
                          day: pt.day,
                          style: 'Cyber-Pop',
                          value: pt.value,
                          color: '#10B981',
                          x: pt.x,
                          y: pt.y,
                        })
                      }
                    />
                  ))}

                  {/* Line 2: Y2K / Streetwear (Pink) */}
                  <polyline
                    fill="none"
                    stroke="#FF2E93"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,130 88,110 156,70 224,95 292,55 360,42 428,65"
                  />
                  {[
                    { day: 'Mon', value: 1, x: 20, y: 130 },
                    { day: 'Tue', value: 2.5, x: 88, y: 110 },
                    { day: 'Wed', value: 5.5, x: 156, y: 70 },
                    { day: 'Thu', value: 3.5, x: 224, y: 95 },
                    { day: 'Fri', value: 6.5, x: 292, y: 55 },
                    { day: 'Sat', value: 7.5, x: 360, y: 42 },
                    { day: 'Sun', value: 6, x: 428, y: 65 },
                  ].map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredChartPoint?.day === pt.day && hoveredChartPoint?.style === 'Y2K / Streetwear' ? 7 : 4.5}
                      fill="#FF2E93"
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="cursor-pointer transition-all duration-200 hover:scale-125"
                      onMouseEnter={() =>
                        setHoveredChartPoint({
                          day: pt.day,
                          style: 'Y2K / Streetwear',
                          value: pt.value,
                          color: '#FF2E93',
                          x: pt.x,
                          y: pt.y,
                        })
                      }
                    />
                  ))}

                  {/* Line 3: Minimalist (Purple) */}
                  <polyline
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2.5"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,140 88,128 156,115 224,102 292,90 360,80 428,75"
                  />
                  {[
                    { day: 'Mon', value: 0, x: 20, y: 140 },
                    { day: 'Tue', value: 1, x: 88, y: 128 },
                    { day: 'Wed', value: 2, x: 156, y: 115 },
                    { day: 'Thu', value: 3, x: 224, y: 102 },
                    { day: 'Fri', value: 4, x: 292, y: 90 },
                    { day: 'Sat', value: 4.5, x: 360, y: 80 },
                    { day: 'Sun', value: 5, x: 428, y: 75 },
                  ].map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredChartPoint?.day === pt.day && hoveredChartPoint?.style === 'Minimalist' ? 6.5 : 4}
                      fill="#7C3AED"
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      className="cursor-pointer transition-all duration-200 hover:scale-125"
                      onMouseEnter={() =>
                        setHoveredChartPoint({
                          day: pt.day,
                          style: 'Minimalist',
                          value: pt.value,
                          color: '#7C3AED',
                          x: pt.x,
                          y: pt.y,
                        })
                      }
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* X-Axis Days Label (Pure English, No Parentheses) */}
            <div className="flex justify-between text-xs font-bold text-gray-500 pl-8 pr-1 pt-2 select-none">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span className="text-gray-950 font-black">Sun</span>
            </div>
          </div>

          {/* Chart Legend (Clean, No Numbers) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs sm:text-sm font-extrabold text-gray-700 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs" />
              <span>Cyber-Pop</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF2E93] shadow-xs" />
              <span>Y2K / Streetwear</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#7C3AED] shadow-xs" />
              <span>Minimalist</span>
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

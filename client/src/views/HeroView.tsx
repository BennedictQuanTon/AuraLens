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
  BarChart2,
  SlidersHorizontal,
  X,
  Sparkles,
  ShoppingBag,
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

  // Section Category Filter & AI Analytics State for Fashion Items
  const [selectedFashionCategory, setSelectedFashionCategory] = useState<'all' | 'outerwear' | 'tops' | 'bottoms' | 'accessories'>('all');
  const [showFashionAnalytics, setShowFashionAnalytics] = useState<boolean>(false);

  // Background Scroll Locking when Fashion Analytics Modal is open
  useEffect(() => {
    if (showFashionAnalytics) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showFashionAnalytics]);

  const recommendedBrandItems = [
    {
      id: 'item-1',
      brand: 'LIDER Closet',
      name: 'Cyber Metallic Zip Windbreaker',
      price: '890,000 ₫',
      category: 'outerwear' as const,
      categoryLabel: 'Outerwear',
      matchScore: 98,
      vibe: 'Cyber-Pop',
      link: 'https://lider.vn',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-2',
      brand: 'Grimm DC',
      name: 'Titanium Silver Techwear Hoodie',
      price: '750,000 ₫',
      category: 'outerwear' as const,
      categoryLabel: 'Outerwear',
      matchScore: 95,
      vibe: 'Cyber-Pop',
      link: 'https://grimmdc.com',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-3',
      brand: 'DVRK Studio',
      name: 'Cyber Matrix Hologram Heavyweight Tee',
      price: '420,000 ₫',
      category: 'tops' as const,
      categoryLabel: 'Top & Shirt',
      matchScore: 97,
      vibe: 'Streetwear',
      link: 'https://dvrk.vn',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-4',
      brand: 'She By Shj',
      name: 'Acid Hologram Silver Tube Top',
      price: '380,000 ₫',
      category: 'tops' as const,
      categoryLabel: 'Top & Shirt',
      matchScore: 96,
      vibe: 'Y2K',
      link: 'https://shebyshj.com',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-5',
      brand: 'Dirty Coins',
      name: 'Cyber Multi-Pocket Parachute Cargo Pants',
      price: '620,000 ₫',
      category: 'bottoms' as const,
      categoryLabel: 'Pants',
      matchScore: 96,
      vibe: 'Streetwear',
      link: 'https://dirtycoins.vn',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-6',
      brand: 'Levents',
      name: 'Wide-Leg Silver Pinstripe Denim Jeans',
      price: '690,000 ₫',
      category: 'bottoms' as const,
      categoryLabel: 'Jeans',
      matchScore: 94,
      vibe: 'Streetwear',
      link: 'https://levents.asia',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-7',
      brand: 'Hades Studio',
      name: 'Neon Matrix Oval Sunglasses',
      price: '320,000 ₫',
      category: 'accessories' as const,
      categoryLabel: 'Accessory',
      matchScore: 97,
      vibe: 'Cyber-Pop',
      link: 'https://hades.vn',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'item-8',
      brand: 'Dirty Coins',
      name: 'Industrial Chrome Chain Necklace',
      price: '250,000 ₫',
      category: 'accessories' as const,
      categoryLabel: 'Jewelry',
      matchScore: 96,
      vibe: 'Streetwear',
      link: 'https://dirtycoins.vn',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const filteredBrandItems = selectedFashionCategory === 'all'
    ? recommendedBrandItems
    : recommendedBrandItems.filter((item) => item.category === selectedFashionCategory);

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
      {/* 1. TOP HERO SECTION: PERFECTLY BALANCED HERO & SINGLE-LINE USER TITLE    */}
      {/* ========================================================================= */}
      <div className="relative pt-3 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left: Primary Heading & 2 Action Buttons (Slightly larger, matching Lumi's vertical height) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            {/* PRIMARY HEADING (My King Quan Ton on one single line) */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-black text-gray-950 tracking-tight leading-none [word-spacing:0.35rem]">
                {isEn ? 'Welcome Back,' : 'Chào mừng trở lại,'}
              </h1>
              
              <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-black tracking-tight leading-none [word-spacing:0.35rem] flex items-baseline gap-3 whitespace-nowrap pt-1">
                <span className="text-gray-950">
                  {isEn ? `My ${genderTitle}` : `My ${genderTitle}`}
                </span>
                <span className="bg-gradient-to-r from-[#FF2E93] via-[#7C3AED] to-[#D4FF00] bg-clip-text text-transparent">
                  {userProfile.name}
                </span>
              </div>
            </div>

            {/* GEN-Z SUBTITLE */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-800 tracking-wide [word-spacing:0.25rem]">
              Ready to{' '}
              <span className="text-[#FF2E93] font-black">slay</span>{' '}
              your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#00F5FF] to-[#10B981] font-black underline decoration-[#FF2E93] decoration-wavy decoration-3 underline-offset-6">
                vibe
              </span>{' '}
              today?
            </h2>

            {/* TWO CLEAN ACTION BUTTONS (Drip Check ⚡ & Vibe Map 📍) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Button 1: Drip Check */}
              <button
                onClick={onStartScanner}
                className="py-4.5 px-8 sm:py-5 sm:px-9 rounded-full bg-[#0F172A] hover:bg-black text-white font-black text-base sm:text-lg shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer group border border-white/10"
              >
                <Camera className="w-5.5 h-5.5 text-[#D4FF00]" />
                <span>Drip Check</span>
                <ChevronRight className="w-5 h-5 text-[#D4FF00] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Vibe Map */}
              <button
                onClick={onExplorePlaces}
                className="py-4.5 px-8 sm:py-5 sm:px-9 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:opacity-95 text-white font-black text-base sm:text-lg shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer group border border-white/10"
              >
                <MapPin className="w-5.5 h-5.5 text-[#D4FF00]" />
                <span>Vibe Map</span>
                <ChevronRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Lumi Mascot & Dynamic Speech Bubble */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start lg:-translate-x-6 justify-center relative min-h-[320px]">
            
            {/* Speech Bubble Container with Balanced Text */}
            <div className="h-16 flex items-center justify-center relative w-full mb-1">
              <div
                key={currentSpeechIndex}
                className="comic-bubble px-5 py-2.5 max-w-xs sm:max-w-sm text-xs sm:text-sm font-black text-gray-950 text-center leading-snug z-20 shadow-lg"
              >
                {speechLines[currentSpeechIndex]}
              </div>
            </div>

            {/* Transparent Cutout Lumi Mascot */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-[360px] xl:h-[360px] animate-lumi-sway flex items-center justify-center">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* LEFT: OOTD ACTIVITY CHART WITH ACCURATE Y-AXIS (cols 1-7 on lg) */}
        <div className="lg:col-span-7 calm-card-elevated p-6 lg:p-7 rounded-3xl space-y-5 flex flex-col justify-between h-full">
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
                <svg
                  className="w-full h-full overflow-visible select-none"
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                  onMouseLeave={() => setHoveredChartPoint(null)}
                >
                  {/* Horizontal Grid lines INSIDE SVG (Drawn first so tooltip is always on top) */}
                  <line x1="30" y1="25" x2="470" y2="25" stroke="#e2e8f0" strokeDasharray="4,4" strokeWidth="1" />
                  <line x1="30" y1="55" x2="470" y2="55" stroke="#e2e8f0" strokeDasharray="4,4" strokeWidth="1" />
                  <line x1="30" y1="85" x2="470" y2="85" stroke="#e2e8f0" strokeDasharray="4,4" strokeWidth="1" />
                  <line x1="30" y1="115" x2="470" y2="115" stroke="#e2e8f0" strokeDasharray="4,4" strokeWidth="1" />
                  <line x1="30" y1="145" x2="470" y2="145" stroke="#e2e8f0" strokeDasharray="4,4" strokeWidth="1" />
                  <line x1="30" y1="175" x2="470" y2="175" stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* Vertical Guide Line on Hover */}
                  {hoveredChartPoint && (
                    <line
                      x1={hoveredChartPoint.x}
                      y1={25}
                      x2={hoveredChartPoint.x}
                      y2={175}
                      stroke="#94a3b8"
                      strokeDasharray="4,4"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Line 1: Cyber-Pop (Green-Lime) */}
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="35,145 105,115 175,55 245,85 315,40 385,70 455,32.5"
                  />

                  {/* Line 2: Y2K / Streetwear (Pink) */}
                  <polyline
                    fill="none"
                    stroke="#FF2E93"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="35,160 105,137.5 175,92.5 245,122.5 315,77.5 385,62.5 455,85"
                  />

                  {/* Line 3: Minimalist (Purple) */}
                  <polyline
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2.5"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="35,167.5 105,152.5 175,137.5 245,122.5 315,107.5 385,100 455,92.5"
                  />

                  {/* Points for Line 1 (Cyber-Pop) */}
                  {[
                    { day: 'Mon', value: 2, x: 35, y: 145 },
                    { day: 'Tue', value: 4, x: 105, y: 115 },
                    { day: 'Wed', value: 8, x: 175, y: 55 },
                    { day: 'Thu', value: 6, x: 245, y: 85 },
                    { day: 'Fri', value: 9, x: 315, y: 40 },
                    { day: 'Sat', value: 7, x: 385, y: 70 },
                    { day: 'Sun', value: 9.5, x: 455, y: 32.5 },
                  ].map((pt, i) => {
                    const isHovered = hoveredChartPoint?.day === pt.day && hoveredChartPoint?.style === 'Cyber-Pop';
                    return (
                      <g key={i}>
                        {/* Transparent Large Hit Target */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={16}
                          fill="transparent"
                          className="cursor-pointer"
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
                        {/* Visual Dot */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 7.5 : 4.5}
                          fill="#10B981"
                          stroke="#ffffff"
                          strokeWidth={2}
                          className="pointer-events-none transition-all duration-150"
                        />
                      </g>
                    );
                  })}

                  {/* Points for Line 2 (Y2K / Streetwear) */}
                  {[
                    { day: 'Mon', value: 1, x: 35, y: 160 },
                    { day: 'Tue', value: 2.5, x: 105, y: 137.5 },
                    { day: 'Wed', value: 5.5, x: 175, y: 92.5 },
                    { day: 'Thu', value: 3.5, x: 245, y: 122.5 },
                    { day: 'Fri', value: 6.5, x: 315, y: 77.5 },
                    { day: 'Sat', value: 7.5, x: 385, y: 62.5 },
                    { day: 'Sun', value: 6, x: 455, y: 85 },
                  ].map((pt, i) => {
                    const isHovered = hoveredChartPoint?.day === pt.day && hoveredChartPoint?.style === 'Y2K / Streetwear';
                    return (
                      <g key={i}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={16}
                          fill="transparent"
                          className="cursor-pointer"
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
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 7.5 : 4.5}
                          fill="#FF2E93"
                          stroke="#ffffff"
                          strokeWidth={2}
                          className="pointer-events-none transition-all duration-150"
                        />
                      </g>
                    );
                  })}

                  {/* Points for Line 3 (Minimalist) */}
                  {[
                    { day: 'Mon', value: 0.5, x: 35, y: 167.5 },
                    { day: 'Tue', value: 1.5, x: 105, y: 152.5 },
                    { day: 'Wed', value: 2.5, x: 175, y: 137.5 },
                    { day: 'Thu', value: 3.5, x: 245, y: 122.5 },
                    { day: 'Fri', value: 4.5, x: 315, y: 107.5 },
                    { day: 'Sat', value: 5.0, x: 385, y: 100 },
                    { day: 'Sun', value: 5.5, x: 455, y: 92.5 },
                  ].map((pt, i) => {
                    const isHovered = hoveredChartPoint?.day === pt.day && hoveredChartPoint?.style === 'Minimalist';
                    return (
                      <g key={i}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={16}
                          fill="transparent"
                          className="cursor-pointer"
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
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 6.5 : 3.5}
                          fill="#7C3AED"
                          stroke="#ffffff"
                          strokeWidth={1.5}
                          className="pointer-events-none transition-all duration-150"
                        />
                      </g>
                    );
                  })}

                  {/* Native SVG Floating Tooltip: 100% Guaranteed Topmost Layer & Precise Positioning */}
                  {hoveredChartPoint && (() => {
                    const tooltipWidth = 156;
                    const tooltipHeight = 46;
                    const clampedX = Math.min(Math.max(hoveredChartPoint.x - tooltipWidth / 2, 10), 500 - tooltipWidth - 10);
                    const clampedY = Math.max(hoveredChartPoint.y - tooltipHeight - 14, 6);

                    return (
                      <g className="pointer-events-none">
                        {/* Tooltip Background Card with Shadow */}
                        <rect
                          x={clampedX}
                          y={clampedY}
                          width={tooltipWidth}
                          height={tooltipHeight}
                          rx={12}
                          fill="#090d16"
                          stroke="#334155"
                          strokeWidth={1.5}
                          style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.45))' }}
                        />
                        {/* Style Color Dot */}
                        <circle
                          cx={clampedX + 18}
                          cy={clampedY + 23}
                          r={5}
                          fill={hoveredChartPoint.color}
                        />
                        {/* Style Title */}
                        <text
                          x={clampedX + 30}
                          y={clampedY + 19}
                          fill="#ffffff"
                          fontSize="11.5"
                          fontWeight="800"
                          fontFamily="sans-serif"
                        >
                          {hoveredChartPoint.style}
                        </text>
                        {/* Day & Fits Value */}
                        <text
                          x={clampedX + 30}
                          y={clampedY + 34}
                          fill="#94a3b8"
                          fontSize="10.5"
                          fontWeight="700"
                          fontFamily="sans-serif"
                        >
                          {hoveredChartPoint.day}: <tspan fill="#D4FF00" fontWeight="900">{hoveredChartPoint.value} Fits</tspan>
                        </text>
                      </g>
                    );
                  })()}
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

        {/* RIGHT: LEADERBOARD WIDGET (cols 8-12 on lg) */}
        <div className="lg:col-span-5 calm-card-elevated p-6 lg:p-7 rounded-3xl flex flex-col justify-between h-full">
          <HCMCVisualMap />
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM SECTION: TOP RECOMMENDED FASHION & ACCESSORIES (BY SECTION)     */}
      {/* ========================================================================= */}
      <div className="calm-card-elevated p-6 lg:p-8 rounded-3xl space-y-6">
        
        {/* Section Header: Clean Title (No Emojis) & Small Analytics Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-gray-100">
          <div>
            <h3 className="text-xl lg:text-2xl font-black text-gray-950">
              {isEn ? 'Top Recommended Fashion & Accessories' : 'Top Trang Phục & Phụ Kiện Đề Xuất'}
            </h3>
          </div>

          {/* Small Analytics Icon Button */}
          <button
            onClick={() => setShowFashionAnalytics(true)}
            className="py-1.5 px-3 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border border-purple-200 group self-start sm:self-auto"
            title="AI Style Compatibility Analytics"
          >
            <BarChart2 className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black">
              Analytics
            </span>
          </button>
        </div>

        {/* Section Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {[
            { id: 'all', label: isEn ? 'All Pieces (8)' : 'Tất Cả (8)' },
            { id: 'outerwear', label: isEn ? 'Outerwear (2)' : 'Áo Khoác (2)' },
            { id: 'tops', label: isEn ? 'Tops (2)' : 'Áo Thun & Top (2)' },
            { id: 'bottoms', label: isEn ? 'Bottoms (2)' : 'Quần (2)' },
            { id: 'accessories', label: isEn ? 'Accessories (2)' : 'Phụ Kiện (2)' },
          ].map((tab) => {
            const isActive = selectedFashionCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFashionCategory(tab.id as any)}
                className={`py-2 px-4 rounded-full text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gray-950 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Multi-Column Responsive Grid of Clean Fashion Cards (No Text on Top of Images) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2">
          {filteredBrandItems.map((item) => {
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-3xl bg-white border border-gray-100 hover:border-purple-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Clean Unobstructed HD Fashion Image (NO TEXT ON TOP) */}
                  <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                  </div>

                  {/* Brand Name & AI Match Tag */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-black text-purple-600 uppercase tracking-wider truncate">
                      {item.brand}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 shrink-0">
                      {item.matchScore}% Match
                    </span>
                  </div>

                  {/* Item Name */}
                  <h4 className="text-xs sm:text-sm font-black text-gray-950 line-clamp-1 leading-snug group-hover:text-purple-600 transition-colors">
                    {item.name}
                  </h4>
                </div>

                {/* Price & Shop Direct Link */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                  <span className="text-sm font-black text-[#FF2E93]">
                    {item.price}
                  </span>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3.5 rounded-xl bg-gray-950 hover:bg-black text-white text-[11px] font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{isEn ? 'Shop' : 'Mua'}</span>
                    <ExternalLink className="w-3 h-3 text-[#D4FF00]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. AI FASHION COMPATIBILITY ANALYTICS MODAL (Spacious, Large, Concise)    */}
      {/* ========================================================================= */}
      {showFashionAnalytics && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowFashionAnalytics(false)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-scaleUp p-6 sm:p-7 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                    AI Fashion Stylist Engine
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mt-0.5">
                    Thuật toán gợi ý trang phục Local Brand tương thích phong cách
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFashionAnalytics(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-950 hover:bg-gray-100 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Concise Calculation Pillars */}
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">1. Color Contrast & Matrix (35%)</span>
                  <span className="text-purple-600 font-black text-base">98.5%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Độ hòa hợp sắc tố giữa trang phục với bảng màu Bạc Metallic, Đen Titan, Neon Lime của bạn.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">2. Silhouette & Fit Proportion (30%)</span>
                  <span className="text-emerald-600 font-black text-base">96.0%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Tỉ lệ phom dáng Boxy / Oversized tôn dáng và cân đối cấu trúc cơ thể.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">3. Saigon Climate & Comfort (20%)</span>
                  <span className="text-pink-600 font-black text-base">94.2%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Chất liệu vải cao cấp, thoáng khí và thích ứng với thời tiết 28-32°C tại Sài Gòn.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">4. Micro-Trend Momentum (15%)</span>
                  <span className="text-cyan-600 font-black text-base">97.8%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Đón đầu xu hướng Cyber-Pop & Streetwear của các thương hiệu Local Brand hot nhất 2026.
                </p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowFashionAnalytics(false)}
                className="w-full py-4 rounded-2xl bg-gray-950 hover:bg-black text-white font-black text-sm shadow-xl transition-all cursor-pointer"
              >
                Đã hiểu cơ chế đề xuất
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

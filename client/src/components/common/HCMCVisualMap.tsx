import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  Navigation,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Camera,
  SlidersHorizontal,
} from 'lucide-react';
import type { AppLanguage } from '../../types/settings.js';

interface HCMCVisualMapProps {
  language?: AppLanguage;
}

interface LeaderboardVenue {
  id: string;
  rank: number;
  name: string;
  districtEn: string;
  districtVi: string;
  address: string;
  typeEn: string;
  typeVi: string;
  vibeStyleEn: string;
  vibeStyleVi: string;
  matchScore: number;
  openHours: string;
  priceRange: string;
  photoSpotEn: string;
  photoSpotVi: string;
  image: string;
  aiBreakdown: {
    colorHarmony: number;
    lightingAtmosphere: number;
    dressCodeFit: number;
    photoAesthetic: number;
  };
}

export const HCMCVisualMap: React.FC<HCMCVisualMapProps> = ({
  language = 'en',
}) => {
  const isEn = language === 'en';
  const [selectedVenue, setSelectedVenue] = useState<LeaderboardVenue | null>(null);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState<boolean>(false);

  // Lock background scroll when any modal is open
  useEffect(() => {
    if (selectedVenue || showAnalyticsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVenue, showAnalyticsModal]);

  const leaderboardVenues: LeaderboardVenue[] = [
    {
      id: 'lb-1',
      rank: 1,
      name: 'Neo Saigon Cyber Bar',
      districtEn: 'District 1',
      districtVi: 'Quận 1',
      address: '26 Lý Tự Trọng, Bến Nghé, Quận 1',
      typeEn: 'Speakeasy Bar',
      typeVi: 'Speakeasy Bar',
      vibeStyleEn: 'Cyber-Pop & Neon Nightlife',
      vibeStyleVi: 'Cyber-Pop & Đêm Nhạc Neon',
      matchScore: 98,
      openHours: '18:00 - 02:00',
      priceRange: '150,000 - 350,000 ₫',
      photoSpotEn: 'Neon reflective light tunnel & titanium bar counter',
      photoSpotVi: 'Đường hầm laser phản quang & quầy bar kim loại titan',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&auto=format&fit=crop&q=80',
      aiBreakdown: {
        colorHarmony: 99,
        lightingAtmosphere: 98,
        dressCodeFit: 97,
        photoAesthetic: 98,
      },
    },
    {
      id: 'lb-2',
      rank: 2,
      name: 'Danshari Coffee',
      districtEn: 'District 1',
      districtVi: 'Quận 1',
      address: '156B Pasteur, Bến Nghé, Quận 1',
      typeEn: 'Aesthetic Cafe',
      typeVi: 'Cafe Sống Ảo',
      vibeStyleEn: 'Minimalist & Industrial Inox',
      vibeStyleVi: 'Tối Giản & Phong Cách Inox',
      matchScore: 96,
      openHours: '08:00 - 22:00',
      priceRange: '65,000 - 120,000 ₫',
      photoSpotEn: 'Monolithic concrete pillars & natural skylight',
      photoSpotVi: 'Cột bê tông nguyên khối & giếng trời ánh sáng tự nhiên',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
      aiBreakdown: {
        colorHarmony: 96,
        lightingAtmosphere: 95,
        dressCodeFit: 97,
        photoAesthetic: 96,
      },
    },
    {
      id: 'lb-3',
      rank: 3,
      name: 'Blank Lounge Landmark 81',
      districtEn: 'Binh Thanh',
      districtVi: 'Bình Thạnh',
      address: 'Tầng 75-76 Landmark 81, Vinhomes Central Park',
      typeEn: 'Sky Lounge',
      typeVi: 'Sky Lounge',
      vibeStyleEn: 'Cyber Skyline & High Fashion',
      vibeStyleVi: 'Tầm Nhìn Skyline & Thời Trang',
      matchScore: 95,
      openHours: '09:00 - 24:00',
      priceRange: '190,000 - 450,000 ₫',
      photoSpotEn: '350m panoramic glass view overlooking Saigon River',
      photoSpotVi: 'Góc kính ngắm toàn cảnh Sông Sài Gòn ở độ cao 350m',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
      aiBreakdown: {
        colorHarmony: 94,
        lightingAtmosphere: 96,
        dressCodeFit: 95,
        photoAesthetic: 95,
      },
    },
    {
      id: 'lb-4',
      rank: 4,
      name: 'Rang Rang Coffee',
      districtEn: 'Thao Dien (Thu Duc)',
      districtVi: 'Thảo Điền (TP. Thủ Đức)',
      address: '1 Thảo Điền, TP. Thủ Đức',
      typeEn: 'Aesthetic Cafe',
      typeVi: 'Cafe Sống Ảo',
      vibeStyleEn: 'Futuristic Inox & Clean Glass',
      vibeStyleVi: 'Inox Tương Lai & Không Gian Kính',
      matchScore: 94,
      openHours: '07:00 - 23:00',
      priceRange: '70,000 - 140,000 ₫',
      photoSpotEn: 'Mirrored steel counter and ambient glass wall',
      photoSpotVi: 'Bàn inox tráng gương và tường kính xuyên sáng',
      image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&auto=format&fit=crop&q=80',
      aiBreakdown: {
        colorHarmony: 95,
        lightingAtmosphere: 93,
        dressCodeFit: 94,
        photoAesthetic: 94,
      },
    },
    {
      id: 'lb-5',
      rank: 5,
      name: 'S’mores Saigon Caffè',
      districtEn: 'District 3',
      districtVi: 'Quận 3',
      address: '12 Cao Thắng, Phường 5, Quận 3',
      typeEn: 'Aesthetic Cafe',
      typeVi: 'Cafe Sống Ảo',
      vibeStyleEn: 'Raw Brick & Retro Garden',
      vibeStyleVi: 'Gạch Thô & Khu Vườn Vintage',
      matchScore: 92,
      openHours: '08:00 - 22:00',
      priceRange: '55,000 - 110,000 ₫',
      photoSpotEn: 'Exposed clay brick wall & greenhouse garden',
      photoSpotVi: 'Mảng tường gạch thô & nhà kính phong cách chụp film',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80',
      aiBreakdown: {
        colorHarmony: 92,
        lightingAtmosphere: 93,
        dressCodeFit: 91,
        photoAesthetic: 92,
      },
    },
  ];

  return (
    <div className="space-y-4 flex flex-col justify-between h-full">
      {/* Header Row: Clean Title & Small Analytics Icon Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl lg:text-2xl font-black text-gray-950">
          {isEn ? 'Top Vibe Match Spots' : 'Top Điểm Đến Chuẩn Vibe'}
        </h3>

        {/* Small Analytics Icon Button */}
        <button
          onClick={() => setShowAnalyticsModal(true)}
          className="py-1.5 px-3 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border border-purple-200 group"
          title="AI Matching Analytics"
        >
          <BarChart2 className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black">
            Analytics
          </span>
        </button>
      </div>

      {/* Top 5 Leaderboard List (Fully Spanning Equal Height with Chart) */}
      <div className="space-y-2.5 flex-1 flex flex-col justify-between py-1">
        {leaderboardVenues.map((venue) => {
          const isTop1 = venue.rank === 1;
          const isTop2 = venue.rank === 2;
          const isTop3 = venue.rank === 3;
          const districtText = isEn ? venue.districtEn : venue.districtVi;
          const typeText = isEn ? venue.typeEn : venue.typeVi;

          return (
            <div
              key={venue.id}
              onClick={() => setSelectedVenue(venue)}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                isTop1
                  ? 'bg-gradient-to-r from-purple-50/70 via-pink-50/50 to-white border-purple-200 hover:border-purple-300 shadow-xs hover:shadow-md'
                  : 'bg-gray-50/90 border-gray-100 hover:border-gray-200 hover:bg-white'
              }`}
            >
              {/* Left: Rank Badge + Thumbnail + Title */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Rank Number Badge */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    isTop1
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-500 text-white shadow-xs'
                      : isTop2
                      ? 'bg-gradient-to-tr from-slate-300 to-slate-400 text-white shadow-xs'
                      : isTop3
                      ? 'bg-gradient-to-tr from-amber-600 to-amber-700 text-white shadow-xs'
                      : 'bg-gray-200/90 text-gray-700 font-extrabold'
                  }`}
                >
                  #{venue.rank}
                </div>

                {/* Venue Thumbnail Image */}
                <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-xs">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                  />
                </div>

                {/* Venue Name & District */}
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-black text-gray-950 truncate leading-snug group-hover:text-purple-600 transition-colors">
                    {venue.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] font-extrabold text-gray-600 truncate">
                      {districtText}
                    </span>
                    <span className="text-gray-300 text-[10px]">•</span>
                    <span className="text-[11px] font-bold text-gray-400 truncate">
                      {typeText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Match Score Pill & Chevron */}
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`px-2.5 py-1 rounded-full text-[11px] font-black tracking-tight ${
                    isTop1
                      ? 'bg-gradient-to-r from-[#FF2E93] to-[#7C3AED] text-white shadow-xs'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {venue.matchScore}% Match
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. VENUE FULL DETAIL MODAL                                                */}
      {/* ========================================================================= */}
      {selectedVenue && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedVenue(null)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HD Header Cover Image */}
            <div className="relative w-full h-56 sm:h-64 bg-gray-900">
              <img
                src={selectedVenue.image}
                alt={selectedVenue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedVenue(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                title={isEn ? 'Close' : 'Đóng'}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Rank & Match Score Tag */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                <span className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 font-black text-xs sm:text-sm rounded-full shadow-lg">
                  {isEn ? `Rank #${selectedVenue.rank} Top Pick` : `Hạng #${selectedVenue.rank} Đề Xuất`}
                </span>
                <span className="px-3.5 py-1.5 bg-gradient-to-r from-[#FF2E93] via-[#EC4899] to-[#7C3AED] text-white font-black text-xs sm:text-sm rounded-full shadow-lg">
                  {selectedVenue.matchScore}% Vibe Match
                </span>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-6 sm:p-7 space-y-5 max-h-[62vh] overflow-y-auto">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                  {selectedVenue.name}
                </h3>
                <p className="text-sm font-extrabold text-purple-600 mt-1">
                  {isEn ? selectedVenue.vibeStyleEn : selectedVenue.vibeStyleVi}
                </p>
              </div>

              {/* Essential Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm font-extrabold text-gray-800 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="truncate">{isEn ? selectedVenue.districtEn : selectedVenue.districtVi}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{selectedVenue.openHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">{selectedVenue.priceRange}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-pink-600 shrink-0" />
                  <span className="truncate">{isEn ? 'Top Check-in Spot' : 'Điểm Check-in Hot'}</span>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">
                  {isEn ? 'Address' : 'Địa Chỉ'}
                </span>
                <p className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 text-sm font-extrabold text-gray-900">
                  {selectedVenue.address}
                </p>
              </div>

              {/* Photo Spot Recommendation */}
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-purple-600 block">
                  {isEn ? 'Recommended Photo Spot' : 'Góc Check-in Đề Xuất'}
                </span>
                <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 text-sm text-purple-950 font-black flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{isEn ? selectedVenue.photoSpotEn : selectedVenue.photoSpotVi}</span>
                </div>
              </div>

              {/* AI Match Pillars Breakdown */}
              <div className="space-y-2.5 pt-1 border-t border-gray-100">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">
                  {isEn ? 'AI Match Breakdown' : 'Chỉ Số Ghép Nối AI'}
                </span>
                <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm font-bold">
                  <div className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between border border-gray-100">
                    <span className="text-gray-600">Color Palette</span>
                    <span className="font-black text-gray-950 text-sm">{selectedVenue.aiBreakdown.colorHarmony}%</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between border border-gray-100">
                    <span className="text-gray-600">Lighting Vibe</span>
                    <span className="font-black text-gray-950 text-sm">{selectedVenue.aiBreakdown.lightingAtmosphere}%</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between border border-gray-100">
                    <span className="text-gray-600">Dress Code</span>
                    <span className="font-black text-gray-950 text-sm">{selectedVenue.aiBreakdown.dressCodeFit}%</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between border border-gray-100">
                    <span className="text-gray-600">Photo Aesthetic</span>
                    <span className="font-black text-gray-950 text-sm">{selectedVenue.aiBreakdown.photoAesthetic}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedVenue.name + ' ' + selectedVenue.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-5 rounded-2xl bg-[#0F172A] hover:bg-black text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-xl active:scale-98 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#D4FF00]" />
                  <span>{isEn ? 'Open Directions in Google Maps' : 'Mở Chỉ Đường Google Maps'}</span>
                  <ExternalLink className="w-4 h-4 text-white/60 ml-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. AI MATCHING ANALYTICS MODAL                                            */}
      {/* ========================================================================= */}
      {showAnalyticsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowAnalyticsModal(false)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-scaleUp p-6 sm:p-7 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                    {isEn ? 'AI Vibe Match Engine' : 'Thuật Toán Gợi Ý Tọa Độ AI'}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mt-0.5">
                    {isEn
                      ? 'Visual spatial matching algorithm by Lumi Stylist'
                      : 'Thuật toán đối sánh không gian thị giác của Lumi Stylist'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-950 hover:bg-gray-100 transition-all cursor-pointer"
                title={isEn ? 'Close' : 'Đóng'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Concise Calculation Pillars */}
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">
                    {isEn ? '1. Color Palette Harmony (35%)' : '1. Bảng Màu Trang Phục (35%)'}
                  </span>
                  <span className="text-purple-600 font-black text-base">96.8%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  {isEn
                    ? 'Contrast ratio between outfit palette (Silver, Black, Neon) and venue architecture tone.'
                    : 'Đối chiếu độ tương phản bảng màu outfit (Bạc, Đen, Neon) với tone kiến trúc quán.'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">
                    {isEn ? '2. Lighting & Atmosphere (30%)' : '2. Ánh Sáng & Không Gian (30%)'}
                  </span>
                  <span className="text-emerald-600 font-black text-base">97.5%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  {isEn
                    ? 'Fabric reflectivity index calculated under ambient neon and spotlight illumination.'
                    : 'Tính toán độ bắt sáng của chất liệu vải dưới ánh đèn neon và spotlight của không gian.'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">
                    {isEn ? '3. Subculture & Dress Code (20%)' : '3. Phong Cách & Dress Code (20%)'}
                  </span>
                  <span className="text-pink-600 font-black text-base">95.0%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  {isEn
                    ? 'Aesthetic alignment between subculture style (Cyber-Pop, Y2K) and venue crowd vibe.'
                    : 'Đo lường mức độ đồng điệu giữa phong cách (Cyber-Pop, Y2K) với vibe âm nhạc của quán.'}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">
                    {isEn ? '4. Photo Angle Opportunity (15%)' : '4. Tiềm Năng Chụp Ảnh (15%)'}
                  </span>
                  <span className="text-cyan-600 font-black text-base">98.2%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  {isEn
                    ? 'Abundance of viral photo angles for OOTD, Instagram Stories, and TikTok Reels.'
                    : 'Đánh giá độ phong phú các góc chụp OOTD, Story và Reels triệu view tại địa điểm.'}
                </p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="w-full py-4 rounded-2xl bg-gray-950 hover:bg-black text-white font-black text-sm shadow-xl transition-all cursor-pointer"
              >
                {isEn ? 'Got it' : 'Đã hiểu cơ chế đề xuất'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

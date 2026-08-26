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
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Zap,
} from 'lucide-react';

interface LeaderboardVenue {
  id: string;
  rank: number;
  name: string;
  district: string;
  address: string;
  type: string;
  vibeStyle: string;
  matchScore: number;
  openHours: string;
  priceRange: string;
  photoSpot: string;
  image: string;
  aiBreakdown: {
    colorHarmony: number;
    lightingAtmosphere: number;
    dressCodeFit: number;
    photoAesthetic: number;
  };
}

export const HCMCVisualMap: React.FC = () => {
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
      district: 'Quận 1',
      address: '26 Lý Tự Trọng, Bến Nghé, Quận 1',
      type: 'Speakeasy Bar',
      vibeStyle: 'Cyber-Pop & Neon Nightlife',
      matchScore: 98,
      openHours: '18:00 - 02:00',
      priceRange: '150,000 - 350,000 ₫',
      photoSpot: 'Đường hầm laser phản quang & quầy bar kim loại titan',
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
      district: 'Quận 1',
      address: '156B Pasteur, Bến Nghé, Quận 1',
      type: 'Aesthetic Cafe',
      vibeStyle: 'Minimalist & Industrial Inox',
      matchScore: 96,
      openHours: '08:00 - 22:00',
      priceRange: '65,000 - 120,000 ₫',
      photoSpot: 'Cột bê tông nguyên khối & giếng trời ánh sáng tự nhiên',
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
      district: 'Bình Thạnh',
      address: 'Tầng 75-76 Landmark 81, Vinhomes Central Park',
      type: 'Sky Lounge',
      vibeStyle: 'Cyber Skyline & High Fashion',
      matchScore: 95,
      openHours: '09:00 - 24:00',
      priceRange: '190,000 - 450,000 ₫',
      photoSpot: 'Góc kính ngắm toàn cảnh Sông Sài Gòn ở độ cao 350m',
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
      district: 'Thảo Điền',
      address: '1 Thảo Điền, TP. Thủ Đức',
      type: 'Aesthetic Cafe',
      vibeStyle: 'Futuristic Inox & Clean Glass',
      matchScore: 94,
      openHours: '07:00 - 23:00',
      priceRange: '70,000 - 140,000 ₫',
      photoSpot: 'Bàn inox tráng gương và tường kính xuyên sáng',
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
      district: 'Quận 3',
      address: '12 Cao Thắng, Phường 5, Quận 3',
      type: 'Aesthetic Cafe',
      vibeStyle: 'Raw Brick & Retro Garden',
      matchScore: 92,
      openHours: '08:00 - 22:00',
      priceRange: '55,000 - 110,000 ₫',
      photoSpot: 'Mảng tường gạch thô & nhà kính phong cách chụp film',
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
      {/* Header Row: Clean Title (No Emojis) & Small Analytics Icon Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl lg:text-2xl font-black text-gray-950">
          Top Vibe Match Spots
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
                      {venue.district}
                    </span>
                    <span className="text-gray-300 text-[10px]">•</span>
                    <span className="text-[11px] font-bold text-gray-400 truncate">
                      {venue.type}
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
      {/* 1. VENUE FULL DETAIL MODAL (Spacious, Large Fonts, Concise Curated Info)  */}
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
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Rank & Match Score Tag */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                <span className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 font-black text-xs sm:text-sm rounded-full shadow-lg">
                  Rank #{selectedVenue.rank} Top Pick
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
                  {selectedVenue.vibeStyle}
                </p>
              </div>

              {/* Essential Details Grid (Large Icons & Text) */}
              <div className="grid grid-cols-2 gap-3 text-sm font-extrabold text-gray-800 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="truncate">{selectedVenue.district}</span>
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
                  <span className="truncate">Top Spot Check-in</span>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">
                  Địa Chỉ
                </span>
                <p className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 text-sm font-extrabold text-gray-900">
                  {selectedVenue.address}
                </p>
              </div>

              {/* Photo Spot Recommendation */}
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-purple-600 block">
                  Góc Check-in Đề Xuất
                </span>
                <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 text-sm text-purple-950 font-black flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{selectedVenue.photoSpot}</span>
                </div>
              </div>

              {/* AI Match Pillars Breakdown */}
              <div className="space-y-2.5 pt-1 border-t border-gray-100">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">
                  Chỉ Số Ghép Nối AI
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
                  <span>Mở Chỉ Đường Google Maps</span>
                  <ExternalLink className="w-4 h-4 text-white/60 ml-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. AI MATCHING ANALYTICS MODAL (Concise, Clean Typography, Spacious)      */}
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
                    AI Vibe Match Engine
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mt-0.5">
                    Thuật toán đối sánh không gian thị giác của Lumi Stylist
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-950 hover:bg-gray-100 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Concise, High-Impact Calculation Pillars */}
            <div className="space-y-3">
              {/* Pillar 1 */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">1. Color Palette Harmony (35%)</span>
                  <span className="text-purple-600 font-black text-base">96.8%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Đối chiếu độ tương phản bảng màu outfit (Bạc, Đen, Neon) với tone kiến trúc quán.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">2. Lighting & Atmosphere (30%)</span>
                  <span className="text-emerald-600 font-black text-base">97.5%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Tính toán độ bắt sáng của chất liệu vải dưới ánh đèn neon và spotlight của không gian.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">3. Subculture & Dress Code (20%)</span>
                  <span className="text-pink-600 font-black text-base">95.0%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Đo lường mức độ đồng điệu giữa phong cách (Cyber-Pop, Y2K) với vibe âm nhạc của quán.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between font-black text-sm sm:text-base">
                  <span className="text-gray-950">4. Photo Angle Opportunity (15%)</span>
                  <span className="text-cyan-600 font-black text-base">98.2%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Đánh giá độ phong phú các góc chụp OOTD, Story và Reels triệu view tại địa điểm.
                </p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowAnalyticsModal(false)}
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

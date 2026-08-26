import React, { useState } from 'react';
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
    <div className="space-y-4 relative">
      {/* Header Row: Clean Title (No Emojis) & Small Analytics Icon Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl lg:text-2xl font-black text-gray-950">
          Top Vibe Match Spots
        </h3>

        {/* Small Analytics Icon Button */}
        <button
          onClick={() => setShowAnalyticsModal(true)}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-950 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs group"
          title="AI Matching Analytics"
        >
          <BarChart2 className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-black hidden sm:inline text-gray-700">
            Analytics
          </span>
        </button>
      </div>

      {/* Top 5 Leaderboard List Container (Perfect Height Matching Multi-Line Chart) */}
      <div className="space-y-2.5 h-72 sm:h-80 flex flex-col justify-between overflow-hidden">
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
                  ? 'bg-gradient-to-r from-purple-50/60 via-pink-50/40 to-white border-purple-200/80 hover:border-purple-300 shadow-xs hover:shadow-md'
                  : 'bg-gray-50/80 border-gray-100 hover:border-gray-200 hover:bg-white'
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
                      : 'bg-gray-200/80 text-gray-600'
                  }`}
                >
                  #{venue.rank}
                </div>

                {/* Venue Thumbnail Image */}
                <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
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
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-extrabold text-gray-500 truncate">
                      {venue.district}
                    </span>
                    <span className="text-gray-300 text-[10px]">•</span>
                    <span className="text-[10px] font-bold text-gray-400 truncate">
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
      {/* 1. VENUE FULL DETAIL MODAL (Opens on Leaderboard Item Click)              */}
      {/* ========================================================================= */}
      {selectedVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-scaleUp">
            {/* HD Header Cover Image with Rank & Close Button */}
            <div className="relative w-full h-48 bg-gray-900">
              <img
                src={selectedVenue.image}
                alt={selectedVenue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedVenue(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Rank & Match Score Tag */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 font-black text-xs rounded-full shadow-md">
                  Rank #{selectedVenue.rank} Top Pick
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-[#FF2E93] to-[#7C3AED] text-white font-black text-xs rounded-full shadow-md">
                  {selectedVenue.matchScore}% Vibe Match
                </span>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <h3 className="text-xl font-black text-gray-950">
                  {selectedVenue.name}
                </h3>
                <p className="text-xs font-bold text-purple-600 mt-0.5">
                  {selectedVenue.vibeStyle}
                </p>
              </div>

              {/* Essential Details Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs font-extrabold text-gray-700 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="truncate">{selectedVenue.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{selectedVenue.openHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">{selectedVenue.priceRange}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-pink-600 shrink-0" />
                  <span className="truncate">Top Spot Check-in</span>
                </div>
              </div>

              {/* Address */}
              <div className="text-xs text-gray-600 space-y-1">
                <span className="font-black text-gray-900 block">Địa chỉ:</span>
                <p className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  {selectedVenue.address}
                </p>
              </div>

              {/* Photo Spot Recommendation */}
              <div className="text-xs text-gray-600 space-y-1">
                <span className="font-black text-gray-900 block">Góc chụp ảnh đề xuất:</span>
                <p className="bg-purple-50/60 p-2.5 rounded-xl border border-purple-100 text-purple-950 font-bold">
                  {selectedVenue.photoSpot}
                </p>
              </div>

              {/* AI Match Pillars Breakdown */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block">
                  AI Vibe Match Breakdown
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="bg-gray-50 p-2 rounded-xl flex justify-between">
                    <span className="text-gray-500">Color Palette</span>
                    <span className="font-black text-gray-950">{selectedVenue.aiBreakdown.colorHarmony}%</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl flex justify-between">
                    <span className="text-gray-500">Lighting</span>
                    <span className="font-black text-gray-950">{selectedVenue.aiBreakdown.lightingAtmosphere}%</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl flex justify-between">
                    <span className="text-gray-500">Dress Code</span>
                    <span className="font-black text-gray-950">{selectedVenue.aiBreakdown.dressCodeFit}%</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl flex justify-between">
                    <span className="text-gray-500">Photo Aesthetic</span>
                    <span className="font-black text-gray-950">{selectedVenue.aiBreakdown.photoAesthetic}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedVenue.name + ' ' + selectedVenue.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl active:scale-98 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#D4FF00]" />
                  <span>Mở Chỉ Đường Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/60 ml-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. AI MATCHING ANALYTICS MODAL (Opens on small Analytics Icon Click)       */}
      {/* ========================================================================= */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-scaleUp p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-950">
                    AI Vibe Match Engine
                  </h3>
                  <p className="text-[11px] font-bold text-gray-500">
                    Cơ chế tính điểm đề xuất địa điểm
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-950 hover:bg-gray-100 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content: 4 Key Calculation Pillars */}
            <div className="space-y-3 text-xs">
              <p className="text-gray-600 leading-relaxed font-semibold">
                Lumi AI Stylist sử dụng thuật toán đối sánh không gian thị giác để ghép nối outfit hôm nay của bạn với các tọa độ có vibe tương đồng cao nhất:
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-gray-50 rounded-2xl space-y-1">
                  <div className="flex justify-between font-black text-gray-950">
                    <span>1. Color Palette Harmony (35%)</span>
                    <span className="text-purple-600">96.8%</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Đối chiếu tương phản giữa bảng màu trang phục (Bạc, Đen, Neon) với ánh sáng và tone kiến trúc của quán.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl space-y-1">
                  <div className="flex justify-between font-black text-gray-950">
                    <span>2. Lighting & Atmosphere (30%)</span>
                    <span className="text-emerald-600">97.5%</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Tính toán độ phù hợp ánh sáng (Neon, tự nhiên, spotlight) để chất liệu vải lên ảnh đẹp nhất.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl space-y-1">
                  <div className="flex justify-between font-black text-gray-950">
                    <span>3. Subculture & Dress Code (20%)</span>
                    <span className="text-pink-600">95.0%</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Độ tương thích giữa phong cách (Cyber-Pop, Y2K) với cộng đồng khách và âm nhạc tại địa điểm.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl space-y-1">
                  <div className="flex justify-between font-black text-gray-950">
                    <span>4. Photo Angle Opportunity (15%)</span>
                    <span className="text-cyan-600">98.2%</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Độ phong phú của các góc chụp OOTD / Story / Reels tại địa điểm.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="w-full py-3 rounded-2xl bg-gray-950 hover:bg-black text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer"
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

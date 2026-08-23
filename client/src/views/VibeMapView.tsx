import React from 'react';
import { MapPin, Clock, Camera, Sparkles, Navigation, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import type { Location, PlaceRecommendationResponse, WeatherContext } from '../types/entityGraph.js';
import { WeatherBadge } from '../components/common/WeatherBadge.js';
import { LumiAvatar } from '../components/common/LumiAvatar.js';

interface VibeMapViewProps {
  recommendationData: PlaceRecommendationResponse;
  weather: WeatherContext;
  onToggleRain: () => void;
  onSelectPlace: (place: Location) => void;
  onGoToPhotobooth: () => void;
}

export const VibeMapView: React.FC<VibeMapViewProps> = ({
  recommendationData,
  weather,
  onToggleRain,
  onSelectPlace,
  onGoToPhotobooth,
}) => {
  const { recommendedPlaces, lumiSuggestion, aestheticTag } = recommendationData;

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#7C3AED]">
            AuraLens Experience Map
          </span>
          <h2 className="text-xl font-black text-gray-900">
            Địa Điểm Tone-Sur-Tone 📍
          </h2>
        </div>

        <span className="px-3 py-1 bg-[#D4FF00] text-black font-extrabold text-xs rounded-full shadow-sm">
          {aestheticTag}
        </span>
      </div>

      {/* Real-time Weather & Grounding Badge */}
      <WeatherBadge weather={weather} onToggleRain={onToggleRain} />

      {/* Lumi's Weather-aware Suggestion */}
      <LumiAvatar comment={lumiSuggestion} isSpeaking={true} size="md" />

      {/* Place Feed List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
            Gợi Ý Quán Hợp Gu Đang Mở Cửa ({recommendedPlaces.length})
          </span>
          <span className="text-[10px] text-gray-400 font-bold">Chạm để xem góc sống ảo</span>
        </div>

        {recommendedPlaces.map((place) => (
          <div
            key={place.id}
            onClick={() => onSelectPlace(place)}
            className="glass-card rounded-3xl overflow-hidden border border-white/90 shadow-md hover:shadow-xl active:scale-99 transition-all cursor-pointer group"
          >
            {/* Image Header */}
            <div className="relative w-full h-44 bg-gray-900 overflow-hidden">
              <img
                src={place.imageUrl}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 bg-[#D4FF00] text-black font-extrabold text-[10px] rounded-full shadow-md">
                  {place.aestheticTag}
                </span>
                <span
                  className={`px-2 py-0.5 text-white font-bold text-[10px] rounded-full backdrop-blur-md ${
                    place.isIndoor ? 'bg-blue-600/80' : 'bg-amber-600/80'
                  }`}
                >
                  {place.isIndoor ? '❄️ Máy Lạnh' : '🌿 View Ngoài Trời'}
                </span>
              </div>

              {/* Match Score Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md text-[#00F5FF] font-black text-xs rounded-full border border-[#00F5FF]/30">
                {place.matchScore ?? 96}% Hợp Vibe
              </div>

              {/* Place Name & District */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold uppercase text-gray-300 block">
                  {place.type} · {place.gps.district}
                </span>
                <h3 className="text-base font-extrabold text-white leading-snug drop-shadow-sm">
                  {place.name}
                </h3>
              </div>
            </div>

            {/* Place Highlights */}
            <div className="p-4 space-y-2.5 bg-white/70">
              <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-relaxed">
                "{place.vibeDescription}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7C3AED]" />
                  {place.openHours.open}:00 - {place.openHours.close}:00
                </span>

                <span className="text-[#FF2E93] font-bold flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" />
                  Xem góc chụp
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA To Photobooth Studio */}
      <div className="pt-2">
        <button
          onClick={onGoToPhotobooth}
          className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#FF2E93] via-[#7C3AED] to-[#00F5FF] text-white font-black text-sm shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Camera className="w-5 h-5 fill-white" />
          <span>Đến Quán Chụp Photobooth Kỷ Niệm 📸</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

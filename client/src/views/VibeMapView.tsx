import React from 'react';
import { MapPin, Clock, Camera, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
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
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header & Context Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
            AuraLens Itinerary &amp; Map
          </span>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-950">
            Tone-Sur-Tone Verified Spots 📍
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 bg-gray-950 text-[#D4FF00] font-extrabold text-xs rounded-full shadow-xs">
            {aestheticTag} Vibe
          </span>
          <button
            onClick={onGoToPhotobooth}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Launch Photobooth Studio</span>
          </button>
        </div>
      </div>

      {/* Top Dashboard Row: Weather Widget + Lumi Suggestion side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-5">
          <WeatherBadge weather={weather} onToggleRain={onToggleRain} />
        </div>
        <div className="lg:col-span-7">
          <LumiAvatar comment={lumiSuggestion} isSpeaking={true} size="md" />
        </div>
      </div>

      {/* Place Feed: Multi-Column Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
            Recommended Spots ({recommendedPlaces.length} Open Now)
          </span>
          <span className="text-[10px] text-gray-400 font-semibold">
            Click card to view photo spots &amp; signature drinks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => onSelectPlace(place)}
              className="calm-card-elevated rounded-3xl overflow-hidden hover:shadow-xl active:scale-99 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Image Header */}
              <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 bg-white text-gray-900 font-bold text-[10px] rounded-full shadow-xs">
                    {place.aestheticTag}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-white font-bold text-[10px] rounded-full backdrop-blur-md ${
                      place.isIndoor ? 'bg-blue-600/85' : 'bg-amber-600/85'
                    }`}
                  >
                    {place.isIndoor ? '❄️ Indoor AC' : '🌿 Open Outdoor'}
                  </span>
                </div>

                {/* Match Score Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-[#D4FF00] font-black text-xs rounded-full border border-white/10">
                  {place.matchScore ?? 96}% Match
                </div>

                {/* Place Name & District */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-semibold text-gray-300 block">
                    {place.type} · {place.gps.district}
                  </span>
                  <h3 className="text-base font-extrabold text-white leading-snug drop-shadow-sm truncate">
                    {place.name}
                  </h3>
                </div>
              </div>

              {/* Place Highlights */}
              <div className="p-4 space-y-2.5 bg-white flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  "{place.vibeDescription}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    {place.openHours.open}:00 - {place.openHours.close}:00
                  </span>

                  <span className="text-gray-900 font-bold flex items-center gap-1 group-hover:text-purple-600 transition-colors">
                    <Camera className="w-3.5 h-3.5 text-[#FF2E93]" />
                    Photo spots
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA to Photobooth (on mobile) */}
      <div className="pt-2 sm:hidden">
        <button
          onClick={onGoToPhotobooth}
          className="w-full py-4 px-4 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Camera className="w-4 h-4 text-[#D4FF00]" />
          <span>Launch Photobooth Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

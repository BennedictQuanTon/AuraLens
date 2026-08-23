import React from 'react';
import { MapPin, Clock, Camera, Sparkles, ArrowRight } from 'lucide-react';
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
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            AuraLens Itinerary
          </span>
          <h2 className="text-xl font-black text-gray-900">
            Tone-Sur-Tone Places 📍
          </h2>
        </div>

        <span className="px-3 py-1 bg-gray-900 text-[#D4FF00] font-bold text-xs rounded-full shadow-xs">
          {aestheticTag}
        </span>
      </div>

      {/* Real-time Weather & Grounding Badge */}
      <WeatherBadge weather={weather} onToggleRain={onToggleRain} />

      {/* Lumi's Weather-aware Suggestion */}
      <LumiAvatar comment={lumiSuggestion} isSpeaking={true} size="md" />

      {/* Place Feed List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
            Recommended Spots ({recommendedPlaces.length})
          </span>
          <span className="text-[10px] text-gray-400">Tap card to view spot</span>
        </div>

        {recommendedPlaces.map((place) => (
          <div
            key={place.id}
            onClick={() => onSelectPlace(place)}
            className="calm-card-elevated rounded-3xl overflow-hidden hover:shadow-lg active:scale-99 transition-all cursor-pointer group"
          >
            {/* Image Header */}
            <div className="relative w-full h-44 bg-gray-900 overflow-hidden">
              <img
                src={place.imageUrl}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 bg-white text-gray-900 font-bold text-[10px] rounded-full shadow-xs">
                  {place.aestheticTag}
                </span>
                <span
                  className={`px-2 py-0.5 text-white font-bold text-[10px] rounded-full backdrop-blur-md ${
                    place.isIndoor ? 'bg-blue-600/80' : 'bg-amber-600/80'
                  }`}
                >
                  {place.isIndoor ? '❄️ Indoor' : '🌿 Outdoor'}
                </span>
              </div>

              {/* Match Score Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-[#D4FF00] font-black text-xs rounded-full">
                {place.matchScore ?? 96}% Match
              </div>

              {/* Place Name & District */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-semibold text-gray-300 block">
                  {place.type} · {place.gps.district}
                </span>
                <h3 className="text-base font-extrabold text-white leading-snug drop-shadow-sm">
                  {place.name}
                </h3>
              </div>
            </div>

            {/* Place Highlights */}
            <div className="p-3.5 space-y-2 bg-white">
              <p className="text-xs text-gray-600 line-clamp-1">
                "{place.vibeDescription}"
              </p>

              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  {place.openHours.open}:00 - {place.openHours.close}:00
                </span>

                <span className="text-gray-900 font-bold flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-[#FF2E93]" />
                  Photo spot
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
          className="w-full py-3.5 px-4 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4 text-[#D4FF00]" />
          <span>Launch Photobooth Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

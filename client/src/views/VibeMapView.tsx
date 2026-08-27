import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, List, Map as MapIcon, X, Shirt, MapPin, Sun, CloudRain, Moon } from 'lucide-react';
import type { Location, PlaceRecommendationResponse, WeatherContext, AIMapAnalysisResponse } from '../types/entityGraph.js';
import type { AppLanguage } from '../types/settings.js';
import { MapViewMock } from '../components/common/MapViewMock.js';
import { InteractiveMapView } from '../components/common/InteractiveMapView.js';
import { apiService } from '../services/api.js';

interface VibeMapViewProps {
  recommendationData: PlaceRecommendationResponse;
  weather: WeatherContext;
  language?: AppLanguage;
  onToggleRain: () => void;
  onSelectPlace: (place: Location) => void;
  onGoToPhotobooth: () => void;
}

export const VibeMapView: React.FC<VibeMapViewProps> = ({
  recommendationData,
  weather,
  language = 'en',
  onSelectPlace,
  onGoToPhotobooth,
}) => {
  const { recommendedPlaces, aestheticTag } = recommendationData;
  const isEn = language === 'en';

  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<AIMapAnalysisResponse | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const report = await apiService.analyzeMapAI({
        aestheticTag,
        weather,
        language,
      });
      setAiReport(report);
      setShowReport(true);
    } catch (err) {
      console.error('Error analyzing map with AI:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Weather Theme Resolver (Sunlit Day vs Cool Rain vs Midnight Glow)
  const isRain = weather.isRaining;
  const isDaytime = weather.currentHour >= 6 && weather.currentHour < 18;

  const getThemeClasses = () => {
    if (isRain) {
      return {
        container: 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border-2 border-cyan-400/40 shadow-2xl',
        card: 'bg-white/10 border border-white/15 text-gray-100',
        weatherIcon: <CloudRain className="w-5 h-5 text-cyan-400" />,
        weatherTitle: 'text-cyan-400',
        outfitIcon: <Shirt className="w-5 h-5 text-[#00F5FF]" />,
        outfitTitle: 'text-[#00F5FF]',
        spotIcon: <MapPin className="w-5 h-5 text-pink-400" />,
        spotTitle: 'text-pink-400',
        quote: 'text-cyan-300 font-bold',
        quoteBox: 'border-t border-white/15',
        closeBtn: 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white',
      };
    }

    if (isDaytime) {
      return {
        container: 'bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-yellow-50/95 text-gray-900 border-2 border-amber-300/80 shadow-2xl',
        card: 'bg-white/90 border border-amber-200/90 text-gray-800 shadow-xs',
        weatherIcon: <Sun className="w-5 h-5 text-amber-600" />,
        weatherTitle: 'text-amber-700',
        outfitIcon: <Shirt className="w-5 h-5 text-purple-700" />,
        outfitTitle: 'text-purple-700',
        spotIcon: <MapPin className="w-5 h-5 text-pink-600" />,
        spotTitle: 'text-pink-700',
        quote: 'text-amber-950 font-black',
        quoteBox: 'border-t border-amber-200/80 bg-amber-100/50 p-2.5 rounded-2xl',
        closeBtn: 'bg-amber-200/60 hover:bg-amber-300 text-gray-700 hover:text-gray-950',
      };
    }

    // Evening / Night
    return {
      container: 'bg-gradient-to-br from-slate-950 via-purple-950/90 to-gray-950 text-white border-2 border-purple-500/40 shadow-2xl',
      card: 'bg-white/5 border border-white/10 text-gray-200',
      weatherIcon: <Moon className="w-5 h-5 text-[#D4FF00]" />,
      weatherTitle: 'text-[#D4FF00]',
      outfitIcon: <Shirt className="w-5 h-5 text-[#00F5FF]" />,
      outfitTitle: 'text-[#00F5FF]',
      spotIcon: <MapPin className="w-5 h-5 text-[#FF2E93]" />,
      spotTitle: 'text-[#FF2E93]',
      quote: 'text-[#D4FF00] font-bold',
      quoteBox: 'border-t border-white/10',
      closeBtn: 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white',
    };
  };

  const theme = getThemeClasses();

  return (
    <div className="space-y-5 animate-fadeIn pb-16 max-w-6xl w-full mx-auto px-2 sm:px-4">
      
      {/* ========================================================================= */}
      {/* TOP CONTROLLER BAR: MAP/LIST TOGGLE + AI ANALYZE BUTTON                   */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {/* View Mode Toggle (Map vs List) */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-gray-100/90 backdrop-blur-md border border-gray-200/80 shadow-xs">
          <button
            onClick={() => setViewMode('map')}
            className={`py-2 px-5 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              viewMode === 'map'
                ? 'bg-[#D4FF00] text-gray-950 shadow-[0_0_15px_rgba(212,255,0,0.5)] scale-102'
                : 'text-gray-600 hover:text-gray-950 hover:bg-gray-200'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>{isEn ? 'Map' : 'Bản Đồ'}</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`py-2 px-5 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#D4FF00] text-gray-950 shadow-[0_0_15px_rgba(212,255,0,0.5)] scale-102'
                : 'text-gray-600 hover:text-gray-950 hover:bg-gray-200'
            }`}
          >
            <List className="w-4 h-4" />
            <span>{isEn ? `List (${recommendedPlaces.length})` : `Danh Sách (${recommendedPlaces.length})`}</span>
          </button>
        </div>

        {/* AI Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="py-2.5 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:to-pink-700 text-white font-black text-xs sm:text-sm shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>{isEn ? 'Analyzing...' : 'Đang Phân Tích...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#D4FF00]" />
              <span>{isEn ? 'Analyze' : 'Phân Tích'}</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* AI ANALYZE REPORT CARD (Lumi Stylist & Adaptive Weather Theme)            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showReport && aiReport && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className={`p-6 sm:p-7 rounded-3xl relative overflow-hidden transition-colors duration-500 ${theme.container}`}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowReport(false)}
              className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${theme.closeBtn}`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header: Lumi Stylist */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/80 shadow-md shrink-0 bg-white">
                <img
                  src="/lumi.png"
                  alt="Lumi Stylist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-black text-lg sm:text-xl leading-tight">
                  {isEn ? 'Lumi Stylist & Weather Report' : 'Lumi Stylist & Dự Báo Thời Tiết'}
                </h3>
              </div>
            </div>

            {/* 3 Insight Blocks with Bullet Points & Larger Fonts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              
              {/* 1. Today Weather */}
              <div className={`p-5 rounded-2xl space-y-2.5 ${theme.card}`}>
                <div className="flex items-center gap-2">
                  {theme.weatherIcon}
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${theme.weatherTitle}`}>
                    {isEn ? 'Today Weather' : 'Thời Tiết Hôm Nay'}
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed font-semibold">
                  <li className="font-bold flex items-start gap-1.5">
                    <span className="shrink-0">•</span>
                    <span>{isEn ? 'Date:' : 'Ngày:'} {aiReport.dateStr || (isEn ? 'Aug 27, 2026' : '27/08/2026')}</span>
                  </li>
                  {aiReport.weatherBullets && aiReport.weatherBullets.length > 0 ? (
                    aiReport.weatherBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-1.5">
                      <span className="shrink-0">•</span>
                      <span>{aiReport.weatherSummary}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* 2. Outfit Directive */}
              <div className={`p-5 rounded-2xl space-y-2.5 ${theme.card}`}>
                <div className="flex items-center gap-2">
                  {theme.outfitIcon}
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${theme.outfitTitle}`}>
                    {isEn ? 'Outfit Directive' : 'Gợi Ý Mặc Đồ'}
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed font-semibold">
                  {aiReport.outfitBullets && aiReport.outfitBullets.length > 0 ? (
                    aiReport.outfitBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-1.5">
                      <span className="shrink-0">•</span>
                      <span>{aiReport.outfitAdvice}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* 3. Matching Hotspots */}
              <div className={`p-5 rounded-2xl space-y-2.5 ${theme.card}`}>
                <div className="flex items-center gap-2">
                  {theme.spotIcon}
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${theme.spotTitle}`}>
                    {isEn ? 'Matching Hotspots' : 'Địa Điểm Nên Ghé'}
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed font-semibold">
                  {aiReport.destinationBullets && aiReport.destinationBullets.length > 0 ? (
                    aiReport.destinationBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-1.5">
                      <span className="shrink-0">•</span>
                      <span>{aiReport.destinationRec}</span>
                    </li>
                  )}
                </ul>
              </div>

            </div>

            {/* Lumi Commentary Quote (Clean without bottom spot chips) */}
            <div className={`pt-3 ${theme.quoteBox}`}>
              <p className={`text-xs sm:text-sm leading-relaxed italic ${theme.quote}`}>
                "{aiReport.lumiComment}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT: ANIMATED MAP VIEW OR PINTEREST LIST GRID                    */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        {viewMode === 'map' ? (
          <motion.div
            key="map-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <InteractiveMapView
              weather={weather}
              language={language}
              onSelectPlace={onSelectPlace}
              onGoToPhotobooth={onGoToPhotobooth}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
                {isEn ? `Recommended Spots (${recommendedPlaces.length} Open Now)` : `Địa Điểm Đề Xuất (${recommendedPlaces.length} Quán Đang Mở)`}
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                {isEn ? 'Click card to view photo spots & signature drinks' : 'Bấm vào thẻ để xem góc chụp ảnh & thức uống đặc trưng'}
              </span>
            </div>

            {/* Place Feed: Pinterest Multi-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendedPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => onSelectPlace(place)}
                  className="calm-card-elevated rounded-3xl overflow-hidden hover:shadow-xl active:scale-99 transition-all cursor-pointer group flex flex-col justify-between bg-white border border-gray-100"
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

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {place.vibeDescription}
                    </p>

                    <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-500 font-semibold">
                        <span className="text-gray-400">🍹 Signature:</span>
                        <span className="font-bold text-gray-800 truncate">{place.signatureDrinkOrDish}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 font-semibold">
                        <span className="text-gray-400">📸 Photo Spot:</span>
                        <span className="font-bold text-gray-800 truncate">{place.bestPhotoSpot}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

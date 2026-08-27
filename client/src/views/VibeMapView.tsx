import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, List, Map as MapIcon, X, Shirt, MapPin, Sun, CloudRain, ChevronRight, Compass, Info } from 'lucide-react';
import type { Location, PlaceRecommendationResponse, WeatherContext, AIMapAnalysisResponse } from '../types/entityGraph.js';
import type { AppLanguage } from '../types/settings.js';
import { InteractiveMapView } from '../components/common/InteractiveMapView.js';
import { MapInfoModal } from '../components/sheets/MapInfoModal.js';
import { MOCK_HCMC_LOCATIONS } from '../data/mockLocations.js';
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
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [aiReport, setAiReport] = useState<AIMapAnalysisResponse | null>(null);
  const [showReport, setShowReport] = useState(false);

  // Synchronize & bilingualize recommended places
  const displayPlaces = useMemo(() => {
    return recommendedPlaces.map((place) => {
      const match = MOCK_HCMC_LOCATIONS.find(
        (m) =>
          m.id === place.id ||
          m.name.toLowerCase().includes(place.name.toLowerCase()) ||
          place.name.toLowerCase().includes(m.name.toLowerCase())
      );
      if (match) {
        return {
          ...place,
          name: isEn ? (match.name_en || match.name) : match.name,
          gps: {
            ...place.gps,
            district: isEn ? (match.district_mock_en || match.district_mock) : match.district_mock,
          },
          address: isEn ? (match.address_mock_en || match.address_mock) : match.address_mock,
          vibeDescription: isEn ? match.vibe_description_en : match.vibe_description,
          signatureDrinkOrDish: isEn ? match.signature_item_en : match.signature_item,
          bestPhotoSpot: isEn ? match.best_photo_spot_en : match.best_photo_spot,
          imageUrl: match.photo_url,
          matchScore: match.match_score || place.matchScore || 96,
        };
      }
      return place;
    });
  }, [recommendedPlaces, isEn]);

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
      setHasAnalyzed(true);
    } catch (err) {
      console.error('Error analyzing map with AI:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Weather Theme Resolver (Clean Xám Trắng / Frosted White Slate)
  const isRain = weather.isRaining;

  const getThemeClasses = () => {
    return {
      container: 'bg-white/95 backdrop-blur-2xl text-gray-950 border border-gray-200 shadow-2xl',
      card: 'bg-gray-50/90 border border-gray-200/90 text-gray-900 shadow-xs',
      weatherIcon: isRain ? <CloudRain className="w-5 h-5 text-cyan-600" /> : <Sun className="w-5 h-5 text-amber-500" />,
      weatherTitle: isRain ? 'text-cyan-700' : 'text-amber-700',
      outfitIcon: <Shirt className="w-5 h-5 text-purple-600" />,
      outfitTitle: 'text-purple-700',
      spotIcon: <MapPin className="w-5 h-5 text-pink-600" />,
      spotTitle: 'text-pink-700',
      quote: 'text-gray-900 font-bold',
      quoteBox: 'border-t border-gray-200/80 bg-gray-100/60 p-3.5 rounded-2xl',
      closeBtn: 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-950',
    };
  };

  const theme = getThemeClasses();

  return (
    <div className="space-y-6 animate-fadeIn pb-16 max-w-6xl w-full mx-auto px-2 sm:px-4">
      
      {/* ========================================================================= */}
      {/* TOP CONTROLLER BAR: MAP/LIST TOGGLE + INFO (i) + AI ANALYZE BUTTON        */}
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
            <span>{isEn ? `List (${hasAnalyzed ? displayPlaces.length : 0})` : `Danh Sách (${hasAnalyzed ? displayPlaces.length : 0})`}</span>
          </button>
        </div>

        {/* Right Controller: Gray Info Button (i) + AI Analyze Action Button */}
        <div className="flex items-center gap-2">
          {/* Info Button (i) */}
          <button
            onClick={() => setIsInfoOpen(true)}
            className="w-10 h-10 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-950 flex items-center justify-center border border-gray-200/90 shadow-xs transition-all cursor-pointer active:scale-95 group"
            title={isEn ? 'AI & Map Architecture Info' : 'Thông tin AI & Kiến trúc bản đồ'}
          >
            <Info className="w-4 h-4 text-gray-600 group-hover:text-gray-950 transition-colors" />
          </button>

          {/* AI Analyze Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-95 text-white font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Sparkles className={`w-4 h-4 text-[#D4FF00] ${isAnalyzing ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
            <span>{isAnalyzing ? (isEn ? 'Analyzing...' : 'Đang phân tích...') : 'Analyze'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MAIN VIEWPORT: ANIMATED MAP VIEW OR PINTEREST LIST GRID                */}
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
              hasAnalyzed={hasAnalyzed}
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
            {hasAnalyzed ? (
              <>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
                    {isEn ? `Recommended Spots (${displayPlaces.length} Open Now)` : `Địa Điểm Đề Xuất (${displayPlaces.length} Quán Đang Mở)`}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    {isEn ? 'Click "View Info" to view photo spots & signature drinks' : 'Bấm "Xem Chi Tiết" để xem góc chụp ảnh & thức uống đặc trưng'}
                  </span>
                </div>

                {/* Place Feed: Pinterest Multi-Column Grid (Image 3 Redesign) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayPlaces.map((place) => (
                    <div
                      key={place.id}
                      onClick={() => onSelectPlace(place)}
                      className="calm-card-elevated rounded-3xl overflow-hidden hover:shadow-xl active:scale-99 transition-all cursor-pointer group flex flex-col justify-between bg-white border border-gray-200/90 shadow-sm"
                    >
                      {/* Clean Image Header (NO Badges, NO Overlay Clutter) */}
                      <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
                        <img
                          src={place.imageUrl}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Card Body: Place Name, Score, Vibe & Action Button (No Category Tag, Larger Typography) */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          {/* Top Row: Place Name & Match Score Badge */}
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base sm:text-lg font-black text-gray-950 leading-tight flex-1">
                              {place.name}
                            </h3>
                            <span className="px-2.5 py-1 rounded-full bg-gray-950 text-[#D4FF00] text-xs font-black shrink-0 shadow-xs">
                              {place.matchScore ?? 96}% Match
                            </span>
                          </div>

                          {/* Vibe Description (Large, Clean & Readable) */}
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium line-clamp-2">
                            {place.vibeDescription}
                          </p>
                        </div>

                        {/* View Info Action Button */}
                        <div className="pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPlace(place);
                            }}
                            className="w-full py-3 px-4 rounded-xl bg-gray-950 hover:bg-black text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                          >
                            <span>{isEn ? 'View Info' : 'Xem Chi Tiết'}</span>
                            <ChevronRight className="w-4 h-4 text-[#D4FF00]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white border border-gray-200 shadow-xl space-y-3">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-700 mx-auto flex items-center justify-center shadow-inner">
                  <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                <h3 className="text-lg font-black text-gray-950">
                  {isEn ? 'Discover Hand-Picked Vibe Spots' : 'Khám Phá Quán Chuẩn Gu Của Bạn'}
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto font-medium">
                  {isEn
                    ? 'Tap the "Analyze" button at the top right to let Lumi scan current weather and curate matching local spots!'
                    : 'Bấm nút "Analyze" ở góc trên bên phải để Lumi quét thời tiết và gợi ý các địa điểm chuẩn tone-sur-tone!'}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. LUMI AI WEATHER & STYLING INTELLIGENCE REPORT (BELOW THE MAP)          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showReport && aiReport && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`p-6 sm:p-7 rounded-3xl space-y-6 ${theme.container}`}
          >
            {/* Header: Mascot Avatar & Title */}
            <div className="flex items-center justify-between pb-2 border-b border-current/10">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl bg-white/20 p-1 backdrop-blur-md shadow-md border border-white/20 shrink-0">
                  <img
                    src="/lumi.png"
                    alt="Lumi Mascot"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                    Lumi Stylist & Weather Report
                  </h3>
                  <p className="text-xs font-semibold opacity-75 mt-0.5">
                    {isEn ? 'AI-Powered Fashion & Real-Time Weather Grounding' : 'Báo Cáo Thời Tiết & Định Hướng Outfit Từ Lumi'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowReport(false)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${theme.closeBtn}`}
                title={isEn ? 'Close report' : 'Đóng báo cáo'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3 Insight Cards (Bullet Points + Larger Font) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* 1. Today Weather */}
              <div className={`p-5 rounded-2xl space-y-2.5 ${theme.card}`}>
                <div className="flex items-center gap-2">
                  {theme.weatherIcon}
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${theme.weatherTitle}`}>
                    {isEn ? 'Today Weather' : 'Thời Tiết Hôm Nay'}
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed font-semibold">
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
                    {isEn ? 'Outfit Directive' : 'Định Hướng Lên Đồ'}
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
                      <span>{aiReport.outfitDirective}</span>
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

            {/* Lumi Commentary Quote */}
            <div className={theme.quoteBox}>
              <p className={`text-xs sm:text-sm leading-relaxed italic ${theme.quote}`}>
                "{aiReport.lumiComment}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. MAP & AI ARCHITECTURE INFO MODAL (i Button)                            */}
      {/* ========================================================================= */}
      <MapInfoModal
        isOpen={isInfoOpen}
        language={language}
        onClose={() => setIsInfoOpen(false)}
      />

    </div>
  );
};

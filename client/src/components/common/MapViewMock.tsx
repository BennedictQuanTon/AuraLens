import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Sparkles,
  Zap,
  Navigation,
  Clock,
  Compass,
  Footprints,
  CloudRain,
  Sun,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import type { WeatherContext, Location } from '../../types/entityGraph.js';
import {
  MOCK_HCMC_LOCATIONS,
  type MockLocation,
  convertMockToLocation,
} from '../../data/mockLocations.js';

import type { AppLanguage } from '../../types/settings.js';

interface MapViewMockProps {
  weather: WeatherContext;
  language?: AppLanguage;
  onSelectPlace: (place: Location) => void;
  onGoToPhotobooth?: () => void;
}

/**
 * ============================================================================
 * GOOGLE MAPS PLATFORM INTEGRATION HOOKS & COMMENTS
 * ============================================================================
 * 
 * TODO: [Google Maps JavaScript API]
 * 1. Load `@googlemaps/js-api-loader` to initialize the vector interactive map.
 * 2. Apply Custom Map ID styling matching AuraLens Dark & Frosted Glass Dopamine Palette.
 * 3. Replace linear percentage coordinate converter with `google.maps.LatLng` & `google.maps.marker.AdvancedMarkerElement`.
 * 
 * TODO: [Google Places API (New)]
 * 1. Query real-time venue status using `places.fetchFields()`:
 *    - `displayName`, `currentOpeningHours`, `photos`, `priceLevel`, `accessibilityOptions`.
 * 
 * TODO: [Google Directions API & Distance Matrix API]
 * 1. Calculate live pedestrian routes: `google.maps.DirectionsService.route()`.
 * 2. Fetch live ETA and walking distance dynamically based on user's live GPS coordinates.
 * 
 * TODO: [AI Guardrail Agent]
 * 1. Validate real-time weather safety & dress-code alignment before rendering pins.
 */

// User Mock GPS Anchor (Center of District 1: Nguyen Hue / Saigon Opera House)
const USER_MOCK_LOCATION = {
  lat: 10.7769,
  lng: 106.7009,
  label: 'Bạn đang ở đây (Phố đi bộ Nguyễn Huệ, Q.1)',
};

// HCMC Bounding Box for linear interpolation
// TODO: Khi gắn Google Maps JS API thật, xoá hàm convert này, dùng thẳng lat/lng cho google.maps.Marker
const HCMC_BOUNDS = {
  minLat: 10.765,
  maxLat: 10.818,
  minLng: 106.68,
  maxLng: 106.746,
};

function projectLatLngToPercent(lat: number, lng: number) {
  const x =
    ((lng - HCMC_BOUNDS.minLng) / (HCMC_BOUNDS.maxLng - HCMC_BOUNDS.minLng)) * 80 + 10;
  const y =
    ((HCMC_BOUNDS.maxLat - lat) / (HCMC_BOUNDS.maxLat - HCMC_BOUNDS.minLat)) * 74 + 13;
  return {
    x: Math.max(8, Math.min(92, x)),
    y: Math.max(10, Math.min(90, y)),
  };
}

export const MapViewMock: React.FC<MapViewMockProps> = ({
  weather,
  language = 'en',
  onSelectPlace,
}) => {
  const isEn = language === 'en';
  const [filterType, setFilterType] = useState<'all' | 'open' | 'indoor' | 'outdoor'>('all');
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  // Pure JavaScript If/Else Logic for Venue Status (Anti-AI Slop principle)
  // Evaluates open/closed time & weather constraints deterministically
  const processedLocations = useMemo(() => {
    // Current simulated hour: 20:00 (Evening check-in time)
    const currentHour = 20;
    const currentMinute = 30;
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    return MOCK_HCMC_LOCATIONS.map((loc) => {
      const [openH, openM] = loc.open_hours.open.split(':').map(Number);
      const [closeH, closeM] = loc.open_hours.close.split(':').map(Number);

      const openMinutes = openH * 60 + (openM || 0);
      let closeMinutes = closeH * 60 + (closeM || 0);
      if (closeMinutes <= openMinutes) {
        // Crosses midnight (e.g. 17:00 to 02:00 next day)
        closeMinutes += 24 * 60;
      }

      // Check Open Hours
      const adjustedCurrentTime =
        currentTimeMinutes < openMinutes && closeMinutes > 24 * 60
          ? currentTimeMinutes + 24 * 60
          : currentTimeMinutes;
      const isOpen =
        adjustedCurrentTime >= openMinutes && adjustedCurrentTime < closeMinutes;

      // Check Weather Suitability
      // When it rains: outdoor venues are weather_disabled
      const isWeatherDisabled = weather.isRaining && !loc.is_indoor;

      // Status classification
      let status: 'open_fit' | 'weather_disabled' | 'closed';
      if (isWeatherDisabled) {
        status = 'weather_disabled';
      } else if (!isOpen) {
        status = 'closed';
      } else {
        status = 'open_fit';
      }

      const position = projectLatLngToPercent(loc.lat, loc.lng);

      return {
        ...loc,
        status,
        isOpen,
        isWeatherDisabled,
        position,
      };
    });
  }, [weather.isRaining]);

  // Apply Filter Chips
  const filteredLocations = useMemo(() => {
    return processedLocations.filter((loc) => {
      if (filterType === 'open') return loc.isOpen && !loc.isWeatherDisabled;
      if (filterType === 'indoor') return loc.is_indoor;
      if (filterType === 'outdoor') return !loc.is_indoor;
      return true;
    });
  }, [processedLocations, filterType]);

  // Active selected venue
  const selectedVenue = useMemo(() => {
    return processedLocations.find((loc) => loc.id === selectedPinId) || null;
  }, [processedLocations, selectedPinId]);

  // User position in percent
  const userPos = useMemo(() => {
    return projectLatLngToPercent(USER_MOCK_LOCATION.lat, USER_MOCK_LOCATION.lng);
  }, []);

  const handlePinClick = (loc: (typeof processedLocations)[0]) => {
    if (loc.status === 'weather_disabled') return;
    setSelectedPinId(loc.id);
  };

  const handleOpenDetailModal = (loc: (typeof processedLocations)[0]) => {
    const locationEntity = convertMockToLocation(loc);
    onSelectPlace(locationEntity);
  };

  return (
    <div className="relative w-full min-h-[72vh] rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAFAFC] via-[#F4F6FF] to-[#EDE9FE] border-2 border-white/80 shadow-2xl flex flex-col justify-between select-none">
      
      {/* ========================================================================= */}
      {/* 1. STICKY TOP FLOATING FILTER CAPSULE BAR                                  */}
      {/* ========================================================================= */}
      <div className="relative z-30 p-3 sm:p-4 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pointer-events-none">
        
        {/* Filter Chips (Frosted Glassmorphism) */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-white/85 backdrop-blur-md shadow-lg border border-white/60 overflow-x-auto">
          {[
            { id: 'all', label: isEn ? 'All' : 'Tất cả', count: processedLocations.length },
            {
              id: 'open',
              label: isEn ? 'Open Now' : 'Đang mở',
              count: processedLocations.filter((l) => l.status === 'open_fit').length,
            },
            {
              id: 'indoor',
              label: isEn ? 'Indoor (AC)' : 'Trong nhà (AC)',
              count: processedLocations.filter((l) => l.is_indoor).length,
            },
            {
              id: 'outdoor',
              label: isEn ? 'Outdoor' : 'Ngoài trời',
              count: processedLocations.filter((l) => !l.is_indoor).length,
            },
          ].map((chip) => {
            const isActive = filterType === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setFilterType(chip.id as any)}
                className={`py-1.5 px-3 rounded-full text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gray-950 text-[#D4FF00] shadow-md scale-102'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
                }`}
              >
                <span>{chip.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Weather Status Indicator Badge */}
        <div className="pointer-events-auto self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white/80 text-xs font-black">
          {weather.isRaining ? (
            <>
              <CloudRain className="w-4 h-4 text-blue-500 animate-bounce" />
              <span className="text-blue-700">{isEn ? 'Rainy · Safe Indoor AC' : 'Trời Mưa · Lọc An Toàn AC'}</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-amber-700">{isEn ? 'Clear & Sunny · Rooftop Open' : 'Trời Nắng Đẹp · Mở Rooftop'}</span>
            </>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STYLIZED MINIMAL VECTOR MAP OF HCMC (SVG ROAD GRAPH & SAIGON RIVER)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Soft Grid Background pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Stylized Vector Roads & River SVG */}
        <svg
          className="w-full h-full object-cover opacity-85"
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
        >
          <defs>
            {/* River Gradient */}
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.3" />
            </linearGradient>

            {/* Road Glow */}
            <filter id="roadGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#7C3AED" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* District Blocks (Minimal Line-Art polygon outlines) */}
          <polygon points="120,80 380,60 420,240 180,260" fill="rgba(124, 58, 237, 0.03)" stroke="rgba(124, 58, 237, 0.1)" strokeWidth="1" />
          <polygon points="460,90 780,80 750,300 480,270" fill="rgba(0, 245, 255, 0.03)" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1" />
          <polygon points="140,320 440,310 400,620 110,580" fill="rgba(255, 46, 147, 0.03)" stroke="rgba(255, 46, 147, 0.1)" strokeWidth="1" />
          <polygon points="520,340 880,310 920,680 500,640" fill="rgba(212, 255, 0, 0.03)" stroke="rgba(212, 255, 0, 0.1)" strokeWidth="1" />

          {/* Saigon River Winding Path */}
          <path
            d="M 500,0 C 580,180 380,290 620,440 C 760,540 680,680 840,800 L 920,800 C 760,660 840,520 700,420 C 460,270 660,160 580,0 Z"
            fill="url(#riverGradient)"
          />

          {/* Stylized Street Grid Lines */}
          {/* Le Duan / Nguyen Thi Minh Khai Ave */}
          <line x1="0" y1="220" x2="1000" y2="280" stroke="rgba(124, 58, 237, 0.16)" strokeWidth="4" />
          {/* Hai Ba Trung Street */}
          <line x1="280" y1="0" x2="360" y2="800" stroke="rgba(124, 58, 237, 0.18)" strokeWidth="3.5" />
          {/* Dong Khoi / Nguyen Hue Promenade */}
          <line x1="420" y1="0" x2="520" y2="800" stroke="rgba(0, 245, 255, 0.3)" strokeWidth="5" />
          {/* Dien Bien Phu Expressway */}
          <line x1="0" y1="460" x2="1000" y2="380" stroke="rgba(124, 58, 237, 0.18)" strokeWidth="4" />
          {/* Vo Thi Sau Street */}
          <line x1="100" y1="120" x2="900" y2="200" stroke="rgba(124, 58, 237, 0.14)" strokeWidth="2.5" />
          {/* Pasteur & Nam Ky Khoi Nghia */}
          <line x1="200" y1="0" x2="260" y2="800" stroke="rgba(124, 58, 237, 0.12)" strokeWidth="3" />
          {/* Hanoi Highway / Thao Dien Overpass */}
          <line x1="600" y1="80" x2="980" y2="520" stroke="rgba(255, 46, 147, 0.2)" strokeWidth="4" strokeDasharray="8,6" />

          {/* Bridges over Saigon River */}
          <line x1="560" y1="360" x2="650" y2="390" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
          <line x1="710" y1="560" x2="790" y2="600" stroke="#00F5FF" strokeWidth="6" strokeLinecap="round" />
        </svg>

        {/* Animated Dashed SVG Route from User to Selected Pin */}
        {selectedVenue && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <motion.line
              x1={`${userPos.x}%`}
              y1={`${userPos.y}%`}
              x2={`${selectedVenue.position.x}%`}
              y2={`${selectedVenue.position.y}%`}
              stroke="#7C3AED"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </svg>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE MAP CANVAS (PINS + USER LOCATION + VIBE RADIUS)             */}
      {/* ========================================================================= */}
      <div className="relative flex-1 w-full h-full z-10">
        
        {/* A. User Location Anchor & Pulsing Cyber Cyan "Vibe Radius" (~120px radius) */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center"
          style={{ left: `${userPos.x}%`, top: `${userPos.y}%` }}
        >
          {/* Pulsing Cyber Cyan Vibe Radius Circle */}
          <div className="relative flex items-center justify-center">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-[#00F5FF]/40 bg-[#00F5FF]/10 animate-pulse pointer-events-none shadow-[0_0_35px_rgba(0,245,255,0.25)]" />
            <div className="absolute w-36 h-36 rounded-full border border-[#00F5FF]/60 bg-[#00F5FF]/15 animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />
            
            {/* User Core Pin */}
            <div className="absolute w-10 h-10 rounded-2xl bg-gray-950 text-[#D4FF00] border-2 border-white shadow-2xl flex items-center justify-center">
              <Navigation className="w-5 h-5 fill-[#D4FF00] animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
          </div>

          {/* User Location Label */}
          <div className="mt-2 px-3 py-1 bg-gray-950/90 backdrop-blur-md text-white font-black text-[11px] rounded-full shadow-lg border border-white/20 whitespace-nowrap flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-ping" />
            <span>📍 Bạn đang ở đây</span>
          </div>
        </div>

        {/* B. Render Pin Markers from Mock Data */}
        {filteredLocations.map((loc) => {
          const isSelected = selectedPinId === loc.id;
          const isLumiPick = loc.is_lumi_pick;

          // 3 Color States:
          // 1. Open & Fit: Electric Lime glow + pulse
          // 2. Weather Disabled (Rain on Outdoor): Faded red opacity 0.3
          // 3. Closed: Slate Gray
          return (
            <motion.div
              key={loc.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 ${
                loc.status === 'weather_disabled' ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              style={{ left: `${loc.position.x}%`, top: `${loc.position.y}%` }}
              onClick={() => handlePinClick(loc)}
            >
              {/* Pin Container */}
              <div className="relative group flex flex-col items-center">
                
                {/* ⚡ Lumi's Pick Top Badge */}
                {isLumiPick && (
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-6 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#FF2E93] to-[#7C3AED] text-white font-black text-[9px] shadow-lg border border-white flex items-center gap-0.5 whitespace-nowrap z-30"
                  >
                    <Zap className="w-2.5 h-2.5 fill-[#D4FF00] text-[#D4FF00]" />
                    <span>Lumi's Pick</span>
                  </motion.div>
                )}

                {/* Main Pin Shape */}
                <div
                  className={`relative p-2 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                    loc.status === 'weather_disabled'
                      ? 'bg-red-500/20 text-red-500/50 border border-red-500/30 opacity-30 shadow-none'
                      : loc.status === 'closed'
                      ? 'bg-gray-300 text-gray-600 border border-gray-400 shadow-xs'
                      : isLumiPick
                      ? 'bg-gray-950 text-[#D4FF00] border-2 border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.5)] scale-115'
                      : isSelected
                      ? 'bg-gray-950 text-[#D4FF00] border-2 border-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.6)] scale-120'
                      : 'bg-white text-gray-900 border-2 border-emerald-400 hover:border-gray-950 hover:bg-[#D4FF00] shadow-lg hover:scale-110'
                  }`}
                >
                  {/* Outer Glow Ring for Open Active Pins */}
                  {loc.status === 'open_fit' && (
                    <span className="absolute -inset-1 rounded-2xl bg-[#D4FF00]/40 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
                  )}

                  <MapPin
                    className={`w-5 h-5 ${
                      loc.status === 'open_fit' && !isLumiPick ? 'text-emerald-600' : ''
                    }`}
                  />
                </div>

                {/* Mini Pin Title Below */}
                <div
                  className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-black tracking-tight whitespace-nowrap shadow-xs backdrop-blur-md transition-all ${
                    loc.status === 'weather_disabled'
                      ? 'bg-red-100/50 text-red-700/50 opacity-40'
                      : loc.status === 'closed'
                      ? 'bg-gray-200 text-gray-500'
                      : isSelected
                      ? 'bg-gray-950 text-[#D4FF00] scale-105 shadow-md'
                      : 'bg-white/90 text-gray-800 border border-gray-200'
                  }`}
                >
                  {loc.name.split(' ')[0]} {loc.name.split(' ')[1] || ''}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4. FLOATING GLASS TOOLTIP WHEN TAP PIN (ETA + WALKING DISTANCE + CTA)      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedVenue && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative z-40 p-4 sm:p-5 m-3 sm:m-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              
              {/* Venue Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                  <img
                    src={selectedVenue.photo_url}
                    alt={selectedVenue.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {selectedVenue.aesthetic_tag}
                    </span>
                    <span className="text-[10px] font-extrabold text-gray-500">
                      {selectedVenue.type} · {selectedVenue.district_mock}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-gray-950 truncate mt-0.5">
                    {selectedVenue.name}
                  </h3>

                  {/* Walking ETA & Distance Tooltip */}
                  {/* TODO: Connect to Google Distance Matrix API for real-time traffic-aware ETA */}
                  <div className="flex items-center gap-2 text-xs font-black text-gray-600 mt-1">
                    <span className="flex items-center gap-1 text-purple-700">
                      <Footprints className="w-3.5 h-3.5" />
                      ~{selectedVenue.eta_min_mock} phút đi bộ
                    </span>
                    <span>•</span>
                    <span className="text-gray-500">
                      {selectedVenue.distance_km_mock} km
                    </span>
                    <span>•</span>
                    <span className="text-emerald-600 font-extrabold">
                      {selectedVenue.match_score}% Vibe Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: View Details Modal */}
              <button
                onClick={() => handleOpenDetailModal(selectedVenue)}
                className="py-3 px-5 rounded-2xl bg-gray-950 hover:bg-black text-[#D4FF00] font-black text-xs shadow-xl active:scale-95 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 shrink-0 border border-white/20"
              >
                <span>Xem Quán Này</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Bottom Legend */}
      <div className="relative z-20 px-4 py-2 bg-white/70 backdrop-blur-md border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-black text-gray-600">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            <span>Đang Mở &amp; Hợp Vibe</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-50" />
            <span>Đóng Do Thời Tiết</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <span>Đã Đóng Cửa</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          <span>Google Maps Platform Ready Mock</span>
        </div>
      </div>

    </div>
  );
};

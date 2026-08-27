import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Navigation,
  Clock,
  Footprints,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import type { WeatherContext, Location } from '../../types/entityGraph.js';
import type { AppLanguage } from '../../types/settings.js';
import {
  MOCK_HCMC_LOCATIONS,
  type MockLocation,
  convertMockToLocation,
} from '../../data/mockLocations.js';

interface InteractiveMapViewProps {
  weather: WeatherContext;
  language?: AppLanguage;
  hasAnalyzed?: boolean;
  onSelectPlace: (place: Location) => void;
  onGoToPhotobooth?: () => void;
}

// User Fixed Anchor Point (Nguyen Hue Walking Street / Saigon Opera House, District 1)
const USER_LOCATION = {
  lat: 10.7769,
  lng: 106.7009,
};

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  weather,
  language = 'en',
  hasAnalyzed = false,
  onSelectPlace,
}) => {
  const isEn = language === 'en';
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const routePolylineRef = useRef<L.Polyline | null>(null);

  const [filterType, setFilterType] = useState<'all' | 'open' | 'indoor' | 'outdoor'>('all');
  const [selectedLocation, setSelectedLocation] = useState<MockLocation | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distanceKm: number; durationMin: number } | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  // Process venues with open hours & weather constraints
  const processedLocations = useMemo(() => {
    const currentHour = weather.currentHour ?? 20;
    const currentMinute = 30;
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    return MOCK_HCMC_LOCATIONS.map((loc) => {
      const [openH, openM] = loc.open_hours.open.split(':').map(Number);
      const [closeH, closeM] = loc.open_hours.close.split(':').map(Number);

      const openMinutes = openH * 60 + (openM || 0);
      let closeMinutes = closeH * 60 + (closeM || 0);
      if (closeMinutes <= openMinutes) {
        closeMinutes += 24 * 60;
      }

      const adjustedCurrentTime =
        currentTimeMinutes < openMinutes && closeMinutes > 24 * 60
          ? currentTimeMinutes + 24 * 60
          : currentTimeMinutes;
      const isOpen = adjustedCurrentTime >= openMinutes && adjustedCurrentTime < closeMinutes;
      const isWeatherDisabled = weather.isRaining && !loc.is_indoor;

      let status: 'open_fit' | 'weather_disabled' | 'closed';
      if (isWeatherDisabled) {
        status = 'weather_disabled';
      } else if (!isOpen) {
        status = 'closed';
      } else {
        status = 'open_fit';
      }

      return {
        ...loc,
        status,
        isOpen,
        isWeatherDisabled,
      };
    });
  }, [weather.isRaining, weather.currentHour]);

  // Filtered venues based on active pill
  const filteredLocations = useMemo(() => {
    if (!hasAnalyzed) return [];
    return processedLocations.filter((loc) => {
      if (filterType === 'open') return loc.isOpen && !loc.isWeatherDisabled;
      if (filterType === 'indoor') return loc.is_indoor;
      if (filterType === 'outdoor') return !loc.is_indoor;
      return true;
    });
  }, [processedLocations, filterType, hasAnalyzed]);

  // Initialize Leaflet Map with OpenStreetMap Standard Light Tiles
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Map instance
    const map = L.map(mapContainerRef.current, {
      center: [USER_LOCATION.lat, USER_LOCATION.lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    // OpenStreetMap Standard Light Tiles (100% Free, Official, Zero API Key, Zero Watermark)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 11,
      subdomains: ['a', 'b', 'c'],
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Multi-Tick Invalidates to guarantee immediate rendering inside Framer Motion containers
    const triggerInvalidate = () => {
      if (map) map.invalidateSize();
    };
    triggerInvalidate();
    const t1 = setTimeout(triggerInvalidate, 50);
    const t2 = setTimeout(triggerInvalidate, 200);
    const t3 = setTimeout(triggerInvalidate, 600);

    // ResizeObserver on map container
    let resizeObserver: ResizeObserver | null = null;
    if (mapContainerRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        triggerInvalidate();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // User Location Glowing Marker (Cyan Pulsing Ring)
    const userHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-12 h-12 rounded-full bg-[#00F5FF]/40 animate-ping"></div>
        <div class="relative w-8 h-8 rounded-full bg-[#00F5FF] border-3 border-white shadow-[0_0_20px_#00F5FF] flex items-center justify-center">
          <div class="w-3 h-3 rounded-full bg-gray-950"></div>
        </div>
      </div>
    `;
    const userIcon = L.divIcon({
      html: userHtml,
      className: 'custom-user-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker([USER_LOCATION.lat, USER_LOCATION.lng], { icon: userIcon, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(
        `<div class="p-3 text-center font-sans">
          <span class="text-xs font-black text-purple-700 uppercase block">📍 ${
            isEn ? 'Your Location' : 'Vị Trí Của Bạn'
          }</span>
          <span class="text-xs text-gray-900 font-bold">Phố đi bộ Nguyễn Huệ, Quận 1</span>
        </div>`
      );

    mapInstanceRef.current = map;

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (resizeObserver) resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers on filter / location changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    if (!hasAnalyzed) return;

    // Find highest score venue for Star Badge
    const highestScore = Math.max(...filteredLocations.map((l) => l.match_score), 0);

    filteredLocations.forEach((loc) => {
      const isSelected = selectedLocation?.id === loc.id;
      const isDisabled = loc.status === 'weather_disabled';
      const isTopStar = loc.is_lumi_pick || (loc.match_score === highestScore && highestScore > 0);

      // Color accent based on aesthetic tag
      let ringColor = '#9333EA';
      if (loc.aesthetic_tag === 'Cyber-Pop') ringColor = '#00F5FF';
      if (loc.aesthetic_tag === 'Y2K') ringColor = '#FF2E93';
      if (loc.aesthetic_tag === 'Minimalist') ringColor = '#7C3AED';
      if (loc.aesthetic_tag === 'Clean-Fit') ringColor = '#10B981';

      // Category Icon Symbol
      let iconSymbol = '☕';
      if (loc.type === 'Pub' || loc.type === 'Bar' || loc.type === 'Lounge') iconSymbol = '🍸';
      if (loc.type === 'Museum') iconSymbol = '🎨';

      // Sleek Dark Onyx Teardrop Pin (No Name Text, Dark Icon, Score on Top, Star for Top Pick)
      const markerHtml = `
        <div class="relative group cursor-pointer transition-all duration-300 ${
          isSelected ? 'scale-130 z-50 -translate-y-2' : 'hover:scale-115 -translate-y-1'
        } ${isDisabled ? 'opacity-40 grayscale' : ''}">
          
          <!-- Score Pill on Top -->
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-gray-950 border text-[9px] font-black text-white whitespace-nowrap shadow-md"
               style="border-color: ${ringColor};">
            ${loc.match_score}%
          </div>

          <!-- Star on Top of Best Spot -->
          ${
            isTopStar
              ? `<div class="absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#D4FF00] border border-gray-950 text-gray-950 text-[10px] font-black flex items-center justify-center shadow-lg animate-bounce [animation-duration:2s]">
                   ⭐
                 </div>`
              : ''
          }

          <!-- Dark Onyx Circular Pin with Category Icon -->
          <div class="w-10 h-10 rounded-full bg-gray-950 border-2.5 flex items-center justify-center text-white shadow-2xl transition-all"
               style="border-color: ${ringColor}; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
            <span class="text-sm">${iconSymbol}</span>
          </div>

          <!-- Pin Bottom Teardrop Arrow -->
          <div class="w-2.5 h-2.5 bg-gray-950 border-r-2 border-b-2 rotate-45 mx-auto -mt-1.5 shadow-sm"
               style="border-color: ${ringColor};"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-venue-pin',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        handleSelectVenue(loc);
      });

      markersRef.current[loc.id] = marker;
    });
  }, [filteredLocations, selectedLocation, isEn, hasAnalyzed]);

  // Handle Venue Selection & Fetch Pedestrian Route from OSRM
  const handleSelectVenue = async (loc: MockLocation) => {
    setSelectedLocation(loc);
    setIsLoadingRoute(true);

    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([loc.lat, loc.lng], 15, { duration: 0.8 });
    }

    // Remove existing polyline route
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    try {
      // Free Open Source Routing Machine (OSRM) Pedestrian Routing API (Zero Key Required)
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/foot/${USER_LOCATION.lng},${USER_LOCATION.lat};${loc.lng},${loc.lat}?overview=full&geometries=geojson`
      );

      if (res.ok) {
        const data = await res.json();
        const route = data.routes?.[0];
        if (route && route.geometry?.coordinates && map) {
          const latLngs = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);

          // RED Pedestrian Walking Polyline (Crimson Red with dashed styling)
          const polyline = L.polyline(latLngs, {
            color: '#EF4444', // Red Route Line
            weight: 5,
            opacity: 0.95,
            dashArray: '8, 8',
            lineCap: 'round',
            lineJoin: 'round',
          }).addTo(map);

          routePolylineRef.current = polyline;

          const distanceKm = Number((route.distance / 1000).toFixed(1));
          const durationMin = Math.max(1, Math.round(route.duration / 60));
          setRouteInfo({ distanceKm, durationMin });
        }
      }
    } catch (err) {
      console.warn('Could not fetch OSRM route, fallback to straight line:', err);
      // Fallback straight line
      if (map) {
        const polyline = L.polyline(
          [
            [USER_LOCATION.lat, USER_LOCATION.lng],
            [loc.lat, loc.lng],
          ],
          {
            color: '#EF4444', // Red fallback
            weight: 4,
            opacity: 0.9,
            dashArray: '6, 6',
          }
        ).addTo(map);
        routePolylineRef.current = polyline;
        setRouteInfo({ distanceKm: loc.distance_km_mock, durationMin: loc.eta_min_mock });
      }
    } finally {
      setIsLoadingRoute(false);
    }
  };

  const handleCloseDrawer = () => {
    setSelectedLocation(null);
    setRouteInfo(null);
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-100 border border-gray-200 shadow-xl flex flex-col justify-between select-none">
      
      {/* ========================================================================= */}
      {/* 1. TOP FLOATING FILTER CAPSULE BAR (Clean, No Weather Pill)                */}
      {/* ========================================================================= */}
      <div className="absolute top-4 left-4 z-[20] flex items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 overflow-x-auto">
          {[
            { id: 'all', label: isEn ? 'All' : 'Tất cả', count: hasAnalyzed ? processedLocations.length : 0 },
            {
              id: 'open',
              label: isEn ? 'Open Now' : 'Đang mở',
              count: hasAnalyzed ? processedLocations.filter((l) => l.status === 'open_fit').length : 0,
            },
            {
              id: 'indoor',
              label: isEn ? 'Indoor (AC)' : 'Trong nhà (AC)',
              count: hasAnalyzed ? processedLocations.filter((l) => l.is_indoor).length : 0,
            },
            {
              id: 'outdoor',
              label: isEn ? 'Outdoor' : 'Ngoài trời',
              count: hasAnalyzed ? processedLocations.filter((l) => !l.is_indoor).length : 0,
            },
          ].map((chip) => {
            const isActive = filterType === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setFilterType(chip.id as any)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gray-950 text-white shadow-md scale-102'
                    : 'text-gray-700 hover:text-black hover:bg-gray-100'
                }`}
              >
                <span>{chip.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LEAFLET MAP CANVAS CONTAINER                                           */}
      {/* ========================================================================= */}
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '620px', minHeight: '620px' }}
        className="w-full relative z-0 rounded-3xl overflow-hidden"
      />

      {/* Before Analyze Banner Overlay */}
      {!hasAnalyzed && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[20] max-w-md w-[92%] pointer-events-none animate-fadeIn">
          <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-purple-200/80 shadow-2xl text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-purple-700 font-black text-sm">
              <Sparkles className="w-4 h-4 text-[#FF2E93] animate-pulse" />
              <span>{isEn ? 'Discover Matching Spots' : 'Khám Phá Quán Hợp Outfit'}</span>
            </div>
            <p className="text-xs text-gray-600 font-medium">
              {isEn
                ? 'Tap the "Analyze" button above to scan current weather & unlock your personalized hangout spots!'
                : 'Bấm nút "Analyze" ở góc trên để quét thời tiết & mở khóa các địa điểm sống ảo phù hợp outfit của bạn!'}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. BOTTOM FLOATING VENUE DRAWER (When Pin is Selected)                    */}
      {/* ========================================================================= */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 z-[25] max-w-2xl mx-auto animate-slideUp">
          <div className="p-5 sm:p-6 rounded-3xl bg-white/98 backdrop-blur-2xl border border-gray-200 text-gray-950 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-5">
            
            {/* Close Button */}
            <button
              onClick={handleCloseDrawer}
              className="absolute top-3.5 right-3.5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-950 transition-colors cursor-pointer z-10"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Venue Image */}
            <div className="relative w-full sm:w-44 h-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200 shadow-inner">
              <img
                src={selectedLocation.photo_url}
                alt={selectedLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-gray-950/85 backdrop-blur-md text-[11px] font-black text-[#D4FF00] border border-white/10 shadow-xs">
                {selectedLocation.match_score}% Match
              </div>
            </div>

            {/* Venue Info & Bullet Points */}
            <div className="flex-1 space-y-3 w-full">
              <div className="pr-8 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
                    {selectedLocation.type} · {isEn ? (selectedLocation.district_mock_en || selectedLocation.district_mock) : selectedLocation.district_mock}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-black">
                    {selectedLocation.aesthetic_tag}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-950 leading-tight">
                  {selectedLocation.name}
                </h4>
              </div>

              {/* Pedestrian Walking Route ETA & Hours Badge */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 text-red-600 font-black">
                  <Footprints className="w-4 h-4" />
                  <span>
                    {isLoadingRoute ? (
                      isEn ? 'Calculating route...' : 'Đang tính đường...'
                    ) : (
                      `${routeInfo?.durationMin || selectedLocation.eta_min_mock} ${isEn ? 'min walk' : 'phút đi bộ'} (${
                        routeInfo?.distanceKm || selectedLocation.distance_km_mock
                      } km)`
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{selectedLocation.open_hours.open} - {selectedLocation.open_hours.close}</span>
                </div>
              </div>

              {/* Clean Concise Bullet Points (No Clutter Emojis) */}
              <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 font-medium border-t border-gray-100 pt-2.5">
                {selectedLocation.signature_item && (
                  <p className="line-clamp-1">
                    <span className="text-gray-950 font-black">• {isEn ? 'Signature:' : 'Món đặc trưng:'}</span>{' '}
                    {isEn ? (selectedLocation.signature_item_en || selectedLocation.signature_item) : selectedLocation.signature_item}
                  </p>
                )}
                {selectedLocation.best_photo_spot && (
                  <p className="line-clamp-1">
                    <span className="text-gray-950 font-black">• {isEn ? 'Photo Spot:' : 'Góc check-in:'}</span>{' '}
                    {isEn ? (selectedLocation.best_photo_spot_en || selectedLocation.best_photo_spot) : selectedLocation.best_photo_spot}
                  </p>
                )}
                <p className="line-clamp-1">
                  <span className="text-gray-950 font-black">• {isEn ? 'Address:' : 'Địa chỉ:'}</span>{' '}
                  {isEn ? (selectedLocation.address_mock_en || selectedLocation.address_mock) : selectedLocation.address_mock}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedLocation.name + ', ' + selectedLocation.address_mock
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs sm:text-sm font-black flex items-center gap-2 border border-gray-200 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span>{isEn ? 'Google Maps App' : 'Mở Google Maps'}</span>
                </a>

                <button
                  onClick={() => {
                    const placeEntity = convertMockToLocation(selectedLocation, language);
                    onSelectPlace(placeEntity);
                  }}
                  className="py-2.5 px-5 rounded-xl bg-gray-950 hover:bg-black text-white text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ml-auto"
                >
                  <span>{isEn ? 'View Spot' : 'Xem Chi Tiết'}</span>
                  <ChevronRight className="w-4 h-4 text-[#D4FF00]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

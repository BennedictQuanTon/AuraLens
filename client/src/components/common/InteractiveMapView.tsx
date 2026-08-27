import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Sparkles,
  Navigation,
  Clock,
  Footprints,
  CloudRain,
  Sun,
  X,
  ExternalLink,
  ChevronRight,
  Coffee,
  Wine,
  Camera,
  Palette,
  Compass,
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
    return processedLocations.filter((loc) => {
      if (filterType === 'open') return loc.isOpen && !loc.isWeatherDisabled;
      if (filterType === 'indoor') return loc.is_indoor;
      if (filterType === 'outdoor') return !loc.is_indoor;
      return true;
    });
  }, [processedLocations, filterType]);

  // Initialize Leaflet Map with CartoDB Dark Matter Tiles (100% Free, 0 Key)
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
        <div class="absolute w-10 h-10 rounded-full bg-[#00F5FF]/30 animate-ping"></div>
        <div class="relative w-7 h-7 rounded-full bg-[#00F5FF] border-2 border-white shadow-[0_0_15px_#00F5FF] flex items-center justify-center">
          <div class="w-2.5 h-2.5 rounded-full bg-gray-950"></div>
        </div>
      </div>
    `;
    const userIcon = L.divIcon({
      html: userHtml,
      className: 'custom-user-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    L.marker([USER_LOCATION.lat, USER_LOCATION.lng], { icon: userIcon, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(
        `<div class="p-3 text-center">
          <span class="text-xs font-black text-[#00F5FF] uppercase block">📍 ${
            isEn ? 'Your Location' : 'Vị Trí Của Bạn'
          }</span>
          <span class="text-xs text-white font-semibold">Phố đi bộ Nguyễn Huệ, Quận 1</span>
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

    filteredLocations.forEach((loc) => {
      const isSelected = selectedLocation?.id === loc.id;
      const isDisabled = loc.status === 'weather_disabled';

      // Color scheme based on vibe
      let glowColor = '#00F5FF'; // Cyan default
      if (loc.aesthetic_tag === 'Cyber-Pop') glowColor = '#D4FF00';
      if (loc.aesthetic_tag === 'Y2K') glowColor = '#FF2E93';
      if (loc.aesthetic_tag === 'Minimalist') glowColor = '#A855F7';
      if (loc.aesthetic_tag === 'Vintage') glowColor = '#F59E0B';

      // Icon emoji / category icon
      let categoryEmoji = '☕';
      if (loc.type === 'Pub' || loc.type === 'Bar' || loc.type === 'Lounge') categoryEmoji = '🍸';
      if (loc.type === 'Museum') categoryEmoji = '🎨';

      const markerHtml = `
        <div class="relative group cursor-pointer transition-transform duration-300 ${
          isSelected ? 'scale-125 z-50' : 'hover:scale-115'
        } ${isDisabled ? 'opacity-35 grayscale' : ''}">
          <div class="w-9 h-9 rounded-2xl bg-gray-950/90 border-2 flex items-center justify-center shadow-lg backdrop-blur-md"
               style="border-color: ${glowColor}; box-shadow: 0 0 14px ${glowColor}80;">
            <span class="text-base">${categoryEmoji}</span>
          </div>
          <div class="absolute -top-2 -right-2 px-1.5 py-0.2 rounded-full bg-gray-950 border text-[9px] font-black text-white"
               style="border-color: ${glowColor};">
            ${loc.match_score}%
          </div>
          ${
            loc.is_lumi_pick
              ? `<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-[#D4FF00] text-gray-950 text-[8px] font-black uppercase tracking-tighter whitespace-nowrap shadow-xs">
                  ✨ LUMI
                 </div>`
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-venue-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        handleSelectVenue(loc);
      });

      markersRef.current[loc.id] = marker;
    });
  }, [filteredLocations, selectedLocation, isEn]);

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

          // Draw Glowing Neon Cyan/Lime Pedestrian Polyline
          const polyline = L.polyline(latLngs, {
            color: '#00F5FF',
            weight: 5,
            opacity: 0.9,
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
            color: '#D4FF00',
            weight: 4,
            opacity: 0.8,
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
      {/* 1. TOP FLOATING FILTER CAPSULE BAR                                         */}
      {/* ========================================================================= */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pointer-events-none">
        {/* Filter Chips */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 overflow-x-auto">
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

        {/* Live Weather Status Indicator Badge */}
        <div className="pointer-events-auto self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 text-xs font-black">
          {weather.isRaining ? (
            <>
              <CloudRain className="w-4 h-4 text-cyan-600 animate-bounce" />
              <span className="text-cyan-800">{isEn ? 'Rainy · Safe Indoor AC' : 'Trời Mưa · Lọc An Toàn AC'}</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-amber-800">{isEn ? 'Clear & Sunny · Rooftop Open' : 'Trời Nắng Đẹp · Mở Rooftop'}</span>
            </>
          )}
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

      {/* ========================================================================= */}
      {/* 3. BOTTOM FLOATING VENUE DRAWER (When Pin is Selected)                    */}
      {/* ========================================================================= */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 z-[400] max-w-2xl mx-auto animate-slideUp">
          <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200 text-gray-950 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-4">
            
            {/* Close Button */}
            <button
              onClick={handleCloseDrawer}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-950 transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Venue Image */}
            <div className="relative w-full sm:w-36 h-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
              <img
                src={selectedLocation.photo_url}
                alt={selectedLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gray-950/80 backdrop-blur-md text-[10px] font-black text-[#D4FF00] border border-white/10">
                {selectedLocation.match_score}% Match
              </div>
            </div>

            {/* Venue Info & Route ETA */}
            <div className="flex-1 space-y-2 w-full">
              <div className="pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {selectedLocation.type} · {selectedLocation.district_mock}
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-purple-100 text-purple-700 text-[10px] font-black">
                    {selectedLocation.aesthetic_tag}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-gray-950 leading-tight truncate">
                  {selectedLocation.name}
                </h4>
              </div>

              {/* Pedestrian Walking Route ETA Badge */}
              <div className="flex items-center gap-3 py-1 text-xs">
                <div className="flex items-center gap-1.5 text-purple-700 font-black">
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
                <div className="flex items-center gap-1 text-gray-500 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedLocation.open_hours.open} - {selectedLocation.open_hours.close}</span>
                </div>
              </div>

              {/* Signature Drink & Photo Spot */}
              <div className="space-y-0.5 text-xs text-gray-600 font-medium">
                {selectedLocation.signature_item && (
                  <p className="truncate">
                    <span className="text-gray-950 font-bold">🍹 Signature:</span> {selectedLocation.signature_item}
                  </p>
                )}
                {selectedLocation.best_photo_spot && (
                  <p className="truncate">
                    <span className="text-gray-950 font-bold">📸 Photo Spot:</span> {selectedLocation.best_photo_spot}
                  </p>
                )}
              </div>

              {/* Action Buttons: Navigate on Google Maps & View Details */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${USER_LOCATION.lat},${USER_LOCATION.lng}&destination=${selectedLocation.lat},${selectedLocation.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-black flex items-center gap-1.5 border border-gray-200 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isEn ? 'Google Maps App' : 'Mở Google Maps'}</span>
                </a>

                <button
                  onClick={() => {
                    const placeEntity = convertMockToLocation(selectedLocation);
                    onSelectPlace(placeEntity);
                  }}
                  className="py-2 px-4 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 ml-auto"
                >
                  <span>{isEn ? 'View Spot' : 'Xem Quán'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4FF00]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

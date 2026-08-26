import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Navigation, X, ExternalLink, MapPin } from 'lucide-react';

interface MapVenue {
  id: string;
  name: string;
  district: string;
  coords: { x: number; y: number }; // Percentage on map canvas
  type: string;
  status: 'visited' | 'recommended';
  matchScore: number;
  openHours: string;
  image: string;
  address: string;
}

export const HCMCVisualMap: React.FC = () => {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>('v-3');

  const venues: MapVenue[] = [
    {
      id: 'v-1',
      name: 'Danshari Coffee',
      district: 'Quận 1',
      address: '156B Pasteur, Bến Nghé, Q.1',
      coords: { x: 38, y: 32 },
      type: 'Minimalist Wabi-Sabi Cafe',
      status: 'visited',
      matchScore: 96,
      openHours: '08:00 - 22:00',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'v-2',
      name: 'Blank Lounge Landmark 81',
      district: 'Bình Thạnh',
      address: 'Tầng 75-76 Landmark 81, Vinhomes',
      coords: { x: 74, y: 26 },
      type: 'Sky Lounge (350m View)',
      status: 'visited',
      matchScore: 95,
      openHours: '09:00 - 24:00',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'v-3',
      name: 'Neo Saigon Cyber Bar',
      district: 'Quận 1',
      address: '26 Lý Tự Trọng, Bến Nghé, Q.1',
      coords: { x: 50, y: 56 },
      type: 'Neon Speakeasy Bar',
      status: 'recommended',
      matchScore: 98,
      openHours: '18:00 - 02:00',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'v-4',
      name: 'Rang Rang Coffee',
      district: 'Thảo Điền (TP. Thủ Đức)',
      address: '1 Thảo Điền, P. Thảo Điền',
      coords: { x: 82, y: 50 },
      type: 'Futuristic Inox Cafe',
      status: 'recommended',
      matchScore: 94,
      openHours: '07:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'v-5',
      name: 'S’mores Saigon Caffè',
      district: 'Quận 3',
      address: '12 Cao Thắng, Phường 5, Q.3',
      coords: { x: 26, y: 65 },
      type: 'Vintage Brick & Garden Cafe',
      status: 'recommended',
      matchScore: 92,
      openHours: '08:00 - 22:00',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const selectedVenue = venues.find((v) => v.id === selectedVenueId) || null;

  return (
    <div className="space-y-4">
      {/* Clean Single Header: Saigon Vibe Map 📍 (No subtitle, no list button) */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl lg:text-2xl font-black text-gray-950">
          Saigon Vibe Map 📍
        </h3>
        
        {/* Simple Legend Pills */}
        <div className="flex items-center gap-2 text-xs font-black">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Visited (2)
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
            <span className="w-2 h-2 rounded-full bg-[#FF2E93]" />
            Match (3)
          </span>
        </div>
      </div>

      {/* Realistic Real-World CartoDB / OpenStreetMap Map Container */}
      <div className="relative w-full h-[320px] sm:h-[350px] rounded-3xl overflow-hidden border border-gray-200 shadow-xl select-none bg-slate-900 group">
        
        {/* Real-World Map Tile Layer (Authentic High-Resolution Central Saigon Map) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `url('https://a.basemaps.cartocdn.com/rastertiles/voyager/14/13048/7464@2x.png')`,
            filter: 'brightness(0.92) contrast(1.08) saturate(1.15)',
          }}
        />

        {/* Secondary Tile Blend for Wider Geographical Coverage */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(15, 23, 42, 0.4) 100%)`,
          }}
        />

        {/* District Geographical Landmarks & Street Labels Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Sài Gòn River Waterway Label */}
          <div className="absolute top-[38%] right-[22%] -rotate-30 text-[11px] font-black text-cyan-700/80 tracking-widest uppercase bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
            Sông Sài Gòn 🌊
          </div>

          {/* District Name Pills on Map */}
          <div className="absolute top-[18%] left-[28%] text-[10px] font-black text-gray-700 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
            Quận 1
          </div>
          <div className="absolute top-[52%] left-[12%] text-[10px] font-black text-gray-700 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
            Quận 3
          </div>
          <div className="absolute top-[10%] right-[32%] text-[10px] font-black text-gray-700 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
            Bình Thạnh
          </div>
          <div className="absolute top-[36%] right-[6%] text-[10px] font-black text-gray-700 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
            Thảo Điền (Q.2)
          </div>
        </div>

        {/* Interactive Vibe Spot Pins on Map */}
        {venues.map((venue) => {
          const isSelected = venue.id === selectedVenueId;
          const isVisited = venue.status === 'visited';

          return (
            <div
              key={venue.id}
              style={{ left: `${venue.coords.x}%`, top: `${venue.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVenueId(isSelected ? null : venue.id);
                }}
                className={`relative p-1 rounded-full transition-all duration-300 cursor-pointer ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-115 opacity-95'
                }`}
                title={venue.name}
              >
                {/* Glowing Ping Wave for Selected or Recommended Spot */}
                {isSelected && (
                  <span
                    className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                      isVisited ? 'bg-emerald-400' : 'bg-[#FF2E93]'
                    }`}
                  />
                )}

                {/* 3D Circular Pin Badge */}
                <div
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-all ${
                    isVisited
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-tr from-[#FF2E93] via-[#EC4899] to-[#7C3AED] text-white'
                  }`}
                >
                  {isVisited ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#D4FF00]" />
                  )}
                </div>

                {/* Pin Name Tag */}
                <span
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md text-[9px] font-black whitespace-nowrap shadow-md transition-all pointer-events-none ${
                    isSelected
                      ? 'bg-gray-950 text-[#D4FF00] opacity-100 ring-1 ring-white/50 scale-105'
                      : 'bg-white/95 text-gray-900 opacity-90 group-hover:opacity-100'
                  }`}
                >
                  {venue.name.split(' ')[0]}
                </span>
              </button>
            </div>
          );
        })}

        {/* FLOATING DETAIL POPUP DIRECTLY ON TOP OF MAP (When pin is clicked) */}
        {selectedVenue && (
          <div
            className="absolute z-40 animate-fadeIn"
            style={{
              left: `${Math.min(Math.max(selectedVenue.coords.x, 25), 75)}%`,
              top: `${selectedVenue.coords.y > 55 ? selectedVenue.coords.y - 42 : selectedVenue.coords.y + 12}%`,
              transform: 'translate(-50%, 0)',
            }}
          >
            <div className="w-64 sm:w-72 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.3)] border border-gray-200 space-y-2.5">
              {/* Top row: Close button & Match Tag */}
              <div className="flex items-center justify-between">
                {selectedVenue.status === 'visited' ? (
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Đã ghé thăm
                  </span>
                ) : (
                  <span className="text-[10px] font-black text-purple-700 bg-purple-100/90 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-600" /> {selectedVenue.matchScore}% Match
                  </span>
                )}

                <button
                  onClick={() => setSelectedVenueId(null)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-950 hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Close popup"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Venue Image & Info */}
              <div className="flex items-start gap-2.5">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-inner">
                  <img
                    src={selectedVenue.image}
                    alt={selectedVenue.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-xs text-gray-950 truncate leading-snug">
                    {selectedVenue.name}
                  </h4>
                  <p className="text-[10px] font-bold text-gray-500 truncate mt-0.5">
                    {selectedVenue.district} · {selectedVenue.openHours}
                  </p>
                  <p className="text-[10px] text-gray-600 truncate mt-0.5">
                    {selectedVenue.type}
                  </p>
                </div>
              </div>

              {/* Action: Open in Maps / Check in */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedVenue.name + ' ' + selectedVenue.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-gray-950 hover:bg-black text-white text-[11px] font-black flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform cursor-pointer"
              >
                <Navigation className="w-3 h-3 text-[#D4FF00]" />
                <span>Chỉ đường trên Google Maps</span>
                <ExternalLink className="w-3 h-3 text-white/60 ml-auto" />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

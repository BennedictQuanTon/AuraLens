import React, { useState } from 'react';
import { MapPin, Sparkles, CheckCircle2, Navigation, Coffee, Beer } from 'lucide-react';

interface MapVenue {
  id: string;
  name: string;
  district: string;
  coords: { x: number; y: number }; // Percentage on SVG map
  type: string;
  status: 'visited' | 'recommended';
  matchScore: number;
  openHours: string;
  image: string;
}

export const HCMCVisualMap: React.FC = () => {
  const [selectedVenueId, setSelectedVenueId] = useState<string>('v-1');
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');

  const venues: MapVenue[] = [
    {
      id: 'v-1',
      name: 'Danshari Coffee',
      district: 'Quận 1 (Trần Quý Khoách)',
      coords: { x: 42, y: 38 },
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
      coords: { x: 68, y: 28 },
      type: 'Sky Lounge (350m View)',
      status: 'visited',
      matchScore: 95,
      openHours: '09:00 - 24:00',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'v-3',
      name: 'Neo Saigon Cyber Bar',
      district: 'Quận 1 (Pasteur)',
      coords: { x: 50, y: 55 },
      type: 'Neon Speakeasy Bar',
      status: 'recommended',
      matchScore: 98,
      openHours: '18:00 - 02:00',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'v-4',
      name: 'Rang Rang Coffee',
      district: 'Thủ Đức (Thảo Điền)',
      coords: { x: 80, y: 48 },
      type: 'Futuristic Inox Cafe',
      status: 'recommended',
      matchScore: 94,
      openHours: '07:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'v-5',
      name: 'S’mores Saigon Caffè',
      district: 'Quận 3 (Cao Thắng)',
      coords: { x: 28, y: 58 },
      type: 'Vintage Brick & Garden Cafe',
      status: 'recommended',
      matchScore: 92,
      openHours: '08:00 - 22:00',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const selectedVenue = venues.find((v) => v.id === selectedVenueId) || venues[0];

  return (
    <div className="space-y-4">
      {/* Header & Tab Switcher */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
            HCMC District Radar
          </span>
          <h3 className="text-lg lg:text-xl font-black text-gray-950">
            Saigon Vibe Map 📍
          </h3>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-full">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-gray-950 text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Radar Map
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'bg-gray-950 text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            List ({venues.length})
          </button>
        </div>
      </div>

      {activeTab === 'map' ? (
        <div className="space-y-3">
          {/* Interactive Stylized Vector Map of HCMC */}
          <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-[#13141F] to-[#0A0A0F] border border-gray-800 shadow-xl p-4 select-none">
            {/* Ambient District Grid Glows */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#00F5FF]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#FF2E93]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Stylized Saigon River (Sông Sài Gòn uốn lượn) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              {/* River Path */}
              <path
                d="M 120,0 C 140,80 260,70 230,140 C 200,210 320,220 300,300"
                fill="none"
                stroke="#00F5FF"
                strokeWidth="16"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d="M 120,0 C 140,80 260,70 230,140 C 200,210 320,220 300,300"
                fill="none"
                stroke="#00F5FF"
                strokeWidth="4"
                strokeDasharray="8,8"
                opacity="0.6"
              />

              {/* District Labels */}
              <text x="140" y="110" fill="#94A3B8" fontSize="9" fontWeight="bold" opacity="0.6">QUẬN 1</text>
              <text x="60" y="170" fill="#94A3B8" fontSize="9" fontWeight="bold" opacity="0.6">QUẬN 3</text>
              <text x="210" y="60" fill="#94A3B8" fontSize="9" fontWeight="bold" opacity="0.6">BÌNH THẠNH</text>
              <text x="260" y="180" fill="#94A3B8" fontSize="9" fontWeight="bold" opacity="0.6">THẢO ĐIỀN (Q2)</text>
            </svg>

            {/* Radar Sweep Animation Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,255,0,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Interactive Pins on Map */}
            {venues.map((venue) => {
              const isSelected = venue.id === selectedVenueId;
              const isVisited = venue.status === 'visited';

              return (
                <button
                  key={venue.id}
                  onClick={() => setSelectedVenueId(venue.id)}
                  style={{ left: `${venue.coords.x}%`, top: `${venue.coords.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-300 cursor-pointer group z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 opacity-90'
                  }`}
                  title={`${venue.name} (${venue.district})`}
                >
                  {/* Ping Animation on Selected or Recommended Pin */}
                  {isSelected && (
                    <span
                      className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                        isVisited ? 'bg-emerald-400' : 'bg-[#FF2E93]'
                      }`}
                    />
                  )}

                  <div
                    className={`relative w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                      isVisited
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-tr from-[#FF2E93] to-[#7C3AED] text-white'
                    }`}
                  >
                    {isVisited ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                    )}
                  </div>

                  {/* Micro Title Tag above pin */}
                  <span
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded-md text-[9px] font-black whitespace-nowrap shadow-md transition-opacity pointer-events-none ${
                      isSelected
                        ? 'bg-white text-gray-950 opacity-100 ring-2 ring-[#D4FF00]'
                        : 'bg-black/80 text-gray-200 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {venue.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-extrabold border border-white/10 text-white">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Visited (2)
              </span>
              <span className="text-gray-500">|</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FF2E93]" /> Match (3)
              </span>
            </div>
          </div>

          {/* Active Selected Venue Card Preview */}
          {selectedVenue && (
            <div className="calm-card-elevated p-3.5 rounded-2xl flex items-center gap-3.5 animate-fadeIn">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={selectedVenue.image}
                  alt={selectedVenue.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-xs text-gray-950 truncate">
                    {selectedVenue.name}
                  </h4>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-gray-100 text-gray-600 rounded-md">
                    {selectedVenue.district}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  {selectedVenue.type} · {selectedVenue.openHours}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  {selectedVenue.status === 'visited' ? (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✅ Confirmed Visited
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      ✨ {selectedVenue.matchScore}% Match
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* List View */
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {venues.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVenueId(v.id)}
              className="p-3 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-between gap-3 hover:border-gray-300 transition-all cursor-pointer"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-xs text-gray-950 truncate">
                    {v.name}
                  </h4>
                  <span className="text-[9px] font-bold px-2 py-0.2 bg-gray-100 text-gray-600 rounded-full">
                    {v.district}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                  {v.type}
                </p>
              </div>

              <div className="shrink-0 text-right">
                {v.status === 'visited' ? (
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Visited
                  </span>
                ) : (
                  <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    {v.matchScore}% Match
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

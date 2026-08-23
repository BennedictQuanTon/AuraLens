import React from 'react';
import { X, MapPin, Clock, Coffee, Camera, Navigation, Sparkles } from 'lucide-react';
import type { Location } from '../../types/entityGraph.js';

interface PlaceDetailModalProps {
  place: Location | null;
  isOpen: boolean;
  onClose: () => void;
  onGoToPhotobooth: () => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  isOpen,
  onClose,
  onGoToPhotobooth,
}) => {
  if (!isOpen || !place) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Click outside */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/80 max-h-[90vh] overflow-y-auto animate-scaleUp">
        {/* Cover Image */}
        <div className="relative w-full h-52 bg-gray-900">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 bg-[#D4FF00] text-black font-extrabold text-[10px] rounded-full shadow-md">
              {place.aestheticTag}
            </span>
            <span
              className={`px-2.5 py-1 text-white font-extrabold text-[10px] rounded-full backdrop-blur-md ${
                place.isIndoor ? 'bg-blue-600/80' : 'bg-amber-600/80'
              }`}
            >
              {place.isIndoor ? '❄️ Máy Lạnh Trong Nhà' : '🌿 View Ngoài Trời'}
            </span>
          </div>

          {/* Place Title on image */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
              {place.type} · {place.gps.district}
            </span>
            <h2 className="text-xl font-extrabold text-white leading-tight drop-shadow-md">
              {place.name}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4">
          {/* Address & Hours */}
          <div className="space-y-1.5 text-xs text-gray-600 pb-3 border-b border-gray-100">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FF2E93] shrink-0 mt-0.5" />
              <span>{place.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <span className="font-semibold text-gray-800">
                Mở cửa: {place.openHours.open}:00 - {place.openHours.close}:00
              </span>
            </p>
          </div>

          {/* Vibe Description */}
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Không Gian & Phong Cách
            </span>
            <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
              {place.vibeDescription}
            </p>
          </div>

          {/* Highlight Tips: Drink & Photospot */}
          <div className="grid grid-cols-1 gap-2.5">
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5">
              <Coffee className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider block">
                  Món Signature Nên Thử
                </span>
                <span className="text-xs font-bold text-gray-900">
                  {place.signatureDrinkOrDish}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200/60 flex items-start gap-2.5">
              <Camera className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#7C3AED] tracking-wider block">
                  Góc Sống Ảo Triệu View
                </span>
                <span className="text-xs font-bold text-gray-900">
                  {place.bestPhotoSpot}
                </span>
              </div>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {/* Google Maps Link */}
            <a
              href={place.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs active:scale-95 transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Chỉ Đường (Maps)</span>
            </a>

            {/* Photobooth Trigger */}
            <button
              onClick={() => {
                onClose();
                onGoToPhotobooth();
              }}
              className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-[#D4FF00] to-[#00F5FF] text-black font-extrabold text-xs shadow-md active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>Chụp Photobooth</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

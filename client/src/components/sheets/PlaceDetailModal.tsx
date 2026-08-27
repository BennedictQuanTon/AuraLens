import React, { useEffect } from 'react';
import { X, Navigation, MapPin, Clock } from 'lucide-react';
import type { Location } from '../../types/entityGraph.js';
import type { AppLanguage } from '../../types/settings.js';

interface PlaceDetailModalProps {
  place: Location | null;
  isOpen: boolean;
  language?: AppLanguage;
  onClose: () => void;
  onGoToPhotobooth?: () => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  isOpen,
  language = 'en',
  onClose,
}) => {
  const isEn = language === 'en';

  // Lock body scroll when modal is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !place) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn select-none">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 max-h-[92vh] flex flex-col animate-scaleUp">
        
        {/* Clean HD Venue Image (NO Top Badges on Image) */}
        <div className="relative w-full h-56 sm:h-64 bg-gray-900 shrink-0 overflow-hidden">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all backdrop-blur-md cursor-pointer z-10"
            title={isEn ? 'Close' : 'Đóng'}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Place Title & Match Badge */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-purple-300 block">
                {place.type} · {place.gps.district}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
                {place.name}
              </h2>
            </div>

            {place.matchScore && (
              <span className="px-3 py-1 bg-[#D4FF00] text-gray-950 font-black text-xs rounded-full shadow-lg shrink-0">
                {place.matchScore}% Match
              </span>
            )}
          </div>
        </div>

        {/* Modal Body: Why Visit & Full Details in Bullet Points (Large & Clear Typography) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Section: WHY VISIT / ĐIỂM NỔI BẬT (Bullet Points Format) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200/90 space-y-3">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-purple-700 block">
              {isEn ? '✨ Why Visit & Highlights' : '✨ Điểm Nổi Bật & Không Gian'}
            </span>

            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-800 leading-relaxed font-semibold">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-black">•</span>
                <div>
                  <span className="text-gray-950 font-black">{isEn ? 'Atmosphere & Vibe:' : 'Không gian & Vibe:'}</span>{' '}
                  <span className="text-gray-700 font-medium">{place.vibeDescription}</span>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-black">•</span>
                <div>
                  <span className="text-gray-950 font-black">{isEn ? 'Signature Drink / Dish:' : 'Món đặc trưng:'}</span>{' '}
                  <span className="text-amber-800 font-bold">{place.signatureDrinkOrDish}</span>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-black">•</span>
                <div>
                  <span className="text-gray-950 font-black">{isEn ? 'Best Photo Spot:' : 'Góc check-in:'}</span>{' '}
                  <span className="text-pink-800 font-bold">{place.bestPhotoSpot}</span>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-black">•</span>
                <div>
                  <span className="text-gray-950 font-black">{isEn ? 'Style & Environment:' : 'Phong cách & Không gian:'}</span>{' '}
                  <span className="text-gray-700 font-medium">
                    {place.aestheticTag} · {place.isIndoor ? (isEn ? '❄️ Indoor Air-Conditioned' : '❄️ Trong nhà có máy lạnh') : (isEn ? '🌿 Open Outdoor Terrace' : '🌿 Sân thượng ngoài trời')}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Section: LOCATION & OPERATING HOURS */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 space-y-2 text-xs sm:text-sm text-gray-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-950 font-black">{isEn ? 'Address:' : 'Địa chỉ:'}</span>{' '}
                <span className="text-gray-800 font-semibold">{place.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="text-gray-950 font-black">{isEn ? 'Hours:' : 'Giờ mở cửa:'}</span>{' '}
                <span className="text-purple-700 font-black">
                  {typeof place.openHours.open === 'number' ? `${place.openHours.open}:00` : place.openHours.open} -{' '}
                  {typeof place.openHours.close === 'number' ? `${place.openHours.close}:00` : place.openHours.close}
                </span>
              </div>
            </div>
          </div>

          {/* Full Width Action: Directions on Google Maps App */}
          <div className="pt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                place.name + ', ' + place.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gray-950 hover:bg-black text-white font-black text-sm shadow-xl active:scale-98 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#00F5FF]" />
              <span>{isEn ? 'Get Directions on Google Maps' : 'Mở Chỉ Đường Trên Google Maps'}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

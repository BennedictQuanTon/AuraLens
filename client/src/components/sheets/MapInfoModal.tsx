import React, { useEffect } from 'react';
import { X, Sparkles, MapPin, Layers, Target, Compass, CheckCircle2, Rocket } from 'lucide-react';
import type { AppLanguage } from '../../types/settings.js';

interface MapInfoModalProps {
  isOpen: boolean;
  language?: AppLanguage;
  onClose: () => void;
}

export const MapInfoModal: React.FC<MapInfoModalProps> = ({
  isOpen,
  language = 'en',
  onClose,
}) => {
  const isEn = language === 'en';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn select-none">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col animate-scaleUp">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 via-white to-purple-50/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-950 text-[#D4FF00] flex items-center justify-center font-black text-lg shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-gray-950 leading-tight">
                {isEn ? 'AuraLens Experience & AI Engine Info' : 'Thông Tin Động Cơ AI & Dữ Liệu AuraLens'}
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">
                {isEn ? 'Architecture, Evaluation Benchmark & Roadmap' : 'Kiến trúc hệ thống, Tiêu chí chấm điểm & Định hướng tương lai'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
            title={isEn ? 'Close' : 'Đóng'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-gray-800">
          
          {/* 1. Mock Data Prototype vs. Real Multimodal AI */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-900 font-black text-sm">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{isEn ? '1. Demo Prototype & Real AI Engine' : '1. Dữ Liệu Thử Nghiệm & Động Cơ AI Thực Tế'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  <strong className="text-gray-950 font-bold">• Curated Local Mock Data:</strong> The 10–15 curated Ho Chi Minh City aesthetic spots (photos, coordinates, addresses) are demonstration mock data mapped to real Saigon locations for this zero-cost hackathon release.<br />
                  <strong className="text-gray-950 font-bold">• Live Multimodal Reasoning:</strong> The <strong>"Analyze"</strong> engine is 100% live and powered by <strong>Google Gemini 2.5 Flash / 3.5 Flash</strong>, synthesizing real-time weather constraints (temperature, rain, UV, AC indoor requirements) and user aesthetic harmony in milliseconds.
                </>
              ) : (
                <>
                  <strong className="text-gray-950 font-bold">• Dữ liệu Mock Tuyển Chọn:</strong> Danh sách 10–15 địa điểm Sài Gòn (ảnh, tọa độ, địa chỉ) là dữ liệu demo tuyển chọn thực tế cho bản mẫu Hackathon phi lợi nhuận (Zero-Cost).<br />
                  <strong className="text-gray-950 font-bold">• Trí Tuệ Nhân Tạo Thực Tế:</strong> Chức năng <strong>"Analyze"</strong> được kích hoạt trực tiếp từ <strong>Google Gemini 2.5 Flash / 3.5 Flash</strong>, phân tích đa phương thức theo thời gian thực (nhiệt độ, mưa, máy lạnh) kết hợp hòa sắc outfit của bạn.
                </>
              )}
            </p>
          </div>

          {/* 2. Evaluation Criteria & Benchmark */}
          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/70 space-y-3">
            <div className="flex items-center gap-2 text-purple-900 font-black text-sm">
              <Target className="w-4 h-4 text-purple-600" />
              <span>{isEn ? '2. Evaluation Benchmark (% Match Criteria)' : '2. Tiêu Chí Đánh Giá & Benchmark Điểm Số'}</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white border border-purple-200 text-center space-y-1 shadow-xs">
                <span className="text-lg font-black text-purple-700 block">40%</span>
                <span className="text-xs font-black text-gray-900 block">{isEn ? 'Aesthetic Affinity' : 'Đồng Điệu Vibe'}</span>
                <span className="text-[11px] text-gray-500 block leading-tight">
                  {isEn ? 'Color palette & lighting tone synergy' : 'Hòa sắc outfit & ánh sáng quán'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-amber-200 text-center space-y-1 shadow-xs">
                <span className="text-lg font-black text-amber-700 block">35%</span>
                <span className="text-xs font-black text-gray-900 block">{isEn ? 'Weather & Time Fit' : 'Thời Tiết & Thời Gian'}</span>
                <span className="text-[11px] text-gray-500 block leading-tight">
                  {isEn ? 'Indoor AC rain safety / golden hour' : 'Máy lạnh che mưa / view hoàng hôn'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-pink-200 text-center space-y-1 shadow-xs">
                <span className="text-lg font-black text-pink-700 block">25%</span>
                <span className="text-xs font-black text-gray-900 block">{isEn ? 'Photogenicity' : 'Góc Sống Ảo'}</span>
                <span className="text-[11px] text-gray-500 block leading-tight">
                  {isEn ? 'Signature item & top photo angles' : 'Món đặc trưng & góc chụp viral'}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Future Roadmap & Commercial Scalability */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
              <Rocket className="w-4 h-4 text-emerald-600" />
              <span>{isEn ? '3. Future Roadmap & Enterprise Scalability' : '3. Định Hướng Tương Lai & Khả Năng Mở Rộng Đầu Tư'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  For this hackathon, AuraLens was deliberately architected on a 100% free open-source mapping stack (OpenStreetMap + Leaflet + OSRM) with zero billing risks.<br /><br />
                  <strong className="text-gray-950 font-bold">With Future Production Investment:</strong> AuraLens is ready to seamlessly integrate <strong>Google Maps Platform (Places API New, Routes API, Photorealistic 3D Tiles)</strong> paired with Gemini Multimodal Vector Embeddings for real-time live business traffic, real-time reviews sentiment, and hyper-accurate global spot curation.
                </>
              ) : (
                <>
                  Để phục vụ tiêu chí bài thi Hackathon, AuraLens được thiết kế chạy trên nền tảng bản đồ mở 100% Miễn Phí (OpenStreetMap + Leaflet + OSRM) không phát sinh chi phí.<br /><br />
                  <strong className="text-gray-950 font-bold">Khi Có Đầu Tư Thương Mại:</strong> AuraLens sẵn sàng nâng cấp tích hợp trực tiếp <strong>Google Maps Platform (Places API New, Routes API, Bản đồ 3D quang học)</strong> kết hợp cùng Gemini Vector Embeddings để quét dữ liệu trực tiếp hàng triệu địa điểm toàn cầu, nhận diện mật độ khách thời gian thực và đề xuất siêu chuẩn xác.
                </>
              )}
            </p>
          </div>

        </div>

        {/* Footer Button */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-gray-950 hover:bg-black text-white font-black text-xs sm:text-sm shadow-md active:scale-98 transition-all cursor-pointer"
          >
            {isEn ? 'Got it!' : 'Đã Hiểu!'}
          </button>
        </div>

      </div>
    </div>
  );
};

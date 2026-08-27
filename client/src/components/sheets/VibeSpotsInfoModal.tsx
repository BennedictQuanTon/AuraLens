import React, { useEffect } from 'react';
import { X, Sparkles, Layers, RefreshCw, Globe2, CheckCircle2, TrendingUp } from 'lucide-react';
import type { AppLanguage } from '../../types/settings.js';

interface VibeSpotsInfoModalProps {
  isOpen: boolean;
  language?: AppLanguage;
  onClose: () => void;
}

export const VibeSpotsInfoModal: React.FC<VibeSpotsInfoModalProps> = ({
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
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50/40 via-white to-amber-50/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-950 text-[#D4FF00] flex items-center justify-center font-black text-lg shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-gray-950 leading-tight">
                {isEn ? 'Curated Vibe Spots & Scalability Engine' : 'Tọa Độ Săn Vibe & Kiến Trúc Mở Rộng Dữ Liệu'}
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">
                {isEn ? 'Data Fidelity, Real-Time Sync & Scalability Plan' : 'Dữ liệu thử nghiệm, Đồng bộ thời gian thực & Kế hoạch mở rộng'}
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
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-gray-800">
          
          {/* Section 1: Prototype Mock Data */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-gray-900 font-black text-sm">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>{isEn ? '1. Hackathon Demonstration Dataset' : '1. Dữ Liệu Thử Nghiệm Cho Bài Thi Hackathon'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  The <strong>15 Curated Vibe Spots</strong> shown in this demo are benchmark data records mapped to authentic locations across Ho Chi Minh City (District 1, District 3, Thao Dien, Binh Thanh). They provide a complete simulation of categories, opening hours, signature items, and aesthetic style matching.
                </>
              ) : (
                <>
                  Hệ thống <strong>15 Tọa Độ Săn Vibe</strong> hiện tại là bộ dữ liệu chuẩn mẫu (Mock Benchmark) đại diện cho các địa điểm thực tế tại TP.HCM (Quận 1, Quận 3, Thảo Điền, Bình Thạnh). Bộ dữ liệu mô phỏng đầy đủ phân loại, giờ hoạt động, thức uống đặc trưng và độ tương thích với outfit.
                </>
              )}
            </p>
          </div>

          {/* Section 2: Real-Time Synchronization Architecture */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
              <RefreshCw className="w-4 h-4 text-amber-600" />
              <span>{isEn ? '2. Real-Time Sync & Community Engine' : '2. Kiến Trúc Đồng Bộ Thời Gian Thực & Cộng Đồng'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  <strong className="text-gray-950 font-bold">• Live Data Ingestion:</strong> Built to connect via real-time WebSocket and Cloud Database streams to continuously update live opening status, sudden weather changes (rain radar), and venue crowd levels.<br />
                  <strong className="text-gray-950 font-bold">• Community Check-ins:</strong> Users can log OOTD check-ins, upload photobooth memories, and contribute verified photo spots to enrich the collective knowledge graph.
                </>
              ) : (
                <>
                  <strong className="text-gray-950 font-bold">• Đồng Bộ Dữ Liệu Thời Gian Thực:</strong> Kiến trúc sẵn sàng kết nối WebSocket và cơ sở dữ liệu đám mây để cập nhật trạng thái mở cửa, cảnh báo mưa giông tức thời và mật độ đông đúc.<br />
                  <strong className="text-gray-950 font-bold">• Check-in Cộng Đồng:</strong> Người dùng có thể lưu lại khoảnh khắc OOTD, đăng tải ảnh photobooth và đóng góp góc chụp mới để làm giàu hệ sinh thái Vibe Map.
                </>
              )}
            </p>
          </div>

          {/* Section 3: Scalability & Enterprise Production Roadmap */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>{isEn ? '3. Commercial Scalability & Global Production Plan' : '3. Kế Hoạch Mở Rộng & Triển Khai Thực Tế Toàn Cầu'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  <strong className="text-gray-950 font-bold">With Enterprise Investment & Commercial APIs:</strong> AuraLens is designed to scale dynamically to tens of thousands of verified spots across global fashion capitals (Saigon, Tokyo, Seoul, London, Paris).<br /><br />
                  By combining <strong>Google Maps Platform (Places API New, Photorealistic 3D Tiles)</strong> with <strong>Gemini Multimodal Vector Search</strong>, the platform delivers hyper-personalized, dynamically scalable lifestyle recommendations grounded in real-time fashion and weather data.
                </>
              ) : (
                <>
                  <strong className="text-gray-950 font-bold">Khi Có Đầu Tư Thương Mại & Hệ Thống API:</strong> AuraLens được thiết kế để mở rộng tự động lên hàng chục nghìn địa điểm tại các kinh đô thời trang (Sài Gòn, Tokyo, Seoul, London, Paris).<br /><br />
                  Bằng việc kết hợp trực tiếp <strong>Google Maps Platform (Places API New, Bản đồ 3D quang học)</strong> cùng <strong>Gemini Multimodal Vector Search</strong>, nền tảng sẽ mang lại trải nghiệm khám phá lối sống siêu cá nhân hóa dựa trên outfit và thời tiết theo thời gian thực.
                </>
              )}
            </p>
          </div>

        </div>

        {/* Footer */}
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

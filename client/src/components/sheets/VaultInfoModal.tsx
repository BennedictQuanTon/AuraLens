import React, { useEffect } from 'react';
import { X, Sparkles, Database, Cloud, Share2, ShieldCheck, HardDrive } from 'lucide-react';
import type { AppLanguage } from '../../types/settings.js';

interface VaultInfoModalProps {
  isOpen: boolean;
  language?: AppLanguage;
  onClose: () => void;
}

export const VaultInfoModal: React.FC<VaultInfoModalProps> = ({
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
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn select-none">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col animate-scaleUp">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/50 via-white to-purple-50/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-950 text-[#D4FF00] flex items-center justify-center font-black text-lg shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-gray-950 leading-tight">
                {isEn ? 'Fashion Vault & Storage Architecture' : 'Kho Lưu Trữ Vault & Kiến Trúc Dữ Liệu'}
              </h3>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">
                {isEn ? 'Local Persistence, Cloud Sync & Future Lookbook Roadmap' : 'Lưu trữ cục bộ, Đồng bộ đám mây & Sổ tay phong cách'}
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
          
          {/* Section 1: Prototype Mock Data & Device Persistence */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-gray-900 font-black text-sm">
              <HardDrive className="w-4 h-4 text-emerald-600" />
              <span>{isEn ? '1. Hackathon Demo Data & Device Persistence' : '1. Dữ Liệu Demo & Lưu Trữ Thiết Bị'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  The <strong>7 sample OOTD captures and Photobooth strips</strong> currently showcased are demonstration mock data records to illustrate gallery navigation, category filtering (Drip Check vs Photobooth), and high-resolution asset downloads.
                  <br /><br />
                  All newly snapped outfits and custom photobooth strips generated during your session are safely saved directly in your browser’s local storage (IndexedDB).
                </>
              ) : (
                <>
                  Hệ thống <strong>7 bức ảnh mẫu OOTD và dải Photobooth</strong> trong Vault hiện là bộ dữ liệu mẫu (Mock Benchmark) nhằm minh họa trải nghiệm duyệt bộ sưu tập, lọc danh mục (Drip Check vs Photobooth) và tải ảnh độ nét cao.
                  <br /><br />
                  Mọi bức ảnh chụp mới và dải photobooth bạn tạo trong phiên làm việc đều được lưu trữ trực tiếp trên thiết bị qua bộ nhớ cục bộ (IndexedDB / LocalStorage).
                </>
              )}
            </p>
          </div>

          {/* Section 2: Cloud Sync & Security Architecture */}
          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-purple-900 font-black text-sm">
              <Cloud className="w-4 h-4 text-purple-600" />
              <span>{isEn ? '2. Cloud Sync & Multi-Device Privacy Architecture' : '2. Kiến Trúc Đồng Bộ Đám Mây & Bảo Mật'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  <strong className="text-gray-950 font-bold">• Google Cloud Storage Integration:</strong> Ready to connect with Google Cloud Storage (GCS) and Firebase Auth for end-to-end encrypted personal fashion vaults.<br />
                  <strong className="text-gray-950 font-bold">• Gemini Auto-Tagging:</strong> Automatic multimodal analysis to categorize stored photos by aesthetic vibe, palette harmony, and seasonal wardrobe relevance.
                </>
              ) : (
                <>
                  <strong className="text-gray-950 font-bold">• Tích Hợp Google Cloud Storage:</strong> Sẵn sàng kết nối GCS và Firebase Auth để bảo mật mã hóa đầu-cuối kho ảnh cá nhân.<br />
                  <strong className="text-gray-950 font-bold">• Tự Động Phân Loại Gemini:</strong> Tự động gắn tag thông minh theo phong cách thẩm mỹ, hòa sắc màu và tủ đồ theo mùa.
                </>
              )}
            </p>
          </div>

          {/* Section 3: Social Lookbook & Commercial Roadmap */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
              <Share2 className="w-4 h-4 text-amber-600" />
              <span>{isEn ? '3. Future Roadmap: AI Lookbook & Social Passport' : '3. Định Hướng Tương Lai: Sổ Tay AI & Social Passport'}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {isEn ? (
                <>
                  <strong className="text-gray-950 font-bold">With Future Production Investment:</strong> The Vault expands into a full personal fashion passport:
                  <br />• <strong>AI Lookbook Generator:</strong> Compiles weekly fit streaks and aesthetic style evolution timelines.
                  <br />• <strong>Community Inspiration Board:</strong> Share high-rated fits to community leaderboards with verified photo spots.
                  <br />• <strong>Local Brand Wardrobe Sync:</strong> Instant virtual try-on archives connected with official local brands.
                </>
              ) : (
                <>
                  <strong className="text-gray-950 font-bold">Khi Có Đầu Tư Thương Mại:</strong> Vault sẽ mở rộng thành hộ chiếu phong cách toàn diện:
                  <br />• <strong>Sổ Tay AI Lookbook:</strong> Tự động tổng hợp chuỗi phong cách hàng tuần và biểu đồ tiến hóa gu thời trang.
                  <br />• <strong>Bảng Xếp Hạng Cộng Đồng:</strong> Chia sẻ outfit điểm cao lên bảng tin xu hướng kèm tọa độ sống ảo.
                  <br />• <strong>Tủ Đồ Local Brand:</strong> Lưu trữ lịch sử thử đồ ảo và kết nối mua sắm trực tiếp từ các thương hiệu nội địa.
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

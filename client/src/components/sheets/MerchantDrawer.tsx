import React, { useState } from 'react';
import { X, Store, Plus, CheckCircle2, Upload, Sparkles, Building2 } from 'lucide-react';
import type { VibeStyle } from '../../types/entityGraph.js';

interface MerchantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantDrawer: React.FC<MerchantDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'brand' | 'location'>('brand');
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [aestheticTag, setAestheticTag] = useState<VibeStyle>('Y2K');
  const [price, setPrice] = useState('450000');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slideLeft flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-[#7C3AED]">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900">
                  B2B Merchant Portal
                </h3>
                <p className="text-[11px] text-gray-500">
                  Cổng kết nối Local Brand &amp; F&amp;B vào Knowledge Graph
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex p-1 bg-gray-100 rounded-2xl mb-5">
            <button
              onClick={() => setActiveTab('brand')}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'brand'
                  ? 'bg-white text-[#7C3AED] shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thời Trang Local Brand</span>
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'location'
                  ? 'bg-white text-[#7C3AED] shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Quán Cafe / Pub</span>
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-200 flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mb-2 animate-bounce" />
              <h4 className="font-extrabold text-base text-green-900 mb-1">
                Thêm Vào Graph Thành Công!
              </h4>
              <p className="text-xs text-green-700">
                AI Stylist Lumi đã nạp dữ liệu và sẽ gợi ý sản phẩm này khi người dùng check outfit.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'brand' ? (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Tên Local Brand
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: LIDER, Dirty Coins, Hades..."
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Tên Sản Phẩm
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Cyber Structured Blazer..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Phong Cách (Vibe)
                      </label>
                      <select
                        value={aestheticTag}
                        onChange={(e) => setAestheticTag(e.target.value as VibeStyle)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7C3AED] focus:outline-none bg-white"
                      >
                        <option value="Y2K">Y2K</option>
                        <option value="Cyber-Pop">Cyber-Pop</option>
                        <option value="Streetwear">Streetwear</option>
                        <option value="Minimalist">Minimalist</option>
                        <option value="Old Money">Old Money</option>
                        <option value="Vintage">Vintage</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Giá Bán (VNĐ)
                      </label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Tên Quán Cafe / Bar
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: The Workshop Coffee..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Địa Chỉ &amp; Quận
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: 27 Ngô Đức Kế, Quận 1..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Loại Không Gian
                      </label>
                      <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7C3AED] focus:outline-none bg-white">
                        <option value="true">❄️ Có Máy Lạnh (Trong Nhà)</option>
                        <option value="false">🌿 Rooftop / Ngoài Trời</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Giờ Mở Cửa
                      </label>
                      <input
                        type="text"
                        defaultValue="08:00 - 23:00"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Upload image mockup box */}
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl text-center hover:border-[#7C3AED] cursor-pointer transition-colors bg-gray-50/50">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-gray-600 block">
                  Tải Ảnh HD Lên Cloud Storage
                </span>
                <span className="text-[10px] text-gray-400">
                  Hỗ trợ PNG, JPG (Tối đa 5MB)
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-[#7C3AED] text-white font-extrabold text-xs shadow-lg hover:bg-purple-800 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nạp Vào Aura Knowledge Graph</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center">
          Dữ liệu được lưu trữ tự động trên Google Cloud Firestore &amp; Vector Embeddings.
        </div>
      </div>
    </div>
  );
};

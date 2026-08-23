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
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slideLeft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-purple-50 text-purple-600">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900">
                  B2B Merchant Portal
                </h3>
                <p className="text-[11px] text-gray-400">
                  Connect Local Fashion &amp; F&amp;B into Knowledge Graph
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex p-1 bg-gray-100 rounded-2xl mb-5">
            <button
              onClick={() => setActiveTab('brand')}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'brand'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
              <span>Local Brand Fashion</span>
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'location'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Cafe / Bar Venue</span>
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-3xl border border-emerald-200 flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2 animate-bounce" />
              <h4 className="font-extrabold text-base text-emerald-950 mb-1">
                Added to Graph Successfully!
              </h4>
              <p className="text-xs text-emerald-700">
                Lumi AI Stylist has ingested the data and will recommend it to relevant users.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'brand' ? (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Local Brand Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. LIDER, Hades, Dirty Coins..."
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cyber Structured Blazer..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Aesthetic Vibe
                      </label>
                      <select
                        value={aestheticTag}
                        onChange={(e) => setAestheticTag(e.target.value as VibeStyle)}
                        className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-900 focus:outline-none bg-white"
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
                        Price (VND)
                      </label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Venue / Cafe Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Workshop Coffee..."
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Address &amp; District
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 27 Ngo Duc Ke, District 1..."
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Space Type
                      </label>
                      <select className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-900 focus:outline-none bg-white">
                        <option value="true">❄️ Indoor Air-Conditioned</option>
                        <option value="false">🌿 Outdoor / Rooftop</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Open Hours
                      </label>
                      <input
                        type="text"
                        defaultValue="08:00 - 23:00"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="p-4 border-2 border-dashed border-gray-200 rounded-3xl text-center hover:border-gray-900 cursor-pointer transition-colors bg-gray-50/50">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-gray-600 block">
                  Upload HD Image to Cloud Storage
                </span>
                <span className="text-[10px] text-gray-400">
                  Supports PNG, JPG (Max 5MB)
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-full bg-gray-950 text-white font-extrabold text-xs shadow-lg hover:bg-black active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#D4FF00]" />
                <span>Add to Aura Knowledge Graph</span>
              </button>
            </form>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center">
          Data synchronized with Google Cloud Firestore &amp; Vector Embeddings.
        </div>
      </div>
    </div>
  );
};

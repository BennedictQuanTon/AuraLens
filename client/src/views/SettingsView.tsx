import React, { useState, useRef } from 'react';
import { User, Palette, Globe, Store, Check, Upload, Sparkles, Shield, RefreshCw } from 'lucide-react';
import type { AppColorTheme, AppLanguage, UserProfileState } from '../types/settings.js';
import { THEME_OPTIONS } from '../types/settings.js';

interface SettingsViewProps {
  userProfile: UserProfileState;
  onUpdateProfile: (updated: Partial<UserProfileState>) => void;
  language: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
  colorTheme: AppColorTheme;
  onSelectTheme: (theme: AppColorTheme) => void;
  onOpenMerchant: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  language,
  onSelectLanguage,
  colorTheme,
  onSelectTheme,
  onOpenMerchant,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'language' | 'merchant'>('profile');
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.bio);
  const [handle, setHandle] = useState(userProfile.handle);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateProfile({ avatarUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, bio, handle });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const isEn = language === 'en';

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
            {isEn ? 'Preferences & Customization' : 'Tùy Chỉnh & Cài Đặt'}
          </span>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-950">
            {isEn ? 'App Settings ⚙️' : 'Cài Đặt Hệ Thống ⚙️'}
          </h2>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? 'Changes Saved!' : 'Đã Lưu Thay Đổi!'}</span>
          </div>
        )}
      </div>

      {/* 2-Column Desktop Grid for Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: NAVIGATION TABS & PROFILE CARD (cols 1-4 on lg) */}
        <div className="lg:col-span-4 space-y-4">
          {/* User Profile Mini Badge Card */}
          <div className="calm-card-elevated p-5 rounded-3xl flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-950/10 p-0.5 bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] shrink-0">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-base text-gray-950 truncate">
                {userProfile.name}
              </h3>
              <p className="text-xs text-gray-500 font-semibold truncate">
                @{userProfile.handle}
              </p>
              <span className="inline-block mt-1 px-2.5 py-0.5 bg-gray-100 text-gray-800 text-[10px] font-bold rounded-full">
                {userProfile.favoriteVibe} Vibe
              </span>
            </div>
          </div>

          {/* Settings Tab Selector */}
          <div className="calm-card p-2 rounded-3xl space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-extrabold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gray-950 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4 text-[#D4FF00]" />
              <span>{isEn ? 'User Profile' : 'Hồ Sơ Người Dùng'}</span>
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-extrabold transition-all ${
                activeTab === 'appearance'
                  ? 'bg-gray-950 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Palette className="w-4 h-4 text-[#FF2E93]" />
              <span>{isEn ? 'Theme & Palette' : 'Giao Diện & Màu Sắc'}</span>
            </button>

            <button
              onClick={() => setActiveTab('language')}
              className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-extrabold transition-all ${
                activeTab === 'language'
                  ? 'bg-gray-950 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Globe className="w-4 h-4 text-blue-500" />
              <span>{isEn ? 'Language (EN / VI)' : 'Ngôn Ngữ (Anh / Việt)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('merchant')}
              className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-extrabold transition-all ${
                activeTab === 'merchant'
                  ? 'bg-gray-950 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Store className="w-4 h-4 text-purple-500" />
              <span>{isEn ? 'B2B Merchant Portal' : 'Cổng Đối Tác B2B'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: TAB CONTENT PANEL (cols 5-12 on lg) */}
        <div className="lg:col-span-8">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="calm-card-elevated p-6 lg:p-8 rounded-3xl space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-black text-gray-950">
                  {isEn ? 'Personal Profile Information' : 'Thông Tin Cá Nhân'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isEn
                    ? 'Customize how Lumi and the Aura community see your style.'
                    : 'Tùy chỉnh thông tin hiển thị trên AuraLens.'}
                </p>
              </div>

              {/* Avatar Uploader */}
              <div className="flex items-center gap-5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gray-800 block">
                    {isEn ? 'Profile Avatar' : 'Ảnh Đại Diện'}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 rounded-full bg-gray-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-black cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Upload Photo' : 'Tải Ảnh Mới'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateProfile({ avatarUrl: '/lumi.jpg' })}
                      className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      {isEn ? 'Use Lumi Avatar' : 'Dùng Avatar Lumi'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {isEn ? 'Display Name' : 'Tên Hiển Thị'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-gray-950 focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {isEn ? 'Username / Handle' : 'Tên Người Dùng (@)'}
                    </label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-gray-950 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isEn ? 'Bio / Fashion Mantra' : 'Tiểu Sử / Khẩu Hiệu Thời Trang'}
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-gray-950 focus:outline-none bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-full bg-gray-950 hover:bg-black text-white font-extrabold text-xs shadow-lg active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-[#D4FF00]" />
                    <span>{isEn ? 'Save Profile Changes' : 'Lưu Thay Đổi'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: APPEARANCE & THEME */}
          {activeTab === 'appearance' && (
            <div className="calm-card-elevated p-6 lg:p-8 rounded-3xl space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-black text-gray-950">
                  {isEn ? 'Theme Palette Customization' : 'Tùy Chọn Bảng Màu Ứng Dụng'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isEn
                    ? 'Select your favorite Cyberpunk & Dopamine color theme.'
                    : 'Chọn bảng màu neon yêu thích của bạn cho toàn bộ giao diện.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = colorTheme === theme.id;

                  return (
                    <div
                      key={theme.id}
                      onClick={() => onSelectTheme(theme.id)}
                      className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'border-gray-950 bg-gray-50 shadow-md scale-102'
                          : 'border-gray-100 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full shadow-xs"
                            style={{ backgroundColor: theme.colors[0] }}
                          />
                          <div
                            className="w-5 h-5 rounded-full shadow-xs"
                            style={{ backgroundColor: theme.colors[1] }}
                          />
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gray-950 text-[#D4FF00]">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-extrabold text-sm text-gray-950">
                          {theme.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {theme.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LANGUAGE */}
          {activeTab === 'language' && (
            <div className="calm-card-elevated p-6 lg:p-8 rounded-3xl space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-black text-gray-950">
                  {isEn ? 'Language Selection' : 'Lựa Chọn Ngôn Ngữ'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isEn
                    ? 'Switch seamlessly between English and Vietnamese.'
                    : 'Chuyển đổi giao diện giữa Tiếng Anh và Tiếng Việt.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* English Option */}
                <div
                  onClick={() => onSelectLanguage('en')}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    language === 'en'
                      ? 'border-gray-950 bg-gray-50 shadow-md'
                      : 'border-gray-100 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇺🇸</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-950">
                        English (Global)
                      </h4>
                      <p className="text-xs text-gray-500">
                        Default Hackathon &amp; International mode
                      </p>
                    </div>
                  </div>
                  {language === 'en' && <Check className="w-5 h-5 text-gray-950" />}
                </div>

                {/* Vietnamese Option */}
                <div
                  onClick={() => onSelectLanguage('vi')}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    language === 'vi'
                      ? 'border-gray-950 bg-gray-50 shadow-md'
                      : 'border-gray-100 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇻🇳</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-950">
                        Tiếng Việt (Việt Nam)
                      </h4>
                      <p className="text-xs text-gray-500">
                        Bản địa hóa ngôn ngữ Gen Z Sài Gòn
                      </p>
                    </div>
                  </div>
                  {language === 'vi' && <Check className="w-5 h-5 text-gray-950" />}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MERCHANT & B2B ACCESS */}
          {activeTab === 'merchant' && (
            <div className="calm-card-elevated p-6 lg:p-8 rounded-3xl space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-black text-gray-950">
                  {isEn ? 'B2B Merchant & Partner Ecosystem' : 'Hệ Sinh Thái Đối Tác B2B'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isEn
                    ? 'Connect Vietnamese Local Fashion Brands and Curated F&B Spots.'
                    : 'Cổng kết nối cho các Local Brand và quán Cafe/Pub thêm sản phẩm vào Knowledge Graph.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-purple-950 to-black text-white shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/10 text-[#D4FF00]">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-base text-white">
                      {isEn ? 'Join the Aura Knowledge Graph' : 'Nạp Dữ Liệu Vào Aura Graph'}
                    </h4>
                    <p className="text-xs text-gray-300">
                      {isEn
                        ? 'Reach thousands of Gen Z fashion enthusiasts with zero AI Slop.'
                        : 'Tiếp cận khách hàng Gen Z tìm kiếm trang phục và góc sống ảo.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenMerchant}
                  className="w-full py-3.5 px-4 rounded-full bg-[#D4FF00] hover:bg-[#c2ea00] text-gray-950 font-black text-xs shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-black" />
                  <span>{isEn ? 'Launch Merchant Ingestion Drawer' : 'Mở Bảng Điều Khiển Đối Tác'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

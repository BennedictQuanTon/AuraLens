import React, { useState, useRef } from 'react';
import { User, Palette, Globe, Store, Check, Upload, Trash2 } from 'lucide-react';
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
  onReopenOnboarding?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  language,
  onSelectLanguage,
  colorTheme,
  onSelectTheme,
  onOpenMerchant,
  onReopenOnboarding,
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

  const handleRemoveAvatar = () => {
    onUpdateProfile({ avatarUrl: '' });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, bio, handle });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const isEn = language === 'en';

  return (
    <div className="space-y-8 animate-fadeIn pb-24 max-w-6xl w-full mx-auto px-2 sm:px-4 pt-4">
      {/* 2-Column Desktop Grid for Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: NAVIGATION TABS & PROFILE CARD (cols 1-4 on lg) */}
        <div className="lg:col-span-4 space-y-5">
          {/* User Profile Mini Badge Card */}
          <div className="calm-card-elevated p-6 rounded-3xl flex items-center gap-5 bg-white shadow-lg border border-gray-100">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 shrink-0 shadow-inner flex items-center justify-center">
              {userProfile.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-black text-lg text-gray-950 truncate">
                {userProfile.name}
              </h3>
              <p className="text-sm text-gray-500 font-bold truncate">
                @{userProfile.handle}
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-black rounded-full">
                {userProfile.favoriteVibe} Vibe
              </span>
            </div>
          </div>

          {/* Settings Tab Selector */}
          <div className="calm-card p-3 rounded-3xl space-y-2 bg-white shadow-md border border-gray-100">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-5 py-4 rounded-2xl flex items-center gap-3.5 text-sm font-black transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-gray-950 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-5 h-5 text-[#D4FF00]" />
              <span>{isEn ? 'User Profile' : 'Hồ Sơ Người Dùng'}</span>
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full px-5 py-4 rounded-2xl flex items-center gap-3.5 text-sm font-black transition-all cursor-pointer ${
                activeTab === 'appearance'
                  ? 'bg-gray-950 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Palette className="w-5 h-5 text-[#FF2E93]" />
              <span>{isEn ? 'Theme & Palette' : 'Giao Diện & Màu Sắc'}</span>
            </button>

            <button
              onClick={() => setActiveTab('language')}
              className={`w-full px-5 py-4 rounded-2xl flex items-center gap-3.5 text-sm font-black transition-all cursor-pointer ${
                activeTab === 'language'
                  ? 'bg-gray-950 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-5 h-5 text-blue-500" />
              <span>{isEn ? 'Language (EN / VI)' : 'Ngôn Ngữ (Anh / Việt)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('merchant')}
              className={`w-full px-5 py-4 rounded-2xl flex items-center gap-3.5 text-sm font-black transition-all cursor-pointer ${
                activeTab === 'merchant'
                  ? 'bg-gray-950 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Store className="w-5 h-5 text-purple-500" />
              <span>{isEn ? 'B2B Merchant Portal' : 'Cổng Đối Tác B2B'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: TAB CONTENT PANEL (cols 5-12 on lg) */}
        <div className="lg:col-span-8">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="calm-card-elevated p-8 sm:p-10 rounded-3xl space-y-8 animate-fadeIn bg-white shadow-xl border border-gray-100">
              <div className="border-b border-gray-100 pb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                    {isEn ? 'Personal Profile Information' : 'Thông Tin Cá Nhân'}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    {isEn
                      ? 'Customize how Lumi and the Aura community see your style.'
                      : 'Tùy chỉnh thông tin hiển thị trên AuraLens.'}
                  </p>
                </div>

                {savedSuccess && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-200 animate-fadeIn shadow-xs">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isEn ? 'Saved Successfully!' : 'Đã Lưu Thành Công!'}</span>
                  </div>
                )}
              </div>

              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-gray-50/90 rounded-2xl border border-gray-200">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 bg-gray-100 flex items-center justify-center">
                  {userProfile.avatarUrl ? (
                    <img
                      src={userProfile.avatarUrl}
                      alt={userProfile.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full" />
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-black text-gray-900 block">
                      {isEn ? 'Profile Avatar' : 'Ảnh Đại Diện'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {isEn ? 'Upload your personal OOTD portrait' : 'Tải ảnh chân dung hoặc outfit của bạn'}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-3 rounded-2xl bg-gray-950 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-md hover:bg-black active:scale-95 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-[#D4FF00]" />
                      <span>{isEn ? 'Upload Photo' : 'Tải Ảnh Lên'}</span>
                    </button>
                    {userProfile.avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                        <span>{isEn ? 'Remove' : 'Xóa Ảnh'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-black text-gray-800 block mb-2">
                      {isEn ? 'Display Name' : 'Tên Hiển Thị'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 text-sm font-bold focus:ring-2 focus:ring-purple-200 focus:border-purple-600 focus:outline-none bg-white shadow-inner transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-black text-gray-800 block mb-2">
                      {isEn ? 'Username / Handle' : 'Tên Người Dùng (@)'}
                    </label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 text-sm font-bold focus:ring-2 focus:ring-purple-200 focus:border-purple-600 focus:outline-none bg-white shadow-inner transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-black text-gray-800 block mb-2">
                    {isEn ? 'Bio / Fashion Mantra' : 'Tiểu Sử / Khẩu Hiệu Thời Trang'}
                  </label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 text-sm font-bold focus:ring-2 focus:ring-purple-200 focus:border-purple-600 focus:outline-none bg-white shadow-inner transition-all leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-2xl bg-gray-950 hover:bg-black text-white font-black text-sm sm:text-base shadow-xl active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
                  >
                    <Check className="w-5 h-5 text-[#D4FF00]" />
                    <span>{isEn ? 'Save Profile Changes' : 'Lưu Thay Đổi Hồ Sơ'}</span>
                  </button>
                </div>
              </form>

              {/* Onboarding Tour Replay */}
              {onReopenOnboarding && (
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-black text-gray-900">
                      {isEn ? 'Onboarding & Architecture Tour' : 'Xem Lại Tour Chào Mừng & Kiến Trúc'}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {isEn
                        ? 'Replay the 2-step setup, privacy guarantee, and roadmap vision.'
                        : 'Mở lại phần giới thiệu 2 bước, bảo mật thiết bị và định hướng dự án.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onReopenOnboarding}
                    className="py-2.5 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-950 text-xs font-black transition-all cursor-pointer border border-gray-200 shadow-xs shrink-0"
                  >
                    {isEn ? 'Revisit Tour' : 'Xem Lại Tour'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: APPEARANCE & THEME */}
          {activeTab === 'appearance' && (
            <div className="calm-card-elevated p-8 sm:p-10 rounded-3xl space-y-8 animate-fadeIn bg-white shadow-xl border border-gray-100">
              <div className="border-b border-gray-100 pb-5">
                <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                  {isEn ? 'Theme Palette Customization' : 'Tùy Chọn Bảng Màu Ứng Dụng'}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {isEn
                    ? 'Select your favorite Cyberpunk & Dopamine color theme.'
                    : 'Chọn bảng màu neon yêu thích của bạn cho toàn bộ giao diện.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = colorTheme === theme.id;

                  return (
                    <div
                      key={theme.id}
                      onClick={() => onSelectTheme(theme.id)}
                      className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                        isSelected
                          ? 'border-gray-950 bg-gray-50 shadow-lg scale-102 ring-2 ring-gray-950/10'
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full shadow-sm border border-black/10"
                            style={{ backgroundColor: theme.colors[0] }}
                          />
                          <div
                            className="w-7 h-7 rounded-full shadow-sm border border-black/10"
                            style={{ backgroundColor: theme.colors[1] }}
                          />
                        </div>
                        {isSelected && (
                          <span className="text-xs font-black px-3 py-1 rounded-full bg-gray-950 text-[#D4FF00]">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-black text-base text-gray-950">
                          {theme.name}
                        </h4>
                        <p className="text-xs text-gray-500 font-semibold mt-0.5">
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
            <div className="calm-card-elevated p-8 sm:p-10 rounded-3xl space-y-8 animate-fadeIn bg-white shadow-xl border border-gray-100">
              <div className="border-b border-gray-100 pb-5">
                <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                  {isEn ? 'Language Selection' : 'Lựa Chọn Ngôn Ngữ'}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {isEn
                    ? 'Switch seamlessly between English and Vietnamese.'
                    : 'Chuyển đổi giao diện giữa Tiếng Anh và Tiếng Việt.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* English Option */}
                <div
                  onClick={() => onSelectLanguage('en')}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    language === 'en'
                      ? 'border-gray-950 bg-gray-50 shadow-lg scale-102 ring-2 ring-gray-950/10'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🇺🇸</span>
                    <div>
                      <h4 className="font-black text-base text-gray-950">
                        English (Global)
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold">
                        Default Hackathon &amp; International mode
                      </p>
                    </div>
                  </div>
                  {language === 'en' && <Check className="w-6 h-6 text-gray-950" />}
                </div>

                {/* Vietnamese Option */}
                <div
                  onClick={() => onSelectLanguage('vi')}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    language === 'vi'
                      ? 'border-gray-950 bg-gray-50 shadow-lg scale-102 ring-2 ring-gray-950/10'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🇻🇳</span>
                    <div>
                      <h4 className="font-black text-base text-gray-950">
                        Tiếng Việt (Việt Nam)
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold">
                        Bản địa hóa ngôn ngữ Gen Z Sài Gòn
                      </p>
                    </div>
                  </div>
                  {language === 'vi' && <Check className="w-6 h-6 text-gray-950" />}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MERCHANT & B2B ACCESS */}
          {activeTab === 'merchant' && (
            <div className="calm-card-elevated p-8 sm:p-10 rounded-3xl space-y-8 animate-fadeIn bg-white shadow-xl border border-gray-100">
              <div className="border-b border-gray-100 pb-5">
                <h3 className="text-xl sm:text-2xl font-black text-gray-950">
                  {isEn ? 'B2B Merchant & Partner Ecosystem' : 'Hệ Sinh Thái Đối Tác B2B'}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {isEn
                    ? 'Connect Vietnamese Local Fashion Brands and Curated F&B Spots.'
                    : 'Cổng kết nối cho các Local Brand và quán Cafe/Pub thêm sản phẩm vào Knowledge Graph.'}
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-gray-900 via-purple-950 to-black text-white shadow-2xl space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/10 text-[#D4FF00]">
                    <Store className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg sm:text-xl text-white">
                      {isEn ? 'Join the Aura Knowledge Graph' : 'Nạp Dữ Liệu Vào Aura Graph'}
                    </h4>
                    <p className="text-sm text-gray-300 font-medium mt-0.5">
                      {isEn
                        ? 'Reach thousands of Gen Z fashion enthusiasts with zero AI Slop.'
                        : 'Tiếp cận khách hàng Gen Z tìm kiếm trang phục và góc sống ảo.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenMerchant}
                  className="w-full py-4 px-6 rounded-2xl bg-[#D4FF00] hover:bg-[#c2ea00] text-gray-950 font-black text-sm sm:text-base shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Store className="w-5 h-5 text-black" />
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

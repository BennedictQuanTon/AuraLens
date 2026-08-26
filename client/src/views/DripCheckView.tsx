import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Camera,
  SwitchCamera,
  Upload,
  Sparkles,
  MapPin,
  ArrowRight,
  Check,
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
  Shield,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';
import type { DripCheckResponse, EventContext, FashionItem, WeatherContext } from '../types/entityGraph.js';
import type { AppLanguage, UserProfileState } from '../types/settings.js';
import { ScoreGauge } from '../components/common/ScoreGauge.js';
import { LumiAvatar } from '../components/common/LumiAvatar.js';

interface DripCheckViewProps {
  result: DripCheckResponse;
  context: EventContext;
  onContextChange: (ctx: EventContext) => void;
  onCapture: (imageDataUrl: string) => void;
  onExplorePlaces: () => void;
  onSelectBrandItem: (item: FashionItem) => void;
  isLoading: boolean;
  language?: AppLanguage;
  capturedPhoto: string | null;
}

export const DripCheckView: React.FC<DripCheckViewProps> = ({
  result,
  context,
  onContextChange,
  onCapture,
  onExplorePlaces,
  onSelectBrandItem,
  isLoading,
  language = 'en',
  capturedPhoto,
}) => {
  const isEn = language === 'en';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

  const { score, isPassing, breakdown, lumiComment, suggestedAlternatives, suggestedAccessories } = result;

  // Camera initialization
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setCameraError(null);
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1080 },
            height: { ideal: 1920 },
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn('Camera access error:', err);
        setCameraError(
          isEn
            ? 'Unable to access camera. Please grant permission or upload a photo.'
            : 'Không thể truy cập camera. Vui lòng cấp quyền hoặc tải ảnh lên.'
        );
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode, isEn]);

  // Confetti effect on high score
  useEffect(() => {
    if (isPassing && score >= 85) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FF2E93', '#00F5FF', '#7C3AED'],
      });
    }
  }, [isPassing, score]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const handleSnap = () => {
    if (!videoRef.current) return;

    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 250);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 720;
    canvas.height = videoRef.current.videoHeight || 1280;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      onCapture(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onCapture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const eventContexts: EventContext[] = [
    'Cafe sống ảo',
    'Dạo phố cuối tuần',
    'Nightclub / Pub',
    'Hẹn hò lãng mạn',
  ];

  return (
    <div className="animate-fadeIn space-y-6 pb-16">
      
      {/* Context Selector Header Bar */}
      <div className="calm-card-elevated p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block">
            {isEn ? 'AI Fit Context' : 'Bối Cảnh Đi Chơi'}
          </span>
          <h3 className="text-base sm:text-lg font-black text-gray-950">
            {isEn ? 'Select Your Destination Vibe' : 'Chọn Bối Cảnh Lên Đồ Hôm Nay'}
          </h3>
        </div>

        {/* Context Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {eventContexts.map((ctx) => {
            const isSelected = context === ctx;
            return (
              <button
                key={ctx}
                onClick={() => onContextChange(ctx)}
                className={`py-1.5 px-3 rounded-full text-xs font-black transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gray-950 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {ctx}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Responsive Layout: Left = Scanner, Right = Drip Score Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: CAMERA VIEWFINDER & PHOTO UPLOAD (cols 1-5 on lg)           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black flex flex-col justify-between p-4 select-none">
            
            {/* Flash Effect */}
            {isFlashActive && (
              <div className="absolute inset-0 bg-white z-40 animate-fadeOut pointer-events-none" />
            )}

            {/* Video Viewfinder or Captured Preview */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
              {capturedPhoto ? (
                <img
                  src={capturedPhoto}
                  alt="Captured Outfit"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}

              {/* Viewfinder Target Reticle Overlay */}
              <div className="absolute inset-8 sm:inset-10 border-2 border-white/40 rounded-3xl pointer-events-none flex flex-col justify-between p-3">
                <div className="flex justify-between">
                  <div className="w-5 h-5 border-t-2 border-l-2 border-[#D4FF00]" />
                  <div className="w-5 h-5 border-t-2 border-r-2 border-[#D4FF00]" />
                </div>
                <div className="flex justify-between">
                  <div className="w-5 h-5 border-b-2 border-l-2 border-[#D4FF00]" />
                  <div className="w-5 h-5 border-b-2 border-r-2 border-[#D4FF00]" />
                </div>
              </div>

              {/* Scanning Active Light Ray */}
              {isLoading && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4FF00] to-transparent shadow-[0_0_15px_#D4FF00] animate-bounce z-30" />
              )}
            </div>

            {/* Camera Top Bar */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-black rounded-full border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
                <span>{isEn ? 'AI Smart Lens' : 'Ống Kính AI'}</span>
              </span>

              <button
                onClick={toggleCamera}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-md"
                title={isEn ? 'Flip Camera' : 'Đổi Camera'}
              >
                <SwitchCamera className="w-4 h-4" />
              </button>
            </div>

            {/* Camera Bottom Controls: Snap & Upload Buttons */}
            <div className="relative z-20 flex items-center justify-around pt-3">
              {/* File Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg border border-white/20"
                title={isEn ? 'Upload Outfit Photo' : 'Tải ảnh trang phục'}
              >
                <Upload className="w-5 h-5 text-[#D4FF00]" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Shutter Snap Button */}
              <button
                onClick={handleSnap}
                disabled={isLoading}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-1.5 shadow-[0_0_25px_rgba(255,255,255,0.7)] active:scale-90 transition-transform cursor-pointer disabled:opacity-50"
                title={isEn ? 'Take Photo' : 'Chụp Ảnh'}
              >
                <div className="w-full h-full rounded-full border-4 border-gray-950 bg-[#D4FF00] flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-950" />
                </div>
              </button>

              {/* Retake Live Feed */}
              {capturedPhoto && (
                <button
                  onClick={() => onCapture('')}
                  className="p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg border border-white/20"
                  title={isEn ? 'Retake live stream' : 'Bật lại camera'}
                >
                  <RefreshCw className="w-5 h-5 text-purple-400" />
                </button>
              )}
            </div>

          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-400">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>{isEn ? 'On-device visual analysis & privacy protected' : 'Bảo mật thị giác & phân tích an toàn'}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: REAL-TIME AI DRIP SCORE MATRIX (cols 6-12 on lg)           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Top Score & Aura Index Card */}
          <div className="calm-card-elevated p-6 rounded-3xl flex flex-col items-center relative overflow-hidden text-center bg-white shadow-xl border border-gray-100 space-y-4">
            <ScoreGauge score={score} size={180} />

            {/* Clean Vibe Style Badge & Color Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="px-3.5 py-1 rounded-full bg-gray-950 text-[#D4FF00] font-black text-xs shadow-xs">
                {breakdown.detectedStyle}
              </span>
              {breakdown.dominantColors.map((color, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-bold border border-gray-200"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* Lumi Stylist Review Speech Bubble */}
          <LumiAvatar comment={lumiComment} isSpeaking={true} size="md" />

          {/* Stylist Breakdown & Rationale */}
          <div className="calm-card-elevated p-5 rounded-3xl space-y-3 bg-white shadow-md border border-gray-100">
            <span className="text-xs font-black uppercase text-gray-400 tracking-wider block">
              {isEn ? 'Stylist Breakdown & Rationale' : 'Đánh Giá Chi Tiết Từ Stylist'}
            </span>

            <div className="space-y-2">
              {breakdown.pros.map((pro, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800 font-bold">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
              {breakdown.cons.map((con, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Brand Items for Stylist Upgrade */}
          {(suggestedAlternatives?.length > 0 || suggestedAccessories?.length > 0) && (
            <div className="calm-card-elevated p-5 rounded-3xl space-y-3 bg-white shadow-md border border-gray-100">
              <span className="text-xs font-black uppercase text-purple-600 tracking-wider block">
                {isEn ? 'Stylist Upgrade Recommendations' : 'Gợi Ý Món Đồ Phối Thêm Chuẩn Vibe'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[...(suggestedAlternatives || []), ...(suggestedAccessories || [])].slice(0, 2).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectBrandItem(item)}
                    className="p-3 rounded-2xl bg-gray-50 hover:bg-purple-50/50 border border-gray-100 hover:border-purple-200 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-200 shrink-0 shadow-inner">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-black text-purple-600 uppercase block truncate">
                        {item.brand}
                      </span>
                      <h4 className="text-xs font-black text-gray-950 truncate leading-snug">
                        {item.name}
                      </h4>
                      <span className="text-xs font-black text-[#FF2E93] mt-0.5 block">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action: Explore Places matching this fit */}
          <div className="pt-2">
            <button
              onClick={onExplorePlaces}
              className="w-full py-4 px-6 rounded-2xl bg-[#0F172A] hover:bg-black text-white font-black text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-white/10"
            >
              <MapPin className="w-4 h-4 text-[#D4FF00]" />
              <span>{isEn ? 'Explore Matching Vibe Places' : 'Khám Phá Địa Điểm Hợp Vibe Set Đồ Này'}</span>
              <ArrowRight className="w-4 h-4 text-white/80 ml-auto" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

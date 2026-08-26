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
  Loader2,
  ChevronRight,
  Flame,
  Lightbulb,
} from 'lucide-react';
import type { DripCheckResponse, EventContext, FashionItem } from '../types/entityGraph.js';
import type { AppLanguage } from '../types/settings.js';
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
  onCapture,
  onExplorePlaces,
  onSelectBrandItem,
  language = 'en',
  capturedPhoto,
}) => {
  const isEn = language === 'en';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

  // Flow states: 'camera' | 'processing' | 'result'
  const [flowState, setFlowState] = useState<'camera' | 'processing' | 'result'>(
    capturedPhoto ? 'result' : 'camera'
  );
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(capturedPhoto);
  const [processingStep, setProcessingStep] = useState<number>(0);

  const { score, isPassing } = result;

  // Camera stream lifecycle
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (flowState === 'camera') {
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
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode, flowState, isEn]);

  // Confetti pop up when result renders
  useEffect(() => {
    if (flowState === 'result' && isPassing) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FF2E93', '#00F5FF', '#7C3AED'],
      });
    }
  }, [flowState, isPassing]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Start 3-second simulated AI reasoning flow
  const startProcessingFlow = (photoDataUrl: string) => {
    setCurrentPhoto(photoDataUrl);
    setFlowState('processing');
    setProcessingStep(0);

    // Step 1: 0ms
    const timer1 = setTimeout(() => {
      setProcessingStep(1);
    }, 1000);

    // Step 2: 1000ms
    const timer2 = setTimeout(() => {
      setProcessingStep(2);
    }, 2000);

    // Step 3: Complete after 3000ms
    const timer3 = setTimeout(() => {
      onCapture(photoDataUrl);
      setFlowState('result');
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
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
      startProcessingFlow(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          startProcessingFlow(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCurrentPhoto(null);
    setFlowState('camera');
  };

  const curatedRecommendations: FashionItem[] = [
    {
      id: 'rec-1',
      brandName: 'LIDER Closet',
      name: 'Cyber Metallic Zip Windbreaker',
      category: 'Outerwear',
      colors: ['Silver', 'Black'],
      aestheticTag: 'Cyber-Pop',
      price: 890000,
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80',
      buyLink: 'https://lider.vn',
      description: 'Áo khoác gió ánh kim phản quang bắt sáng cực mạnh dưới đèn laser.',
    },
    {
      id: 'rec-2',
      brandName: 'HADES',
      name: 'Acid Hologram Silver Tube Top',
      category: 'Top',
      colors: ['Hologram'],
      aestheticTag: 'Cyber-Pop',
      price: 380000,
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80',
      buyLink: 'https://hades.vn',
      description: 'Áo quây hologram bạc phối viền neon cá tính.',
    },
    {
      id: 'rec-3',
      brandName: 'THE BEAT',
      name: 'Wide Cargo Parachute Pants',
      category: 'Bottom',
      colors: ['Khaki', 'Black'],
      aestheticTag: 'Streetwear',
      price: 650000,
      imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&auto=format&fit=crop&q=80',
      buyLink: 'https://thebeat.vn',
      description: 'Quần dù ống rộng phong cách streetwear năng động.',
    },
    {
      id: 'rec-4',
      brandName: 'BLANCO',
      name: 'Oval Chrome Rim Sunglasses',
      category: 'Accessory',
      colors: ['Chrome'],
      aestheticTag: 'Cyber-Pop',
      price: 290000,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80',
      buyLink: 'https://blanco.vn',
      description: 'Kính râm gọng oval kim loại tráng gương Y2K.',
    },
  ];

  return (
    <div className="animate-fadeIn space-y-6 pb-20 max-w-6xl mx-auto">
      
      {/* ========================================================================= */}
      {/* STATE 1: LARGE CENTERED CAMERA VIEW (Mobile Fullscreen, Desktop Centered) */}
      {/* ========================================================================= */}
      {flowState === 'camera' && (
        <div className="flex flex-col items-center justify-center min-h-[75vh] w-full px-2 sm:px-4">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black flex flex-col justify-between p-4 sm:p-5 select-none">
            
            {/* Flash Effect */}
            {isFlashActive && (
              <div className="absolute inset-0 bg-white z-40 animate-fadeOut pointer-events-none" />
            )}

            {/* Video Viewfinder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Target Reticle Overlay */}
              <div className="absolute inset-6 sm:inset-10 border-2 border-white/30 rounded-3xl pointer-events-none flex flex-col justify-between p-3">
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-2 border-l-2 border-[#D4FF00]" />
                  <div className="w-6 h-6 border-t-2 border-r-2 border-[#D4FF00]" />
                </div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-2 border-l-2 border-[#D4FF00]" />
                  <div className="w-6 h-6 border-b-2 border-r-2 border-[#D4FF00]" />
                </div>
              </div>
            </div>

            {/* Camera Top Bar */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-black rounded-full border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
                <span>{isEn ? 'AI Smart Lens' : 'Ống Kính AI'}</span>
              </span>

              <button
                onClick={toggleCamera}
                className="p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-md"
                title={isEn ? 'Flip Camera' : 'Đổi Camera'}
              >
                <SwitchCamera className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Bottom Controls: Snap & Upload */}
            <div className="relative z-20 flex items-center justify-around pt-3">
              {/* File Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg border border-white/20"
                title={isEn ? 'Upload Outfit Photo' : 'Tải ảnh trang phục'}
              >
                <Upload className="w-6 h-6 text-[#D4FF00]" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Big Shutter Snap Button */}
              <button
                onClick={handleSnap}
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-2 shadow-[0_0_30px_rgba(212,255,0,0.6)] active:scale-90 transition-transform cursor-pointer"
                title={isEn ? 'Take Photo' : 'Chụp Ảnh'}
              >
                <div className="w-full h-full rounded-full border-4 border-gray-950 bg-[#D4FF00] flex items-center justify-center shadow-inner">
                  <Camera className="w-8 h-8 text-gray-950" />
                </div>
              </button>

              {/* Placeholder empty circle for symmetric balance */}
              <div className="w-12 h-12" />
            </div>

          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-400 mt-4">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>{isEn ? 'On-device visual analysis & privacy protected' : 'Bảo mật thị giác & phân tích an toàn'}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 2: 3-SECOND AI REASONING / PROCESSING ANIMATION                      */}
      {/* ========================================================================= */}
      {flowState === 'processing' && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4">
          <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gray-950 flex flex-col items-center justify-center p-6 text-center text-white">
            
            {/* Background Thumbnail preview blurred */}
            {currentPhoto && (
              <img
                src={currentPhoto}
                alt="Processing Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-25 blur-xs"
              />
            )}

            <div className="relative z-10 space-y-6 flex flex-col items-center">
              {/* Rotating Futuristic Loader */}
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-t-[#D4FF00] border-r-[#FF2E93] border-b-[#00F5FF] border-l-[#7C3AED] animate-spin shadow-[0_0_30px_rgba(212,255,0,0.5)]" />
                <Sparkles className="w-8 h-8 text-[#D4FF00] absolute animate-pulse" />
              </div>

              {/* Header Title */}
              <div>
                <span className="px-3.5 py-1 rounded-full bg-white/15 text-[#D4FF00] text-[11px] font-black uppercase tracking-wider">
                  AI Multimodal Reasoning
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  Lumi Stylist Đang Phân Tích...
                </h3>
              </div>

              {/* Dynamic Processing Logs (Few-shot prompting simulation) */}
              <div className="space-y-2.5 w-full text-left bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs font-extrabold">
                <div className={`flex items-center gap-2.5 transition-opacity duration-300 ${processingStep >= 0 ? 'text-[#D4FF00]' : 'text-gray-500 opacity-40'}`}>
                  <span className={`w-2 h-2 rounded-full ${processingStep === 0 ? 'bg-[#D4FF00] animate-ping' : 'bg-emerald-500'}`} />
                  <span>Quang phổ màu &amp; độ tương phản chất liệu...</span>
                </div>
                <div className={`flex items-center gap-2.5 transition-opacity duration-300 ${processingStep >= 1 ? 'text-[#00F5FF]' : 'text-gray-500 opacity-40'}`}>
                  <span className={`w-2 h-2 rounded-full ${processingStep === 1 ? 'bg-[#00F5FF] animate-ping' : 'bg-emerald-500'}`} />
                  <span>Tỷ lệ Silhouette, Layering &amp; Vibe Matrix...</span>
                </div>
                <div className={`flex items-center gap-2.5 transition-opacity duration-300 ${processingStep >= 2 ? 'text-[#FF2E93]' : 'text-gray-500 opacity-40'}`}>
                  <span className={`w-2 h-2 rounded-full ${processingStep === 2 ? 'bg-[#FF2E93] animate-ping' : 'bg-emerald-500'}`} />
                  <span>Tổng hợp Stylist Reasoning &amp; Fit Score...</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: RESULT RESPONSE (Left: Captured Photo, Right: AI Breakdown)     */}
      {/* ========================================================================= */}
      {flowState === 'result' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: CAPTURED PHOTO & RETAKE BUTTON (cols 1-5 on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gray-950">
              {currentPhoto ? (
                <img
                  src={currentPhoto}
                  alt="Captured Outfit"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-400 font-bold">
                  Ảnh Outfit Đã Chụp
                </div>
              )}

              {/* Top Left Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-3.5 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-black rounded-full border border-white/10 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>Outfit Đã Quét</span>
                </span>
              </div>
            </div>

            {/* Retake Button (Quay lại chụp ảnh mới) */}
            <button
              onClick={handleRetake}
              className="w-full py-4 px-5 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 font-black text-sm border-2 border-gray-200 shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-purple-600" />
              <span>Chụp Lại / Quét Outfit Khác</span>
            </button>
          </div>

          {/* RIGHT COLUMN: AI FIT SCORE & GEN-Z STYLIST DIRECTIVES (cols 6-12 on lg) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. TOP FIT SCORE CARD (Only Fit Score, NO Cyber-Pop style chips) */}
            <div className="calm-card-elevated p-6 rounded-3xl flex flex-col items-center relative overflow-hidden text-center bg-white shadow-xl border border-gray-100">
              <ScoreGauge score={score} size={185} />
            </div>

            {/* 2. LUMI STYLIST REVIEW (Few-shot prompting reasoning tone) */}
            <LumiAvatar
              comment="Gu ăn mặc của bạn mang form dáng oversize cực kỳ phóng khoáng, độ tương phản giữa áo thun graphic và quần parachute tạo cảm giác streetwear chuẩn Sài Gòn. Bạn mạnh nhất ở gu phối layer ngẫu hứng, lên đồ đi cafe sống ảo hay quẩy đêm đều siêu cuốn!"
              isSpeaking={true}
              size="md"
            />

            {/* 3. STYLIST BREAKDOWN & RATIONALE (Pros & Directional Advice) */}
            <div className="calm-card-elevated p-5 sm:p-6 rounded-3xl space-y-4 bg-white shadow-md border border-gray-100">
              <span className="text-xs font-black uppercase text-gray-400 tracking-wider block">
                {isEn ? 'Stylist Breakdown & Rationale' : 'Đánh Giá Chi Tiết Từ Stylist'}
              </span>

              {/* Pros */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800 font-bold">
                  <Check className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Form dáng tỉ lệ chuẩn, visual bắt mắt dưới ánh đèn đô thị.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800 font-bold">
                  <Check className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Bảng màu tương phản tôn dáng, tạo cảm giác năng động và tự tin.</span>
                </div>
              </div>

              {/* Stylist Angle / Directives (Góc nhìn phong cách) */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
                  Góc Nhìn Nâng Tầm Gu (Stylist Advice)
                </span>

                <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 font-bold">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-black">•</span>
                    <span><strong>Nếu muốn theo style Cyber-Pop:</strong> Phối thêm kính râm oval kim loại hoặc dây chuyền chrome layer.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-black">•</span>
                    <span><strong>Nếu muốn chuyển sang Minimalist:</strong> Đơn giản hóa phụ kiện, kết hợp túi đeo chéo mini hoặc giày trắng basic.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. STYLIST UPGRADE RECOMMENDATIONS (Curated Items with HD photos) */}
            <div className="calm-card-elevated p-5 sm:p-6 rounded-3xl space-y-4 bg-white shadow-md border border-gray-100">
              <span className="text-xs font-black uppercase text-purple-600 tracking-wider block">
                {isEn ? 'Stylist Upgrade Recommendations' : 'Gợi Ý Món Đồ Phối Thêm Chuẩn Vibe'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {curatedRecommendations.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectBrandItem(item)}
                    className="p-3 rounded-2xl bg-gray-50 hover:bg-purple-50/50 border border-gray-100 hover:border-purple-200 transition-all cursor-pointer flex items-center gap-3.5 group shadow-xs hover:shadow-md"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0 shadow-inner">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-black text-purple-600 uppercase block truncate">
                        {item.brandName}
                      </span>
                      <h4 className="text-xs font-black text-gray-950 truncate leading-snug group-hover:text-purple-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-xs font-black text-[#FF2E93] mt-0.5 block">
                        {item.price.toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. ACTION BUTTON: EXPLORE VIBE PLACES */}
            <div className="pt-2">
              <button
                onClick={onExplorePlaces}
                className="w-full py-4.5 px-6 rounded-2xl bg-[#0F172A] hover:bg-black text-white font-black text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-white/10"
              >
                <MapPin className="w-4.5 h-4.5 text-[#D4FF00]" />
                <span>{isEn ? 'Explore Matching Vibe Places' : 'Khám Phá Địa Điểm Hợp Vibe Set Đồ Này'}</span>
                <ArrowRight className="w-4.5 h-4.5 text-white/80 ml-auto" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

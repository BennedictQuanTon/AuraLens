import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Camera,
  SwitchCamera,
  Upload,
  Sparkles,
  MapPin,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  ShoppingBag,
  Shield,
  Loader2,
  ChevronRight,
  Lightbulb,
  Tag,
} from 'lucide-react';
import type { DripCheckResponse, EventContext, FashionItem } from '../types/entityGraph.js';
import type { AppLanguage } from '../types/settings.js';
import { ScoreGauge } from '../components/common/ScoreGauge.js';

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

  // Confetti celebration pop up when result renders
  useEffect(() => {
    if (flowState === 'result' && isPassing) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FF2E93', '#00F5FF', '#7C3AED'],
      });
    }
  }, [flowState, isPassing]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Start 3-second realistic AI reasoning flow with animated steps
  const startProcessingFlow = (photoDataUrl: string) => {
    setCurrentPhoto(photoDataUrl);
    setFlowState('processing');
    setProcessingStep(0);

    // Step 1: In progress at 0ms, complete at 1000ms
    const timer1 = setTimeout(() => {
      setProcessingStep(1);
    }, 1000);

    // Step 2: Complete at 2000ms
    const timer2 = setTimeout(() => {
      setProcessingStep(2);
    }, 2000);

    // Step 3: Complete at 3000ms -> Render Result
    const timer3 = setTimeout(() => {
      setProcessingStep(3);
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

  // Curated Accessory Items
  const accessoryItems: FashionItem[] = [
    {
      id: 'acc-1',
      brandName: 'BLANCO',
      name: isEn ? 'Oval Chrome Rim Sunglasses' : 'Kính Râm Gọng Oval Chrome Y2K',
      category: 'Accessory',
      colors: ['Chrome', 'Black'],
      aestheticTag: 'Cyber-Pop',
      price: 290000,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80',
      buyLink: 'https://blanco.vn',
      description: 'Kính râm gọng oval kim loại tráng gương Y2K.',
    },
    {
      id: 'acc-2',
      brandName: 'HADES',
      name: isEn ? 'Layered Titanium Chrome Chain' : 'Dây Chuyền Layer Titanium Chrome',
      category: 'Accessory',
      colors: ['Silver'],
      aestheticTag: 'Cyber-Pop',
      price: 320000,
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80',
      buyLink: 'https://hades.vn',
      description: 'Dây chuyền titan mắt xích kép tạo điểm nhấn cổ áo.',
    },
    {
      id: 'acc-3',
      brandName: 'THE BEAT',
      name: isEn ? 'Mini Crossbody Parachute Bag' : 'Túi Đeo Chéo Mini Parachute',
      category: 'Bag',
      colors: ['Black'],
      aestheticTag: 'Streetwear',
      price: 450000,
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80',
      buyLink: 'https://thebeat.vn',
      description: 'Túi vải dù chống nước phối dây rút tiện lợi.',
    },
    {
      id: 'acc-4',
      brandName: 'LIDER Closet',
      name: isEn ? 'Cyber Knit Beanie Hat' : 'Mũ Beanie Dệt Kim Cyber Goth',
      category: 'Accessory',
      colors: ['Charcoal'],
      aestheticTag: 'Cyber-Pop',
      price: 250000,
      imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=80',
      buyLink: 'https://lider.vn',
      description: 'Mũ len dệt kim ôm đầu phong cách techwear.',
    },
  ];

  // Recommended Partner Brands
  const recommendedBrands = [
    { name: 'LIDER Closet', tag: 'High Street' },
    { name: 'HADES Studio', tag: 'Cyberpunk' },
    { name: 'THE BEAT', tag: 'Streetwear' },
    { name: 'BLANCO', tag: 'Y2K Optic' },
    { name: 'DIRTY COINS', tag: 'Gen-Z Drip' },
    { name: 'DEGREY', tag: 'Retro Asian' },
  ];

  return (
    <div className="animate-fadeIn space-y-6 pb-20 max-w-6xl mx-auto">
      
      {/* ========================================================================= */}
      {/* STATE 1: EXTRA LARGE CAMERA VIEWFINDER (Mobile Fullscreen, Desktop Big)   */}
      {/* ========================================================================= */}
      {flowState === 'camera' && (
        <div className="flex flex-col items-center justify-center min-h-[78vh] w-full px-2 sm:px-4">
          <div className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl aspect-[3/4] sm:aspect-[4/5] min-h-[580px] lg:min-h-[660px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black flex flex-col justify-between p-5 sm:p-7 select-none">
            
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
              <div className="absolute inset-8 sm:inset-12 border-2 border-white/30 rounded-3xl pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-t-3 border-l-3 border-[#D4FF00]" />
                  <div className="w-8 h-8 border-t-3 border-r-3 border-[#D4FF00]" />
                </div>
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-b-3 border-l-3 border-[#D4FF00]" />
                  <div className="w-8 h-8 border-b-3 border-r-3 border-[#D4FF00]" />
                </div>
              </div>
            </div>

            {/* Camera Top Bar */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="px-4 py-2 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-black rounded-full border border-white/15 flex items-center gap-2 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-ping" />
                <span>{isEn ? 'AI Smart Lens' : 'Ống Kính AI Smart Lens'}</span>
              </span>

              <button
                onClick={toggleCamera}
                className="p-3.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg border border-white/15"
                title={isEn ? 'Flip Camera' : 'Đổi Camera'}
              >
                <SwitchCamera className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Bottom Controls: Snap & Upload */}
            <div className="relative z-20 flex items-center justify-around pt-4">
              {/* File Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-4 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl border border-white/25"
                title={isEn ? 'Upload Outfit Photo' : 'Tải ảnh trang phục'}
              >
                <Upload className="w-7 h-7 text-[#D4FF00]" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Extra Large Shutter Snap Button */}
              <button
                onClick={handleSnap}
                className="w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center p-2.5 shadow-[0_0_40px_rgba(212,255,0,0.7)] active:scale-90 transition-transform cursor-pointer"
                title={isEn ? 'Take Photo' : 'Chụp Ảnh'}
              >
                <div className="w-full h-full rounded-full border-4 border-gray-950 bg-[#D4FF00] flex items-center justify-center shadow-inner">
                  <Camera className="w-9 h-9 sm:w-10 sm:h-10 text-gray-950" />
                </div>
              </button>

              {/* Placeholder empty circle for symmetric balance */}
              <div className="w-14 h-14" />
            </div>

          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-gray-400 mt-5">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>{isEn ? 'On-device visual analysis & privacy protected' : 'Bảo mật thị giác & phân tích an toàn 100%'}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 2: LARGE PROCESSING MODAL WITH ANIMATED TICKS & SPINNER RINGS       */}
      {/* ========================================================================= */}
      {flowState === 'processing' && (
        <div className="flex flex-col items-center justify-center min-h-[78vh] w-full px-4">
          <div className="relative w-full max-w-xl lg:max-w-2xl min-h-[580px] lg:min-h-[660px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gray-950 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white">
            
            {/* Background Thumbnail preview blurred */}
            {currentPhoto && (
              <img
                src={currentPhoto}
                alt="Processing Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xs"
              />
            )}

            <div className="relative z-10 space-y-8 flex flex-col items-center w-full max-w-md">
              
              {/* Rotating Futuristic Loader with Glow */}
              <div className="relative flex items-center justify-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-t-[#D4FF00] border-r-[#FF2E93] border-b-[#00F5FF] border-l-[#7C3AED] animate-spin shadow-[0_0_40px_rgba(212,255,0,0.6)]" style={{ animationDuration: '1.4s' }} />
                <Sparkles className="w-10 h-10 text-[#D4FF00] absolute animate-pulse" />
              </div>

              {/* Header Title */}
              <div className="space-y-2">
                <span className="px-4 py-1.5 rounded-full bg-white/15 text-[#D4FF00] text-xs font-black uppercase tracking-wider shadow-md">
                  AI Multimodal Reasoning
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {isEn ? 'Lumi Stylist Is Cooking...' : 'Lumi Stylist Đang Phân Tích...'}
                </h3>
              </div>

              {/* Dynamic Processing Logs with Animated Spinner -> Green Tick Check */}
              <div className="space-y-4 w-full text-left bg-black/70 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/15 text-sm font-extrabold shadow-2xl">
                
                {/* Step 1 */}
                <div className={`flex items-center gap-3 transition-all duration-300 ${processingStep >= 0 ? 'text-[#D4FF00]' : 'text-gray-500 opacity-40'}`}>
                  {processingStep > 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-scaleUp" />
                  ) : (
                    <Loader2 className="w-5 h-5 text-[#D4FF00] shrink-0 animate-spin" />
                  )}
                  <span>{isEn ? 'Spectral color & fabric reflectivity analysis...' : 'Quang phổ màu & độ tương phản chất liệu...'}</span>
                </div>

                {/* Step 2 */}
                <div className={`flex items-center gap-3 transition-all duration-300 ${processingStep >= 1 ? 'text-[#00F5FF]' : 'text-gray-500 opacity-40'}`}>
                  {processingStep > 1 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-scaleUp" />
                  ) : processingStep === 1 ? (
                    <Loader2 className="w-5 h-5 text-[#00F5FF] shrink-0 animate-spin" />
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                    </span>
                  )}
                  <span>{isEn ? 'Silhouette ratio, layering & vibe matrix...' : 'Tỷ lệ Silhouette, Layering & Vibe Matrix...'}</span>
                </div>

                {/* Step 3 */}
                <div className={`flex items-center gap-3 transition-all duration-300 ${processingStep >= 2 ? 'text-[#FF2E93]' : 'text-gray-500 opacity-40'}`}>
                  {processingStep > 2 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-scaleUp" />
                  ) : processingStep === 2 ? (
                    <Loader2 className="w-5 h-5 text-[#FF2E93] shrink-0 animate-spin" />
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                    </span>
                  )}
                  <span>{isEn ? 'Synthesizing Gen-Z stylist reasoning & Fit Score...' : 'Tổng hợp Stylist Reasoning & Fit Score...'}</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: RESULT RESPONSE (Left: Full Height Photo, Right: Lumi Breakdown) */}
      {/* ========================================================================= */}
      {flowState === 'result' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: FULL HEIGHT CAPTURED PHOTO & RETAKE BUTTON (cols 1-5 on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
            
            {/* Equal Height Photo Container */}
            <div className="relative w-full flex-1 min-h-[500px] lg:min-h-[580px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gray-950 flex items-center justify-center">
              {currentPhoto ? (
                <img
                  src={currentPhoto}
                  alt="Captured Outfit"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 font-bold">
                  {isEn ? 'Captured Outfit' : 'Ảnh Outfit Đã Chụp'}
                </div>
              )}

              {/* Top Left Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-black rounded-full border border-white/15 flex items-center gap-2 shadow-lg">
                  <Camera className="w-4 h-4 text-[#D4FF00]" />
                  <span>{isEn ? 'Outfit Scanned' : 'Outfit Đã Quét'}</span>
                </span>
              </div>
            </div>

            {/* Retake Button (Quay lại camera) */}
            <button
              onClick={handleRetake}
              className="w-full py-4.5 px-6 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 font-black text-sm sm:text-base border-2 border-gray-200 shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 text-purple-600" />
              <span>{isEn ? 'Retake / Scan Another Fit' : 'Chụp Lại / Quét Outfit Khác'}</span>
            </button>
          </div>

          {/* RIGHT COLUMN: FIT SCORE, UNIFIED LUMI RECS & ACCESSORIES (cols 6-12 on lg) */}
          <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
            
            {/* 1. TOP FIT SCORE CARD (Pure Fit Score, NO Cyber-Pop style chips) */}
            <div className="calm-card-elevated p-6 rounded-3xl flex flex-col items-center relative overflow-hidden text-center bg-white shadow-xl border border-gray-100">
              <ScoreGauge score={score} size={190} />
            </div>

            {/* 2. UNIFIED LUMI STYLIST RECOMMENDATION CARD (Gộp lời rec + Góc nhìn của Lumi) */}
            <div className="calm-card-elevated p-6 sm:p-7 rounded-3xl space-y-4 bg-white shadow-xl border border-gray-100 relative">
              
              {/* Header with Dashboard Mascot Cutout & Tag (No Volume Button) */}
              <div className="flex items-center gap-3.5 pb-2 border-b border-gray-100">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] p-0.5 shadow-md shrink-0">
                  <img
                    src="/lumi.png"
                    alt="Lumi AI Stylist"
                    className="w-full h-full object-contain bg-white rounded-2xl"
                  />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-gray-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FF2E93]" />
                    <span>Lumi AI Stylist</span>
                  </h3>
                  <span className="text-[11px] font-extrabold text-purple-600">
                    {isEn ? 'Personal AI Fashion Companion' : 'Stylist AI Cá Nhân Của Bạn'}
                  </span>
                </div>
              </div>

              {/* Lumi Speech in Genuine Friendly Gen-Z Persona */}
              <p className="text-sm sm:text-[15px] font-bold text-gray-800 leading-relaxed">
                {isEn
                  ? '"Hey bestie! Lumi just broke down your fit. The oversized silhouette and contrast between pieces give off effortless Saigon streetwear energy! Lumi\'s favorite part is your natural eye for layering and proportions. Slay the town and take 8,000 photos for Story!"'
                  : '"Hế nhô! Lumi vừa phân tích xong set đồ của bạn nè. Form dáng oversize hôm nay cực kỳ phóng khoáng, độ tương phản giữa áo và quần tạo visual chuẩn streetwear Sài Gòn luôn á! Lumi chấm điểm mạnh nhất là bạn có gu phối layer có chiều sâu và tôn dáng đỉnh chóp. Chuẩn bị đi quẩy và chụp 8,000 tấm ảnh thôi bà ơi! ✨"'}
              </p>

              {/* Lumi Style Directives Box */}
              <div className="p-4 sm:p-5 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{isEn ? "Lumi's Style Directives" : 'Góc Nhìn Nâng Tầm Gu Của Lumi'}</span>
                </span>

                <div className="space-y-1.5 text-xs sm:text-sm font-bold text-purple-950">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-black">•</span>
                    <span>
                      {isEn
                        ? 'If you wanna push full Cyber-Pop: Stack some oval chrome sunglasses or double titanium chains.'
                        : 'Nếu bạn muốn theo hướng Cyber-Pop: Phối thêm kính râm oval kim loại hoặc dây chuyền chrome layer.'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-black">•</span>
                    <span>
                      {isEn
                        ? 'If you’re leaning into Clean Minimalist: Simplify accessories, rock basic white sneakers and a mini crossbody bag.'
                        : 'Nếu bạn muốn chuyển sang Minimalist: Đơn giản hóa phụ kiện, kết hợp giày trắng basic và túi đeo chéo mini.'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* 3. ACCESSORIES UPGRADE & RECOMMENDED BRANDS (Chỉ phụ kiện + Brand list) */}
            <div className="calm-card-elevated p-6 sm:p-7 rounded-3xl space-y-4 bg-white shadow-xl border border-gray-100">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-purple-600 tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-purple-600" />
                  <span>{isEn ? 'Recommended Accessories Upgrade' : 'Gợi Ý Phụ Kiện Phối Thêm Chuẩn Gu'}</span>
                </span>
              </div>

              {/* 4 Accessory Item Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {accessoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectBrandItem(item)}
                    className="p-3.5 rounded-2xl bg-gray-50 hover:bg-purple-50/60 border border-gray-100 hover:border-purple-200 transition-all cursor-pointer flex items-center gap-3.5 group shadow-xs hover:shadow-md"
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

              {/* Recommended Partner Brands Row */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  <span>{isEn ? 'Partner Local Brands' : 'Thương Hiệu Local-Brand Đề Xuất'}</span>
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {recommendedBrands.map((brand, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs rounded-full border border-gray-200 transition-colors cursor-pointer"
                    >
                      {brand.name}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* 4. ACTION BUTTON: EXPLORE MATCHING PLACES */}
            <div className="pt-1">
              <button
                onClick={onExplorePlaces}
                className="w-full py-5 px-6 rounded-2xl bg-[#0F172A] hover:bg-black text-white font-black text-base shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer border border-white/10"
              >
                <MapPin className="w-5 h-5 text-[#D4FF00]" />
                <span>{isEn ? 'Explore Matching Vibe Places' : 'Khám Phá Địa Điểm Hợp Vibe Set Đồ Này'}</span>
                <ArrowRight className="w-5 h-5 text-white/80 ml-auto" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

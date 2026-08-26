import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  SwitchCamera,
  Upload,
  Sparkles,
  Timer,
  Download,
  RefreshCw,
  CheckCircle2,
  Share2,
  Type,
  Move,
  Trash2,
  Sliders,
  Palette,
  Image as ImageIcon,
  Plus,
  X,
  RotateCcw,
  Smartphone,
  Square,
  Monitor,
  Film,
  ZoomIn,
  ZoomOut,
  Flame,
  Star,
  Layers,
  Heart,
  Crown,
} from 'lucide-react';
import type { PhotoboothFrame, VibeStyle } from '../types/entityGraph.js';

// Available Aspect Ratios
export type AspectRatioType = '9:16' | '4:5' | '1:1' | '16:9' | '4:3';

interface AspectRatioConfig {
  id: AspectRatioType;
  label: string;
  subLabel: string;
  width: number;
  height: number;
  cssAspect: string;
  icon: React.ReactNode;
}

const ASPECT_RATIOS: AspectRatioConfig[] = [
  {
    id: '9:16',
    label: '9:16 Story',
    subLabel: 'Reels / TikTok',
    width: 1080,
    height: 1920,
    cssAspect: 'aspect-[9/16] max-w-[340px]',
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    id: '4:5',
    label: '4:5 Portrait',
    subLabel: 'Instagram Feed',
    width: 1080,
    height: 1350,
    cssAspect: 'aspect-[4/5] max-w-[380px]',
    icon: <Film className="w-4 h-4" />,
  },
  {
    id: '1:1',
    label: '1:1 Square',
    subLabel: 'Classic Grid',
    width: 1080,
    height: 1080,
    cssAspect: 'aspect-[1/1] max-w-[400px]',
    icon: <Square className="w-4 h-4" />,
  },
  {
    id: '16:9',
    label: '16:9 Landscape',
    subLabel: 'Cinematic / Wide',
    width: 1920,
    height: 1080,
    cssAspect: 'aspect-[16/9] max-w-[560px]',
    icon: <Monitor className="w-4 h-4" />,
  },
  {
    id: '4:3',
    label: '4:3 Classic',
    subLabel: 'Retro Photo',
    width: 1440,
    height: 1080,
    cssAspect: 'aspect-[4/3] max-w-[480px]',
    icon: <ImageIcon className="w-4 h-4" />,
  },
];

// Aesthetic Color Filters
export interface PhotoFilter {
  id: string;
  name: string;
  filterCss: string;
  canvasFilter: string;
  previewColor: string;
}

const PHOTO_FILTERS: PhotoFilter[] = [
  { id: 'normal', name: 'Original', filterCss: 'none', canvasFilter: 'none', previewColor: 'from-gray-300 to-gray-500' },
  { id: 'cyber-neon', name: 'Cyber Neon', filterCss: 'contrast(120%) saturate(150%) hue-rotate(-8deg)', canvasFilter: 'contrast(1.2) saturate(1.5) hue-rotate(-8deg)', previewColor: 'from-[#00F5FF] to-[#FF2E93]' },
  { id: 'film-1998', name: 'Film 1998', filterCss: 'sepia(28%) contrast(108%) brightness(96%) saturate(125%)', canvasFilter: 'sepia(0.28) contrast(1.08) brightness(0.96) saturate(1.25)', previewColor: 'from-amber-600 to-orange-400' },
  { id: 'noir-bw', name: 'B&W Noir', filterCss: 'grayscale(100%) contrast(140%) brightness(95%)', canvasFilter: 'grayscale(1) contrast(1.4) brightness(0.95)', previewColor: 'from-gray-900 to-gray-400' },
  { id: 'golden-hour', name: 'Golden Hour', filterCss: 'sepia(35%) saturate(135%) brightness(106%) hue-rotate(-12deg)', canvasFilter: 'sepia(0.35) saturate(1.35) brightness(1.06) hue-rotate(-12deg)', previewColor: 'from-yellow-400 to-amber-600' },
  { id: 'y2k-gloss', name: 'Y2K Gloss', filterCss: 'contrast(125%) saturate(160%) brightness(110%)', canvasFilter: 'contrast(1.25) saturate(1.6) brightness(1.1)', previewColor: 'from-pink-400 to-purple-600' },
  { id: 'dream-glow', name: 'Soft Glow', filterCss: 'brightness(108%) contrast(96%) saturate(115%)', canvasFilter: 'brightness(1.08) contrast(0.96) saturate(1.15)', previewColor: 'from-purple-300 to-pink-300' },
  { id: 'cold-chrome', name: 'Cold Chrome', filterCss: 'saturate(85%) contrast(115%) hue-rotate(170deg)', canvasFilter: 'saturate(0.85) contrast(1.15) hue-rotate(170deg)', previewColor: 'from-cyan-400 to-blue-600' },
];

// Available Stickers Library
export interface StickerItem {
  id: string;
  name: string;
  display: string; // Emoji or SVG preview
  isTextBadge?: boolean;
}

const STICKER_LIBRARY: StickerItem[] = [
  { id: 'stk-sparkle', name: 'Y2K Sparkle', display: '✨' },
  { id: 'stk-chrome-star', name: 'Chrome Star', display: '🌟' },
  { id: 'stk-flame', name: 'Fire Flame', display: '🔥' },
  { id: 'stk-heart', name: 'Sparkle Heart', display: '💖' },
  { id: 'stk-crown', name: 'Aura Crown', display: '👑' },
  { id: 'stk-sunglasses', name: 'Oval Shades', display: '🕶️' },
  { id: 'stk-slay', name: 'SLAY Tag', display: '⚡ SLAY', isTextBadge: true },
  { id: 'stk-nocap', name: 'NO CAP', display: '💯 NO CAP', isTextBadge: true },
  { id: 'stk-keoly', name: 'KEO LỲ', display: '💅 KEO LỲ', isTextBadge: true },
  { id: 'stk-saigon', name: 'SGN 2026', display: '📍 SÀI GÒN 2026', isTextBadge: true },
  { id: 'stk-barcode', name: 'Barcode', display: '█║▌║█║▌', isTextBadge: true },
  { id: 'stk-rec', name: 'REC Live', display: '● REC 00:26', isTextBadge: true },
  { id: 'stk-brand', name: 'LOCAL BRAND', display: '★ VERIFIED FIT ★', isTextBadge: true },
  { id: 'stk-tamagotchi', name: 'Tamagotchi', display: '🐰' },
];

// Interactive Placed Canvas Item (Sticker or Text)
export interface PlacedCanvasItem {
  id: string;
  type: 'sticker' | 'text';
  content: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  scale: number; // 0.6 - 2.5
  rotation: number; // degrees
  fontFamily?: string;
  color?: string;
  hasGlow?: boolean;
  isTextBadge?: boolean;
}

// Preset Text Fonts
const FONT_OPTIONS = [
  { id: 'syne', name: 'Cyber Display', fontCss: "'Syne', 'Impact', sans-serif" },
  { id: 'space', name: 'Space Mono', fontCss: "'Space Grotesk', monospace" },
  { id: 'serif', name: 'Editorial Serif', fontCss: "'Didot', 'Playfair Display', serif" },
  { id: 'cursive', name: 'Handwritten', fontCss: "'Dancing Script', cursive" },
  { id: 'modern', name: 'Clean Sans', fontCss: "'Plus Jakarta Sans', sans-serif" },
];

const TEXT_COLORS = [
  { hex: '#FFFFFF', name: 'Trắng' },
  { hex: '#D4FF00', name: 'Lime Neon' },
  { hex: '#FF2E93', name: 'Hồng Cyber' },
  { hex: '#00F5FF', name: 'Cyan Laser' },
  { hex: '#FFA500', name: 'Cam Amber' },
  { hex: '#10B981', name: 'Xanh Emerald' },
  { hex: '#000000', name: 'Đen' },
];

interface PhotoboothViewProps {
  frames: PhotoboothFrame[];
  currentVibe?: VibeStyle;
  capturedPhoto?: string | null;
  onBackToMap?: () => void;
}

export const PhotoboothView: React.FC<PhotoboothViewProps> = ({
  frames,
}) => {
  // 1. Aspect Ratio state
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioType>('9:16');
  
  // 2. Active Frame state
  const [selectedFrameId, setSelectedFrameId] = useState<string>(
    frames[0]?.id || 'frame-01'
  );

  // 3. Color Filter state
  const [selectedFilterId, setSelectedFilterId] = useState<string>('normal');

  // 4. Base Photo state (Default stylish starter model photo, independent of fitcheck)
  const [activePhoto, setActivePhoto] = useState<string>(
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
  );

  // 5. Placed Items (Stickers & Custom Text)
  const [placedItems, setPlacedItems] = useState<PlacedCanvasItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // 6. Custom Text Composer state
  const [customTextInput, setCustomTextInput] = useState('');
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0].fontCss);
  const [selectedTextColor, setSelectedTextColor] = useState('#FFFFFF');
  const [hasTextGlow, setHasTextGlow] = useState(true);

  // 7. Active Tab selector
  const [activeTab, setActiveTab] = useState<'ratio' | 'frames' | 'filters' | 'stickers' | 'text'>('frames');

  // 8. Camera & Export states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [timerSeconds, setTimerSeconds] = useState<0 | 3 | 5 | 10>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Dragging interaction state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const ratioConfig = ASPECT_RATIOS.find((r) => r.id === selectedRatio) || ASPECT_RATIOS[0];
  const activeFilter = PHOTO_FILTERS.find((f) => f.id === selectedFilterId) || PHOTO_FILTERS[0];
  const activeFrame = frames.find((f) => f.id === selectedFrameId) || frames[0];

  // Camera stream lifecycle
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (isCameraActive) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode, width: { ideal: 1080 }, height: { ideal: 1920 } },
          audio: false,
        })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {});
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isCameraActive, facingMode]);

  // Countdown timer lifecycle
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      setCountdown(null);
      captureSnapshot();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const cycleTimer = () => {
    setTimerSeconds((prev) => (prev === 0 ? 3 : prev === 3 ? 5 : prev === 5 ? 10 : 0));
  };

  const captureSnapshot = () => {
    if (!videoRef.current) return;
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 250);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 1080;
    canvas.height = videoRef.current.videoHeight || 1920;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setActivePhoto(canvas.toDataURL('image/jpeg', 0.95));
      setIsCameraActive(false);
    }
  };

  const handleSnap = () => {
    if (timerSeconds > 0) {
      setCountdown(timerSeconds);
      return;
    }
    captureSnapshot();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setActivePhoto(reader.result);
          setIsCameraActive(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Sticker & Text placement handlers
  const handleAddSticker = (sticker: StickerItem) => {
    const newItem: PlacedCanvasItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: 'sticker',
      content: sticker.display,
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
      isTextBadge: sticker.isTextBadge,
    };
    setPlacedItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  const handleAddCustomText = () => {
    if (!customTextInput.trim()) return;
    const newItem: PlacedCanvasItem = {
      id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: 'text',
      content: customTextInput.trim(),
      x: 50,
      y: 65,
      scale: 1,
      rotation: 0,
      fontFamily: selectedFont,
      color: selectedTextColor,
      hasGlow: hasTextGlow,
    };
    setPlacedItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
    setCustomTextInput('');
  };

  const handleDeleteItem = (id: string) => {
    setPlacedItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const handleScaleItem = (id: string, delta: number) => {
    setPlacedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, scale: Math.max(0.5, Math.min(3.0, item.scale + delta)) }
          : item
      )
    );
  };

  const handleClearAllItems = () => {
    setPlacedItems([]);
    setSelectedItemId(null);
  };

  // Pointer Drag Handlers on canvas
  const handlePointerDownItem = (id: string, e: React.PointerEvent) => {
    e.stopPropagation();
    setSelectedItemId(id);
    setDraggingId(id);
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMoveCanvas = (e: React.PointerEvent) => {
    if (!draggingId || !dragStartPos || !canvasContainerRef.current) return;

    const rect = canvasContainerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStartPos.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartPos.y) / rect.height) * 100;

    setPlacedItems((prev) =>
      prev.map((item) =>
        item.id === draggingId
          ? {
              ...item,
              x: Math.max(5, Math.min(95, item.x + deltaX)),
              y: Math.max(5, Math.min(95, item.y + deltaY)),
            }
          : item
      )
    );

    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUpCanvas = () => {
    setDraggingId(null);
    setDragStartPos(null);
  };

  // High Resolution Canvas Compositor & Download
  const handleDownloadHQ = async () => {
    setIsExporting(true);
    setSelectedItemId(null);

    const canvas = document.createElement('canvas');
    canvas.width = ratioConfig.width;
    canvas.height = ratioConfig.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // 1. Draw Base Photo with selected color filter
    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = activePhoto;

    await new Promise<void>((resolve) => {
      baseImg.onload = () => {
        ctx.save();
        if (activeFilter.canvasFilter !== 'none') {
          ctx.filter = activeFilter.canvasFilter;
        }

        // Center cover crop
        const imgAspect = baseImg.width / baseImg.height;
        const canvasAspect = canvas.width / canvas.height;
        let dw = canvas.width;
        let dh = canvas.height;
        let dx = 0;
        let dy = 0;

        if (imgAspect > canvasAspect) {
          dh = canvas.height;
          dw = canvas.height * imgAspect;
          dx = (canvas.width - dw) / 2;
        } else {
          dw = canvas.width;
          dh = canvas.width / imgAspect;
          dy = (canvas.height - dh) / 2;
        }

        ctx.drawImage(baseImg, dx, dy, dw, dh);
        ctx.restore();
        resolve();
      };
      baseImg.onerror = () => resolve();
    });

    // 2. Draw Frame Overlay if present
    if (activeFrame && activeFrame.frameOverlayUrl) {
      const frameImg = new Image();
      frameImg.crossOrigin = 'anonymous';
      frameImg.src = activeFrame.frameOverlayUrl;

      await new Promise<void>((resolve) => {
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
          resolve();
        };
        frameImg.onerror = () => resolve();
      });
    }

    // 3. Draw all Placed Stickers and Text
    for (const item of placedItems) {
      const posX = (item.x / 100) * canvas.width;
      const posY = (item.y / 100) * canvas.height;

      ctx.save();
      ctx.translate(posX, posY);
      if (item.rotation) ctx.rotate((item.rotation * Math.PI) / 180);
      ctx.scale(item.scale, item.scale);

      if (item.type === 'text') {
        const fontSize = Math.round(canvas.width * 0.052);
        ctx.font = `900 ${fontSize}px ${item.fontFamily || "'Syne', sans-serif"}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (item.hasGlow) {
          ctx.shadowColor = item.color || '#D4FF00';
          ctx.shadowBlur = 24;
        }

        ctx.fillStyle = item.color || '#FFFFFF';
        ctx.fillText(item.content, 0, 0);

        // Stroke outline for readability
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeText(item.content, 0, 0);
        ctx.fillText(item.content, 0, 0);
      } else if (item.isTextBadge) {
        const fontSize = Math.round(canvas.width * 0.032);
        ctx.font = `900 ${fontSize}px 'Space Grotesk', sans-serif`;
        const textMetrics = ctx.measureText(item.content);
        const padX = 24;
        const padY = 14;
        const boxW = textMetrics.width + padX * 2;
        const boxH = fontSize + padY * 2;

        // Background pill
        ctx.fillStyle = 'rgba(10, 10, 15, 0.85)';
        ctx.strokeStyle = '#00F5FF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#D4FF00';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.content, 0, 2);
      } else {
        // Emoji / Sticker
        const emojiSize = Math.round(canvas.width * 0.09);
        ctx.font = `${emojiSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 12;
        ctx.fillText(item.content, 0, 0);
      }

      ctx.restore();
    }

    // Export & trigger browser download
    const link = document.createElement('a');
    link.download = `AuraLens_Photobooth_${selectedRatio.replace(':', 'x')}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 0.95);
    link.click();

    setIsExporting(false);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Web Share API
  const handleShareStory = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AuraLens Photobooth Story',
          text: 'Check out my custom photobooth frame crafted with AuraLens!',
          url: window.location.href,
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleDownloadHQ();
    }
  };

  return (
    <div className="animate-fadeIn space-y-6 pb-20 max-w-5xl mx-auto px-2 sm:px-4">
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* ========================================================================= */}
      {/* 1. CENTER STAGE CANVAS VIEWPORT                                           */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center justify-center w-full">
        <div
          ref={canvasContainerRef}
          onPointerMove={handlePointerMoveCanvas}
          onPointerUp={handlePointerUpCanvas}
          className={`relative w-full ${ratioConfig.cssAspect} rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black select-none transition-all duration-300 group`}
          style={{ touchAction: 'none' }}
        >
          {/* Flash Effect */}
          {isFlashActive && (
            <div className="absolute inset-0 bg-white z-50 animate-fadeOut pointer-events-none" />
          )}

          {/* LIVE CAMERA MODE */}
          {isCameraActive ? (
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gray-950">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {/* Frame Overlay during Live Camera */}
              {activeFrame?.frameOverlayUrl && (
                <img
                  src={activeFrame.frameOverlayUrl}
                  alt="Frame"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                />
              )}

              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 z-30 bg-black/65 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                  <div className="relative flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border-4 border-[#D4FF00] border-t-transparent animate-spin shadow-[0_0_40px_rgba(212,255,0,0.8)]" />
                    <span className="absolute font-black text-6xl text-[#D4FF00] tracking-tighter drop-shadow-2xl">
                      {countdown}
                    </span>
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-widest block mt-4 animate-pulse">
                    📸 Strike a pose...
                  </span>
                </div>
              )}

              {/* Camera Header Bar */}
              <div className="relative z-20 flex items-center justify-between">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase">
                  ● Live Camera
                </span>
                <button
                  onClick={() => setFacingMode((p) => (p === 'user' ? 'environment' : 'user'))}
                  className="p-2 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black transition-all cursor-pointer"
                >
                  <SwitchCamera className="w-4 h-4" />
                </button>
              </div>

              {/* Camera Bottom Shutter & Timer */}
              <div className="relative z-20 flex items-center justify-center gap-4">
                <button
                  onClick={handleSnap}
                  disabled={countdown !== null}
                  className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#D4FF00] to-[#00F5FF] shadow-2xl active:scale-90 transition-transform flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                </button>

                <button
                  onClick={cycleTimer}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg border flex flex-col items-center justify-center ${
                    timerSeconds > 0
                      ? 'bg-[#D4FF00] text-gray-950 border-[#D4FF00] font-black'
                      : 'bg-black/60 hover:bg-black text-white border-white/25'
                  }`}
                >
                  <Timer className={`w-4 h-4 ${timerSeconds > 0 ? 'text-gray-950' : 'text-[#D4FF00]'}`} />
                  <span className="text-[9px] font-black uppercase mt-0.5">
                    {timerSeconds === 0 ? 'Off' : `${timerSeconds}s`}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* PHOTO CANVAS PREVIEW MODE */
            <div className="absolute inset-0 overflow-hidden">
              {/* 1. Base Photo Layer with CSS Filter */}
              <img
                src={activePhoto}
                alt="Photobooth Subject"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                style={{ filter: activeFilter.filterCss }}
              />

              {/* 2. Vector Frame Overlay */}
              {activeFrame?.frameOverlayUrl && (
                <img
                  src={activeFrame.frameOverlayUrl}
                  alt={activeFrame.name}
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                />
              )}

              {/* 3. Draggable Stickers & Text Layer */}
              {placedItems.map((item) => {
                const isSelected = selectedItemId === item.id;

                return (
                  <div
                    key={item.id}
                    onPointerDown={(e) => handlePointerDownItem(item.id, e)}
                    className={`absolute z-20 cursor-move transition-shadow select-none ${
                      isSelected
                        ? 'ring-2 ring-[#D4FF00] rounded-xl shadow-2xl bg-black/20 p-1 backdrop-blur-[1px]'
                        : 'hover:ring-1 hover:ring-white/50'
                    }`}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: `translate(-50%, -50%) scale(${item.scale}) rotate(${item.rotation}deg)`,
                    }}
                  >
                    {item.type === 'text' ? (
                      <span
                        className="font-black tracking-wide block whitespace-nowrap drop-shadow-md"
                        style={{
                          fontFamily: item.fontFamily,
                          color: item.color,
                          textShadow: item.hasGlow
                            ? `0 0 16px ${item.color}, 0 0 2px #000`
                            : '0 2px 4px rgba(0,0,0,0.8)',
                          fontSize: '18px',
                        }}
                      >
                        {item.content}
                      </span>
                    ) : item.isTextBadge ? (
                      <span className="px-3 py-1.5 rounded-full bg-black/80 text-[#D4FF00] border border-[#00F5FF] text-xs font-black tracking-wider uppercase whitespace-nowrap shadow-lg flex items-center gap-1.5">
                        {item.content}
                      </span>
                    ) : (
                      <span className="text-3xl drop-shadow-md block leading-none">
                        {item.content}
                      </span>
                    )}

                    {/* Controls popup for selected item */}
                    {isSelected && (
                      <div
                        onPointerDown={(e) => e.stopPropagation()}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gray-950/90 text-white rounded-full px-2 py-0.5 shadow-xl border border-white/20 z-30"
                      >
                        <button
                          onClick={() => handleScaleItem(item.id, -0.2)}
                          className="p-1 hover:text-[#D4FF00] transition-colors cursor-pointer"
                          title="Thu nhỏ"
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleScaleItem(item.id, 0.2)}
                          className="p-1 hover:text-[#D4FF00] transition-colors cursor-pointer"
                          title="Phóng to"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-px h-3 bg-white/20 mx-0.5" />
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Xóa item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. PRIMARY ACTION CONTROLS (Harmonious below canvas)                     */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5 max-w-lg w-full px-2">
          {/* Snap with Camera */}
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`py-3 px-4.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
              isCameraActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
            }`}
          >
            <Camera className="w-4 h-4 text-purple-600" />
            <span>{isCameraActive ? 'Đóng Camera' : 'Chụp Ảnh'}</span>
          </button>

          {/* Upload Photo */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="py-3 px-4.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-purple-600" />
            <span>Tải Ảnh Lên</span>
          </button>

          {/* Reset Canvas */}
          {placedItems.length > 0 && (
            <button
              onClick={handleClearAllItems}
              className="py-3 px-3.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-600 hover:text-red-500 border border-gray-200 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              title="Xóa hết sticker & chữ"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Xóa Layer</span>
            </button>
          )}

          {/* Download Button */}
          <button
            onClick={handleDownloadHQ}
            disabled={isExporting}
            className="flex-1 py-3 px-5 rounded-2xl bg-gray-950 hover:bg-black text-white font-black text-xs sm:text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#D4FF00]" />
                <span className="text-[#D4FF00]">Đã Lưu Thành Công!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#D4FF00]" />
                <span>{isExporting ? 'Đang Xuất Ảnh...' : `Tải Ảnh ${selectedRatio}`}</span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShareStory}
            className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-md active:scale-95 transition-all cursor-pointer"
            title="Chia sẻ Story"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CATEGORIZED CUSTOMIZATION STUDIO DECK (Tabbed Filter Bar)               */}
      {/* ========================================================================= */}
      <div className="calm-card-elevated p-4 sm:p-5 rounded-3xl bg-white shadow-xl border border-gray-100 space-y-4">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-gray-100">
          <button
            onClick={() => setActiveTab('ratio')}
            className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'ratio'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Khổ Ảnh ({selectedRatio})</span>
          </button>

          <button
            onClick={() => setActiveTab('frames')}
            className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'frames'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Khung Trend ({frames.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('filters')}
            className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'filters'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Bộ Lọc Màu ({PHOTO_FILTERS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stickers')}
            className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'stickers'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>Sticker & Nhãn ({STICKER_LIBRARY.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`py-2 px-3.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'text'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Chèn Chữ & Font</span>
          </button>
        </div>

        {/* ==================== TAB 1: ASPECT RATIO ==================== */}
        {activeTab === 'ratio' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 animate-fadeIn">
            {ASPECT_RATIOS.map((ratio) => {
              const isSelected = ratio.id === selectedRatio;

              return (
                <button
                  key={ratio.id}
                  onClick={() => setSelectedRatio(ratio.id)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-purple-50/90 border-purple-500 ring-2 ring-purple-300/40 shadow-sm'
                      : 'bg-gray-50/80 hover:bg-gray-100/80 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {ratio.icon}
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase">
                      {ratio.width}x{ratio.height}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900">{ratio.label}</h4>
                    <span className="text-[10px] font-bold text-gray-500">{ratio.subLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ==================== TAB 2: FRAMES ==================== */}
        {activeTab === 'frames' && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x animate-fadeIn">
            {/* Option: None / Raw */}
            <button
              onClick={() => setSelectedFrameId('')}
              className={`snap-start shrink-0 flex flex-col items-center gap-1.5 p-1 rounded-2xl transition-all ${
                selectedFrameId === '' ? 'scale-105 opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl overflow-hidden p-0.5 shadow-md flex items-center justify-center ${
                selectedFrameId === '' ? 'ring-4 ring-[#D4FF00] bg-purple-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-600'
              }`}>
                <span className="text-[10px] font-black uppercase">Không Khung</span>
              </div>
              <span className="text-[10px] font-bold text-gray-700">Nguyên Bản</span>
            </button>

            {frames.map((frame) => {
              const isSelected = frame.id === selectedFrameId;

              return (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrameId(frame.id)}
                  className={`snap-start shrink-0 flex flex-col items-center gap-1.5 p-1 rounded-2xl transition-all ${
                    isSelected ? 'scale-105 opacity-100' : 'opacity-70 hover:opacity-90'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl overflow-hidden p-0.5 shadow-md transition-all ${
                      isSelected
                        ? 'ring-4 ring-[#D4FF00] shadow-lg bg-gradient-to-tr from-[#FF2E93] to-[#00F5FF]'
                        : 'bg-white/80 border border-gray-200'
                    }`}
                  >
                    <div className="w-full h-full rounded-[14px] bg-gray-900 overflow-hidden relative">
                      <img
                        src={frame.previewUrl}
                        alt={frame.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <span className="absolute bottom-0.5 inset-x-0 text-[8px] font-black text-center text-white truncate px-1 drop-shadow">
                        {frame.vibeTag}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 truncate max-w-[70px]">
                    {frame.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ==================== TAB 3: FILTERS ==================== */}
        {activeTab === 'filters' && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x animate-fadeIn">
            {PHOTO_FILTERS.map((filter) => {
              const isSelected = filter.id === selectedFilterId;

              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilterId(filter.id)}
                  className={`snap-start shrink-0 flex flex-col items-center gap-1.5 p-1.5 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? 'scale-105 bg-purple-50 ring-2 ring-purple-400 shadow-sm'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl shadow-inner overflow-hidden bg-gradient-to-tr ${filter.previewColor} flex items-center justify-center text-white font-black text-[10px] border border-white/40`}
                  >
                    {isSelected && <CheckCircle2 className="w-5 h-5 drop-shadow-md" />}
                  </div>
                  <span className="text-[10px] font-extrabold text-gray-800 truncate max-w-[65px]">
                    {filter.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ==================== TAB 4: STICKERS ==================== */}
        {activeTab === 'stickers' && (
          <div className="space-y-2 animate-fadeIn">
            <span className="text-[11px] font-bold text-gray-500 block">
              💡 Chạm vào sticker để thêm vào ảnh. Sau khi thêm, bạn có thể **kéo thả di chuyển** hoặc phóng to/thu nhỏ tự do!
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {STICKER_LIBRARY.map((stk) => (
                <button
                  key={stk.id}
                  onClick={() => handleAddSticker(stk)}
                  className="py-2 px-3 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-900 hover:text-purple-900 border border-gray-200 hover:border-purple-300 font-black text-xs transition-all active:scale-90 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="text-base">{stk.display}</span>
                  <span className="text-[11px]">{stk.name}</span>
                  <Plus className="w-3 h-3 text-purple-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: CUSTOM TEXT & FONTS ==================== */}
        {activeTab === 'text' && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Input Row */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customTextInput}
                onChange={(e) => setCustomTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCustomText();
                }}
                placeholder="Nhập chữ bạn muốn chèn (VD: Vibe Sài Gòn, OOTD, Slay...)"
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
              <button
                onClick={handleAddCustomText}
                disabled={!customTextInput.trim()}
                className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Chữ</span>
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-black text-gray-400 uppercase shrink-0">Gợi ý:</span>
              {['SLAY', 'OOTD 2026', 'CHÁY PHỐ', 'VIBE SÀI GÒN', 'MAIN CHARACTER', 'AURA +1000'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCustomTextInput(preset)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-800 text-[10px] font-black shrink-0 transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Font Style & Colors Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-100">
              {/* Font Selector */}
              <div className="space-y-1">
                <span className="text-[11px] font-black text-gray-500 uppercase">Kiểu Font</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {FONT_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFont(f.fontCss)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-left truncate ${
                        selectedFont === f.fontCss
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                      }`}
                      style={{ fontFamily: f.fontCss }}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color & Glow Picker */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-gray-500 uppercase">Màu Chữ & Hiệu Ứng</span>
                  <button
                    onClick={() => setHasTextGlow(!hasTextGlow)}
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                      hasTextGlow
                        ? 'bg-[#D4FF00] text-gray-950 border-[#D4FF00]'
                        : 'bg-gray-100 text-gray-500 border-gray-200'
                    }`}
                  >
                    ✨ Glow: {hasTextGlow ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {TEXT_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setSelectedTextColor(c.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedTextColor === c.hex
                          ? 'scale-115 border-purple-600 ring-2 ring-purple-300 shadow-sm'
                          : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

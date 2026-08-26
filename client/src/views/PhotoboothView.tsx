import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  SwitchCamera,
  Upload,
  Sparkles,
  Timer,
  Download,
  CheckCircle2,
  Share2,
  Type,
  Trash2,
  Palette,
  Plus,
  RotateCcw,
  Smartphone,
  Square,
  Monitor,
  Film,
  ZoomIn,
  ZoomOut,
  Star,
  Image as ImageIcon,
} from 'lucide-react';
import type { PhotoboothFrame, VibeStyle } from '../types/entityGraph.js';
import type { AppLanguage } from '../types/settings.js';

// Available Aspect Ratios
export type AspectRatioType = '9:16' | '4:5' | '1:1' | '16:9' | '4:3';

interface AspectRatioConfig {
  id: AspectRatioType;
  labelEn: string;
  labelVi: string;
  subEn: string;
  subVi: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const ASPECT_RATIOS: AspectRatioConfig[] = [
  {
    id: '9:16',
    labelEn: '9:16 Story',
    labelVi: '9:16 Story',
    subEn: 'Reels / TikTok',
    subVi: 'Reels / TikTok',
    width: 1080,
    height: 1920,
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    id: '4:5',
    labelEn: '4:5 Portrait',
    labelVi: '4:5 Chân Dung',
    subEn: 'Instagram Feed',
    subVi: 'Instagram Feed',
    width: 1080,
    height: 1350,
    icon: <Film className="w-4 h-4" />,
  },
  {
    id: '1:1',
    labelEn: '1:1 Square',
    labelVi: '1:1 Vuông',
    subEn: 'Classic Grid',
    subVi: 'Khổ Vuông',
    width: 1080,
    height: 1080,
    icon: <Square className="w-4 h-4" />,
  },
  {
    id: '16:9',
    labelEn: '16:9 Cinema',
    labelVi: '16:9 Khổ Ngang',
    subEn: 'Cinematic Wide',
    subVi: 'Điện Ảnh Rộng',
    width: 1920,
    height: 1080,
    icon: <Monitor className="w-4 h-4" />,
  },
  {
    id: '4:3',
    labelEn: '4:3 Classic',
    labelVi: '4:3 Cổ Điển',
    subEn: 'Retro Photo',
    subVi: 'Ảnh Retro',
    width: 1440,
    height: 1080,
    icon: <ImageIcon className="w-4 h-4" />,
  },
];

// Aesthetic Color Filters
export interface PhotoFilter {
  id: string;
  nameEn: string;
  nameVi: string;
  filterCss: string;
  canvasFilter: string;
  previewColor: string;
}

const PHOTO_FILTERS: PhotoFilter[] = [
  { id: 'normal', nameEn: 'Original', nameVi: 'Gốc', filterCss: 'none', canvasFilter: 'none', previewColor: 'from-gray-300 to-gray-500' },
  { id: 'cyber-neon', nameEn: 'Cyber Neon', nameVi: 'Cyber Neon', filterCss: 'contrast(120%) saturate(150%) hue-rotate(-8deg)', canvasFilter: 'contrast(1.2) saturate(1.5) hue-rotate(-8deg)', previewColor: 'from-[#00F5FF] to-[#FF2E93]' },
  { id: 'film-1998', nameEn: 'Film 1998', nameVi: 'Film 1998', filterCss: 'sepia(28%) contrast(108%) brightness(96%) saturate(125%)', canvasFilter: 'sepia(0.28) contrast(1.08) brightness(0.96) saturate(1.25)', previewColor: 'from-amber-600 to-orange-400' },
  { id: 'noir-bw', nameEn: 'B&W Noir', nameVi: 'Đen Trắng', filterCss: 'grayscale(100%) contrast(140%) brightness(95%)', canvasFilter: 'grayscale(1) contrast(1.4) brightness(0.95)', previewColor: 'from-gray-900 to-gray-400' },
  { id: 'golden-hour', nameEn: 'Golden Hour', nameVi: 'Nắng Ấm', filterCss: 'sepia(35%) saturate(135%) brightness(106%) hue-rotate(-12deg)', canvasFilter: 'sepia(0.35) saturate(1.35) brightness(1.06) hue-rotate(-12deg)', previewColor: 'from-yellow-400 to-amber-600' },
  { id: 'y2k-gloss', nameEn: 'Y2K Gloss', nameVi: 'Y2K Gloss', filterCss: 'contrast(125%) saturate(160%) brightness(110%)', canvasFilter: 'contrast(1.25) saturate(1.6) brightness(1.1)', previewColor: 'from-pink-400 to-purple-600' },
  { id: 'dream-glow', nameEn: 'Soft Glow', nameVi: 'Mơ Màng', filterCss: 'brightness(108%) contrast(96%) saturate(115%)', canvasFilter: 'brightness(1.08) contrast(0.96) saturate(1.15)', previewColor: 'from-purple-300 to-pink-300' },
  { id: 'cold-chrome', nameEn: 'Cold Chrome', nameVi: 'Chrome Lạnh', filterCss: 'saturate(85%) contrast(115%) hue-rotate(170deg)', canvasFilter: 'saturate(0.85) contrast(1.15) hue-rotate(170deg)', previewColor: 'from-cyan-400 to-blue-600' },
];

// Available Stickers Library
export interface StickerItem {
  id: string;
  nameEn: string;
  nameVi: string;
  display: string;
  isTextBadge?: boolean;
}

const STICKER_LIBRARY: StickerItem[] = [
  { id: 'stk-sparkle', nameEn: 'Sparkles', nameVi: 'Lấp Lánh', display: '✨' },
  { id: 'stk-chrome-star', nameEn: 'Chrome Star', nameVi: 'Sao Bạc', display: '🌟' },
  { id: 'stk-flame', nameEn: 'Flame', nameVi: 'Ngọn Lửa', display: '🔥' },
  { id: 'stk-heart', nameEn: 'Heart', nameVi: 'Trái Tim', display: '💖' },
  { id: 'stk-crown', nameEn: 'Crown', nameVi: 'Vương Miện', display: '👑' },
  { id: 'stk-sunglasses', nameEn: 'Oval Shades', nameVi: 'Kính Râm', display: '🕶️' },
  { id: 'stk-slay', nameEn: 'SLAY Tag', nameVi: 'Tag SLAY', display: '⚡ SLAY', isTextBadge: true },
  { id: 'stk-nocap', nameEn: 'NO CAP', nameVi: 'NO CAP', display: '💯 NO CAP', isTextBadge: true },
  { id: 'stk-keoly', nameEn: 'KEO LY', nameVi: 'KEO LỲ', display: '💅 KEO LỲ', isTextBadge: true },
  { id: 'stk-saigon', nameEn: 'SAIGON', nameVi: 'SÀI GÒN', display: '📍 SÀI GÒN 2026', isTextBadge: true },
  { id: 'stk-barcode', nameEn: 'Barcode', nameVi: 'Mã Vạch', display: '█║▌║█║▌', isTextBadge: true },
  { id: 'stk-rec', nameEn: 'REC Live', nameVi: 'Đang Quay', display: '● REC 00:26', isTextBadge: true },
  { id: 'stk-brand', nameEn: 'VERIFIED', nameVi: 'CHÍNH HÃNG', display: '★ VERIFIED FIT ★', isTextBadge: true },
  { id: 'stk-tamagotchi', nameEn: 'Bunny Charm', nameVi: 'Thỏ Cute', display: '🐰' },
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
  { hex: '#FFFFFF', name: 'White / Trắng' },
  { hex: '#D4FF00', name: 'Lime Neon' },
  { hex: '#FF2E93', name: 'Cyber Pink' },
  { hex: '#00F5FF', name: 'Laser Cyan' },
  { hex: '#FFA500', name: 'Amber Orange' },
  { hex: '#10B981', name: 'Emerald Green' },
  { hex: '#000000', name: 'Pitch Black' },
];

interface PhotoboothViewProps {
  frames: PhotoboothFrame[];
  currentVibe?: VibeStyle;
  capturedPhoto?: string | null;
  language?: AppLanguage;
  onBackToMap?: () => void;
}

export const PhotoboothView: React.FC<PhotoboothViewProps> = ({
  frames,
  language = 'en',
}) => {
  const isEn = language === 'en';

  // 1. Aspect Ratio state
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioType>('9:16');
  
  // 2. Active Frame state (empty string means "No Frame / Nguyên Bản")
  const [selectedFrameId, setSelectedFrameId] = useState<string>(
    frames[0]?.id || 'frame-01'
  );

  // 3. Color Filter state
  const [selectedFilterId, setSelectedFilterId] = useState<string>('normal');

  // 4. Base Photo state (Well-framed portrait with generous headroom so no heads get cut off!)
  const [activePhoto, setActivePhoto] = useState<string>(
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80'
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

  // Responsive Viewport Height helper (maintains tall consistent height across all ratios)
  const getContainerRatioClass = (ratio: AspectRatioType) => {
    switch (ratio) {
      case '9:16':
        return 'aspect-[9/16] h-[52vh] sm:h-[58vh] max-h-[580px] min-h-[380px] w-auto';
      case '4:5':
        return 'aspect-[4/5] h-[52vh] sm:h-[58vh] max-h-[580px] min-h-[380px] w-auto';
      case '1:1':
        return 'aspect-[1/1] h-[52vh] sm:h-[58vh] max-h-[580px] min-h-[380px] w-auto';
      case '16:9':
        return 'aspect-[16/9] h-[38vh] sm:h-[46vh] max-h-[460px] min-h-[300px] w-auto max-w-[94vw]';
      case '4:3':
        return 'aspect-[4/3] h-[48vh] sm:h-[54vh] max-h-[520px] min-h-[340px] w-auto max-w-[94vw]';
      default:
        return 'aspect-[9/16] h-[52vh] sm:h-[58vh] max-h-[580px] min-h-[380px] w-auto';
    }
  };

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

  // =========================================================================
  // DYNAMIC ADAPTIVE FRAME COMPONENT (Responsive to ANY aspect ratio)
  // =========================================================================
  const renderResponsiveFrame = (frameId: string) => {
    if (!frameId) return null; // No Frame / Nguyên Bản

    switch (frameId) {
      case 'frame-01': // Y2K Cyber Magazine
        return (
          <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-3 sm:p-4 select-none">
            {/* Top Magazine Header */}
            <div className="w-full text-center pt-1 pb-2 bg-gradient-to-b from-black/85 via-black/50 to-transparent rounded-t-2xl">
              <h2 className="font-black text-xl sm:text-2xl text-[#D4FF00] tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-['Syne']">
                AURALENS
              </h2>
              <span className="text-[9px] sm:text-[10px] font-black text-white/90 tracking-widest uppercase block mt-0.5 font-mono">
                ISSUE 2026 // CYBERPOP SPECIAL EDITION
              </span>
              <div className="w-4/5 mx-auto border-b border-dashed border-[#00F5FF] mt-1 opacity-70" />
            </div>

            {/* Corner Cyber Brackets */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4FF00]" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4FF00]" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#00F5FF]" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#00F5FF]" />

            {/* Bottom Barcode & Footer */}
            <div className="w-full flex items-center justify-between pb-1 pt-3 px-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl">
              <div>
                <span className="text-[11px] font-black text-white block tracking-wide">
                  FEEL THE AURA // SGN 2026
                </span>
                <span className="text-[8px] font-bold text-[#D4FF00] tracking-wider block">
                  POWERED BY GOOGLE AI & LUMI PERSONA
                </span>
              </div>
              {/* Barcode graphic */}
              <div className="flex items-center gap-0.5 text-white bg-black/60 px-2 py-0.5 rounded-sm">
                <span className="font-mono text-sm tracking-tighter select-none">█║▌║█║▌█</span>
              </div>
            </div>
          </div>
        );

      case 'frame-02': // Retro 35mm Film Strip
        return (
          <div className="absolute inset-0 pointer-events-none z-10 flex justify-between select-none">
            {/* Left Film Strip */}
            <div className="h-full w-7 sm:w-8 bg-black/95 flex flex-col justify-between py-2 items-center border-r border-white/20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`sprocket-l-${i}`} className="w-3.5 h-3.5 rounded-sm bg-white/90 shadow-inner" />
              ))}
            </div>

            {/* Center Area Corner Timestamps */}
            <div className="flex-1 flex flex-col justify-between p-3">
              <div className="flex justify-between items-center text-[10px] font-mono font-black text-[#FFA500] drop-shadow-md">
                <span>'26 08 27</span>
                <span>KODAK GOLD 400</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-[#FFA500] drop-shadow-md">
                <span>EXP 24+3</span>
                <span>ISO 400 // 35MM</span>
              </div>
            </div>

            {/* Right Film Strip */}
            <div className="h-full w-7 sm:w-8 bg-black/95 flex flex-col justify-between py-2 items-center border-l border-white/20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`sprocket-r-${i}`} className="w-3.5 h-3.5 rounded-sm bg-white/90 shadow-inner" />
              ))}
            </div>
          </div>
        );

      case 'frame-03': // Vogue Fashion Editorial
        return (
          <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 select-none">
            {/* Top Clean Vogue Masthead */}
            <div className="w-full text-center pt-2">
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-white tracking-[0.22em] drop-shadow-lg leading-none">
                VOGUE
              </h1>
              <span className="text-[9px] font-bold text-white/80 tracking-[0.3em] uppercase block mt-1">
                AUTUMN / WINTER 2026
              </span>
            </div>

            {/* Bottom Editorial Rule */}
            <div className="w-full pt-1 pb-1">
              <div className="w-full border-t border-white/60 mb-1.5" />
              <div className="flex items-center justify-between text-[9px] font-mono font-black text-white drop-shadow">
                <span>AURALENS SPECIAL EDITORIAL</span>
                <span>VIETNAM · 2026</span>
              </div>
            </div>
          </div>
        );

      case 'frame-04': // Dopamine Pop Pastel
        return (
          <div className="absolute inset-0 pointer-events-none z-10 p-2 sm:p-3 select-none flex flex-col justify-between">
            {/* SVG Gradient Perimeter Border (fill=none guarantees 100% transparent center) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none p-2 sm:p-3" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dopamineBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF2E93" />
                  <stop offset="50%" stopColor="#00F5FF" />
                  <stop offset="100%" stopColor="#D4FF00" />
                </linearGradient>
              </defs>
              <rect
                x="3"
                y="3"
                width="calc(100% - 6px)"
                height="calc(100% - 6px)"
                rx="16"
                fill="none"
                stroke="url(#dopamineBorderGrad)"
                strokeWidth="5"
              />
            </svg>

            {/* Top Stars */}
            <div className="relative z-20 flex justify-between items-center px-3 pt-2">
              <span className="text-xl drop-shadow-md">🌟</span>
              <span className="px-3 py-1 rounded-full bg-black/80 text-[#D4FF00] text-[10px] font-black tracking-wider uppercase border border-[#FF2E93] shadow-md">
                ★ DOPAMINE POP ★
              </span>
              <span className="text-xl drop-shadow-md">✨</span>
            </div>

            {/* Bottom Stars */}
            <div className="relative z-20 flex justify-between items-center px-3 pb-2">
              <span className="text-xl drop-shadow-md">💖</span>
              <span className="text-[10px] font-black text-white drop-shadow bg-black/70 px-3 py-1 rounded-full border border-white/20">
                #AURALENS_GENZ
              </span>
              <span className="text-xl drop-shadow-md">🌟</span>
            </div>
          </div>
        );

      case 'frame-05': // Neon Matrix Grid (Cyberpunk HUD)
        return (
          <div className="absolute inset-0 pointer-events-none z-10 p-3 sm:p-4 select-none flex flex-col justify-between">
            {/* 4 Neon Brackets */}
            <div className="absolute top-2.5 left-2.5 w-7 h-7 border-t-2 border-l-2 border-[#00F5FF]" />
            <div className="absolute top-2.5 right-2.5 w-7 h-7 border-t-2 border-r-2 border-[#00F5FF]" />
            <div className="absolute bottom-2.5 left-2.5 w-7 h-7 border-b-2 border-l-2 border-[#00F5FF]" />
            <div className="absolute bottom-2.5 right-2.5 w-7 h-7 border-b-2 border-r-2 border-[#00F5FF]" />

            {/* Top HUD Stats */}
            <div className="flex justify-between items-center text-[10px] font-mono font-black text-white px-2 drop-shadow">
              <span className="text-red-500 animate-pulse">● REC [00:26:08]</span>
              <span className="text-[#D4FF00]">BATT [99%]</span>
            </div>

            {/* Bottom Coordinates */}
            <div className="flex justify-between items-center text-[9px] font-mono font-bold text-white px-2 drop-shadow">
              <span className="text-[#00F5FF]">GPS: 10.7769° N, 106.7009° E</span>
              <span>ISO 400 · 1/250s</span>
            </div>
          </div>
        );

      case 'frame-06': // Old Money Royal Gold
        return (
          <div className="absolute inset-0 pointer-events-none z-10 p-3 sm:p-4 select-none flex flex-col justify-between">
            {/* Double Inset Gold Border */}
            <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-amber-300/80 pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 rounded-xl border border-amber-400/50 pointer-events-none" />

            {/* Top Monogram */}
            <div className="w-full text-center pt-2">
              <span className="font-serif font-black text-xs sm:text-sm text-amber-300 tracking-[0.3em] uppercase drop-shadow">
                A U R A · L E N S
              </span>
            </div>

            {/* Bottom Inscription */}
            <div className="w-full text-center pb-2">
              <span className="font-serif text-[8px] sm:text-[9px] text-amber-200/90 tracking-[0.2em] uppercase block drop-shadow">
                PRIVATE COLLECTION · EST. 2026
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
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

    // 1. Draw Base Photo with selected color filter and biased top crop
    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = activePhoto;

    await new Promise<void>((resolve) => {
      baseImg.onload = () => {
        ctx.save();
        if (activeFilter.canvasFilter !== 'none') {
          ctx.filter = activeFilter.canvasFilter;
        }

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
          dy = Math.max(-dh * 0.15, (canvas.height - dh) / 2);
        }

        ctx.drawImage(baseImg, dx, dy, dw, dh);
        ctx.restore();
        resolve();
      };
      baseImg.onerror = () => resolve();
    });

    // 2. Draw Frame Overlay dynamically if frame selected
    if (selectedFrameId) {
      const W = canvas.width;
      const H = canvas.height;

      ctx.save();

      if (selectedFrameId === 'frame-01') {
        // Y2K Cyber Top Bar
        const topGrad = ctx.createLinearGradient(0, 0, 0, H * 0.14);
        topGrad.addColorStop(0, 'rgba(10, 10, 15, 0.92)');
        topGrad.addColorStop(1, 'rgba(10, 10, 15, 0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, W, H * 0.14);

        ctx.font = `900 ${Math.round(W * 0.065)}px 'Syne', sans-serif`;
        ctx.fillStyle = '#D4FF00';
        ctx.textAlign = 'center';
        ctx.fillText('AURALENS', W / 2, H * 0.055);

        ctx.font = `700 ${Math.round(W * 0.024)}px 'Space Grotesk', monospace`;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('ISSUE 2026 // CYBERPOP SPECIAL EDITION', W / 2, H * 0.082);

        // Neon corners
        ctx.strokeStyle = '#D4FF00';
        ctx.lineWidth = Math.round(W * 0.008);
        const pad = Math.round(W * 0.035);
        const len = Math.round(W * 0.08);

        // Top-left
        ctx.beginPath();
        ctx.moveTo(pad, pad + len);
        ctx.lineTo(pad, pad);
        ctx.lineTo(pad + len, pad);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(W - pad - len, pad);
        ctx.lineTo(W - pad, pad);
        ctx.lineTo(W - pad, pad + len);
        ctx.stroke();

        // Bottom corners
        ctx.strokeStyle = '#00F5FF';
        ctx.beginPath();
        ctx.moveTo(pad, H - pad - len);
        ctx.lineTo(pad, H - pad);
        ctx.lineTo(pad + len, H - pad);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(W - pad - len, H - pad);
        ctx.lineTo(W - pad, H - pad);
        ctx.lineTo(W - pad, H - pad - len);
        ctx.stroke();

        // Bottom Barcode Footer
        const botGrad = ctx.createLinearGradient(0, H, 0, H * 0.88);
        botGrad.addColorStop(0, 'rgba(10, 10, 15, 0.95)');
        botGrad.addColorStop(1, 'rgba(10, 10, 15, 0)');
        ctx.fillStyle = botGrad;
        ctx.fillRect(0, H * 0.88, W, H * 0.12);

        ctx.textAlign = 'left';
        ctx.font = `900 ${Math.round(W * 0.032)}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('FEEL THE AURA // SGN 2026', pad, H - pad * 1.5);

        ctx.font = `700 ${Math.round(W * 0.02)}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = '#D4FF00';
        ctx.fillText('POWERED BY GOOGLE AI & LUMI PERSONA', pad, H - pad * 0.6);
      } else if (selectedFrameId === 'frame-02') {
        // Film 35mm Strip
        const stripW = Math.round(W * 0.07);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, stripW, H);
        ctx.fillRect(W - stripW, 0, stripW, H);

        const sprocH = Math.round(H * 0.025);
        const sprocW = Math.round(stripW * 0.55);
        const sprocGap = Math.round(H * 0.08);

        ctx.fillStyle = '#FFFFFF';
        for (let y = sprocH; y < H - sprocH; y += sprocGap) {
          ctx.fillRect((stripW - sprocW) / 2, y, sprocW, sprocH);
          ctx.fillRect(W - stripW + (stripW - sprocW) / 2, y, sprocW, sprocH);
        }

        ctx.font = `900 ${Math.round(W * 0.03)}px monospace`;
        ctx.fillStyle = '#FFA500';
        ctx.textAlign = 'left';
        ctx.fillText("'26 08 27  KODAK GOLD 400", stripW + 20, Math.round(H * 0.05));
      } else if (selectedFrameId === 'frame-03') {
        // Vogue Editorial
        ctx.font = `900 ${Math.round(W * 0.11)}px 'Didot', 'Playfair Display', serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowBlur = 16;
        ctx.fillText('VOGUE', W / 2, Math.round(H * 0.09));

        ctx.shadowBlur = 0;
        ctx.font = `700 ${Math.round(W * 0.022)}px 'Space Grotesk', sans-serif`;
        ctx.fillText('AUTUMN / WINTER 2026', W / 2, Math.round(H * 0.12));

        // Bottom rule
        const botY = Math.round(H * 0.94);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(W * 0.05, botY);
        ctx.lineTo(W * 0.95, botY);
        ctx.stroke();

        ctx.font = `800 ${Math.round(W * 0.022)}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText('AURALENS SPECIAL EDITORIAL', W * 0.05, botY + Math.round(W * 0.035));
        ctx.textAlign = 'right';
        ctx.fillText('VIETNAM · 2026', W * 0.95, botY + Math.round(W * 0.035));
      } else if (selectedFrameId === 'frame-04') {
        // Dopamine Pop Gradient Border
        const b = Math.round(W * 0.015);
        ctx.strokeStyle = '#FF2E93';
        ctx.lineWidth = b;
        ctx.strokeRect(b, b, W - b * 2, H - b * 2);
      } else if (selectedFrameId === 'frame-05') {
        // Cyberpunk HUD
        ctx.strokeStyle = '#00F5FF';
        ctx.lineWidth = Math.round(W * 0.007);
        const pad = Math.round(W * 0.03);
        const len = Math.round(W * 0.07);

        ctx.strokeRect(pad, pad, len, len);
        ctx.strokeRect(W - pad - len, pad, len, len);
        ctx.strokeRect(pad, H - pad - len, len, len);
        ctx.strokeRect(W - pad - len, H - pad - len, len, len);

        ctx.font = `900 ${Math.round(W * 0.024)}px monospace`;
        ctx.fillStyle = '#FF2E93';
        ctx.fillText('● REC [00:26:08]', pad * 1.5, pad * 2);
        ctx.fillStyle = '#00F5FF';
        ctx.fillText('GPS: 10.7769° N, 106.7009° E', pad * 1.5, H - pad * 1.5);
      } else if (selectedFrameId === 'frame-06') {
        // Old Money Gold Inset
        const ins1 = Math.round(W * 0.035);
        const ins2 = Math.round(W * 0.045);
        ctx.strokeStyle = '#FCD34D';
        ctx.lineWidth = 2;
        ctx.strokeRect(ins1, ins1, W - ins1 * 2, H - ins1 * 2);
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 1;
        ctx.strokeRect(ins2, ins2, W - ins2 * 2, H - ins2 * 2);

        ctx.font = `900 ${Math.round(W * 0.032)}px serif`;
        ctx.fillStyle = '#FCD34D';
        ctx.textAlign = 'center';
        ctx.fillText('A U R A · L E N S', W / 2, ins1 + Math.round(W * 0.04));
      }

      ctx.restore();
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
          text: isEn ? 'Check out my custom photobooth frame crafted with AuraLens!' : 'Xem ảnh OOTD cực nghệ làm từ AuraLens nè!',
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
    <div className="animate-fadeIn space-y-6 pb-20 max-w-6xl w-full mx-auto px-2 sm:px-4">
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* ========================================================================= */}
      {/* 1. CENTER STAGE CANVAS VIEWPORT (Consistent tall height across all ratios) */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center justify-center w-full">
        <div
          ref={canvasContainerRef}
          onPointerMove={handlePointerMoveCanvas}
          onPointerUp={handlePointerUpCanvas}
          className={`relative ${getContainerRatioClass(selectedRatio)} rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black select-none transition-all duration-300 group`}
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

              {/* Dynamic Responsive Frame Overlay during Live Camera */}
              {renderResponsiveFrame(selectedFrameId)}

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
                    {isEn ? '📸 Strike a pose...' : '📸 Chuẩn bị tạo dáng...'}
                  </span>
                </div>
              )}

              {/* Camera Header Bar */}
              <div className="relative z-20 flex items-center justify-between">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase">
                  ● {isEn ? 'Live Camera' : 'Camera Trực Tiếp'}
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
              {/* 1. Base Photo Layer with CSS Filter and headroom crop */}
              <img
                src={activePhoto}
                alt="Photobooth Subject"
                className="absolute inset-0 w-full h-full object-cover object-[center_10%] transition-all duration-300"
                style={{ filter: activeFilter.filterCss }}
              />

              {/* 2. Responsive Vector Frame Overlay */}
              {renderResponsiveFrame(selectedFrameId)}

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
                          title={isEn ? 'Scale down' : 'Thu nhỏ'}
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleScaleItem(item.id, 0.2)}
                          className="p-1 hover:text-[#D4FF00] transition-colors cursor-pointer"
                          title={isEn ? 'Scale up' : 'Phóng to'}
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-px h-3 bg-white/20 mx-0.5" />
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title={isEn ? 'Delete item' : 'Xóa item'}
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
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5 max-w-xl w-full px-2">
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
            <span>{isCameraActive ? (isEn ? 'Close Camera' : 'Đóng Camera') : (isEn ? 'Snap Photo' : 'Chụp Ảnh')}</span>
          </button>

          {/* Upload Photo */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="py-3 px-4.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-purple-600" />
            <span>{isEn ? 'Upload Photo' : 'Tải Ảnh Lên'}</span>
          </button>

          {/* Reset Canvas Layers */}
          {placedItems.length > 0 && (
            <button
              onClick={handleClearAllItems}
              className="py-3 px-3.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-600 hover:text-red-500 border border-gray-200 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              title={isEn ? 'Clear all stickers & text' : 'Xóa hết sticker & chữ'}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEn ? 'Clear Layers' : 'Xóa Layer'}</span>
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
                <span className="text-[#D4FF00]">{isEn ? 'Saved to Gallery!' : 'Đã Lưu Thành Công!'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#D4FF00]" />
                <span>{isExporting ? (isEn ? 'Exporting...' : 'Đang Xuất Ảnh...') : (isEn ? `Download ${selectedRatio}` : `Tải Ảnh ${selectedRatio}`)}</span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShareStory}
            className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-md active:scale-95 transition-all cursor-pointer"
            title={isEn ? 'Share Story' : 'Chia sẻ Story'}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CATEGORIZED CUSTOMIZATION STUDIO DECK (Wide & Centered Box)            */}
      {/* ========================================================================= */}
      <div className="calm-card-elevated p-5 sm:p-7 rounded-3xl bg-white shadow-xl border border-gray-100 space-y-5 w-full mx-auto">
        
        {/* Tab Headers (Centered) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-100 flex-wrap">
          <button
            onClick={() => setActiveTab('ratio')}
            className={`py-2.5 px-4.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'ratio'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300/40'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{isEn ? `Ratio (${selectedRatio})` : `Khổ Ảnh (${selectedRatio})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('frames')}
            className={`py-2.5 px-4.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'frames'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300/40'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isEn ? `Trend Frames (${frames.length})` : `Khung Trend (${frames.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('filters')}
            className={`py-2.5 px-4.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'filters'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300/40'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>{isEn ? `Photo Filters (${PHOTO_FILTERS.length})` : `Bộ Lọc Màu (${PHOTO_FILTERS.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('stickers')}
            className={`py-2.5 px-4.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'stickers'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300/40'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Star className="w-4 h-4 text-[#D4FF00]" />
            <span>{isEn ? `Stickers & Decals (${STICKER_LIBRARY.length})` : `Sticker & Nhãn (${STICKER_LIBRARY.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`py-2.5 px-4.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'text'
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300/40'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>{isEn ? 'Add Text & Fonts' : 'Chèn Chữ & Font'}</span>
          </button>
        </div>

        {/* ==================== TAB 1: ASPECT RATIO (Centered) ==================== */}
        {activeTab === 'ratio' && (
          <div className="flex flex-wrap items-center justify-center gap-3.5 animate-fadeIn py-2">
            {ASPECT_RATIOS.map((ratio) => {
              const isSelected = ratio.id === selectedRatio;

              return (
                <button
                  key={ratio.id}
                  onClick={() => setSelectedRatio(ratio.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2.5 w-[150px] sm:w-[170px] shrink-0 ${
                    isSelected
                      ? 'bg-purple-50/95 border-2 border-purple-600 shadow-md ring-2 ring-purple-300/40'
                      : 'bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`p-2 rounded-xl ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {ratio.icon}
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase">
                      {ratio.width}x{ratio.height}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
                      {isEn ? ratio.labelEn : ratio.labelVi}
                    </h4>
                    <span className="text-[11px] font-bold text-gray-500 mt-0.5 block">
                      {isEn ? ratio.subEn : ratio.subVi}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ==================== TAB 2: FRAMES (Centered) ==================== */}
        {activeTab === 'frames' && (
          <div className="flex items-center justify-center gap-3.5 overflow-x-auto py-2 scrollbar-none snap-x animate-fadeIn flex-wrap sm:flex-nowrap">
            {/* Option: None / Raw (Nguyên Bản) */}
            <button
              onClick={() => setSelectedFrameId('')}
              className={`snap-start shrink-0 flex flex-col items-center gap-2 p-2 rounded-2xl transition-all cursor-pointer ${
                selectedFrameId === '' ? 'scale-105 bg-purple-50/90 border-2 border-purple-600 shadow-md' : 'opacity-70 hover:opacity-100 border border-transparent'
              }`}
            >
              <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-1 shadow-md flex items-center justify-center transition-all ${
                selectedFrameId === '' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-100 border-2 border-dashed border-gray-300 text-gray-500'
              }`}>
                <span className="text-xs font-black uppercase text-center leading-tight">
                  {isEn ? 'NO FRAME' : 'NGUYÊN BẢN'}
                </span>
              </div>
              <span className="text-xs font-black text-gray-800">
                {isEn ? 'Raw Photo' : 'Không Khung'}
              </span>
            </button>

            {frames.map((frame) => {
              const isSelected = frame.id === selectedFrameId;

              return (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrameId(frame.id)}
                  className={`snap-start shrink-0 flex flex-col items-center gap-2 p-2 rounded-2xl transition-all cursor-pointer ${
                    isSelected ? 'scale-105 bg-purple-50/90 border-2 border-purple-600 shadow-md' : 'opacity-70 hover:opacity-100 border border-transparent'
                  }`}
                >
                  <div
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 shadow-md transition-all ${
                      isSelected
                        ? 'ring-2 ring-purple-600 shadow-lg bg-gradient-to-tr from-[#FF2E93] to-[#00F5FF]'
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
                      <span className="absolute bottom-1 inset-x-0 text-[9px] font-black text-center text-white truncate px-1 drop-shadow">
                        {frame.vibeTag}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-gray-800 truncate max-w-[80px]">
                    {frame.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ==================== TAB 3: FILTERS (Centered & Generous Spacing) ==================== */}
        {activeTab === 'filters' && (
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-3 px-2 scrollbar-none snap-x animate-fadeIn flex-wrap">
            {PHOTO_FILTERS.map((filter) => {
              const isSelected = filter.id === selectedFilterId;

              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilterId(filter.id)}
                  className={`snap-start shrink-0 flex flex-col items-center gap-2 p-2.5 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-100/90 border-2 border-purple-600 shadow-md scale-105'
                      : 'bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl shadow-inner overflow-hidden bg-gradient-to-tr ${filter.previewColor} flex items-center justify-center text-white font-black text-xs border border-white/60`}
                  >
                    {isSelected && <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />}
                  </div>
                  <span className={`text-xs font-black truncate max-w-[85px] ${isSelected ? 'text-purple-950' : 'text-gray-800'}`}>
                    {isEn ? filter.nameEn : filter.nameVi}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ==================== TAB 4: STICKERS (Centered) ==================== */}
        {activeTab === 'stickers' && (
          <div className="space-y-3 animate-fadeIn text-center py-2">
            <p className="text-xs sm:text-sm font-bold text-gray-600">
              {isEn
                ? '💡 Tap any sticker to add it to your photo. Drag it freely and scale/delete directly on the preview canvas!'
                : '💡 Chạm vào nhãn dán bất kỳ để thêm vào ảnh. Bạn có thể kéo thả di chuyển tự do và phóng to/thu nhỏ trên khung ảnh!'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              {STICKER_LIBRARY.map((stk) => (
                <button
                  key={stk.id}
                  onClick={() => handleAddSticker(stk)}
                  className="py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-900 hover:text-purple-950 border border-gray-200 hover:border-purple-300 font-black text-xs sm:text-sm transition-all active:scale-90 flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span className="text-lg">{stk.display}</span>
                  <span className="text-xs">{isEn ? stk.nameEn : stk.nameVi}</span>
                  <Plus className="w-3.5 h-3.5 text-purple-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: CUSTOM TEXT & FONTS (Centered) ==================== */}
        {activeTab === 'text' && (
          <div className="space-y-4 animate-fadeIn max-w-2xl mx-auto py-2">
            {/* Input Row */}
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={customTextInput}
                onChange={(e) => setCustomTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCustomText();
                }}
                placeholder={isEn ? 'Enter custom text (e.g. Slay Saigon, OOTD, Main Character...)' : 'Nhập chữ bạn muốn chèn (VD: Vibe Sài Gòn, OOTD, Cháy Phố...)'}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
              <button
                onClick={handleAddCustomText}
                disabled={!customTextInput.trim()}
                className="py-3 px-5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>{isEn ? 'Add Text' : 'Thêm Chữ'}</span>
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
              <span className="text-[11px] font-black text-gray-400 uppercase shrink-0">
                {isEn ? 'Presets:' : 'Gợi ý:'}
              </span>
              {['SLAY', 'OOTD 2026', 'CHÁY PHỐ', 'VIBE SÀI GÒN', 'MAIN CHARACTER', 'AURA +1000'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCustomTextInput(preset)}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-800 text-xs font-black shrink-0 transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Font Style & Colors Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              {/* Font Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-gray-500 uppercase">
                  {isEn ? 'Font Family' : 'Kiểu Font Chữ'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {FONT_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFont(f.fontCss)}
                      className={`p-2.5 rounded-xl text-xs font-black border transition-all text-left truncate cursor-pointer ${
                        selectedFont === f.fontCss
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
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
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-500 uppercase">
                    {isEn ? 'Text Color & Glow' : 'Màu Chữ & Hiệu Ứng'}
                  </span>
                  <button
                    onClick={() => setHasTextGlow(!hasTextGlow)}
                    className={`text-[11px] font-black px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      hasTextGlow
                        ? 'bg-[#D4FF00] text-gray-950 border-[#D4FF00] shadow-xs'
                        : 'bg-gray-100 text-gray-500 border-gray-200'
                    }`}
                  >
                    ✨ Glow: {hasTextGlow ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center gap-2.5 pt-1.5 flex-wrap">
                  {TEXT_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setSelectedTextColor(c.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
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

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
  Lightbulb,
  Tag,
  Timer,
  Trophy,
  Crown,
  Medal,
  TrendingUp,
  Flame,
  BarChart3,
  X,
  Search,
  ChevronRight,
  User,
  Award,
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
  const [timerSeconds, setTimerSeconds] = useState<0 | 3 | 5 | 10>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFullLeaderboardOpen, setIsFullLeaderboardOpen] = useState(false);
  const [leaderboardSearch, setLeaderboardSearch] = useState('');

  // Lock background body scroll when Full Leaderboard modal is open
  useEffect(() => {
    if (isFullLeaderboardOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFullLeaderboardOpen]);

  // Flow states: 'camera' | 'processing' | 'result'
  const [flowState, setFlowState] = useState<'camera' | 'processing' | 'result'>(
    capturedPhoto ? 'result' : 'camera'
  );
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(capturedPhoto);
  const [processingStep, setProcessingStep] = useState<number>(0);

  const score = result?.score ?? 88;
  const isPassing = result?.isPassing ?? (score >= 70);
  const lumiComment = result?.lumiComment;
  const breakdown = result?.breakdown;
  const styleDirectives = breakdown?.styleDirectives;
  const suggestedAccessories = result?.suggestedAccessories;
  const fashionPillars = breakdown?.fashionPillars || {
    colorHarmony: Math.min(100, score + 3),
    silhouetteCut: Math.min(100, score + 1),
    vibeMatch: Math.min(100, score + 4),
    accessoriesDetails: Math.max(35, score - 6),
  };

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
              height: { ideal: 1440 }, // 3:4 native aspect ratio
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

  // Start realistic AI reasoning flow that stays on loading screen until API response arrives
  const startProcessingFlow = async (photoDataUrl: string) => {
    setCurrentPhoto(photoDataUrl);
    setFlowState('processing');
    setProcessingStep(0);

    // Step 1 timer: 0 -> 1 at 800ms
    const step1Timer = setTimeout(() => {
      setProcessingStep(1);
    }, 800);

    // Step 2 timer: 1 -> 2 at 1600ms
    const step2Timer = setTimeout(() => {
      setProcessingStep(2);
    }, 1600);

    // Step 3 timer: 2 -> 3 at 2400ms (waiting for final API response)
    const step3Timer = setTimeout(() => {
      setProcessingStep(3);
    }, 2400);

    // Minimum animation duration promise (2.2s for great visual feedback)
    const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 2200));

    try {
      // Fire Gemini API call in parallel
      const capturePromise = Promise.resolve(onCapture(photoDataUrl));

      // Wait for both the minimum animation time and the API result!
      await Promise.all([capturePromise, minDelayPromise]);

      // Complete all steps (step 4 = all done)
      setProcessingStep(4);

      // Brief delay to let user see all green checkmarks, then reveal result!
      setTimeout(() => {
        setFlowState('result');
      }, 400);
    } catch (err) {
      console.error('Error during AI drip check:', err);
      setProcessingStep(4);
      setTimeout(() => {
        setFlowState('result');
      }, 400);
    } finally {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
    }
  };

  // Camera timer cycle: 0s (Off) -> 3s -> 5s -> 10s -> 0s
  const cycleTimer = () => {
    setTimerSeconds((prev) => {
      if (prev === 0) return 3;
      if (prev === 3) return 5;
      if (prev === 5) return 10;
      return 0;
    });
  };

  const cancelCountdown = () => {
    setCountdown(null);
  };

  const captureSnapshot = () => {
    if (!videoRef.current) return;

    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 250);

    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      startProcessingFlow(dataUrl);
    }
  };

  const handleSnap = () => {
    if (!videoRef.current) return;

    if (timerSeconds > 0) {
      setCountdown(timerSeconds);
      return;
    }

    captureSnapshot();
  };

  // Countdown timer tick effect
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

  // Dynamic Tier & Rank calculation based on user's live Fit Score
  const getUserRankInfo = (fitScore: number) => {
    if (fitScore >= 95) {
      return {
        rank: 1,
        tierName: isEn ? 'Cyber Diamond' : 'Kim Cương Siêu Phẩm',
        tierBadge: '💎 TIER 1',
        percentile: isEn ? 'Top 1% Saigon Drip' : 'Top 1% Thần Drip',
        medalImg: '/medal_diamond.png',
        tierColor: 'bg-gradient-to-r from-[#00F5FF] via-[#D4FF00] to-[#FF2E93]',
        accentText: 'text-[#D4FF00]',
        nextTierHint: isEn ? '👑 Maximum Aura Achieved! You are #1' : '👑 Bạn đang thống trị vị trí #1 Bảng Vàng!',
      };
    }
    if (fitScore >= 90) {
      return {
        rank: 3,
        tierName: isEn ? 'Diamond Stylist' : 'Hạng Kim Cương',
        tierBadge: '💎 TIER 1',
        percentile: isEn ? 'Top 3% Trendsetters' : 'Top 3% Cháy Phố',
        medalImg: '/medal_diamond.png',
        tierColor: 'bg-gradient-to-r from-[#00F5FF] to-[#D4FF00]',
        accentText: 'text-purple-600',
        nextTierHint: isEn ? '🔥 +5 pts to reach #1 Cyber Diamond' : '🔥 Cần +5 điểm để đạt #1 Kim Cương Siêu Cấp',
      };
    }
    if (fitScore >= 80) {
      return {
        rank: 7,
        tierName: isEn ? 'Platinum Vanguard' : 'Bạch Kim Đẳng Cấp',
        tierBadge: '👑 TIER 2',
        percentile: isEn ? 'Top 8% Style Icons' : 'Top 8% Dân Chơi Gu',
        medalImg: '/medal_platinum.png',
        tierColor: 'bg-gradient-to-r from-purple-500 to-[#FF2E93]',
        accentText: 'text-purple-600',
        nextTierHint: isEn ? '⚡ +10 pts to reach Tier 1 (Diamond)' : '⚡ Cần +10 điểm để thăng hạng Hạng Kim Cương',
      };
    }
    if (fitScore >= 70) {
      return {
        rank: 12,
        tierName: isEn ? 'Gold Trendsetter' : 'Vàng Phá Cách',
        tierBadge: '⚡ TIER 3',
        percentile: isEn ? 'Top 15% Street Vibe' : 'Top 15% Phong Cách',
        medalImg: '/medal_gold.png',
        tierColor: 'bg-gradient-to-r from-amber-400 to-orange-500',
        accentText: 'text-amber-600',
        nextTierHint: isEn ? '🚀 +8 pts to reach Tier 2 (Platinum)' : '🚀 Cần +8 điểm để thăng hạng Bạch Kim',
      };
    }
    return {
      rank: 28,
      tierName: isEn ? 'Bronze Challenger' : 'Đồng Mới Nhú',
      tierBadge: '🌱 TIER 4',
      percentile: isEn ? 'Top 35% Ready to Cook' : 'Top 35% Đang Cook Gu',
      medalImg: '/medal_bronze.png',
      tierColor: 'bg-gradient-to-r from-amber-700 to-orange-800',
      accentText: 'text-amber-800',
      nextTierHint: isEn ? '✨ Upgrade accessories to reach Gold (+15 pts)' : '✨ Phối thêm phụ kiện để lên Hạng Vàng (+15 điểm)',
    };
  };

  const userRankInfo = getUserRankInfo(score);

  // Helper to generate 100 realistic mock users for the full leaderboard
  const generateFullLeaderboard = () => {
    const vietnameseNames = [
      'Minh Thư', 'Quang Anh', 'Khánh Vy', 'Hoàng Long', 'Bảo Ngọc', 'Đức Huy', 'Trà My',
      'Thanh Tùng', 'Phương Linh', 'Tuấn Kiệt', 'Hải Yến', 'Trọng Hiếu', 'Thảo Nguyên', 'Quốc Bảo',
      'Ánh Tuyết', 'Hữu Phước', 'Yến Nhi', 'Minh Quân', 'Kim Ngân', 'Gia Huy', 'Thùy Dương',
      'Văn Hậu', 'Quỳnh Chi', 'Tiến Đạt', 'Mai Anh', 'Nhật Minh', 'Hương Giang', 'Bảo Khang',
      'Tuyết Mai', 'Đăng Khoa', 'Bích Trâm', 'Hồng Đăng', 'Ngọc Trâm', 'Anh Dũng', 'Mỹ Linh',
      'Hoàng Phúc', 'Thục Quyên', 'Phúc Lâm', 'Diệu Linh', 'Bá Thông', 'Cẩm Tú', 'Thế Anh',
      'Ngân Hà', 'Việt Anh', 'Khánh An', 'Duy Hưng', 'Thảo Ly', 'Minh Trí', 'Thùy Trang', 'Gia Bảo'
    ];

    const brandTags = ['Zune.zx', 'HADES', 'BLANCO', 'THE BEAT', 'LIDER', 'DIRTY COINS', 'DEGREY', 'SSStutter', 'Coolmate', 'Paradox'];
    const vibes = ['Cyber-Pop', 'Y2K', 'Streetwear', 'Minimalist', 'Clean-Fit', 'Vintage', 'Goth-Chic', 'Old Money'];
    const avatarPool = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    ];

    const entries: Array<{
      id: string;
      rank: number;
      name: string;
      score: number;
      vibe: string;
      avatarUrl: string;
      isUser: boolean;
      tierBadge: string;
    }> = [];

    const userRank = userRankInfo.rank;

    for (let r = 1; r <= 100; r++) {
      if (r === userRank) {
        entries.push({
          id: 'lb-user',
          rank: r,
          name: isEn ? 'Bennedict (You)' : 'Bennedict (Bạn)',
          score: score,
          vibe: breakdown?.detectedStyle || 'Streetwear',
          avatarUrl: '/lumi.png',
          isUser: true,
          tierBadge: userRankInfo.tierBadge,
        });
        continue;
      }

      const nameIdx = (r - 1) % vietnameseNames.length;
      const brandIdx = (r - 1) % brandTags.length;
      const vibeIdx = (r - 1) % vibes.length;
      const avatar = avatarPool[(r - 1) % avatarPool.length];

      // Calculate score monotonically descending
      let itemScore: number;
      if (r < userRank) {
        // Interpolate smoothly from 99 down to (score + 1)
        const range = 99 - (score + 1);
        const step = userRank > 1 ? range / (userRank - 1) : 0;
        itemScore = Math.round(99 - (r - 1) * step);
      } else {
        // Interpolate smoothly from (score - 1) down to 45
        const remainingRanks = 100 - userRank;
        const range = Math.max(0, (score - 1) - 45);
        const step = remainingRanks > 0 ? range / remainingRanks : 0;
        itemScore = Math.max(45, Math.round((score - 1) - (r - userRank - 1) * step));
      }

      const tierBadge = itemScore >= 95 ? '💎 TIER 1' : itemScore >= 90 ? '💎 TIER 1' : itemScore >= 80 ? '👑 TIER 2' : itemScore >= 70 ? '⚡ TIER 3' : '🌱 TIER 4';

      entries.push({
        id: `lb-${r}`,
        rank: r,
        name: `${vietnameseNames[nameIdx]} (${brandTags[brandIdx]})`,
        score: itemScore,
        vibe: vibes[vibeIdx],
        avatarUrl: avatar,
        isUser: false,
        tierBadge,
      });
    }

    return entries;
  };

  const fullLeaderboardList = generateFullLeaderboard();
  const filteredLeaderboard = fullLeaderboardList.filter((item) =>
    item.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
    item.vibe.toLowerCase().includes(leaderboardSearch.toLowerCase())
  );

  // Preview list for the Card (strictly sorted, showing Top 2 + surrounding bracket if user > 5)
  const previewLeaderboard: Array<{
    item: typeof fullLeaderboardList[0];
    showDividerBefore?: boolean;
  }> = [];

  if (userRankInfo.rank <= 5) {
    fullLeaderboardList.slice(0, 5).forEach((item) => {
      previewLeaderboard.push({ item });
    });
  } else {
    previewLeaderboard.push({ item: fullLeaderboardList[0] });
    previewLeaderboard.push({ item: fullLeaderboardList[1] });
    const prevItem = fullLeaderboardList[userRankInfo.rank - 2];
    const userItem = fullLeaderboardList[userRankInfo.rank - 1];
    const nextItem = fullLeaderboardList[userRankInfo.rank];

    if (prevItem) previewLeaderboard.push({ item: prevItem, showDividerBefore: true });
    if (userItem) previewLeaderboard.push({ item: userItem });
    if (nextItem) previewLeaderboard.push({ item: nextItem });
  }

  return (
    <div className="animate-fadeIn space-y-6 pb-16 max-w-6xl mx-auto">
      
      {/* ========================================================================= */}
      {/* STATE 1: BALANCED CAMERA VIEWFINDER (Fits desktop viewport, full mobile)  */}
      {/* ========================================================================= */}
      {flowState === 'camera' && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-2 sm:px-4">
          <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] max-h-[72vh] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black select-none">
            
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

              {/* Viewfinder Target Reticle Overlay - Perfectly Inset with Zero Overlap */}
              <div className="absolute top-18 bottom-26 left-6 right-6 sm:top-20 sm:bottom-28 sm:left-8 sm:right-8 border-2 border-white/20 rounded-3xl pointer-events-none flex flex-col justify-between p-2.5 z-10">
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-3 border-l-3 border-[#D4FF00] rounded-tl-lg shadow-[0_0_10px_rgba(212,255,0,0.8)]" />
                  <div className="w-6 h-6 border-t-3 border-r-3 border-[#D4FF00] rounded-tr-lg shadow-[0_0_10px_rgba(212,255,0,0.8)]" />
                </div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-3 border-l-3 border-[#D4FF00] rounded-bl-lg shadow-[0_0_10px_rgba(212,255,0,0.8)]" />
                  <div className="w-6 h-6 border-b-3 border-r-3 border-[#D4FF00] rounded-br-lg shadow-[0_0_10px_rgba(212,255,0,0.8)]" />
                </div>
              </div>

              {/* Live Countdown Overlay when timer is running */}
              {countdown !== null && (
                <div className="absolute inset-0 z-30 bg-black/65 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                  <div className="relative flex items-center justify-center">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-[#D4FF00] border-t-transparent animate-spin shadow-[0_0_50px_rgba(212,255,0,0.8)]" style={{ animationDuration: '1s' }} />
                    <span className="absolute font-black text-7xl sm:text-8xl text-white tracking-tighter animate-ping drop-shadow-2xl">
                      {countdown}
                    </span>
                    <span className="absolute font-black text-7xl sm:text-8xl text-[#D4FF00] tracking-tighter drop-shadow-2xl">
                      {countdown}
                    </span>
                  </div>

                  <div className="mt-8 space-y-3">
                    <span className="text-sm sm:text-base font-black text-white uppercase tracking-widest block animate-pulse">
                      {isEn ? '📸 Strike a pose...' : '📸 Tạo dáng đẹp nha...'}
                    </span>

                    <button
                      onClick={cancelCountdown}
                      className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                    >
                      {isEn ? 'Cancel Countdown' : 'Hủy Hẹn Giờ'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Camera Top Bar - Placed at Top Edge */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
              <span className="px-3.5 py-1.5 bg-black/65 backdrop-blur-md text-white text-xs font-black rounded-full border border-white/15 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
                <span>{isEn ? 'AI Smart Lens' : 'Ống Kính AI Smart Lens'}</span>
              </span>

              <button
                onClick={toggleCamera}
                className="p-2.5 rounded-full bg-black/65 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg border border-white/15"
                title={isEn ? 'Flip Camera' : 'Đổi Camera'}
              >
                <SwitchCamera className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Camera Bottom Controls: Snap, Upload & Timer Selector - Placed at Bottom Edge */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-2 sm:px-4 pointer-events-auto">
              {/* File Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 rounded-full bg-black/65 hover:bg-black text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl border border-white/25 flex items-center justify-center"
                title={isEn ? 'Upload Outfit Photo' : 'Tải Ảnh Trang Phục'}
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
                disabled={countdown !== null}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center p-1.5 shadow-[0_0_40px_rgba(212,255,0,0.7)] active:scale-90 transition-transform cursor-pointer disabled:opacity-50"
                title={isEn ? 'Take Photo' : 'Chụp Ảnh'}
              >
                <div className="w-full h-full rounded-full border-3 border-gray-950 bg-[#D4FF00] flex items-center justify-center shadow-inner">
                  <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-gray-950" />
                </div>
              </button>

              {/* Timer Selector Button (Off / 3s / 5s / 10s) */}
              <button
                onClick={cycleTimer}
                className={`w-12 h-12 rounded-full backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl border flex flex-col items-center justify-center ${
                  timerSeconds > 0
                    ? 'bg-[#D4FF00] text-gray-950 border-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.6)] font-black'
                    : 'bg-black/65 hover:bg-black text-white border-white/25'
                }`}
                title={isEn ? `Timer: ${timerSeconds === 0 ? 'Off' : `${timerSeconds}s`}` : `Hẹn giờ: ${timerSeconds === 0 ? 'Tắt' : `${timerSeconds} giây`}`}
              >
                <Timer className={`w-4.5 h-4.5 ${timerSeconds > 0 ? 'text-gray-950' : 'text-[#D4FF00]'}`} />
                <span className={`text-[9px] font-black uppercase leading-none mt-0.5 ${timerSeconds > 0 ? 'text-gray-950' : 'text-gray-200'}`}>
                  {timerSeconds === 0 ? (isEn ? 'Off' : 'Tắt') : `${timerSeconds}s`}
                </span>
              </button>
            </div>

          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-gray-400 mt-4">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>{isEn ? 'On-device visual analysis & privacy protected' : 'Bảo mật thị giác & phân tích an toàn 100%'}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 2: 3-SECOND AI REASONING WITH SPACIOUS, CLEAR LOGS                  */}
      {/* ========================================================================= */}
      {flowState === 'processing' && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4">
          <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] max-h-[74vh] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gray-950 flex flex-col items-center justify-center p-6 sm:p-10 text-center text-white">
            
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
              <div className="relative flex items-center justify-center my-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-t-[#D4FF00] border-r-[#FF2E93] border-b-[#00F5FF] border-l-[#7C3AED] animate-spin shadow-[0_0_35px_rgba(212,255,0,0.6)]" style={{ animationDuration: '1.4s' }} />
                <Sparkles className="w-9 h-9 text-[#D4FF00] absolute animate-pulse" />
              </div>

              {/* Header Title with Generous Spacing */}
              <div className="space-y-3 text-center">
                <div>
                  <span className="px-4 py-1.5 rounded-full bg-white/15 text-[#D4FF00] text-xs font-black uppercase tracking-widest shadow-md">
                    AI Multimodal Reasoning
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
                  {isEn ? 'Lumi Stylist Is Cooking...' : 'Lumi Stylist Đang Phân Tích...'}
                </h3>
              </div>

              {/* Dynamic Processing Logs with Spacious Row Gaps & Line Height */}
              <div className="space-y-4 w-full text-left bg-black/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/15 text-sm sm:text-base font-extrabold shadow-2xl">
                
                {/* Step 1 */}
                <div className={`flex items-center gap-3.5 transition-all duration-300 ${processingStep >= 0 ? 'text-[#D4FF00]' : 'text-gray-500 opacity-40'}`}>
                  {processingStep > 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-scaleUp" />
                  ) : (
                    <Loader2 className="w-5 h-5 text-[#D4FF00] shrink-0 animate-spin" />
                  )}
                  <span className="leading-snug">{isEn ? 'Spectral color & fabric analysis...' : 'Quang phổ màu & độ tương phản...'}</span>
                </div>

                {/* Step 2 */}
                <div className={`flex items-center gap-3.5 transition-all duration-300 ${processingStep >= 1 ? 'text-[#00F5FF]' : 'text-gray-500 opacity-40'}`}>
                  {processingStep > 1 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-scaleUp" />
                  ) : processingStep === 1 ? (
                    <Loader2 className="w-5 h-5 text-[#00F5FF] shrink-0 animate-spin" />
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                    </span>
                  )}
                  <span className="leading-snug">{isEn ? 'Silhouette ratio & vibe matrix...' : 'Tỷ lệ Silhouette & Vibe Matrix...'}</span>
                </div>

                {/* Step 3 */}
                <div className={`flex items-center gap-3.5 transition-all duration-300 ${processingStep >= 2 ? 'text-[#FF2E93]' : 'text-gray-500 opacity-40'}`}>
                  {processingStep > 2 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-scaleUp" />
                  ) : processingStep === 2 ? (
                    <Loader2 className="w-5 h-5 text-[#FF2E93] shrink-0 animate-spin" />
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                    </span>
                  )}
                  <span className="leading-snug">{isEn ? 'Synthesizing Z-Stylist Fit Score...' : 'Tổng hợp Z-Stylist Fit Score...'}</span>
                </div>

                {/* Step 4: Final Synthesis & Local Brands Matching */}
                <div className={`flex items-center gap-3.5 transition-all duration-300 ${processingStep >= 3 ? 'text-purple-300' : 'text-gray-500 opacity-40'}`}>
                  {processingStep > 3 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-scaleUp" />
                  ) : processingStep === 3 ? (
                    <Loader2 className="w-5 h-5 text-purple-400 shrink-0 animate-spin" />
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                    </span>
                  )}
                  <span className="leading-snug">{isEn ? 'Matching Local Brands & finalizing review...' : 'Đối soát Local Brand & hoàn tất nhận xét...'}</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: RESULT RESPONSE (Harmonious Layout, Zero White Gaps, Larger Text) */}
      {/* ========================================================================= */}
      {flowState === 'result' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: 3:4 PHOTO CONTAINER & RETAKE BUTTON (cols 1-5 on lg) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 3:4 Aspect Ratio Frame (Perfect Match with Camera) */}
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gray-950 flex items-center justify-center">
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

            {/* Retake Button directly under photo (Zero empty gaps) */}
            <button
              onClick={handleRetake}
              className="w-full py-4.5 px-6 rounded-2xl bg-white hover:bg-gray-50 text-gray-950 font-black text-sm sm:text-base border-2 border-gray-200 shadow-md active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 text-purple-600" />
              <span>{isEn ? 'Retake / Scan Another Fit' : 'Chụp Lại / Quét Outfit Khác'}</span>
            </button>

            {/* 2. LEADERBOARD & TIER RANK WIDGET */}
            <div className="calm-card-elevated p-5 sm:p-6 rounded-3xl space-y-4.5 bg-white shadow-xl border border-gray-100">
              
              {/* Header: Title & Dynamic Tier Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-xs">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-gray-950 leading-tight">
                      {isEn ? 'Leaderboard' : 'Bảng Xếp Hạng'}
                    </h4>
                    <span className="text-[11px] font-bold text-gray-500">
                      {isEn ? 'Live Community Ranking' : 'Xếp Hạng Cộng Đồng Trực Tiếp'}
                    </span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-white text-[11px] font-black uppercase shadow-xs ${userRankInfo.tierColor}`}>
                  {userRankInfo.tierBadge}
                </span>
              </div>

              {/* User Standing Summary Card with Medal & Rank */}
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-purple-50/90 via-pink-50/50 to-white border border-purple-100 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    <img
                      src={userRankInfo.medalImg}
                      alt="Rank Medal"
                      className="w-11 h-11 object-contain drop-shadow-md hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-black text-purple-900 uppercase">
                        {userRankInfo.tierName}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-200/80 text-purple-950">
                        {userRankInfo.percentile}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-bold text-gray-600 truncate">
                      {userRankInfo.nextTierHint}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                    {isEn ? 'YOUR RANK' : 'THỨ HẠNG'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                    #{userRankInfo.rank}
                  </span>
                </div>
              </div>

              {/* Top Trendsetters Leaderboard Rows */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-gray-400 px-2 pb-0.5">
                  <span>{isEn ? 'Rank & Trendsetter' : 'Hạng & Trendsetter'}</span>
                  <span>{isEn ? 'Aura Score' : 'Điểm Fit'}</span>
                </div>

                {previewLeaderboard.map(({ item, showDividerBefore }) => (
                  <React.Fragment key={item.id}>
                    {showDividerBefore && (
                      <div className="flex items-center justify-center py-0.5">
                        <span className="text-gray-300 tracking-widest text-xs font-black select-none">
                          • • •
                        </span>
                      </div>
                    )}
                    <div
                      className={`flex items-center justify-between p-2.5 rounded-2xl transition-all ${
                        item.isUser
                          ? 'bg-gradient-to-r from-purple-100/95 via-pink-100/90 to-purple-50 border-2 border-purple-400 shadow-md ring-2 ring-purple-300/40'
                          : 'bg-gray-50/80 hover:bg-gray-100/80 border border-gray-100'
                      }`}
                    >
                      {/* Left: Rank badge & Avatar & Name */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Rank Number / Medal */}
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                            item.rank === 1
                              ? 'bg-amber-400 text-gray-950 shadow-xs'
                              : item.rank === 2
                              ? 'bg-slate-300 text-gray-950 shadow-xs'
                              : item.rank === 3
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {item.rank}
                        </span>

                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-white shadow-xs">
                          <img
                            src={item.avatarUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Name & Vibe */}
                        <div className="min-w-0">
                          <h5 className={`text-xs sm:text-sm font-black truncate leading-tight flex items-center gap-1.5 ${item.isUser ? 'text-purple-950' : 'text-gray-900'}`}>
                            <span>{item.name}</span>
                            {item.isUser && (
                              <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase">
                                {isEn ? 'YOU' : 'BẠN'}
                              </span>
                            )}
                          </h5>
                          <span className="text-[10px] font-bold text-gray-500 block truncate">
                            {item.vibe}
                          </span>
                        </div>
                      </div>

                      {/* Right: Score Pill */}
                      <div className="text-right shrink-0 pl-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-black ${
                            item.isUser
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'bg-white text-gray-950 border border-gray-200 shadow-xs'
                          }`}
                        >
                          {item.score} pts
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* View Full Leaderboard (Top 100) Button */}
              <button
                onClick={() => setIsFullLeaderboardOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-purple-50/80 text-purple-700 hover:text-purple-900 border border-gray-200 hover:border-purple-200 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <Trophy className="w-4 h-4 text-purple-600" />
                <span>{isEn ? 'View Full Leaderboard (Top 100)' : 'Xem Bảng Xếp Hạng Đầy Đủ (Top 100)'}</span>
                <ChevronRight className="w-4 h-4 text-purple-400 ml-auto" />
              </button>

            </div>
          </div>

          {/* RIGHT COLUMN: INTEGRATED SCORE + LUMI CARD + ACCESSORIES (cols 6-12 on lg) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. COMBINED FIT SCORE & LUMI AI STYLIST CARD (Proportional, Balanced Height) */}
            <div className="calm-card-elevated p-6 sm:p-7 rounded-3xl space-y-5 bg-white shadow-xl border border-gray-100">
              
              {/* Top Row: Lumi Avatar & Title (Left) + Fit Score Gauge (Right) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-5 border-b border-gray-100">
                {/* Left: Lumi Mascot Title (Large & Proportional) */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] rounded-3xl blur-xs opacity-50 animate-pulse" />
                    <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] p-0.5 shadow-xl relative z-10">
                      <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center overflow-hidden p-1.5">
                        <img
                          src="/lumi.png"
                          alt="Lumi AI Stylist"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-black text-2xl sm:text-3xl text-gray-950 tracking-tight flex items-center gap-2">
                      <span>Lumi AI Stylist</span>
                      <Sparkles className="w-6 h-6 text-[#FF2E93]" />
                    </h3>
                    <p className="text-sm sm:text-base font-extrabold text-purple-600">
                      {isEn ? 'Visual Multimodal Outfit Breakdown' : 'Phân Tích Thị Giác Trang Phục'}
                    </p>
                  </div>
                </div>

                {/* Right: Score Gauge (Evenly sized) */}
                <div className="shrink-0 flex justify-center">
                  <ScoreGauge score={score} size={155} language={language} />
                </div>
              </div>

              {/* Lumi Speech in Larger, Bold Gen-Z Typography */}
              <p className="text-base sm:text-[17px] font-bold text-gray-900 leading-relaxed">
                "{lumiComment || (isEn
                  ? 'Hey bestie! Lumi just broke down your fit. The oversized silhouette and contrast between pieces give off effortless Saigon streetwear energy! Lumi\'s favorite part is your natural eye for layering and proportions. Slay the town and take 8,000 photos for Story! ✨'
                  : 'Hế nhô! Lumi vừa phân tích xong set đồ của bạn nè. Form dáng oversize hôm nay cực kỳ phóng khoáng, độ tương phản giữa áo và quần tạo visual chuẩn streetwear Sài Gòn luôn á! Lumi chấm điểm mạnh nhất là bạn có gu phối layer có chiều sâu và tôn dáng đỉnh chóp. Chuẩn bị đi quẩy và chụp 8,000 tấm ảnh thôi bà ơi! ✨')}"
              </p>

              {/* Lumi Style Directives Box with Larger Text */}
              <div className="p-4 sm:p-5 bg-purple-50/80 rounded-2xl border border-purple-100 space-y-2.5">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{isEn ? "Lumi's Style Directives" : 'Góc Nhìn Nâng Tầm Gu Của Lumi'}</span>
                </span>

                <div className="space-y-2 text-sm sm:text-base font-bold text-purple-950 leading-snug">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-black">•</span>
                    <span>
                      {styleDirectives?.cyberPop || (isEn
                        ? 'If you wanna push full Cyber-Pop: Stack some oval chrome sunglasses or double titanium chains.'
                        : 'Nếu bạn muốn theo hướng Cyber-Pop: Phối thêm kính râm oval kim loại hoặc dây chuyền chrome layer kép.')}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-black">•</span>
                    <span>
                      {styleDirectives?.minimalist || (isEn
                        ? 'If you’re leaning into Clean Minimalist: Simplify accessories, rock basic white sneakers and a mini crossbody bag.'
                        : 'Nếu bạn muốn chuyển sang Minimalist: Đơn giản hóa phụ kiện, kết hợp giày trắng basic và túi đeo chéo mini.')}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 CONTRIBUTING FASHION PILLARS BREAKDOWN */}
              <div className="p-5 bg-gray-50/90 rounded-2xl border border-gray-100 space-y-3.5">
                <div className="flex items-center justify-between pb-1 border-b border-gray-200/60">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>{isEn ? 'Contributing Fashion Pillars' : 'Trọng Số Cấu Thành Điểm'}</span>
                  </span>
                  <span className="text-[11px] font-black text-purple-600 uppercase">
                    {isEn ? 'AI Evaluated' : 'AI Chấm Điểm'}
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Pillar 1: Color Harmony */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-black text-gray-900">
                      <span>{isEn ? 'Color Harmony' : 'Phối Màu & Tương Phản'}</span>
                      <span className="text-[#FF2E93] font-black">{fashionPillars.colorHarmony}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF2E93] to-[#FFA500] rounded-full transition-all duration-700 shadow-xs"
                        style={{ width: `${fashionPillars.colorHarmony}%` }}
                      />
                    </div>
                  </div>

                  {/* Pillar 2: Silhouette & Cut */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-black text-gray-900">
                      <span>{isEn ? 'Silhouette & Cut' : 'Tỷ Lệ Form Dáng & Cắt May'}</span>
                      <span className="text-purple-600 font-black">{fashionPillars.silhouetteCut}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-[#7C3AED] rounded-full transition-all duration-700 shadow-xs"
                        style={{ width: `${fashionPillars.silhouetteCut}%` }}
                      />
                    </div>
                  </div>

                  {/* Pillar 3: Vibe Match */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-black text-gray-900">
                      <span>{isEn ? 'Vibe Match' : 'Độ Phù Hợp Bối Cảnh & Vibe'}</span>
                      <span className="text-cyan-600 font-black">{fashionPillars.vibeMatch}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00F5FF] to-cyan-500 rounded-full transition-all duration-700 shadow-xs"
                        style={{ width: `${fashionPillars.vibeMatch}%` }}
                      />
                    </div>
                  </div>

                  {/* Pillar 4: Accessories & Details */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-black text-gray-900">
                      <span>{isEn ? 'Accessories & Details' : 'Phụ Kiện & Chi Tiết Vi Mô'}</span>
                      <span className="text-emerald-600 font-black">{fashionPillars.accessoriesDetails}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-[#D4FF00] rounded-full transition-all duration-700 shadow-xs"
                        style={{ width: `${fashionPillars.accessoriesDetails}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 2. ACCESSORIES UPGRADE & RECOMMENDED BRANDS */}
            <div className="calm-card-elevated p-6 sm:p-7 rounded-3xl space-y-4 bg-white shadow-xl border border-gray-100">
              
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-black uppercase text-purple-600 tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-purple-600" />
                  <span>{isEn ? 'Recommended Accessories Upgrade' : 'Gợi Ý Phụ Kiện Phối Thêm Chuẩn Gu'}</span>
                </span>
              </div>

              {/* Accessory Item Cards with Crisp Photos & Bold Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(suggestedAccessories && suggestedAccessories.length > 0
                  ? suggestedAccessories
                  : accessoryItems
                ).map((item, idx) => (
                  <div
                    key={item.id || idx}
                    onClick={() => onSelectBrandItem(item)}
                    className="p-3.5 rounded-2xl bg-gray-50 hover:bg-purple-50/60 border border-gray-100 hover:border-purple-200 transition-all cursor-pointer flex items-center gap-3.5 group shadow-xs hover:shadow-md"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0 shadow-inner">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80'}
                        alt={item.name || 'Accessory'}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-black text-purple-600 uppercase block truncate">
                        {item.brandName || 'Local Brand'}
                      </span>
                      <h4 className="text-sm font-black text-gray-950 truncate leading-snug group-hover:text-purple-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-xs sm:text-sm font-black text-[#FF2E93] mt-0.5 block">
                        {item.price ? Number(item.price).toLocaleString('vi-VN') : '290.000'} ₫
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Partner Brands Row */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  <span>{isEn ? 'Partner Local Brands' : 'Thương Hiệu Local-Brand Đề Xuất'}</span>
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {recommendedBrands.map((brand, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs rounded-full border border-gray-200 transition-colors cursor-pointer"
                    >
                      {brand.name}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. ACTION BUTTON: EXPLORE MATCHING PLACES */}
            <div className="pt-1">
              <button
                onClick={onExplorePlaces}
                className="w-full py-5 px-6 rounded-2xl bg-[#0F172A] hover:bg-black text-white font-black text-base sm:text-lg shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer border border-white/10"
              >
                <MapPin className="w-5 h-5 text-[#D4FF00]" />
                <span>{isEn ? 'Explore Matching Vibe Places' : 'Khám Phá Địa Điểm Hợp Vibe Set Đồ Này'}</span>
                <ArrowRight className="w-5 h-5 text-white/80 ml-auto" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL LEADERBOARD TOP 100 MODAL (Interactive & Gamified)                    */}
      {/* ========================================================================= */}
      {isFullLeaderboardOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFullLeaderboardOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn overscroll-none"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[85vh] overflow-hidden overscroll-contain">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-pink-50/50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-950 tracking-tight">
                    {isEn ? 'Leaderboard (Top 100)' : 'Bảng Xếp Hạng (Top 100)'}
                  </h3>
                  <p className="text-xs font-bold text-gray-500">
                    {isEn ? 'Official Aura Trendsetter Standings' : 'Bảng Xếp Hạng Phong Cách Toàn Thành Phố'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFullLeaderboardOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Filter Bar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
                <input
                  type="text"
                  value={leaderboardSearch}
                  onChange={(e) => setLeaderboardSearch(e.target.value)}
                  placeholder={isEn ? 'Search trendsetter or vibe...' : 'Tìm kiếm tên hoặc phong cách...'}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>
            </div>

            {/* Scrollable Leaderboard List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 overscroll-contain">
              {filteredLeaderboard.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-bold text-sm">
                  {isEn ? 'No trendsetters found.' : 'Không tìm thấy ai phù hợp.'}
                </div>
              ) : (
                filteredLeaderboard.map((user) => (
                  <div
                    key={`modal-lb-${user.rank}`}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                      user.isUser
                        ? 'bg-gradient-to-r from-purple-100/95 via-pink-100/90 to-purple-50 border-2 border-purple-400 shadow-md ring-2 ring-purple-300/40'
                        : 'bg-gray-50/80 hover:bg-gray-100/80 border border-gray-100'
                    }`}
                  >
                    {/* Rank & Profile */}
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          user.rank === 1
                            ? 'bg-amber-400 text-gray-950 shadow-xs'
                            : user.rank === 2
                            ? 'bg-slate-300 text-gray-950 shadow-xs'
                            : user.rank === 3
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {user.rank}
                      </span>

                      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-white shadow-xs">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className={`text-xs sm:text-sm font-black truncate leading-tight flex items-center gap-1.5 ${user.isUser ? 'text-purple-950' : 'text-gray-900'}`}>
                          <span>{user.name}</span>
                          {user.isUser && (
                            <span className="px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase">
                              {isEn ? 'YOU' : 'BẠN'}
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-bold text-gray-500">
                            {user.vibe}
                          </span>
                          <span className="text-[9px] font-black px-2 py-0.2 rounded-full bg-gray-200 text-gray-700">
                            {user.tierBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right shrink-0 pl-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black ${
                          user.isUser
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-white text-gray-950 border border-gray-200 shadow-xs'
                        }`}
                      >
                        {user.score} pts
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

import React, { useRef, useEffect, useState } from 'react';
import { Download, Sparkles, RefreshCw, CheckCircle2, Share2 } from 'lucide-react';
import type { PhotoboothFrame } from '../../types/entityGraph.js';

interface CanvasStudioProps {
  photoDataUrl: string; // Base64 or Image URL
  selectedFrame: PhotoboothFrame;
  onRetake: () => void;
}

export const CanvasStudio: React.FC<CanvasStudioProps> = ({
  photoDataUrl,
  selectedFrame,
  onRetake,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Render composite image onto Canvas (9:16 ratio - 1080x1920)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = photoDataUrl;

    baseImg.onload = () => {
      // 1. Draw user photo (object-fit: cover logic into 1080x1920)
      ctx.clearRect(0, 0, width, height);

      const imgAspect = baseImg.width / baseImg.height;
      const canvasAspect = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > canvasAspect) {
        // Image is wider
        drawHeight = height;
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) / 2;
      } else {
        // Image is taller
        drawWidth = width;
        drawHeight = width / imgAspect;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(baseImg, offsetX, offsetY, drawWidth, drawHeight);

      // 2. Load and overlay SVG/PNG frame
      const frameImg = new Image();
      frameImg.crossOrigin = 'anonymous';
      frameImg.src = selectedFrame.frameOverlayUrl;

      frameImg.onload = () => {
        ctx.drawImage(frameImg, 0, 0, width, height);
        setIsRendered(true);
      };

      frameImg.onerror = () => {
        // Fallback drawing if SVG asset is loading
        ctx.strokeStyle = '#D4FF00';
        ctx.lineWidth = 16;
        ctx.strokeRect(40, 40, width - 80, height - 80);
        setIsRendered(true);
      };
    };
  }, [photoDataUrl, selectedFrame]);

  // Download high-resolution PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `AuraLens_${selectedFrame.vibeTag}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 0.95);
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* Canvas Viewport Preview */}
      <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black mb-4 group">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />

        {!isRendered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white gap-2">
            <Sparkles className="w-8 h-8 text-[#D4FF00] animate-spin" />
            <span className="text-xs font-bold text-gray-300">
              Đang xuất ảnh chuẩn Story 9:16...
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5">
        <button
          onClick={handleDownload}
          disabled={!isRendered}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4FF00] via-[#00F5FF] to-[#FF2E93] text-black font-black text-sm shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-900 animate-bounce" />
              <span>Đã Tải Ảnh Về Máy Thành Công!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Tải Ảnh Story (9:16) Về Máy</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onRetake}
            className="py-2.5 px-3 rounded-xl bg-white/80 hover:bg-white text-gray-700 font-extrabold text-xs border border-gray-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Chụp Lại</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share && canvasRef.current) {
                canvasRef.current.toBlob((blob) => {
                  if (blob) {
                    const file = new File([blob], 'auralens_ootd.png', { type: 'image/png' });
                    navigator.share({
                      title: 'AuraLens Photobooth',
                      text: 'Xem ngay tấm ảnh OOTD của tui chụp bằng AuraLens AI nè!',
                      files: [file],
                    }).catch(() => {});
                  }
                });
              } else {
                handleDownload();
              }
            }}
            className="py-2.5 px-3 rounded-xl bg-[#7C3AED] hover:bg-purple-800 text-white font-extrabold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Khoe Story</span>
          </button>
        </div>
      </div>
    </div>
  );
};

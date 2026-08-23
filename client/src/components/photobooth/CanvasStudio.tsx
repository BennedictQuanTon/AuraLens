import React, { useRef, useEffect, useState } from 'react';
import { Download, Sparkles, RefreshCw, CheckCircle2, Share2 } from 'lucide-react';
import type { PhotoboothFrame } from '../../types/entityGraph.js';

interface CanvasStudioProps {
  photoDataUrl: string;
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
      ctx.clearRect(0, 0, width, height);

      const imgAspect = baseImg.width / baseImg.height;
      const canvasAspect = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > canvasAspect) {
        drawHeight = height;
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imgAspect;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(baseImg, offsetX, offsetY, drawWidth, drawHeight);

      const frameImg = new Image();
      frameImg.crossOrigin = 'anonymous';
      frameImg.src = selectedFrame.frameOverlayUrl;

      frameImg.onload = () => {
        ctx.drawImage(frameImg, 0, 0, width, height);
        setIsRendered(true);
      };

      frameImg.onerror = () => {
        ctx.strokeStyle = '#D4FF00';
        ctx.lineWidth = 16;
        ctx.strokeRect(40, 40, width - 80, height - 80);
        setIsRendered(true);
      };
    };
  }, [photoDataUrl, selectedFrame]);

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
    <div className="flex flex-col items-center w-full max-w-sm mx-auto pb-4">
      {/* Canvas Viewport Preview */}
      <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-xl border-2 border-gray-900/10 bg-black mb-4 group">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />

        {!isRendered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white gap-2">
            <Sparkles className="w-8 h-8 text-[#D4FF00] animate-spin" />
            <span className="text-xs font-semibold text-gray-300">
              Rendering 9:16 Story...
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2">
        <button
          onClick={handleDownload}
          disabled={!isRendered}
          className="w-full py-3.5 px-4 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#D4FF00]" />
              <span>Saved to Camera Roll!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-[#D4FF00]" />
              <span>Download 9:16 Story</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onRetake}
            className="py-2.5 px-3 rounded-full bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs border border-gray-200 shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share && canvasRef.current) {
                canvasRef.current.toBlob((blob) => {
                  if (blob) {
                    const file = new File([blob], 'auralens_ootd.png', { type: 'image/png' });
                    navigator.share({
                      title: 'AuraLens Photobooth',
                      text: 'Check out my OOTD photobooth made with AuraLens!',
                      files: [file],
                    }).catch(() => {});
                  }
                });
              } else {
                handleDownload();
              }
            }}
            className="py-2.5 px-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Story</span>
          </button>
        </div>
      </div>
    </div>
  );
};

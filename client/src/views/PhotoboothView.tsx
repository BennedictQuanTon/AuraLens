import React, { useState, useRef, useEffect } from 'react';
import { Camera, SwitchCamera, Upload, Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';
import type { PhotoboothFrame, VibeStyle } from '../types/entityGraph.js';
import { FrameSelector } from '../components/photobooth/FrameSelector.js';
import { CanvasStudio } from '../components/photobooth/CanvasStudio.js';

interface PhotoboothViewProps {
  frames: PhotoboothFrame[];
  currentVibe: VibeStyle;
  capturedPhoto: string | null;
  onBackToMap: () => void;
}

export const PhotoboothView: React.FC<PhotoboothViewProps> = ({
  frames,
  currentVibe,
  capturedPhoto: initialCapturedPhoto,
  onBackToMap,
}) => {
  const [selectedFrameId, setSelectedFrameId] = useState<string>(
    frames[0]?.id || 'frame-01'
  );
  const [activePhoto, setActivePhoto] = useState<string | null>(
    initialCapturedPhoto ||
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
  );
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedFrame =
    frames.find((f) => f.id === selectedFrameId) || frames[0];

  // Start Selfie Camera for Photobooth
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

  // Snap photo in photobooth
  const handleSnapPhotobooth = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 720;
    canvas.height = videoRef.current.videoHeight || 1280;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setActivePhoto(canvas.toDataURL('image/jpeg', 0.9));
      setIsCameraActive(false);
    }
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

  return (
    <div className="space-y-4 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToMap}
          className="p-2.5 rounded-2xl bg-white/80 border border-gray-200 shadow-sm active:scale-95 transition-all text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF2E93] block">
            Aura Photobooth Studio
          </span>
          <h2 className="text-lg font-black text-gray-900">
            Khung Ảnh Độc Bản 📸
          </h2>
        </div>

        <button
          onClick={() => setIsCameraActive(!isCameraActive)}
          className="p-2.5 rounded-2xl bg-[#D4FF00] text-black shadow-sm font-bold text-xs active:scale-95 transition-all"
          title="Bật/Tắt Camera Selfie"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Frame Selector Carousel */}
      <FrameSelector
        frames={frames}
        selectedFrameId={selectedFrameId}
        onSelectFrame={setSelectedFrameId}
      />

      {/* Live Camera View OR Canvas Studio */}
      {isCameraActive ? (
        <div className="relative w-full aspect-[9/16] max-h-[65vh] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black flex flex-col justify-between p-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover ${
              facingMode === 'user' ? 'scale-x-[-1]' : ''
            }`}
          />

          {/* Transparent Frame Live Overlay */}
          {selectedFrame && (
            <img
              src={selectedFrame.frameOverlayUrl}
              alt="Frame Overlay"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
            />
          )}

          {/* Top Controls */}
          <div className="relative z-20 flex items-center justify-between">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold">
              ✨ Live Photobooth
            </span>
            <button
              onClick={() =>
                setFacingMode((p) => (p === 'user' ? 'environment' : 'user'))
              }
              className="p-2 rounded-xl bg-black/60 text-white backdrop-blur-md"
            >
              <SwitchCamera className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Shutter */}
          <div className="relative z-20 flex items-center justify-center gap-4">
            <button
              onClick={handleSnapPhotobooth}
              className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#D4FF00] to-[#00F5FF] shadow-2xl active:scale-90 transition-transform flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Camera className="w-6 h-6 text-[#7C3AED]" />
              </div>
            </button>
          </div>
        </div>
      ) : (
        activePhoto &&
        selectedFrame && (
          <CanvasStudio
            photoDataUrl={activePhoto}
            selectedFrame={selectedFrame}
            onRetake={() => setIsCameraActive(true)}
          />
        )
      )}

      {/* Upload button alternative */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {!isCameraActive && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-extrabold text-[#7C3AED] hover:underline flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Tải ảnh khác từ thiết bị</span>
          </button>
        </div>
      )}
    </div>
  );
};

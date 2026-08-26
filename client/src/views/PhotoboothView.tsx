import React, { useState, useRef, useEffect } from 'react';
import { Camera, SwitchCamera, Upload, ArrowLeft, Sparkles, Layers, Wand2, Timer } from 'lucide-react';
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
  const [timerSeconds, setTimerSeconds] = useState<0 | 3 | 5 | 10>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedFrame =
    frames.find((f) => f.id === selectedFrameId) || frames[0];

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

  const captureSnapshotPhotobooth = () => {
    if (!videoRef.current) return;
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 250);

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

  const handleSnapPhotobooth = () => {
    if (!videoRef.current) return;

    if (timerSeconds > 0) {
      setCountdown(timerSeconds);
      return;
    }

    captureSnapshotPhotobooth();
  };

  // Countdown timer tick
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      setCountdown(null);
      captureSnapshotPhotobooth();
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
          setActivePhoto(reader.result);
          setIsCameraActive(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fadeIn pb-16">
      {/* Desktop 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: CANVAS STUDIO / LIVE CAMERA (cols 1-6 on lg) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {isCameraActive ? (
            <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black flex flex-col justify-between p-4">
              {/* Flash Effect */}
              {isFlashActive && (
                <div className="absolute inset-0 bg-white z-40 animate-fadeOut pointer-events-none" />
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {selectedFrame && (
                <img
                  src={selectedFrame.frameOverlayUrl}
                  alt="Frame Overlay"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                />
              )}

              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                  <div className="relative flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-[#D4FF00] border-t-transparent animate-spin shadow-[0_0_40px_rgba(212,255,0,0.8)]" style={{ animationDuration: '1s' }} />
                    <span className="absolute font-black text-6xl text-[#D4FF00] tracking-tighter drop-shadow-2xl">
                      {countdown}
                    </span>
                  </div>

                  <div className="mt-6 space-y-2">
                    <span className="text-xs font-black text-white uppercase tracking-widest block animate-pulse">
                      📸 Strike a pose...
                    </span>

                    <button
                      onClick={cancelCountdown}
                      className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                    >
                      Hủy / Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="relative z-20 flex items-center justify-between">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold">
                  ✨ Live Photobooth
                </span>
                <button
                  onClick={() =>
                    setFacingMode((p) => (p === 'user' ? 'environment' : 'user'))
                  }
                  className="p-2 rounded-full bg-black/60 text-white backdrop-blur-md cursor-pointer"
                >
                  <SwitchCamera className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Controls: Shutter & Timer */}
              <div className="relative z-20 flex items-center justify-center gap-4">
                <button
                  onClick={handleSnapPhotobooth}
                  disabled={countdown !== null}
                  className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#D4FF00] to-[#00F5FF] shadow-2xl active:scale-90 transition-transform flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                </button>

                {/* Timer Selector */}
                <button
                  onClick={cycleTimer}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg border flex flex-col items-center justify-center ${
                    timerSeconds > 0
                      ? 'bg-[#D4FF00] text-gray-950 border-[#D4FF00] font-black'
                      : 'bg-black/60 hover:bg-black text-white border-white/25'
                  }`}
                  title={`Timer: ${timerSeconds === 0 ? 'Off' : `${timerSeconds}s`}`}
                >
                  <Timer className={`w-4 h-4 ${timerSeconds > 0 ? 'text-gray-950' : 'text-[#D4FF00]'}`} />
                  <span className={`text-[9px] font-black uppercase mt-0.5 ${timerSeconds > 0 ? 'text-gray-950' : 'text-gray-200'}`}>
                    {timerSeconds === 0 ? 'Off' : `${timerSeconds}s`}
                  </span>
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
        </div>

        {/* RIGHT COLUMN: FRAME SELECTION & STUDIO CONTROLS (cols 7-12 on lg) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToMap}
              className="p-2.5 rounded-full bg-white border border-gray-200 shadow-xs active:scale-95 transition-all text-gray-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="text-center lg:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF2E93] block">
                Aura Photobooth Studio
              </span>
              <h2 className="text-xl lg:text-2xl font-black text-gray-900">
                Custom Story 9:16 Frames 📸
              </h2>
            </div>

            <button
              onClick={() => setIsCameraActive(!isCameraActive)}
              className="p-2.5 rounded-full bg-gray-950 text-[#D4FF00] shadow-sm font-bold text-xs active:scale-95 transition-all cursor-pointer"
              title="Toggle Live Camera"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Frame Selector */}
          <div className="calm-card-elevated p-4 rounded-3xl space-y-2">
            <FrameSelector
              frames={frames}
              selectedFrameId={selectedFrameId}
              onSelectFrame={setSelectedFrameId}
            />
          </div>

          {/* Studio Feature Card */}
          <div className="calm-card p-4 rounded-3xl space-y-2.5">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                HTML5 2D Canvas Compositor
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Real-time vector blending renders a crystal-clear 1080x1920 Story PNG ready to export directly to Instagram, TikTok, or your camera roll.
            </p>
          </div>

          {/* Upload Button Fallback */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          {!isCameraActive && (
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-extrabold text-purple-600 hover:text-purple-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload a different photo from device</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

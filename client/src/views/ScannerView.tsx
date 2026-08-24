import React, { useRef, useState, useEffect } from 'react';
import { Camera, SwitchCamera, Upload, Sparkles, AlertCircle, ArrowLeft, CheckCircle2, Shield } from 'lucide-react';
import type { EventContext } from '../types/entityGraph.js';
import { LumiAvatar } from '../components/common/LumiAvatar.js';

interface ScannerViewProps {
  context: EventContext;
  onCapture: (imageDataUrl: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  context,
  onCapture,
  onBack,
  isLoading,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

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
        setCameraError('Unable to access device camera. Please grant permission or upload a photo.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

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

  return (
    <div className="animate-fadeIn pb-12">
      {/* Desktop 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: CAMERA VIEWFINDER (cols 1-7 on lg) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-sm md:max-w-md aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black flex flex-col justify-between p-4 select-none">
            {isFlashActive && (
              <div className="absolute inset-0 bg-white z-50 animate-fadeOut" />
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

            {cameraError && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-900 via-purple-950 to-black text-white text-center">
                <AlertCircle className="w-12 h-12 text-[#FF2E93] mb-3" />
                <p className="text-xs font-semibold text-gray-300 mb-4 max-w-xs">
                  {cameraError}
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 px-5 rounded-full bg-gradient-to-r from-[#D4FF00] to-[#00F5FF] text-black font-extrabold text-xs shadow-lg"
                >
                  Upload OOTD Photo
                </button>
              </div>
            )}

            {/* Cyber Laser Scanner Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="animate-scan-laser" />

              <div className="w-full h-full p-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-t-3 border-l-3 border-[#00F5FF]" />
                  <div className="w-8 h-8 border-t-3 border-r-3 border-[#00F5FF]" />
                </div>

                <div className="flex flex-col items-center justify-center text-center opacity-85">
                  <div className="w-48 h-64 border-2 border-dashed border-[#D4FF00]/60 rounded-3xl flex items-center justify-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4FF00] bg-black/70 px-3 py-1 rounded-full">
                      [ Align Outfit in Frame ]
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="w-8 h-8 border-b-3 border-l-3 border-[#D4FF00]" />
                  <div className="w-8 h-8 border-b-3 border-r-3 border-[#D4FF00]" />
                </div>
              </div>
            </div>

            {/* Top Bar */}
            <div className="relative z-20 flex items-center justify-between">
              <button
                onClick={onBack}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
                Target: <span className="text-[#D4FF00]">{context}</span>
              </div>

              <button
                onClick={toggleCamera}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <SwitchCamera className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="relative z-20 flex items-center justify-between gap-4 pt-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md active:scale-95 transition-all flex flex-col items-center gap-0.5 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#00F5FF]" />
                <span className="text-[9px] font-bold">Upload</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Shutter Button */}
              <button
                onClick={handleSnap}
                disabled={isLoading}
                className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#FF2E93] via-[#D4FF00] to-[#00F5FF] shadow-2xl active:scale-90 transition-transform flex items-center justify-center cursor-pointer"
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-inner">
                  {isLoading ? (
                    <Sparkles className="w-7 h-7 text-[#7C3AED] animate-spin" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-950 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-[#D4FF00]" />
                    </div>
                  )}
                </div>
              </button>

              <div className="w-12" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME AI ASSISTANT PANEL (cols 8-12 on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <LumiAvatar
            comment="Position yourself in good lighting so Lumi can capture your silhouette, color balance, and fabric textures accurately!"
            isSpeaking={true}
            size="md"
          />

          <div className="calm-card-elevated p-5 rounded-3xl space-y-3">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider block">
              Smart Vision Guidelines
            </span>

            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Full body or torso framing works best.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Ensure natural light or frontal illumination.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Accessories and footwear boost scoring fidelity.</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-gray-100 border border-gray-200 text-xs text-gray-600 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <span>
              Powered by <span className="font-bold text-gray-900">Gemini 2.5 Flash Multimodal</span>. Images are evaluated in-memory and protected with privacy-first standards.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import type { PhotoboothFrame } from '../../types/entityGraph.js';
import { Sparkles } from 'lucide-react';

interface FrameSelectorProps {
  frames: PhotoboothFrame[];
  selectedFrameId: string;
  onSelectFrame: (frameId: string) => void;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  frames,
  selectedFrameId,
  onSelectFrame,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#FF2E93]" />
          Chọn Khung Trend (Y2K / Magazine)
        </span>
        <span className="text-[10px] font-bold text-[#7C3AED]">
          {frames.length} Khung Có Sẵn
        </span>
      </div>

      {/* Horizontal Filter Picker */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
        {frames.map((frame) => {
          const isSelected = frame.id === selectedFrameId;

          return (
            <button
              key={frame.id}
              onClick={() => onSelectFrame(frame.id)}
              className={`snap-start shrink-0 flex flex-col items-center gap-1.5 p-1 rounded-2xl transition-all duration-300 ${
                isSelected
                  ? 'scale-105 opacity-100'
                  : 'opacity-70 hover:opacity-90 active:scale-95'
              }`}
            >
              {/* Circular Frame Preview */}
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

              {/* Title */}
              <span
                className={`text-[9px] font-bold max-w-[70px] truncate text-center ${
                  isSelected ? 'text-gray-900 font-extrabold' : 'text-gray-500'
                }`}
              >
                {frame.name.split(' ')[0]} {frame.name.split(' ')[1]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

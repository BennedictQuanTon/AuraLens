import React from 'react';
import { Sparkles, Bot, Volume2 } from 'lucide-react';

interface LumiAvatarProps {
  comment?: string;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LumiAvatar: React.FC<LumiAvatarProps> = ({
  comment,
  isSpeaking = true,
  size = 'md',
}) => {
  const avatarSizes = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <div className="flex items-start gap-3 w-full">
      {/* Animated Lumi AI Orb */}
      <div className="relative shrink-0">
        <div
          className={`${avatarSizes[size]} rounded-2xl bg-gradient-to-tr from-[#FF2E93] via-[#7C3AED] to-[#00F5FF] p-0.5 shadow-md flex items-center justify-center animate-pulse`}
        >
          <div className="w-full h-full bg-[#0A0A0F] rounded-[14px] flex items-center justify-center relative overflow-hidden">
            <Bot className="w-6 h-6 text-[#D4FF00]" />
            {/* Glowing reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          </div>
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4FF00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4FF00]"></span>
        </span>
      </div>

      {/* Speech Bubble */}
      {comment && (
        <div className="flex-1 glass-card p-3.5 rounded-2xl rounded-tl-sm border border-white/90 shadow-md relative">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-[#7C3AED] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FF2E93]" />
                Lumi Stylist AI
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full">
                Gen Z Persona
              </span>
            </div>

            {/* Audio Wave Simulator */}
            {isSpeaking && (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/5">
                <Volume2 className="w-2.5 h-2.5 text-gray-500 mr-0.5" />
                <span className="w-0.5 h-2 bg-[#FF2E93] rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="w-0.5 h-3 bg-[#7C3AED] rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="w-0.5 h-2 bg-[#00F5FF] rounded-full animate-bounce [animation-delay:300ms]"></span>
              </div>
            )}
          </div>

          <p className="text-xs font-medium text-gray-800 leading-relaxed">
            "{comment}"
          </p>
        </div>
      )}
    </div>
  );
};

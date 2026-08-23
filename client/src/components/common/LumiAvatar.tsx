import React from 'react';
import { Sparkles, Volume2 } from 'lucide-react';

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
  return (
    <div className="flex items-start gap-3.5 w-full select-none">
      {/* Floating Animated Mascot Avatar */}
      <div className="relative shrink-0 animate-lumi-float">
        <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-white shadow-md bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] p-0.5">
          <img
            src="/lumi.jpg"
            alt="Lumi Mascot"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#D4FF00] border-2 border-white rounded-full" />
      </div>

      {/* Speech Bubble */}
      {comment && (
        <div className="flex-1 calm-card-elevated p-3.5 rounded-3xl rounded-tl-sm border border-gray-100/90 relative">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-gray-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FF2E93]" />
                Lumi Stylist
              </span>
              <span className="text-[9px] font-bold px-2 py-0.2 bg-gray-100 text-gray-600 rounded-full">
                AI Companion
              </span>
            </div>

            {/* Subtle Audio wave simulation */}
            {isSpeaking && (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gray-50">
                <Volume2 className="w-2.5 h-2.5 text-gray-400 mr-0.5" />
                <span className="w-0.5 h-2 bg-[#FF2E93] rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="w-0.5 h-3 bg-[#7C3AED] rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="w-0.5 h-2 bg-[#D4FF00] rounded-full animate-bounce [animation-delay:300ms]"></span>
              </div>
            )}
          </div>

          <p className="text-xs font-medium text-gray-700 leading-relaxed">
            "{comment}"
          </p>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  User,
  Zap,
  Coffee,
  Camera,
  Palette,
  Check,
  Layers,
  Globe2,
  ShieldCheck,
  ExternalLink,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import type { VibeStyle } from '../types/entityGraph.js';
import type { UserProfileState } from '../types/settings.js';
import { InteractiveWelcomeParticles } from '../components/common/InteractiveWelcomeParticles.js';

interface OnboardingLandingViewProps {
  initialProfile: UserProfileState;
  onComplete: (updatedProfile: UserProfileState) => void;
}

const AURA_STYLES: { id: VibeStyle; label: string }[] = [
  { id: 'Cyber-Pop', label: 'Cyber-Pop' },
  { id: 'Y2K', label: 'Y2K Retro' },
  { id: 'Streetwear', label: 'Streetwear' },
  { id: 'Clean-Fit', label: 'Clean-Fit' },
  { id: 'Old Money', label: 'Old Money' },
  { id: 'Minimalist', label: 'Minimalist' },
  { id: 'Vintage', label: 'Vintage 90s' },
  { id: 'Goth-Chic', label: 'Goth-Chic' },
];

const GENZ_PERSONAS = [
  {
    id: 'speakeasy',
    title: 'Nightlife Speakeasy Hunter',
    desc: 'Loves dim neon lights, secret doors, and craft cocktails.',
    icon: Zap,
  },
  {
    id: 'cafe_hopper',
    title: 'Aesthetic Cafe Hopper',
    desc: 'Always hunting for high ceilings, natural sunlight, and matcha.',
    icon: Coffee,
  },
  {
    id: 'ootd_creator',
    title: 'Streetwear & OOTD Creator',
    desc: 'Captures daily fits, tests photobooth strips, and tracks style streak.',
    icon: Camera,
  },
  {
    id: 'art_lover',
    title: 'Art Exhibition & Vintage Fan',
    desc: 'Passionate about heritage spots, 90s retro cassettes, and thrifting.',
    icon: Palette,
  },
];

/**
 * AnimatedShineButton
 * Features glowing text shine mask and rotating border sweep animation
 */
const AnimatedShineButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      className={`group inline-flex items-center justify-center px-10 sm:px-12 py-4 sm:py-5 rounded-full relative overflow-hidden bg-black/90 hover:bg-black border border-[#D4FF00]/50 text-[#D4FF00] font-black text-base sm:text-lg transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [--shine:rgba(212,255,0,0.85)] shadow-[0_0_30px_rgba(212,255,0,0.35)] hover:shadow-[0_0_45px_rgba(212,255,0,0.6)] cursor-pointer ${className}`}
    >
      {/* Text with shine mask */}
      <motion.span
        className="tracking-[0.16em] uppercase font-black flex items-center justify-center h-full w-full relative z-10 gap-2.5"
        style={{
          WebkitMaskImage:
            'linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))',
          maskImage:
            'linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))',
        }}
        initial={{ ['--mask-x' as any]: '100%' } as any}
        animate={{ ['--mask-x' as any]: '-100%' } as any}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'linear',
          repeatDelay: 1,
        }}
      >
        {children}
      </motion.span>

      {/* Border shine effect */}
      <motion.span
        className="block absolute inset-0 rounded-full p-px pointer-events-none"
        style={{
          background:
            'linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
        initial={{ backgroundPosition: '100% 0', opacity: 0 }}
        animate={{ backgroundPosition: ['100% 0', '0% 0'], opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1,
        }}
      />
    </motion.button>
  );
};

export const OnboardingLandingView: React.FC<OnboardingLandingViewProps> = ({
  initialProfile,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [userName, setUserName] = useState<string>(initialProfile.name || 'Bennedict');
  const [userHandle, setUserHandle] = useState<string>(initialProfile.handle || 'bennedict');
  const [selectedVibe, setSelectedVibe] = useState<VibeStyle>(initialProfile.favoriteVibe || 'Cyber-Pop');
  const [selectedPersona, setSelectedPersona] = useState<string>('ootd_creator');

  const handleFinish = () => {
    const updatedProfile: UserProfileState = {
      ...initialProfile,
      name: userName.trim() || 'Bennedict',
      handle: userHandle.trim() || 'bennedict',
      favoriteVibe: selectedVibe,
      bio: `${selectedVibe} Explorer in Saigon.`,
    };
    localStorage.setItem('auralens_user_name', updatedProfile.name);
    localStorage.setItem('auralens_onboarded', 'true');
    onComplete(updatedProfile);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white flex flex-col justify-between select-none bg-gradient-to-br from-[#12041c] via-[#2f0d40] to-[#5a1445]">
      
      {/* ========================================================================= */}
      {/* DYNAMIC AMBIENT MESH GRADIENT LAYERS (Smooth Magenta-Purple Wave)         */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Warm Sunset Glow Orb */}
        <div
          className="absolute -top-32 -left-32 w-[480px] sm:w-[620px] h-[480px] sm:h-[620px] bg-gradient-to-br from-[#ff6b35]/35 via-[#ff2e93]/25 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '9s' }}
        />
        
        {/* Layer 2: Deep Electric Cyber Violet Orb */}
        <div
          className="absolute top-1/4 -right-32 w-[520px] sm:w-[680px] h-[520px] sm:h-[680px] bg-gradient-to-tl from-[#9333ea]/35 via-[#7c3aed]/25 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '11s' }}
        />
        
        {/* Layer 3: Ambient Center Flare */}
        <div className="absolute -bottom-40 left-1/3 w-[560px] h-[560px] bg-gradient-to-tr from-[#d4ff00]/12 via-[#ff2e93]/18 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Top Step Dots (Clean Minimalist Indicator) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-8 flex items-center justify-end">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s
                  ? 'w-8 bg-[#D4FF00] shadow-[0_0_10px_#D4FF00]'
                  : step > s
                  ? 'w-3 bg-white/60'
                  : 'w-3 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP CONTENT CONTAINER                                                    */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 flex-1 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          
          {/* ===================================================================== */}
          {/* PAGE 1: HEROIC WELCOME SCREEN (Minimalist, Centered, 1-Line Title)   */}
          {/* ===================================================================== */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full text-center space-y-8 max-w-3xl mx-auto my-auto"
            >
              {/* Interactive Three.js Particle Title with exact brand colors and cursor scatter effect */}
              <div className="space-y-3 w-full flex flex-col items-center">
                <InteractiveWelcomeParticles />

                <p className="text-base sm:text-lg text-white/80 font-medium max-w-xl mx-auto leading-relaxed tracking-wide pt-1">
                  Your Multimodal AI Fashion Stylist & Saigon Vibe Spot Curator. Ready to check your drip?
                </p>
              </div>

              {/* Centered Animated Shine Button */}
              <div className="pt-6 flex justify-center">
                <AnimatedShineButton onClick={() => setStep(2)}>
                  <span>Get Started</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </AnimatedShineButton>
              </div>
            </motion.div>
          )}

          {/* ===================================================================== */}
          {/* PAGE 2: WHAT IS AURALENS (Sections, Big Font, Architecture Clarity)   */}
          {/* ===================================================================== */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full space-y-6 max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                  What is AuraLens?
                </h2>
                <p className="text-sm sm:text-base text-white/80 font-medium">
                  An end-to-end AI fashion intelligence agent connecting outfits, real-time weather, and lifestyle spots.
                </p>
              </div>

              {/* 3 Clean Section Cards with Large Fonts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                
                {/* Section 1: Live Real AI */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/30 text-[#D4FF00] flex items-center justify-center font-black">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    1. 100% Real Live AI
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 font-medium leading-relaxed">
                    Multimodal fit checking powered by <strong>Google Gemini 2.5 Flash / 3.5 Flash</strong>, real-time weather grounding, and automated Photobooth synthesis.
                  </p>
                </div>

                {/* Section 2: Mock Dataset */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/30 text-amber-300 flex items-center justify-center font-black">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    2. Benchmark Mock Data
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 font-medium leading-relaxed">
                    15 curated Saigon venues & sample Vault gallery entries serve as benchmark demonstration data for a completely <strong>$0 zero-cost hackathon release</strong>.
                  </p>
                </div>

                {/* Section 3: Future Vision */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-black">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-white">
                    3. Future Scalability
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 font-medium leading-relaxed">
                    With commercial enterprise funding, AuraLens will scale globally with <strong>Google Maps Platform (Places API New, 3D Tiles)</strong> & Gemini vector search.
                  </p>
                </div>

              </div>

              {/* Open Source Transparency Link */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-black/30 border border-white/15 backdrop-blur-md text-xs">
                <div className="flex items-center gap-2 text-white/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Privacy: All profile data is saved strictly on your local browser.</span>
                </div>
                <a
                  href="https://github.com/BennedictQuanTon/AuraLens"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4FF00] hover:underline font-bold inline-flex items-center gap-1 shrink-0"
                >
                  <span>Verify GitHub Open-Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="py-3.5 px-8 rounded-full bg-black/80 hover:bg-black text-[#D4FF00] text-sm sm:text-base font-black border border-[#D4FF00]/60 shadow-[0_0_20px_rgba(212,255,0,0.3)] hover:shadow-[0_0_30px_rgba(212,255,0,0.5)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Setup Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ===================================================================== */}
          {/* PAGE 3: SETUP PROFILE & GEN Z PERSONA (Setup once, active everywhere) */}
          {/* ===================================================================== */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full space-y-6 max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="text-center space-y-1.5 max-w-xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Quick Profile Setup
                </h2>
                <p className="text-xs sm:text-sm text-white/80 font-medium">
                  Personalize your name and style persona. This will configure your greetings and live recommendations.
                </p>
              </div>

              {/* Main Setup Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Left: Name & Vibe Guess */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-4">
                  {/* Name input */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#D4FF00] mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Your Display Name</span>
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name (e.g. Bennedict)"
                      className="w-full py-3 px-4 rounded-2xl bg-black/40 border border-white/20 text-white font-black text-base focus:outline-hidden focus:border-[#D4FF00] transition-all placeholder:text-white/40"
                    />
                  </div>

                  {/* Vibe Chips */}
                  <div className="space-y-2 pt-1 border-t border-white/10">
                    <label className="block text-xs font-black uppercase tracking-wider text-white/90">
                      Your Aesthetic Vibe Guess: <span className="text-[#D4FF00] font-black">{selectedVibe}</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {AURA_STYLES.map((v) => {
                        const isSelected = selectedVibe === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVibe(v.id)}
                            className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                              isSelected
                                ? 'bg-[#D4FF00] text-gray-950 border-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.4)] scale-102 font-black'
                                : 'bg-black/30 hover:bg-black/50 text-white/80 border-white/15'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-gray-950" />}
                            <span>{v.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Gen Z Explorer Persona */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-white/90">
                    What kind of Gen Z explorer are you?
                  </label>
                  
                  <div className="space-y-2">
                    {GENZ_PERSONAS.map((p) => {
                      const isSelected = selectedPersona === p.id;
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedPersona(p.id)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 select-none ${
                            isSelected
                              ? 'bg-black/60 border-[#D4FF00] ring-1 ring-[#D4FF00] shadow-sm'
                              : 'bg-black/25 hover:bg-black/40 border-white/10'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#D4FF00] text-gray-950' : 'bg-white/10 text-white'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className={`text-xs font-black leading-tight ${isSelected ? 'text-[#D4FF00]' : 'text-white'}`}>
                              {p.title}
                            </h4>
                            <p className="text-[11px] text-white/70 font-medium leading-tight">
                              {p.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Action Buttons: Back or Launch Experience */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="py-4 px-9 rounded-full bg-black/90 hover:bg-black text-[#D4FF00] text-sm sm:text-base font-black border-2 border-[#D4FF00] shadow-[0_0_25px_rgba(212,255,0,0.4)] hover:shadow-[0_0_35px_rgba(212,255,0,0.6)] active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group"
                >
                  <span>🚀 Launch AuraLens Experience</span>
                  <Sparkles className="w-4 h-4 text-[#D4FF00] group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

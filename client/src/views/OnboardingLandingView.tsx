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
  Globe2,
  ShieldCheck,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  Target,
  CloudSun,
  MapPin,
  Info,
  X,
  Lock,
  Code2,
  TrendingDown,
  Clock,
  Layers,
  ArrowDownRight,
  Sparkle,
  Shirt,
  Compass,
  Smile,
  Frown,
  Sliders,
  Sparkles as SparklesIcon,
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

// SECTION B: WHY CHOOSE AURALENS (6 Minimalist Solutions styled like Image 2)
const WHY_CHOOSE_SOLUTIONS = [
  {
    icon: Zap,
    title: 'Multimodal Drip Check',
    desc: 'Google Gemini Multimodal evaluates silhouette proportions, color harmony, and reflective textures in seconds, turning subjective doubts into objective scores.',
  },
  {
    icon: CloudSun,
    title: 'Real-Time Weather Grounding',
    desc: 'Never get sent to an outdoor rooftop during a Saigon rainstorm. Recommendations are hard-locked to live temperature, rain probability, and UV heat radar.',
  },
  {
    icon: MapPin,
    title: 'Tone-Sur-Tone Spot Matching',
    desc: 'Zero fake seeding. Every recommended cafe and speakeasy is tone-matched to your outfit palette based on our verified Knowledge Graph.',
  },
  {
    icon: Target,
    title: 'Instant Style Confidence',
    desc: 'Turn hesitation into instant action. Lumi pinpoints exactly what item to swap, color pairings to add, and connects you directly with trending Local Brands.',
  },
  {
    icon: Camera,
    title: 'Aura Photobooth Studio',
    desc: 'Instantly package your outing into a 9:16 custom-framed film strip with aesthetic Y2K stickers, ready for viral story sharing with no extra editing.',
  },
  {
    icon: Globe2,
    title: 'Production Scalability Roadmap',
    desc: 'Engineered for longevity with Zero-Cost Google Cloud Run architecture and an enterprise Google Maps Platform pipeline scaling to Tokyo and Seoul.',
  },
];

// Pure Transparent Logos (No White Box Background)
const TECH_LOGOS_TRANSPARENT = [
  { name: 'Google Gemini', logo: '/logos/gemini_transparent.png' },
  { name: 'Google Maps Platform', logo: '/logos/google_map_transparent.png' },
  { name: 'Google Cloud Storage', logo: '/logos/google_cloud_transparent.png' },
  { name: 'Firebase', logo: '/logos/firebase_transparent.png' },
  { name: 'Google Antigravity', logo: '/logos/antigravity_transparent.png' },
  { name: 'React 19', logo: '/logos/react_transparent.png' },
  { name: 'TypeScript 5.7', logo: '/logos/typescript_transparent.png' },
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
  const [isSecurityInfoOpen, setIsSecurityInfoOpen] = useState<boolean>(false);

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
    <div className="relative min-h-screen w-full overflow-x-hidden text-white flex flex-col justify-between select-none bg-gradient-to-br from-[#12041c] via-[#2f0d40] to-[#5a1445]">
      
      {/* ========================================================================= */}
      {/* DYNAMIC AMBIENT MESH GRADIENT LAYERS (Smooth Magenta-Purple Wave)         */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Warm Sunset Glow Orb */}
        <div
          className="absolute -top-32 -left-32 w-[520px] sm:w-[700px] h-[520px] sm:h-[700px] bg-gradient-to-br from-[#ff6b35]/35 via-[#ff2e93]/25 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '9s' }}
        />
        
        {/* Layer 2: Deep Electric Cyber Violet Orb */}
        <div
          className="absolute top-1/4 -right-32 w-[560px] sm:w-[780px] h-[560px] sm:h-[780px] bg-gradient-to-tl from-[#9333ea]/35 via-[#7c3aed]/25 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '11s' }}
        />
        
        {/* Layer 3: Ambient Center Flare */}
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-[#d4ff00]/12 via-[#ff2e93]/18 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Top Step Dots (Clean Minimalist Indicator) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-end">
        <div className="flex items-center gap-2.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === s
                  ? 'w-10 bg-[#D4FF00] shadow-[0_0_12px_#D4FF00]'
                  : step > s
                  ? 'w-3.5 bg-white/60'
                  : 'w-3.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP CONTENT CONTAINER                                                    */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          
          {/* ===================================================================== */}
          {/* PAGE 1: HEROIC WELCOME SCREEN (Minimalist, Centered, 2-Line Title)   */}
          {/* ===================================================================== */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full text-center space-y-6 max-w-4xl mx-auto my-auto"
            >
              {/* Interactive Three.js Particle Title */}
              <div className="space-y-2 w-full flex flex-col items-center">
                <InteractiveWelcomeParticles />

                <p className="text-base sm:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed tracking-wide pt-1">
                  Your Multimodal AI Fashion Stylist & Saigon Vibe Spot Curator. Ready to check your drip?
                </p>
              </div>

              {/* Centered Animated Shine Button */}
              <div className="pt-4 flex justify-center">
                <AnimatedShineButton onClick={() => setStep(2)}>
                  <span>Get Started</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </AnimatedShineButton>
              </div>
            </motion.div>
          )}

          {/* ===================================================================== */}
          {/* PAGE 2: ABOUT AURALENS (Problem Layout [Image 1] + Solution [Image 2]) */}
          {/* ===================================================================== */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full space-y-12 max-w-6xl mx-auto py-2"
            >
              {/* 1. Centered Main Header: ABOUT AURALENS */}
              <div className="text-center space-y-3 max-w-3xl mx-auto">
                <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                  About <span className="bg-gradient-to-r from-[#D4FF00] via-[#FF2E93] to-[#00F5FF] bg-clip-text text-transparent">AuraLens</span>
                </h2>
                <p className="text-sm sm:text-base text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                  The World’s 1st Multimodal AI Fashion & Lifestyle Discovery Agent connecting OOTD checks, Saigon weather, and tone-sur-tone spots.
                </p>
              </div>

              {/* 2. SECTION A: THE CURRENT STRUGGLE (100% Exact Image 2 Layout) */}
              <div className="space-y-6">
                <div className="text-center space-y-2 max-w-4xl mx-auto">
                  <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Why Styling & Spot Discovery is Broken Today
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
                  
                  {/* Card 1: Outfit Anxiety (Pinned bottom-left white widget like Image 2) */}
                  <div className="rounded-3xl bg-gradient-to-b from-[#3a3a44] to-[#1e1e24] border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[460px] sm:min-h-[500px] hover:border-pink-400/50 transition-all duration-300">
                    <div className="p-7 sm:p-9 space-y-3 z-10">
                      <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Outfit Anxiety
                      </h4>
                      <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed">
                        You spend 15-20 minutes every morning standing in front of your wardrobe, yet end up repeating old outfits because you can't tell if the fit truly works for the venue.
                      </p>
                    </div>

                    {/* Image 2 style: Corner-pinned white widget bleeding to bottom-left */}
                    <div className="mt-auto pr-6 z-10">
                      <div className="bg-white text-gray-950 rounded-tr-3xl rounded-br-2xl p-5 sm:p-6 shadow-2xl border-t border-r border-gray-100 space-y-2.5 max-w-[92%]">
                        <div className="text-base font-black text-gray-950 leading-tight">
                          Wardrobe Dilemma
                        </div>
                        <div className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                          <Frown className="w-4 h-4 shrink-0" />
                          <span>0 Confidence · Repeating old fits 3+ times</span>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-xs font-black text-gray-600">
                          <span className="px-2 py-0.5 rounded-md bg-gray-100">📌 Pinterest</span>
                          <span className="px-2 py-0.5 rounded-md bg-gray-100">🔄 TikTok</span>
                          <span className="text-purple-600 font-bold ml-auto">20m Lost</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Seeding Fatigue (Full-bleed bottom photo like Image 2) */}
                  <div className="rounded-3xl bg-gradient-to-b from-[#4a3528] via-[#2f2219] to-[#1a120c] border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[460px] sm:min-h-[500px] hover:border-amber-400/50 transition-all duration-300">
                    <div className="p-7 sm:p-9 space-y-3 z-10 relative">
                      <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Seeding Fatigue
                      </h4>
                      <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed">
                        Viral social reviews turn out to be paid seeding. You arrive only to find the spot closed, poorly lit, or outdoor in sudden monsoon downpours.
                      </p>
                    </div>

                    {/* Image 2 style: Full bleed bottom photo of person using laptop/phone */}
                    <div className="relative w-full h-56 sm:h-64 mt-auto overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
                        alt="Seeding Disappointment"
                        className="w-full h-full object-cover object-top filter contrast-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-[#2f2219]" />
                      
                      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-red-500/40 text-xs font-black text-red-400">
                        <span>❌ Paid Seeding · 5.0 ★</span>
                        <span className="text-white font-black bg-red-600 px-2 py-0.5 rounded text-[10px]">Closed / Storm</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Fragmented Flow (Stepped Red Bars + Floating Metric Pill like Image 2) */}
                  <div className="rounded-3xl bg-gradient-to-b from-[#3d1922] via-[#2d1219] to-[#1a080d] border border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[460px] sm:min-h-[500px] hover:border-rose-400/50 transition-all duration-300">
                    <div className="p-7 sm:p-9 space-y-3 z-10 relative">
                      <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Fragmented Flow
                      </h4>
                      <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed">
                        Planning one outing forces you to juggle 4–5 disconnected apps for weather radar, fit inspiration, map discovery, and photo filters.
                      </p>
                    </div>

                    {/* Image 2 style: Descending Stepped Red Bars & Floating Stat Pill */}
                    <div className="relative w-full h-56 mt-auto flex flex-col items-center justify-end px-6 pb-0 overflow-hidden">
                      
                      {/* Floating Pink/Red Stat Pill */}
                      <div className="relative z-20 mb-3 px-6 py-2 rounded-2xl bg-[#ffccd5] text-[#d90429] font-black text-xl sm:text-2xl shadow-2xl flex items-center gap-2">
                        <span>-45%</span>
                        <span className="text-base">▼</span>
                      </div>

                      {/* Descending red stepped rounded bars rising from bottom */}
                      <div className="w-full flex items-end justify-center gap-3 relative z-10">
                        <div className="w-1/3 h-20 bg-[#ef233c] rounded-t-2xl opacity-90 shadow-md" />
                        <div className="w-1/3 h-32 bg-[#d90429] rounded-t-2xl opacity-95 shadow-lg flex items-center justify-center">
                          <span className="text-[10px] font-black text-white uppercase tracking-wider -rotate-90">Time Lost</span>
                        </div>
                        <div className="w-1/3 h-14 bg-[#ff4d6d] rounded-t-2xl opacity-85 shadow-sm" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* 3. SECTION B: WHY CHOOSE AURALENS (Styled like Image 2 - Minimalist Dark Cards, Large Font) */}
              <div className="space-y-6 pt-4">
                <div className="text-center space-y-2 max-w-3xl mx-auto">
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
                    Why Choose <span className="text-[#D4FF00]">AuraLens</span>?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-medium max-w-xl mx-auto">
                    A unified multimodal AI agent designed to turn outfit uncertainty into confidence and curate your perfect Saigon outing.
                  </p>
                </div>

                {/* 6 Minimalist Dark Cards in 3x2 Grid (Image 2 style: White icon box, Bold title, 2-line summary) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
                  {WHY_CHOOSE_SOLUTIONS.map((sol, idx) => {
                    const Icon = sol.icon;
                    return (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-black/50 border border-white/10 hover:border-white/30 backdrop-blur-xl shadow-xl space-y-3.5 transition-all duration-300 hover:scale-102 flex flex-col justify-start"
                      >
                        {/* Minimalist White Icon Box like Image 2 */}
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Bold Clean Typography */}
                        <div className="space-y-1.5">
                          <h4 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                            {sol.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-white/70 font-medium leading-relaxed">
                            {sol.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Pure Transparent Tech Ecosystem Logos (No White Background Box like Image 3) */}
              <div className="pt-6 border-t border-white/15 space-y-4 text-center">
                <h4 className="text-xs sm:text-sm font-black text-white/90 tracking-widest uppercase">
                  Powered by the Google AI Ecosystem & Modern Tech Stack
                </h4>

                {/* Pure Transparent Floating Logos Row */}
                <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 pt-2">
                  {TECH_LOGOS_TRANSPARENT.map((tech, idx) => (
                    <div
                      key={idx}
                      title={tech.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center hover:scale-125 transition-all duration-300 cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                    >
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-full h-full object-contain filter brightness-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Navigation Action Buttons with Info (i) next to Continue */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="flex items-center gap-3">
                  {/* Security & GitHub Info (i) Button */}
                  <button
                    onClick={() => setIsSecurityInfoOpen(true)}
                    className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-[#D4FF00] border border-white/20 hover:border-[#D4FF00]/50 backdrop-blur-md shadow-md transition-all cursor-pointer group active:scale-95 flex items-center justify-center"
                    title="Data Privacy & GitHub Open-Source Info"
                  >
                    <Info className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="py-3.5 px-8 rounded-full bg-black/90 hover:bg-black text-[#D4FF00] text-sm sm:text-base font-black border border-[#D4FF00]/60 shadow-[0_0_20px_rgba(212,255,0,0.35)] hover:shadow-[0_0_30px_rgba(212,255,0,0.55)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Setup Profile</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
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
              className="w-full space-y-6 max-w-5xl mx-auto py-2"
            >
              {/* Header */}
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  Quick Profile Setup
                </h2>
                <p className="text-xs sm:text-sm text-white/80 font-medium">
                  Personalize your name and style persona. This will configure your greetings and live recommendations.
                </p>
              </div>

              {/* Main Setup Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Left: Name & Vibe Guess */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-4">
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
                      className="w-full py-3.5 px-4 rounded-2xl bg-black/40 border border-white/20 text-white font-black text-base focus:outline-hidden focus:border-[#D4FF00] transition-all placeholder:text-white/40"
                    />
                  </div>

                  {/* Vibe Chips */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
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
                            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
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
                <div className="p-6 sm:p-7 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-white/90">
                    What kind of Gen Z explorer are you?
                  </label>
                  
                  <div className="space-y-2.5">
                    {GENZ_PERSONAS.map((p) => {
                      const isSelected = selectedPersona === p.id;
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedPersona(p.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                            isSelected
                              ? 'bg-black/60 border-[#D4FF00] ring-1 ring-[#D4FF00] shadow-sm'
                              : 'bg-black/25 hover:bg-black/40 border-white/10'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#D4FF00] text-gray-950' : 'bg-white/10 text-white'
                          }`}>
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className={`text-xs sm:text-sm font-black leading-tight ${isSelected ? 'text-[#D4FF00]' : 'text-white'}`}>
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
                  className="py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="py-4 px-10 rounded-full bg-black/90 hover:bg-black text-[#D4FF00] text-base font-black border-2 border-[#D4FF00] shadow-[0_0_25px_rgba(212,255,0,0.4)] hover:shadow-[0_0_35px_rgba(212,255,0,0.6)] active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group"
                >
                  <span>🚀 Launch AuraLens Experience</span>
                  <Sparkles className="w-4.5 h-4.5 text-[#D4FF00] group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* DATA PRIVACY & GITHUB OPEN SOURCE INFO MODAL                              */}
      {/* ========================================================================= */}
      {isSecurityInfoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsSecurityInfoOpen(false)}
        >
          <div
            className="bg-white text-gray-950 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100 animate-scaleUp relative select-text"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-950 tracking-tight">
                    Data Security & Open Source
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold">
                    100% Local Privacy & Codebase Transparency
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSecurityInfoOpen(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2 Clear Sections */}
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              
              {/* Point 1: Privacy Guarantee */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-black">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Is my personal data safe? (Dữ liệu có an toàn không?)</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-xs">
                  <strong>100% Yes.</strong> All camera captures, OOTD fit check images, styling preferences, and Photobooth strips are processed locally and stored strictly in your device’s browser storage (IndexedDB / localStorage). There is zero telemetry, tracking, or hidden cloud archiving.
                </p>
              </div>

              {/* Point 2: GitHub Transparency */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-gray-950 font-black">
                  <Code2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Open Source Inspection & Codebase (Mã nguồn mở)</span>
                </div>
                <p className="text-gray-600 leading-relaxed text-xs">
                  AuraLens is proudly built as a completely open-source project for the #BuildwithGoogleAI Hackathon. You can verify every single line of frontend and backend code on our public GitHub repository.
                </p>
              </div>

            </div>

            {/* Action Button: Click to Open GitHub */}
            <div className="pt-1">
              <a
                href="https://github.com/BennedictQuanTon/AuraLens"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-gray-950 hover:bg-black text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-xl active:scale-98 transition-all cursor-pointer group"
              >
                <Code2 className="w-4 h-4 text-[#D4FF00]" />
                <span>View Full Source Code on GitHub</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

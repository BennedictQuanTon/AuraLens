import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header.js';
import { NavigationBar } from './components/layout/NavigationBar.js';
import { HeroView } from './views/HeroView.js';
import { ScannerView } from './views/ScannerView.js';
import { FitScoreView } from './views/FitScoreView.js';
import { VibeMapView } from './views/VibeMapView.js';
import { PhotoboothView } from './views/PhotoboothView.js';
import { SettingsView } from './views/SettingsView.js';
import { BrandDetailSheet } from './components/sheets/BrandDetailSheet.js';
import { PlaceDetailModal } from './components/sheets/PlaceDetailModal.js';
import { MerchantDrawer } from './components/sheets/MerchantDrawer.js';
import { OOTDHistoryDrawer } from './components/sheets/OOTDHistoryDrawer.js';
import { apiService } from './services/api.js';
import type {
  DripCheckResponse,
  EventContext,
  FashionItem,
  Location,
  PhotoboothFrame,
  PlaceRecommendationResponse,
  VibeStyle,
  WeatherContext,
} from './types/entityGraph.js';
import type { AppColorTheme, AppLanguage, UserProfileState } from './types/settings.js';
import { THEME_OPTIONS } from './types/settings.js';

// Default initial Drip Evaluation so View 3 is never blank when accessed directly
const DEFAULT_DRIP_RESULT: DripCheckResponse = {
  score: 94,
  isPassing: true,
  breakdown: {
    dominantColors: ['Metallic Silver', 'Midnight Black', 'Neon Lime'],
    detectedStyle: 'Cyber-Pop',
    detectedItems: ['Reflective 3M Cropped Jacket', 'Parachute Cargo Pants', 'Matrix Oval Shades'],
    harmonyScore: 96,
    vibeMatchScore: 94,
    pros: [
      'Stunning silhouette proportion with reflective metallic contrast.',
      'Perfect color harmony for nightlife & aesthetic cafes.',
    ],
    cons: ['Consider adding silver chain jewelry or chunky platform boots.'],
  },
  lumiComment:
    '10/10 no cap! This fit is pure fire, perfectly aligned with the Cyber-Pop aesthetic. Ready to slay the town and take 8,000 photos for Story!',
  suggestedAlternatives: [
    {
      id: 'brand-01',
      brandName: 'LIDER Closet',
      name: 'Cyber Structured Boxy Blazer',
      category: 'Outerwear',
      colors: ['Midnight Black', 'Metallic Silver'],
      aestheticTag: 'Cyber-Pop',
      price: 890000,
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
      buyLink: 'https://lider.vn',
      description: 'Structured boxy blazer with razor-sharp tailoring and reflective silver piping.',
      sustainabilityTag: 'Local-Crafted',
    },
    {
      id: 'brand-02',
      brandName: 'She By Shj',
      name: 'Acid Hologram Silver Tube Top',
      category: 'Top',
      colors: ['Metallic Silver'],
      aestheticTag: 'Y2K',
      price: 380000,
      imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      buyLink: 'https://shebyshj.com',
      description: 'Holographic ribbed stretch fabric that catches flash light perfectly.',
      sustainabilityTag: 'Local-Crafted',
    },
  ],
  suggestedAccessories: [
    {
      id: 'brand-04',
      brandName: 'Hades Studio',
      name: 'Neon Matrix Oval Sunglasses',
      category: 'Accessory',
      colors: ['Neon Green', 'Black'],
      aestheticTag: 'Cyber-Pop',
      price: 320000,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      buyLink: 'https://hades.vn',
      description: 'UV400 iridescent mirrored lenses with lightweight polymer frame.',
      sustainabilityTag: 'Eco-Friendly',
    },
    {
      id: 'brand-05',
      brandName: 'Dirty Coins',
      name: 'Industrial Heavy Metal Chain Necklace',
      category: 'Accessory',
      colors: ['Silver Chrome'],
      aestheticTag: 'Streetwear',
      price: 250000,
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      buyLink: 'https://dirtycoins.vn',
      description: 'Stainless steel curb chain with engraved laser logo.',
      sustainabilityTag: 'Local-Crafted',
    },
  ],
  weatherSnapshot: {
    temperature: 29,
    condition: 'Clear & Sunny',
    isRaining: false,
    currentHour: 19,
    city: 'Ho Chi Minh City',
  },
  sessionId: 'initial_demo_session',
};

export function App() {
  // Navigation State (1: Hero, 2: Scanner, 3: FitScore, 4: VibeMap, 5: Photobooth, 6: Settings)
  const [activeView, setActiveView] = useState<number>(1);

  // App Settings & Customization States
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [colorTheme, setColorTheme] = useState<AppColorTheme>('cyber_pop');
  const [userProfile, setUserProfile] = useState<UserProfileState>({
    name: 'Alex',
    handle: 'alex_slays_ootd',
    avatarUrl: '/lumi.jpg',
    bio: 'Cyber-Pop & Y2K Fashion Explorer in Saigon.',
    favoriteVibe: 'Cyber-Pop',
  });

  // App Context & Scenario States
  const [selectedContext, setSelectedContext] = useState<EventContext>('Cafe sống ảo');
  const [mockScenario, setMockScenario] = useState<'low_score' | 'high_score' | 'cyberpunk'>('high_score');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Data States (Pre-initialized so NO page ever renders blank)
  const [dripResult, setDripResult] = useState<DripCheckResponse>(DEFAULT_DRIP_RESULT);
  const [recommendationData, setRecommendationData] = useState<PlaceRecommendationResponse | null>(null);
  const [frames, setFrames] = useState<PhotoboothFrame[]>([]);
  const [weather, setWeather] = useState<WeatherContext>({
    temperature: 29,
    condition: 'Nắng đẹp',
    isRaining: false,
    currentHour: 19,
    city: 'Hồ Chí Minh',
  });

  // Sheets & Modals States
  const [selectedBrandItem, setSelectedBrandItem] = useState<FashionItem | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [isMerchantOpen, setIsMerchantOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Apply dynamic color theme changes to CSS root
  useEffect(() => {
    const selected = THEME_OPTIONS.find((t) => t.id === colorTheme) || THEME_OPTIONS[0];
    document.documentElement.style.setProperty('--color-lime', selected.colors[0]);
    document.documentElement.style.setProperty('--color-pink', selected.colors[1]);
  }, [colorTheme]);

  // Load Initial Frames & Preload Place Recommendations on mount
  useEffect(() => {
    const loadInitialAssets = async () => {
      // 1. Fetch frames
      const fetchedFrames = await apiService.getPhotoboothFrames();
      if (fetchedFrames && fetchedFrames.length > 0) {
        setFrames(fetchedFrames);
      } else {
        setFrames([
          {
            id: 'frame-01',
            name: 'Cyber Glitch Magazine',
            vibeTag: 'Cyber-Pop',
            category: 'Magazine Cover',
            aspectRatio: '9:16',
            frameOverlayUrl: '/frames/frame_cyber_glitch.svg',
            previewUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
            stickers: [],
          },
          {
            id: 'frame-02',
            name: 'Retro 35mm Film Strip',
            vibeTag: 'Vintage',
            category: 'Y2K Film',
            aspectRatio: '9:16',
            frameOverlayUrl: '/frames/frame_film_strip.svg',
            previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
            stickers: [],
          },
          {
            id: 'frame-03',
            name: 'Vogue Minimalist Edition',
            vibeTag: 'Minimalist',
            category: 'Magazine Cover',
            aspectRatio: '9:16',
            frameOverlayUrl: '/frames/frame_vogue_clean.svg',
            previewUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
            stickers: [],
          },
          {
            id: 'frame-04',
            name: 'Dopamine Pop Candy',
            vibeTag: 'Y2K',
            category: 'Dopamine Pop',
            aspectRatio: '9:16',
            frameOverlayUrl: '/frames/frame_dopamine_pop.svg',
            previewUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
            stickers: [],
          },
          {
            id: 'frame-05',
            name: 'Neon Matrix Grid',
            vibeTag: 'Cyber-Pop',
            category: 'Cyberpunk Neon',
            aspectRatio: '9:16',
            frameOverlayUrl: '/frames/frame_matrix_grid.svg',
            previewUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
            stickers: [],
          },
          {
            id: 'frame-06',
            name: 'Old Money Royal Gold',
            vibeTag: 'Old Money',
            category: 'Vintage Tape',
            aspectRatio: '9:16',
            frameOverlayUrl: '/frames/frame_royal_gold.svg',
            previewUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
            stickers: [],
          },
        ]);
      }

      // 2. Preload Vibe Map Place Recommendations
      const initialPlaces = await apiService.recommendPlaces('Cyber-Pop', weather);
      setRecommendationData(initialPlaces);
    };

    loadInitialAssets();
  }, []);

  // Handle Photo Capture & Drip Check Evaluation
  const handleCapture = async (imageDataUrl: string) => {
    setIsLoading(true);
    setCapturedPhoto(imageDataUrl);

    try {
      const evaluation = await apiService.dripCheck({
        context: selectedContext,
        mockScenario,
        imageBase64: imageDataUrl,
      });

      setDripResult(evaluation);

      // Refresh place recommendations with newly evaluated style
      const placeRecs = await apiService.recommendPlaces(
        evaluation.breakdown.detectedStyle,
        weather
      );
      setRecommendationData(placeRecs);

      setActiveView(3);
    } catch (error) {
      console.error('Error evaluating outfit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle Rain Simulation
  const handleToggleRain = async () => {
    const newIsRaining = !weather.isRaining;
    const newWeather: WeatherContext = {
      ...weather,
      isRaining: newIsRaining,
      condition: newIsRaining ? 'Mưa rào' : 'Nắng đẹp',
      temperature: newIsRaining ? 25 : 31,
    };

    setWeather(newWeather);

    const currentStyle: VibeStyle = dripResult?.breakdown?.detectedStyle || 'Cyber-Pop';
    const placeRecs = await apiService.recommendPlaces(currentStyle, newWeather);
    setRecommendationData(placeRecs);
  };

  const handleUpdateProfile = (updated: Partial<UserProfileState>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const currentVibe: VibeStyle = dripResult?.breakdown?.detectedStyle || 'Cyber-Pop';

  return (
    <div className="min-h-screen pb-24 md:pb-12 flex flex-col items-center justify-start bg-[#F8F9FA] text-gray-900">
      {/* Responsive Header with Expanded Desktop Navigation */}
      <Header
        currentVibe={currentVibe}
        userProfile={userProfile}
        onOpenHistory={() => setIsHistoryOpen(true)}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      {/* Main Responsive Container */}
      <main className="w-full max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl px-4 lg:px-8 pt-6 lg:pt-10 flex-1">
        {/* VIEW 1: HERO & LUMI VIBE GATE */}
        {activeView === 1 && (
          <HeroView
            userProfile={userProfile}
            language={language}
            selectedContext={selectedContext}
            onSelectContext={setSelectedContext}
            mockScenario={mockScenario}
            onSelectMockScenario={setMockScenario}
            onStartScanner={() => setActiveView(2)}
          />
        )}

        {/* VIEW 2: SMART CAMERA SCANNER */}
        {activeView === 2 && (
          <ScannerView
            context={selectedContext}
            onCapture={handleCapture}
            onBack={() => setActiveView(1)}
            isLoading={isLoading}
          />
        )}

        {/* VIEW 3: DRIP MATRIX SCORE DASHBOARD */}
        {activeView === 3 && (
          <FitScoreView
            result={dripResult}
            onRetake={() => setActiveView(2)}
            onExplorePlaces={() => setActiveView(4)}
            onSelectBrandItem={(item) => setSelectedBrandItem(item)}
          />
        )}

        {/* VIEW 4: VIBE MAP & SMART F&B ITINERARY */}
        {activeView === 4 && (
          <VibeMapView
            recommendationData={
              recommendationData || {
                weather,
                aestheticTag: currentVibe,
                recommendedPlaces: [],
                lumiSuggestion: 'Discovering tone-sur-tone spots for your vibe...',
              }
            }
            weather={weather}
            onToggleRain={handleToggleRain}
            onSelectPlace={(place) => setSelectedPlace(place)}
            onGoToPhotobooth={() => setActiveView(5)}
          />
        )}

        {/* VIEW 5: AURA PHOTOBOOTH STUDIO */}
        {activeView === 5 && (
          <PhotoboothView
            frames={frames}
            currentVibe={currentVibe}
            capturedPhoto={capturedPhoto}
            onBackToMap={() => setActiveView(4)}
          />
        )}

        {/* VIEW 6: SETTINGS & CUSTOMIZATION */}
        {activeView === 6 && (
          <SettingsView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            language={language}
            onSelectLanguage={setLanguage}
            colorTheme={colorTheme}
            onSelectTheme={setColorTheme}
            onOpenMerchant={() => setIsMerchantOpen(true)}
          />
        )}
      </main>

      {/* Mobile Floating Navigation Bar (Hidden on Desktop md:) */}
      <NavigationBar
        activeView={activeView}
        onSelectView={setActiveView}
        hasScore={!!dripResult}
      />

      {/* SUBPAGES: DRAWERS & MODALS */}
      <BrandDetailSheet
        item={selectedBrandItem}
        isOpen={!!selectedBrandItem}
        onClose={() => setSelectedBrandItem(null)}
      />

      <PlaceDetailModal
        place={selectedPlace}
        isOpen={!!selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onGoToPhotobooth={() => {
          setSelectedPlace(null);
          setActiveView(5);
        }}
      />

      <MerchantDrawer
        isOpen={isMerchantOpen}
        onClose={() => setIsMerchantOpen(false)}
      />

      <OOTDHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}

export default App;

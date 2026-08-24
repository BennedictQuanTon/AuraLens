import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header.js';
import { NavigationBar } from './components/layout/NavigationBar.js';
import { HeroView } from './views/HeroView.js';
import { ScannerView } from './views/ScannerView.js';
import { FitScoreView } from './views/FitScoreView.js';
import { VibeMapView } from './views/VibeMapView.js';
import { PhotoboothView } from './views/PhotoboothView.js';
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

export function App() {
  // Navigation State (1: Hero, 2: Scanner, 3: FitScore, 4: VibeMap, 5: Photobooth)
  const [activeView, setActiveView] = useState<number>(1);

  // App Context & Scenario States
  const [selectedContext, setSelectedContext] = useState<EventContext>('Cafe sống ảo');
  const [mockScenario, setMockScenario] = useState<'low_score' | 'high_score' | 'cyberpunk'>('high_score');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Data States
  const [dripResult, setDripResult] = useState<DripCheckResponse | null>(null);
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

  // Load Initial Frames & Mock Data
  useEffect(() => {
    const loadInitialAssets = async () => {
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

      // Preload place recommendations
      const placeRecs = await apiService.recommendPlaces(
        evaluation.breakdown.detectedStyle,
        weather
      );
      setRecommendationData(placeRecs);

      // Transition to FitScore View
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

    const currentStyle: VibeStyle = dripResult?.breakdown.detectedStyle || 'Cyber-Pop';
    const placeRecs = await apiService.recommendPlaces(currentStyle, newWeather);
    setRecommendationData(placeRecs);
  };

  const currentVibe: VibeStyle = dripResult?.breakdown.detectedStyle || 'Cyber-Pop';

  return (
    <div className="min-h-screen pb-24 md:pb-12 flex flex-col items-center justify-start bg-[#F8F9FA] text-gray-900">
      {/* Responsive Header */}
      <Header
        currentVibe={currentVibe}
        onOpenMerchant={() => setIsMerchantOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      {/* Main Container: max-w-md on mobile, expands to max-w-6xl / 7xl on desktop */}
      <main className="w-full max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl px-4 lg:px-8 pt-4 lg:pt-8 flex-1">
        {/* VIEW 1: HERO & LUMI VIBE GATE */}
        {activeView === 1 && (
          <HeroView
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
        {activeView === 3 && dripResult && (
          <FitScoreView
            result={dripResult}
            onRetake={() => setActiveView(2)}
            onExplorePlaces={() => setActiveView(4)}
            onSelectBrandItem={(item) => setSelectedBrandItem(item)}
          />
        )}

        {/* VIEW 4: VIBE MAP & SMART F&B ITINERARY */}
        {activeView === 4 && recommendationData && (
          <VibeMapView
            recommendationData={recommendationData}
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

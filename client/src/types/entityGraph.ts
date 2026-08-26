/**
 * SHARED ENTITY GRAPH TYPES FOR CLIENT
 */

export type VibeStyle =
  | 'Y2K'
  | 'Cyber-Pop'
  | 'Streetwear'
  | 'Minimalist'
  | 'Vintage'
  | 'Goth-Chic'
  | 'Old Money'
  | 'Clean-Fit';

export type EventContext =
  | 'Hẹn hò'
  | 'Quẩy bar / Pub đêm'
  | 'Cafe sống ảo'
  | 'Đi học / Đi làm năng động'
  | 'Dạo phố cuối tuần';

export interface FashionItem {
  id: string;
  brandName: string;
  name: string;
  category: 'Top' | 'Bottom' | 'Outerwear' | 'Shoes' | 'Accessory' | 'Bag';
  colors: string[];
  aestheticTag: VibeStyle;
  price: number;
  imageUrl: string;
  buyLink: string;
  description: string;
  sustainabilityTag?: 'Second-hand' | 'Eco-Friendly' | 'Local-Crafted';
}

export interface Location {
  id: string;
  name: string;
  type: 'Cafe' | 'Pub' | 'Bar' | 'Photospot' | 'Restaurant' | 'Studio';
  aestheticTag: VibeStyle;
  gps: {
    lat: number;
    lng: number;
    district: string;
  };
  address: string;
  isIndoor: boolean;
  openHours: {
    open: number;
    close: number;
  };
  signatureDrinkOrDish: string;
  bestPhotoSpot: string;
  imageUrl: string;
  mapsLink: string;
  vibeDescription: string;
  matchScore?: number;
  matchReason?: string;
}

export interface WeatherContext {
  temperature: number;
  condition: 'Nắng đẹp' | 'Mưa rào' | 'Mát mẻ' | 'Âm u' | 'Nắng gắt';
  isRaining: boolean;
  currentHour: number;
  city: string;
}

export interface PhotoboothFrame {
  id: string;
  name: string;
  vibeTag: VibeStyle;
  category: 'Y2K Film' | 'Magazine Cover' | 'Cyberpunk Neon' | 'Dopamine Pop' | 'Vintage Tape';
  aspectRatio: '9:16' | '1:1' | '4:5';
  frameOverlayUrl: string;
  previewUrl: string;
  stickers: Array<{
    id: string;
    name: string;
    svgOrPngUrl: string;
  }>;
}

export interface FashionPillars {
  colorHarmony: number; // 0 - 100
  silhouetteCut: number; // 0 - 100
  vibeMatch: number; // 0 - 100
  accessoriesDetails: number; // 0 - 100
}

export interface OutfitBreakdown {
  dominantColors: string[];
  detectedStyle: VibeStyle;
  detectedItems: string[];
  harmonyScore: number;
  vibeMatchScore: number;
  fashionPillars?: FashionPillars;
  pros: string[];
  cons: string[];
  styleDirectives?: {
    cyberPop?: string;
    minimalist?: string;
    streetwear?: string;
  };
}

export interface DripCheckResponse {
  score: number;
  isPassing: boolean;
  breakdown: OutfitBreakdown;
  lumiComment: string;
  suggestedAlternatives: FashionItem[];
  suggestedAccessories: FashionItem[];
  weatherSnapshot: WeatherContext;
  sessionId: string;
}

export interface PlaceRecommendationResponse {
  weather: WeatherContext;
  aestheticTag: VibeStyle;
  recommendedPlaces: Location[];
  lumiSuggestion: string;
}

export interface AITemplateRequest {
  prompt: string;
  language?: 'en' | 'vi';
  aspectRatio?: '9:16' | '4:5' | '1:1' | '16:9' | '4:3';
}

export interface AITemplateResponse {
  templateName: string;
  vibeTag: string;
  conceptDescription: string;
  recommendedFilter: string;
  borderStyle: 'cyber-magazine' | 'film-strip' | 'vogue-clean' | 'dopamine-pop' | 'cyber-hud' | 'royal-gold' | 'neon-minimal';
  colorPalette: {
    primary: string;
    accent: string;
    text: string;
  };
  headerText: string;
  headerSub: string;
  footerText: string;
  stickers: Array<{
    display: string;
    name: string;
    x: number;
    y: number;
    scale: number;
    rotation?: number;
    isTextBadge?: boolean;
  }>;
  customTexts: Array<{
    text: string;
    x: number;
    y: number;
    fontFamily: string;
    color: string;
    hasGlow?: boolean;
    scale?: number;
  }>;
  lumiComment: string;
}

export interface AIMapAnalysisRequest {
  aestheticTag: VibeStyle;
  weather?: Partial<WeatherContext>;
  language?: 'en' | 'vi';
}

export interface AIMapAnalysisResponse {
  dateStr?: string;
  weatherBullets: string[];
  outfitBullets: string[];
  destinationBullets: string[];
  weatherSummary?: string;
  outfitAdvice?: string;
  destinationRec?: string;
  lumiComment: string;
  curatedSpots?: string[];
}

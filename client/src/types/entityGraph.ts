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

export interface OutfitBreakdown {
  dominantColors: string[];
  detectedStyle: VibeStyle;
  detectedItems: string[];
  harmonyScore: number;
  vibeMatchScore: number;
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

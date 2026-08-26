/**
 * AURALENS ENTITY GRAPH SCHEMAS & TYPES
 * Represents the complete knowledge graph connecting Users, Fashion Items, F&B Locations, Rules, and Photobooth Assets.
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

export interface UserProfile {
  id: string;
  name: string;
  dob?: string;
  preferredVibes: VibeStyle[];
  tenantId?: string;
  createdAt: string;
}

export interface FashionItem {
  id: string;
  brandName: string;
  name: string;
  category: 'Top' | 'Bottom' | 'Outerwear' | 'Shoes' | 'Accessory' | 'Bag';
  colors: string[];
  aestheticTag: VibeStyle;
  price: number; // in VND
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
    open: number; // 0 - 24 (e.g. 7 for 07:00)
    close: number; // 0 - 24 (e.g. 23 for 23:00 or 2 for 02:00 next day)
  };
  signatureDrinkOrDish: string;
  bestPhotoSpot: string;
  imageUrl: string;
  mapsLink: string;
  vibeDescription: string;
}

export interface RuleEngine {
  id: string;
  context: EventContext;
  baseStyle: VibeStyle;
  minimumScore: number;
  missingElement: string;
  recommendationText: string;
}

export interface SessionLog {
  id: string;
  userId?: string;
  uploadedImageUrl?: string;
  context: EventContext;
  fitScore: number;
  styleDetected: VibeStyle;
  weatherContext: WeatherContext;
  timestamp: string;
}

export interface WeatherContext {
  temperature: number; // Celsius
  condition: 'Nắng đẹp' | 'Mưa rào' | 'Mát mẻ' | 'Âm u' | 'Nắng gắt';
  isRaining: boolean;
  currentHour: number; // 0 - 23
  city: string;
}

export interface PhotoboothFrame {
  id: string;
  name: string;
  vibeTag: VibeStyle;
  category: 'Y2K Film' | 'Magazine Cover' | 'Cyberpunk Neon' | 'Dopamine Pop' | 'Vintage Tape';
  aspectRatio: '9:16' | '1:1' | '4:5';
  frameOverlayUrl: string; // PNG transparent
  previewUrl: string;
  stickers: Array<{
    id: string;
    name: string;
    svgOrPngUrl: string;
  }>;
}

// ==========================================
// REQUEST & RESPONSE CONTRACTS
// ==========================================

export interface DripCheckRequest {
  imageUri?: string;
  imageBase64?: string;
  context?: EventContext;
  mockScenario?: 'low_score' | 'high_score' | 'rain_ready' | 'cyberpunk';
  userNotes?: string;
  language?: 'en' | 'vi';
}

export interface OutfitBreakdown {
  dominantColors: string[];
  detectedStyle: VibeStyle;
  detectedItems: string[];
  harmonyScore: number; // 0 - 100
  vibeMatchScore: number; // 0 - 100
  pros: string[];
  cons: string[];
  styleDirectives?: {
    cyberPop?: string;
    minimalist?: string;
    streetwear?: string;
  };
}

export interface DripCheckResponse {
  score: number; // Total score (0 - 100)
  isPassing: boolean; // >= 70
  breakdown: OutfitBreakdown;
  lumiComment: string;
  suggestedAlternatives: FashionItem[];
  suggestedAccessories: FashionItem[];
  weatherSnapshot: WeatherContext;
  sessionId: string;
}

export interface PlaceRecommendationRequest {
  aestheticTag: VibeStyle;
  context?: EventContext;
  weather?: Partial<WeatherContext>;
  userLocation?: {
    lat: number;
    lng: number;
  };
  limit?: number;
}

export interface PlaceRecommendationResponse {
  weather: WeatherContext;
  aestheticTag: VibeStyle;
  recommendedPlaces: Array<
    Location & {
      matchScore: number; // 0 - 100
      matchReason: string;
    }
  >;
  lumiSuggestion: string;
}

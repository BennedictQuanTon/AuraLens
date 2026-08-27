import {
  Location,
  PlaceRecommendationRequest,
  PlaceRecommendationResponse,
  VibeStyle,
  WeatherContext,
} from '../types/entityGraph.js';
import { MOCK_LOCATIONS } from '../data/mockLocations.js';

export class LocationService {
  /**
   * Helper to check if a location is currently open given its openHours and current hour of the day.
   */
  public isLocationOpen(openHours: { open: number; close: number }, currentHour: number): boolean {
    const { open, close } = openHours;
    if (open === 0 && close === 24) {
      return true; // 24/7
    }
    if (close > open) {
      // Standard daytime hours (e.g. 8:00 to 22:00)
      return currentHour >= open && currentHour < close;
    } else {
      // Overnight hours across midnight (e.g. 18:00 to 2:00)
      return currentHour >= open || currentHour < close;
    }
  }

  /**
   * Retrieves weather-aware & time-filtered F&B recommendations from the Entity Graph.
   */
  public recommendPlaces(request: PlaceRecommendationRequest): PlaceRecommendationResponse {
    const { aestheticTag, weather: inputWeather, limit = 6 } = request;

    // Resolve or default weather context
    const currentHour = inputWeather?.currentHour ?? new Date().getHours();
    const isRaining = inputWeather?.isRaining ?? false;
    const weather: WeatherContext = {
      temperature: inputWeather?.temperature ?? (isRaining ? 26 : 31),
      condition: isRaining ? 'Mưa rào' : 'Nắng đẹp',
      isRaining,
      currentHour,
      city: 'Hồ Chí Minh',
    };

    // 1. FILTER: Weather (If raining, strictly only indoor places)
    let candidatePlaces = MOCK_LOCATIONS.filter((place) => {
      if (weather.isRaining && !place.isIndoor) {
        return false; // Eliminate outdoor/rooftop places when raining
      }
      return true;
    });

    // 2. FILTER: Open Hours (Must be currently open)
    candidatePlaces = candidatePlaces.filter((place) =>
      this.isLocationOpen(place.openHours, weather.currentHour)
    );

    const isEn = request.language === 'en';

    // 3. SCORE & RANK by Aesthetic Match
    const rankedPlaces = candidatePlaces.map((place) => {
      let matchScore = 75;
      let matchReason = '';

      if (place.aestheticTag === aestheticTag) {
        matchScore = 96;
        matchReason = isEn
          ? `100% matched with ${aestheticTag} aesthetics, harmonizing perfectly with your outfit aura.`
          : `Không gian chuẩn ${aestheticTag} 100%, cực kỳ tương đồng với vibe outfit của bạn.`;
      } else {
        // Cross-style affinity
        const relatedAesthetics: Record<VibeStyle, VibeStyle[]> = {
          'Y2K': ['Cyber-Pop', 'Vintage', 'Streetwear'],
          'Cyber-Pop': ['Y2K', 'Streetwear', 'Goth-Chic'],
          'Streetwear': ['Cyber-Pop', 'Minimalist', 'Y2K'],
          'Minimalist': ['Clean-Fit', 'Vintage', 'Old Money'],
          'Vintage': ['Minimalist', 'Old Money', 'Y2K'],
          'Goth-Chic': ['Cyber-Pop', 'Streetwear'],
          'Old Money': ['Clean-Fit', 'Minimalist', 'Vintage'],
          'Clean-Fit': ['Minimalist', 'Old Money', 'Vintage'],
        };

        const isCompatible = relatedAesthetics[aestheticTag]?.includes(place.aestheticTag);
        if (isCompatible) {
          matchScore = 86;
          matchReason = isEn
            ? `${place.aestheticTag} environment creates an artistic contrast with your look.`
            : `Không gian phong cách ${place.aestheticTag} tạo nên sự tương phản nghệ thuật với đồ của bạn.`;
        } else {
          matchScore = 72;
          matchReason = isEn
            ? `Beautiful ambiance with great natural lighting for photos.`
            : `Địa điểm đẹp, ánh sáng tự nhiên lý tưởng cho mọi góc chụp.`;
        }
      }

      // Add extra reason if indoor during rain
      if (weather.isRaining && place.isIndoor) {
        matchReason += isEn
          ? ' (Full indoor AC, stay safe and dry).'
          : ' (Có máy lạnh không gian kín, không lo ướt đồ).';
      }

      const localizedPlace: Location = {
        id: place.id,
        name: isEn ? (place.nameEn || place.name) : place.name,
        type: place.type,
        aestheticTag: place.aestheticTag,
        gps: {
          lat: place.gps.lat,
          lng: place.gps.lng,
          district: isEn ? (place.districtEn || place.gps.district) : place.gps.district,
        },
        address: isEn ? (place.addressEn || place.address) : place.address,
        isIndoor: place.isIndoor,
        openHours: place.openHours,
        signatureDrinkOrDish: isEn
          ? (place.signatureDrinkOrDishEn || place.signatureDrinkOrDish)
          : place.signatureDrinkOrDish,
        bestPhotoSpot: isEn
          ? (place.bestPhotoSpotEn || place.bestPhotoSpot)
          : place.bestPhotoSpot,
        imageUrl: place.imageUrl,
        mapsLink: place.mapsLink,
        vibeDescription: isEn
          ? (place.vibeDescriptionEn || place.vibeDescription)
          : place.vibeDescription,
        matchScore,
        matchReason,
      };

      return localizedPlace;
    });

    // Sort descending by match score
    rankedPlaces.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    const recommendedPlaces = rankedPlaces.slice(0, limit);

    // 4. GENERATE LUMI PERSONA COMMENTARY
    let lumiSuggestion = '';
    const topPlace = recommendedPlaces[0];

    if (isEn) {
      if (weather.isRaining) {
        lumiSuggestion = `It is raining in Saigon (${weather.temperature}°C)! Lumi pre-filtered cozy indoor spots with full AC. Rocking that ${aestheticTag} fit at ${
          topPlace ? topPlace.name : 'the cafe'
        } and snapping at "${topPlace ? topPlace.bestPhotoSpot : 'the photo spot'}" will look absolute fire!`;
      } else {
        lumiSuggestion = `Gorgeous sunny weather today (${weather.temperature}°C)! This ${aestheticTag} outfit is begging for a trip to ${
          topPlace ? topPlace.name : 'our recommended spot'
        } to sip on "${topPlace ? topPlace.signatureDrinkOrDish : 'their signature drink'}"!`;
      }
    } else {
      if (weather.isRaining) {
        lumiSuggestion = `Trời Sài Gòn đang đổ mưa (${weather.temperature}°C) nên Lumi đã lọc sẵn toàn bộ quán trong nhà có máy lạnh mát rượi cho bà rồi nè! Diện đồ ${aestheticTag} thì phi ngay qua ${
          topPlace ? topPlace.name : 'quán cafe'
        }, chụp góc "${topPlace ? topPlace.bestPhotoSpot : 'sống ảo'}" bao nghệ luôn!`;
      } else {
        lumiSuggestion = `Thời tiết hôm nay nắng ráo siêu đẹp (${weather.temperature}°C)! Set đồ ${aestheticTag} này mà ghé ${
          topPlace ? topPlace.name : 'địa điểm đề xuất'
        } uống "${topPlace ? topPlace.signatureDrinkOrDish : 'nước ngon'}" và check-in thì đảm bảo cháy máy!`;
      }
    }

    return {
      weather,
      aestheticTag,
      recommendedPlaces,
      lumiSuggestion,
    };
  }
}

export const locationService = new LocationService();

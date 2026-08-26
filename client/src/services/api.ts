import type {
  AIMapAnalysisRequest,
  AIMapAnalysisResponse,
  AITemplateRequest,
  AITemplateResponse,
  DripCheckRequest,
  DripCheckResponse,
  FashionItem,
  PhotoboothFrame,
  PlaceRecommendationResponse,
  VibeStyle,
  WeatherContext,
} from '../types/entityGraph.js';

const API_BASE_URL = '/api/v1';

export class ApiService {
  /**
   * Evaluates outfit via backend API or fallback mock
   */
  public async dripCheck(request: DripCheckRequest): Promise<DripCheckResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Backend API unavailable, using client fallback engine:', error);
    }

    // Fallback Client Simulation
    return this.fallbackDripCheck(request);
  }

  /**
   * Recommends places via backend API or fallback mock
   */
  public async recommendPlaces(
    aestheticTag: VibeStyle,
    weather?: Partial<WeatherContext>
  ): Promise<PlaceRecommendationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/recommend-places`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aestheticTag, weather }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Backend API unavailable, using client fallback engine:', error);
    }

    return this.fallbackRecommendPlaces(aestheticTag, weather);
  }

  /**
   * Gets all Local Brand items
   */
  public async getBrandItems(): Promise<FashionItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/brands/items`);
      if (response.ok) {
        const data = await response.json();
        return data.items;
      }
    } catch (error) {
      console.warn('Could not fetch brand items:', error);
    }
    return [];
  }

  /**
   * Gets Photobooth frames
   */
  public async getPhotoboothFrames(): Promise<PhotoboothFrame[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/photobooth/frames`);
      if (response.ok) {
        const data = await response.json();
        return data.frames;
      }
    } catch (error) {
      console.warn('Could not fetch frames:', error);
    }
    return [];
  }

  /**
   * Generates a complete AI Photobooth Template from natural language prompt with Gemini
   */
  public async generateAITemplate(request: AITemplateRequest): Promise<AITemplateResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/photobooth/ai-template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Could not generate AI template from server, using client fallback:', error);
    }

    return {
      templateName: request.language === 'en' ? 'Cyber Neon 2026' : 'Cyber Neon Tương Lai',
      vibeTag: 'Cyber-Pop',
      conceptDescription: request.language === 'en' ? 'Futuristic cyber aesthetics' : 'Phong cách tương lai ánh sáng neon',
      recommendedFilter: 'cyber-neon',
      borderStyle: 'cyber-magazine',
      colorPalette: {
        primary: '#FF2E93',
        accent: '#00F5FF',
        text: '#D4FF00',
      },
      headerText: 'NIGHT CITY // 2026',
      headerSub: 'CYBERPOP SPECIAL EDITION',
      footerText: 'FEEL THE AURA // SGN 2026',
      stickers: [
        { display: '⚡ SLAY', name: 'SLAY', x: 80, y: 22, scale: 1.0, isTextBadge: true },
        { display: '🌟', name: 'Star', x: 15, y: 78, scale: 1.2 },
      ],
      customTexts: [
        {
          text: request.language === 'en' ? 'FEEL THE AURA' : 'CHÁY PHỐ 2026',
          x: 50,
          y: 86,
          fontFamily: "'Syne', sans-serif",
          color: '#00F5FF',
          hasGlow: true,
          scale: 1,
        },
      ],
      lumiComment: request.language === 'en'
        ? "Lumi crafted a super sharp Cyberpunk template with laser glow for you!"
        : "Lumi đã phối riêng cho bạn template Cyberpunk ánh neon cực chiến nè!",
    };
  }

  // ==========================================
  // CLIENT FALLBACK DATA GENERATOR
  // ==========================================
  private fallbackDripCheck(request: DripCheckRequest): DripCheckResponse {
    const isLow = request.mockScenario === 'low_score';
    const isCyber = request.mockScenario === 'cyberpunk' || request.context === 'Quẩy bar / Pub đêm';
    const score = isLow ? 58 : isCyber ? 94 : 85;

    const weather: WeatherContext = {
      temperature: 28,
      condition: 'Nắng đẹp',
      isRaining: false,
      currentHour: 19,
      city: 'Hồ Chí Minh',
    };

    return {
      score,
      isPassing: score >= 70,
      breakdown: {
        dominantColors: isLow ? ['Xám Nhạt', 'Trắng'] : ['Bạc Metallic', 'Đen Midnight', 'Xanh Neon'],
        detectedStyle: isLow ? 'Clean-Fit' : isCyber ? 'Cyber-Pop' : 'Streetwear',
        detectedItems: isLow
          ? ['Áo thun cotton', 'Quần đùi basic']
          : ['Áo khoác phản quang 3M', 'Quần cargo dù', 'Kính râm matrix'],
        harmonyScore: score + 2,
        vibeMatchScore: score,
        pros: isLow
          ? ['Màu sắc cơ bản, thoải mái.']
          : ['Tỉ lệ phối đồ cực chuẩn, điểm nhấn phản quang bắt sáng.'],
        cons: isLow
          ? ['Thiếu layer định hình, form dáng xuề xòa cho buổi đi chơi.']
          : ['Có thể thêm nhẫn bạc hoặc vòng cổ dây xích.'],
      },
      lumiComment: isLow
        ? `Trời ơi bà ơi! Mặc thế này đi "${request.context}" là hơi bị "tàng hình" giữa đám đông nha! Khoác thêm em Blazer hoặc đổi áo ống của Local Brand là lên 90 điểm liền!`
        : `10 điểm không có nhưng! Set đồ này cháy hết nước chấm luôn bà ơi, chuẩn vibe cho buổi "${request.context}". Phi ngay ra quán sống ảo chụp 8000 bức ảnh up Story nào!`,
      suggestedAlternatives: [
        {
          id: 'brand-01',
          brandName: 'LIDER Closet',
          name: 'Cyber Structured Blazer',
          category: 'Outerwear',
          colors: ['Đen Midnight', 'Xám Bạc'],
          aestheticTag: 'Cyber-Pop',
          price: 890000,
          imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
          buyLink: 'https://lider.vn',
          description: 'Blazer dáng boxy phom rộng với đường may sắc nét, viền phản quang.',
          sustainabilityTag: 'Local-Crafted',
        },
        {
          id: 'brand-02',
          brandName: 'She By Shj',
          name: 'Acid Silver Tube Top',
          category: 'Top',
          colors: ['Bạc Metallic'],
          aestheticTag: 'Y2K',
          price: 380000,
          imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
          buyLink: 'https://shebyshj.com',
          description: 'Vải thun gân nhũ hologram bắt sáng.',
          sustainabilityTag: 'Local-Crafted',
        },
      ],
      suggestedAccessories: [
        {
          id: 'brand-04',
          brandName: 'Hades Studio',
          name: 'Neon Matrix Oval Sunglasses',
          category: 'Accessory',
          colors: ['Xanh Neon', 'Đen'],
          aestheticTag: 'Cyber-Pop',
          price: 320000,
          imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
          buyLink: 'https://hades.vn',
          description: 'Tròng kính UV400 tráng gương 7 màu.',
          sustainabilityTag: 'Eco-Friendly',
        },
      ],
      weatherSnapshot: weather,
      sessionId: `session_${Date.now()}`,
    };
  }

  private fallbackRecommendPlaces(
    aestheticTag: VibeStyle,
    weatherInput?: Partial<WeatherContext>
  ): PlaceRecommendationResponse {
    const isRaining = weatherInput?.isRaining ?? false;
    const weather: WeatherContext = {
      temperature: isRaining ? 26 : 30,
      condition: isRaining ? 'Mưa rào' : 'Nắng đẹp',
      isRaining,
      currentHour: weatherInput?.currentHour ?? 19,
      city: 'Hồ Chí Minh',
    };

    return {
      weather,
      aestheticTag,
      recommendedPlaces: [
        {
          id: 'loc-01',
          name: 'Danshari Coffee (Trần Quý Khoách)',
          type: 'Cafe',
          aestheticTag: 'Minimalist',
          gps: { lat: 10.7915, lng: 106.6908, district: 'Quận 1' },
          address: '156B Trần Quý Khoách, P. Tân Định, Quận 1, TP.HCM',
          isIndoor: true,
          openHours: { open: 8, close: 22 },
          signatureDrinkOrDish: 'Kyoto Matcha Latte & Houjicha Basque Cheesecake',
          bestPhotoSpot: 'Bậc thang xi măng tối giản và vách kính lấy sáng tự nhiên tầng lửng',
          imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
          mapsLink: 'https://maps.google.com/?q=Danshari+Coffee+Tran+Quy+Khoach',
          vibeDescription: 'Tone màu xám xi măng, đá mài phong cách Wabi-Sabi.',
          matchScore: 96,
          matchReason: `Không gian chuẩn ${aestheticTag}, cực kỳ tương đồng với vibe outfit của bạn.`,
        },
        {
          id: 'loc-06',
          name: 'Neo Saigon Cyber Bar & Speakeasy',
          type: 'Pub',
          aestheticTag: 'Cyber-Pop',
          gps: { lat: 10.7688, lng: 106.6947, district: 'Quận 1' },
          address: '39 Pasteur, P. Nguyễn Thái Bình, Quận 1, TP.HCM',
          isIndoor: true,
          openHours: { open: 18, close: 2 },
          signatureDrinkOrDish: 'Neon Glitch Gin Tonic & Smoked Whiskey Sour',
          bestPhotoSpot: 'Đường hầm đèn LED RGB vô cực và quầy bar hologram',
          imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop&q=80',
          mapsLink: 'https://maps.google.com/?q=Neo+Saigon+Cyber+Bar+Pasteur',
          vibeDescription: 'Không gian Cyberpunk độc nhất với hệ thống ánh sáng tím neon.',
          matchScore: 92,
          matchReason: 'Ánh sáng neon làm nổi bật chất liệu phản quang và phụ kiện kim loại.',
        },
      ],
      lumiSuggestion: isRaining
        ? `Trời đang mưa (${weather.temperature}°C) nên Lumi lọc toàn bộ quán trong nhà có máy lạnh mát rượi cho bà rồi nhé! Ghé ngay Danshari Coffee chụp ảnh bao nghệ luôn!`
        : `Thời tiết nắng đẹp (${weather.temperature}°C), diện đồ này ghé quán check-in thì đảm bảo cháy máy!`,
    };
  }

  /**
   * Generates AI Weather + Outfit + Destination Report with Gemini
   */
  public async analyzeMapAI(request: AIMapAnalysisRequest): Promise<AIMapAnalysisResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/map/ai-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Could not call /map/ai-analyze:', error);
    }

    const isEn = request.language === 'en';
    const tag = request.aestheticTag;
    return isEn
      ? {
          weatherSummary: `Saigon is sunny & clear at 29°C with pleasant dry breeze. Perfect for rooftop & outdoor photo spots!`,
          outfitAdvice: `Rock a ${tag} layered outfit: breathable oversize blazer or crop top paired with metallic accessories and sunglasses for night glow.`,
          destinationRec: `Head over to Neo Saigon Cyber Bar or Sunset Rooftop for cinematic neon backdrops matching your outfit!`,
          lumiComment: `Lumi says: Your ${tag} fit is going to turn heads today! Don't forget to snap some fire photobooth shots!`,
          curatedSpots: ['Neo Saigon Cyber Bar', 'Sunset Rooftop Lounge', 'Blank Lounge Landmark 81'],
        }
      : {
          weatherSummary: `Sài Gòn hiện tại 29°C mát mẻ và khô ráo. Ánh sáng vàng cực chuẩn để săn ảnh sống ảo!`,
          outfitAdvice: `Nên chọn set đồ ${tag}: áo blazer dáng rộng phối croptop hoặc phụ kiện bạc titan phản quang để bắt trọn ánh sáng đêm.`,
          destinationRec: `Ghé ngay Neo Saigon Cyber Bar hoặc Sunset Rooftop – không gian tone-sur-tone cực kỳ ăn khớp với outfit của bạn!`,
          lumiComment: `Lumi chấm điểm 10/10 cho buổi đi chơi hôm nay! Set đồ này lên hình ở rooftop là bao cháy máy luôn nha!`,
          curatedSpots: ['Neo Saigon Cyber Bar', 'Sunset Rooftop Lounge', 'Blank Lounge Landmark 81'],
        };
  }
}

export const apiService = new ApiService();


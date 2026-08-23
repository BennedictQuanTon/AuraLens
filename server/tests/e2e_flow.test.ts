import { describe, it, expect } from 'vitest';
import { visionService } from '../src/services/visionService.js';
import { locationService } from '../src/services/locationService.js';
import { stylistService } from '../src/services/stylistService.js';
import { MOCK_PHOTOBOOTH_FRAMES } from '../src/data/mockPhotoboothFrames.js';
import { WeatherContext } from '../src/types/entityGraph.js';

describe('COMPETITION TEST CASES (TC01 -> TC05) E2E VERIFICATION', () => {
  const baseWeather: WeatherContext = {
    temperature: 29,
    condition: 'Nắng đẹp',
    isRaining: false,
    currentHour: 19,
    city: 'Hồ Chí Minh',
  };

  /**
   * TC01: Fit Check - Low Score (<70)
   * Input: Sloppy everyday outfit, Context: "Hẹn hò"
   * Expected: Score < 70, Lumi witty critique, Local Brand alternatives suggested.
   */
  it('TC01 — Fit Check: Low score (<70) should suggest Local Brand alternatives', async () => {
    const response = await visionService.analyzeOutfit(
      {
        context: 'Hẹn hò',
        mockScenario: 'low_score',
      },
      baseWeather
    );

    expect(response.score).toBeLessThan(70);
    expect(response.isPassing).toBe(false);
    expect(response.lumiComment).toContain('bà ơi');
    expect(response.suggestedAlternatives.length).toBeGreaterThanOrEqual(1);

    // Verify alternative items are valid fashion items
    const firstAlt = response.suggestedAlternatives[0];
    expect(firstAlt.brandName).toBeDefined();
    expect(firstAlt.price).toBeGreaterThan(0);
    expect(firstAlt.buyLink).toBeDefined();
  });

  /**
   * TC02: Fit Check - High Score (>=70)
   * Input: Cyberpunk / Y2K stylish outfit, Context: "Quẩy bar / Pub đêm"
   * Expected: Score > 85, Lumi praises "cháy", suggested accessories returned, unlock places.
   */
  it('TC02 — Fit Check: High score (>=70) should praise and suggest accessories', async () => {
    const response = await visionService.analyzeOutfit(
      {
        context: 'Quẩy bar / Pub đêm',
        mockScenario: 'cyberpunk',
      },
      baseWeather
    );

    expect(response.score).toBeGreaterThanOrEqual(70);
    expect(response.isPassing).toBe(true);
    expect(response.breakdown.detectedStyle).toBe('Cyber-Pop');
    expect(response.lumiComment).toContain('cháy');
    expect(response.suggestedAccessories.length).toBeGreaterThanOrEqual(1);
  });

  /**
   * TC03: Weather Awareness (Rain scenario)
   * Input: Vibe "Minimalist", Time: 19h00, Weather: "Mưa rào", isRaining: true
   * Expected: 100% of recommended places MUST have isIndoor === true (Strictly no outdoor rooftops).
   */
  it('TC03 — Weather Grounding: Rain scenario should strictly filter 100% indoor places', () => {
    const response = locationService.recommendPlaces({
      aestheticTag: 'Minimalist',
      weather: {
        isRaining: true,
        currentHour: 19,
        temperature: 25,
      },
    });

    expect(response.recommendedPlaces.length).toBeGreaterThan(0);
    expect(response.weather.isRaining).toBe(true);

    // Strict Grounding check: Every single returned place must be indoor
    response.recommendedPlaces.forEach((place) => {
      expect(place.isIndoor).toBe(true);
    });

    expect(response.lumiSuggestion).toContain('mưa');
  });

  /**
   * TC04: Time Awareness (Late night 23:30)
   * Input: Time: 23h, Vibe: "Streetwear"
   * Expected: Only venues open past midnight are returned.
   */
  it('TC04 — Time Grounding: Late night query should only return venues open late', () => {
    const response = locationService.recommendPlaces({
      aestheticTag: 'Streetwear',
      weather: {
        isRaining: false,
        currentHour: 23,
      },
    });

    expect(response.recommendedPlaces.length).toBeGreaterThan(0);
    response.recommendedPlaces.forEach((place) => {
      const isOpen = locationService.isLocationOpen(place.openHours, 23);
      expect(isOpen).toBe(true);
    });
  });

  /**
   * TC05: Photobooth Asset Contract & Frames
   * Input: Available Photobooth frames
   * Expected: At least 6 frames with 9:16 aspect ratio, valid overlay paths, and preview URLs.
   */
  it('TC05 — Photobooth Frames Contract: Should have 6 high-res frames with 9:16 ratio', () => {
    expect(MOCK_PHOTOBOOTH_FRAMES.length).toBe(6);
    MOCK_PHOTOBOOTH_FRAMES.forEach((frame) => {
      expect(frame.aspectRatio).toBe('9:16');
      expect(frame.frameOverlayUrl).toContain('.svg');
      expect(frame.previewUrl).toBeDefined();
      expect(frame.vibeTag).toBeDefined();
    });
  });
});

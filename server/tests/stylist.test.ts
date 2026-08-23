import { describe, it, expect } from 'vitest';
import { stylistService } from '../src/services/stylistService.js';
import { WeatherContext } from '../src/types/entityGraph.js';

const mockWeather: WeatherContext = {
  temperature: 28,
  condition: 'Nắng đẹp',
  isRaining: false,
  currentHour: 19,
  city: 'Hồ Chí Minh',
};

describe('StylistService Unit Tests', () => {
  it('should return a score < 70 and alternative items for low_score scenario', () => {
    const result = stylistService.evaluateOutfit({
      detectedStyle: 'Clean-Fit',
      dominantColors: ['Xám', 'Trắng'],
      detectedItems: ['Áo thun cũ', 'Quần đùi thun'],
      context: 'Hẹn hò',
      weatherSnapshot: mockWeather,
      mockScenario: 'low_score',
    });

    expect(result.score).toBeLessThan(70);
    expect(result.isPassing).toBe(false);
    expect(result.suggestedAlternatives.length).toBeGreaterThan(0);
    expect(result.lumiComment).toContain('bà ơi');
    expect(result.breakdown.cons.length).toBeGreaterThan(0);
  });

  it('should return a score >= 70 and accessories for high_score scenario', () => {
    const result = stylistService.evaluateOutfit({
      detectedStyle: 'Cyber-Pop',
      dominantColors: ['Bạc Metallic', 'Đen Midnight', 'Xanh Laser'],
      detectedItems: ['Áo khoác phản quang', 'Quần cargo dù', 'Kính matrix'],
      context: 'Quẩy bar / Pub đêm',
      weatherSnapshot: mockWeather,
      mockScenario: 'high_score',
    });

    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.isPassing).toBe(true);
    expect(result.suggestedAccessories.length).toBeGreaterThan(0);
    expect(result.lumiComment).toContain('cháy');
  });

  it('should calculate dynamic score based on context compatibility', () => {
    // Matching style for Dating: Minimalist
    const resultMatching = stylistService.evaluateOutfit({
      detectedStyle: 'Minimalist',
      dominantColors: ['Đen', 'Trắng Kem'],
      detectedItems: ['Áo cổ lọ', 'Quần tây ống suông', 'Giày da'],
      context: 'Hẹn hò',
      weatherSnapshot: mockWeather,
    });

    expect(resultMatching.score).toBeGreaterThanOrEqual(75);
    expect(resultMatching.isPassing).toBe(true);
  });
});

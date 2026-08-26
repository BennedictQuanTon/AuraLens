import { describe, it, expect } from 'vitest';
import { visionService } from '../src/services/visionService.js';
import { locationService } from '../src/services/locationService.js';
import { MOCK_FASHION_ITEMS } from '../src/data/mockBrands.js';
import { MOCK_PHOTOBOOTH_FRAMES } from '../src/data/mockPhotoboothFrames.js';

describe('Entity Graph & API Data Integrity Tests', () => {
  it('should have at least 20 local brand fashion items with all required fields', () => {
    expect(MOCK_FASHION_ITEMS.length).toBeGreaterThanOrEqual(20);
    MOCK_FASHION_ITEMS.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.brandName).toBeDefined();
      expect(item.price).toBeGreaterThan(0);
      expect(item.aestheticTag).toBeDefined();
      expect(item.buyLink).toBeDefined();
      expect(item.imageUrl).toBeDefined();
    });
  });

  it('should have at least 6 photobooth frames with stickers', () => {
    expect(MOCK_PHOTOBOOTH_FRAMES.length).toBeGreaterThanOrEqual(6);
    MOCK_PHOTOBOOTH_FRAMES.forEach((frame) => {
      expect(frame.id).toBeDefined();
      expect(frame.name).toBeDefined();
      expect(frame.vibeTag).toBeDefined();
      expect(frame.stickers.length).toBeGreaterThan(0);
    });
  });

  it('should process full drip-check flow end-to-end via visionService', async () => {
    const response = await visionService.analyzeOutfit(
      {
        context: 'Cafe sống ảo',
        mockScenario: 'cyberpunk',
      },
      {
        temperature: 29,
        condition: 'Nắng đẹp',
        isRaining: false,
        currentHour: 15,
        city: 'Hồ Chí Minh',
      }
    );

    expect(response.score).toBeGreaterThan(90);
    expect(response.breakdown.detectedStyle).toBe('Cyber-Pop');
    expect(response.suggestedAccessories.length).toBeGreaterThan(0);
    expect(response.sessionId).toBeDefined();
  });

  it('should process recommend-places flow end-to-end via locationService', () => {
    const response = locationService.recommendPlaces({
      aestheticTag: 'Y2K',
      weather: { isRaining: false, currentHour: 16 },
    });

    expect(response.recommendedPlaces.length).toBeGreaterThan(0);
    expect(response.lumiSuggestion).toBeDefined();
    expect(response.weather.city).toBe('Hồ Chí Minh');
  });

  it('should generate complete photobooth template from natural language prompt', async () => {
    const { aiTemplateService } = await import('../src/services/aiTemplateService.js');
    const template = await aiTemplateService.generateTemplate({
      prompt: 'Cyberpunk Y2K neon purple with Slay tag',
      language: 'vi',
      aspectRatio: '9:16',
    });

    expect(template.templateName).toBeDefined();
    expect(template.recommendedFilter).toBeDefined();
    expect(template.borderStyle).toBeDefined();
    expect(template.stickers.length).toBeGreaterThan(0);
    expect(template.lumiComment).toBeDefined();
  });
});


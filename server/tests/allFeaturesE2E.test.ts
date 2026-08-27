import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import http from 'http';
import { app } from '../src/app.js';
import { rateLimiter } from '../src/middleware/rateLimiter.js';
import { MOCK_FASHION_ITEMS } from '../src/data/mockBrands.js';
import { MOCK_PHOTOBOOTH_FRAMES } from '../src/data/mockPhotoboothFrames.js';

let server: http.Server;
let baseUrl: string;

describe('Complete All-Features End-to-End System Test Suite', () => {
  beforeAll(async () => {
    await new Promise<void>((resolve) => {
      server = http.createServer(app).listen(0, () => {
        const addr = server.address();
        if (typeof addr === 'object' && addr) {
          baseUrl = `http://localhost:${addr.port}`;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(() => {
    rateLimiter.resetForTesting();
  });

  // -------------------------------------------------------------
  // 1. HEALTH & SYSTEM ROOT
  // -------------------------------------------------------------
  it('Feature 1: System Health & Root Documentation Endpoints', async () => {
    const rootRes = await fetch(`${baseUrl}/`);
    expect(rootRes.status).toBe(200);
    const rootData = (await rootRes.json()) as any;
    expect(rootData.version).toBe('1.0.0');

    const healthRes = await fetch(`${baseUrl}/api/v1/health`);
    expect(healthRes.status).toBe(200);
    const healthData = (await healthRes.json()) as any;
    expect(healthData.status).toBe('healthy');
    expect(healthData.service).toContain('AuraLens');
  });

  // -------------------------------------------------------------
  // 2. LIVE DRIP CHECK & VISION STYLIST (Bilingual & Scenarios)
  // -------------------------------------------------------------
  describe('Feature 2: Live Drip Check & Multimodal Vision Stylist', () => {
    it('should evaluate High-Score outfit in Vietnamese', async () => {
      const res = await fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'feat_test_user_vi' },
        body: JSON.stringify({
          context: 'Cafe sống ảo',
          mockScenario: 'high_score',
          language: 'vi',
        }),
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.score).toBeGreaterThanOrEqual(70);
      expect(data.isPassing).toBe(true);
      expect(data.breakdown.dominantColors.length).toBeGreaterThan(0);
      expect(data.breakdown.detectedItems.length).toBeGreaterThan(0);
      expect(data.breakdown.pros.length).toBeGreaterThan(0);
      expect(data.suggestedAccessories.length).toBeGreaterThan(0);
      expect(data.lumiComment).toBeDefined();
    });

    it('should evaluate Cyberpunk Nightlife outfit in English', async () => {
      const res = await fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'feat_test_user_en' },
        body: JSON.stringify({
          context: 'Quẩy bar / Pub đêm',
          mockScenario: 'cyberpunk',
          language: 'en',
        }),
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.score).toBeGreaterThan(90);
      expect(data.breakdown.detectedStyle).toBe('Cyber-Pop');
      expect(data.weatherSnapshot.city).toBe('Hồ Chí Minh');
    });

    it('should evaluate Low-Score outfit with constructive fashion pillars breakdown', async () => {
      const res = await fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'feat_test_user_low' },
        body: JSON.stringify({
          context: 'Đi học / Đi làm năng động',
          mockScenario: 'low_score',
          language: 'vi',
        }),
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.score).toBeLessThan(70);
      expect(data.isPassing).toBe(false);
      expect(data.breakdown.cons.length).toBeGreaterThan(0);
    });
  });

  // -------------------------------------------------------------
  // 3. VIBE MAP & WEATHER-AWARE RECOMMENDATIONS
  // -------------------------------------------------------------
  describe('Feature 3: Aura Experience Map & Dynamic Spot Recommendations', () => {
    it('should recommend open cafes for Y2K style in sunny weather', async () => {
      const res = await fetch(`${baseUrl}/api/v1/recommend-places`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'map_tester_1' },
        body: JSON.stringify({
          aestheticTag: 'Y2K',
          weather: { temperature: 31, isRaining: false, currentHour: 15 },
          language: 'vi',
        }),
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.recommendedPlaces.length).toBeGreaterThan(0);
      expect(data.lumiSuggestion).toBeDefined();

      // Check first recommendation has coordinates and metadata
      const topPlace = data.recommendedPlaces[0];
      expect(topPlace.name).toBeDefined();
      expect(topPlace.gps.lat).toBeDefined();
      expect(topPlace.gps.lng).toBeDefined();
      expect(topPlace.matchScore).toBeGreaterThanOrEqual(70);
    });

    it('should prioritize indoor AC venues when raining in Saigon', async () => {
      const res = await fetch(`${baseUrl}/api/v1/recommend-places`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'map_tester_rain' },
        body: JSON.stringify({
          aestheticTag: 'Minimalist',
          weather: { temperature: 24, isRaining: true, condition: 'Mưa rào', currentHour: 19 },
          language: 'en',
        }),
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.weather.isRaining).toBe(true);
      expect(data.recommendedPlaces.length).toBeGreaterThan(0);
      // All returned spots during rain must be indoor
      data.recommendedPlaces.forEach((place: any) => {
        expect(place.isIndoor).toBe(true);
      });
    });

    it('should perform AI Map Weather Analysis (fallback/online)', async () => {
      const res = await fetch(`${baseUrl}/api/v1/map/ai-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'map_ai_user' },
        body: JSON.stringify({
          aestheticTag: 'Cyber-Pop',
          weather: { temperature: 29, isRaining: false },
          language: 'en',
        }),
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.weatherBullets.length).toBeGreaterThan(0);
      expect(data.outfitBullets.length).toBeGreaterThan(0);
      expect(data.destinationBullets.length).toBeGreaterThan(0);
      expect(data.lumiComment).toBeDefined();
    });
  });

  // -------------------------------------------------------------
  // 4. LOCAL BRAND ENTITY GRAPH
  // -------------------------------------------------------------
  describe('Feature 4: Local Brand Entity Graph & Sustainable Fashion Catalog', () => {
    it('should retrieve all local brand items with complete pricing & buy links', async () => {
      const res = await fetch(`${baseUrl}/api/v1/brands/items`);
      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.total).toBe(MOCK_FASHION_ITEMS.length);
      expect(data.items.length).toBeGreaterThanOrEqual(20);

      data.items.forEach((item: any) => {
        expect(item.id).toBeDefined();
        expect(item.brandName).toBeDefined();
        expect(item.price).toBeGreaterThan(0);
        expect(item.buyLink).toMatch(/^https?:\/\//);
        expect(item.imageUrl).toBeDefined();
      });
    });
  });

  // -------------------------------------------------------------
  // 5. AURA PHOTOBOOTH & AI TEMPLATE GENERATOR
  // -------------------------------------------------------------
  describe('Feature 5: Photobooth Frames & AI Template Generator', () => {
    it('should retrieve standard photobooth frames and stickers', async () => {
      const res = await fetch(`${baseUrl}/api/v1/photobooth/frames`);
      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.total).toBe(MOCK_PHOTOBOOTH_FRAMES.length);
      expect(data.frames.length).toBeGreaterThanOrEqual(6);
    });

    it('should generate custom AI Photobooth template from text prompt', async () => {
      const res = await fetch(`${baseUrl}/api/v1/photobooth/ai-template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'photobooth_ai_user' },
        body: JSON.stringify({
          prompt: 'Dopamine bright orange y2k magazine cover with star stickers',
          aspectRatio: '9:16',
          language: 'vi',
        }),
      });

      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.templateName).toBeDefined();
      expect(data.recommendedFilter).toBeDefined();
      expect(data.colorPalette.primary).toBeDefined();
      expect(data.stickers.length).toBeGreaterThan(0);
      expect(data.lumiComment).toBeDefined();
    });
  });

  // -------------------------------------------------------------
  // 6. MULTI-TIER RATE LIMITING & SECURITY QUOTAS
  // -------------------------------------------------------------
  describe('Feature 6: Security Quota & Rate Limit Protection', () => {
    it('should enforce 3 RPM per user and return 429 on 4th call', async () => {
      const user = 'rl_test_user';
      for (let i = 0; i < 3; i++) {
        const okRes = await fetch(`${baseUrl}/api/v1/drip-check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user },
          body: JSON.stringify({ context: 'Cafe sống ảo' }),
        });
        expect(okRes.status).toBe(200);
      }

      const blockedRes = await fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': user },
        body: JSON.stringify({ context: 'Cafe sống ảo' }),
      });
      expect(blockedRes.status).toBe(429);
      const blockedData = (await blockedRes.json()) as any;
      expect(blockedData.error).toBe('RATE_LIMIT_EXCEEDED');
      expect(blockedData.code).toBe('PER_USER_LIMIT');
    });

    it('should return live stats at /api/v1/stats/quota', async () => {
      const res = await fetch(`${baseUrl}/api/v1/stats/quota`);
      expect(res.status).toBe(200);
      const stats = (await res.json()) as any;
      expect(stats.maxPerUserRpm).toBe(3);
      expect(stats.maxGlobalRpm).toBe(15);
      expect(stats.maxConcurrentUsers).toBe(15);
      expect(stats.maxDailyRequests).toBe(500);
    });
  });
});

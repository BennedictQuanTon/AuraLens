import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import http from 'http';
import { app } from '../src/app.js';
import { rateLimiter } from '../src/middleware/rateLimiter.js';

let server: http.Server;
let baseUrl: string;

describe('Multi-User Concurrency & Session Data Isolation Simulation', () => {
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

  it('1. SIMULTANEOUS EXECUTION: 3 different users call AI endpoints in parallel with zero data leakage/crossover', async () => {
    // 3 Unique users with different devices and styles
    const user1 = {
      deviceId: 'device_user_1_cyber_pop',
      name: 'Lumi Cyber-Pop',
      style: 'Cyber-Pop' as const,
      scenario: 'cyberpunk' as const,
      prompt: 'Cyberpunk Neon Matrix Style with glow stickers',
    };

    const user2 = {
      deviceId: 'device_user_2_vintage',
      name: 'Bennedict Vintage',
      style: 'Vintage' as const,
      scenario: 'high_score' as const,
      prompt: '90s Film grain vintage classic tape magazine',
    };

    const user3 = {
      deviceId: 'device_user_3_minimalist',
      name: 'Sarah Minimalist',
      style: 'Minimalist' as const,
      scenario: 'low_score' as const,
      prompt: 'Clean Vogue Minimalist editorial typography',
    };

    // Parallel calls fired concurrently across all 3 users
    const [u1Drip, u2Drip, u3Drip, u1Places, u2Places, u3Places, u1Photo, u2Photo, u3Photo] =
      await Promise.all([
        // Drip Checks
        fetch(`${baseUrl}/api/v1/drip-check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user1.deviceId },
          body: JSON.stringify({ context: 'Quẩy bar / Pub đêm', mockScenario: user1.scenario }),
        }).then((r) => r.json() as any),

        fetch(`${baseUrl}/api/v1/drip-check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user2.deviceId },
          body: JSON.stringify({ context: 'Cafe sống ảo', mockScenario: user2.scenario }),
        }).then((r) => r.json() as any),

        fetch(`${baseUrl}/api/v1/drip-check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user3.deviceId },
          body: JSON.stringify({ context: 'Đi học / Đi làm năng động', mockScenario: user3.scenario }),
        }).then((r) => r.json() as any),

        // Recommend Places
        fetch(`${baseUrl}/api/v1/recommend-places`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user1.deviceId },
          body: JSON.stringify({ aestheticTag: user1.style, weather: { isRaining: false, currentHour: 20 } }),
        }).then((r) => r.json() as any),

        fetch(`${baseUrl}/api/v1/recommend-places`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user2.deviceId },
          body: JSON.stringify({ aestheticTag: user2.style, weather: { isRaining: false, currentHour: 15 } }),
        }).then((r) => r.json() as any),

        fetch(`${baseUrl}/api/v1/recommend-places`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user3.deviceId },
          body: JSON.stringify({ aestheticTag: user3.style, weather: { isRaining: true, currentHour: 10 } }),
        }).then((r) => r.json() as any),

        // Photobooth AI Templates
        fetch(`${baseUrl}/api/v1/photobooth/ai-template`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user1.deviceId },
          body: JSON.stringify({ prompt: user1.prompt, language: 'en' }),
        }).then((r) => r.json() as any),

        fetch(`${baseUrl}/api/v1/photobooth/ai-template`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user2.deviceId },
          body: JSON.stringify({ prompt: user2.prompt, language: 'vi' }),
        }).then((r) => r.json() as any),

        fetch(`${baseUrl}/api/v1/photobooth/ai-template`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Device-Id': user3.deviceId },
          body: JSON.stringify({ prompt: user3.prompt, language: 'en' }),
        }).then((r) => r.json() as any),
      ]);

    // ============================================================
    // VERIFICATION: Strict Data Integrity & Isolation
    // ============================================================
    
    // User 1: Cyber-Pop checks
    expect(u1Drip.breakdown.detectedStyle).toBe('Cyber-Pop');
    expect(u1Drip.sessionId).toBeDefined();
    expect(u1Places.aestheticTag).toBe('Cyber-Pop');
    expect(u1Places.recommendedPlaces.length).toBeGreaterThan(0);
    expect(u1Photo.templateName).toBeDefined();

    // User 2: Vintage / Streetwear checks
    expect(u2Drip.score).toBeGreaterThan(70);
    expect(u2Places.aestheticTag).toBe('Vintage');
    expect(u2Places.recommendedPlaces.length).toBeGreaterThan(0);
    expect(u2Photo.templateName).toBeDefined();

    // User 3: Minimalist checks (Rain scenario handled)
    expect(u3Drip.score).toBeDefined();
    expect(u3Places.aestheticTag).toBe('Minimalist');
    expect(u3Places.weather.isRaining).toBe(true);
    expect(u3Photo.templateName).toBeDefined();

    // Ensure session IDs across users are completely distinct
    const sessionIds = new Set([u1Drip.sessionId, u2Drip.sessionId, u3Drip.sessionId]);
    expect(sessionIds.size).toBe(3);
  });

  it('2. USER RATE LIMIT ISOLATION: When User 1 reaches 3 calls, User 2 and User 3 can still make calls', async () => {
    const user1 = 'device_user_1_spammer';
    const user2 = 'device_user_2_normal';

    // User 1 makes 3 calls
    for (let i = 0; i < 3; i++) {
      const res = await fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': user1 },
        body: JSON.stringify({ context: 'Cafe sống ảo' }),
      });
      expect(res.status).toBe(200);
    }

    // User 1 makes 4th call -> Blocked with 429
    const blockedRes = await fetch(`${baseUrl}/api/v1/drip-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Device-Id': user1 },
      body: JSON.stringify({ context: 'Cafe sống ảo' }),
    });
    expect(blockedRes.status).toBe(429);
    const blockedBody = (await blockedRes.json()) as any;
    expect(blockedBody.error).toBe('RATE_LIMIT_EXCEEDED');

    // Simultaneously, User 2 makes a call -> NOT blocked (200 OK)
    const normalRes = await fetch(`${baseUrl}/api/v1/drip-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Device-Id': user2 },
      body: JSON.stringify({ context: 'Cafe sống ảo' }),
    });
    expect(normalRes.status).toBe(200);
    expect(normalRes.headers.get('x-ratelimit-remaining-user')).toBe('2');
  });

  it('3. ACTIVE CONCURRENCY TRACKING: Quota endpoint accurately reports active users count', async () => {
    // Generate requests from 3 distinct users
    await Promise.all([
      fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'active_user_A' },
        body: JSON.stringify({ context: 'Cafe sống ảo' }),
      }),
      fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'active_user_B' },
        body: JSON.stringify({ context: 'Cafe sống ảo' }),
      }),
      fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': 'active_user_C' },
        body: JSON.stringify({ context: 'Cafe sống ảo' }),
      }),
    ]);

    const statsRes = await fetch(`${baseUrl}/api/v1/stats/quota`);
    const stats = (await statsRes.json()) as any;

    expect(stats.activeUsers5Min).toBe(3);
    expect(stats.currentGlobalRpm).toBe(3);
    expect(stats.currentDailyCount).toBe(3);
  });
});

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import http from 'http';
import { app } from '../src/app.js';
import { rateLimiter } from '../src/middleware/rateLimiter.js';

let server: http.Server;
let baseUrl: string;

describe('Production Security & Multi-Tier Rate Limiting Suite', () => {
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

  it('1. should return 200 for first 3 requests from a user, and 429 on the 4th request', async () => {
    const testDeviceId = 'test_user_device_999';

    // Request 1: Allowed (Remaining = 2)
    const res1 = await fetch(`${baseUrl}/api/v1/drip-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': testDeviceId,
      },
      body: JSON.stringify({ context: 'Cafe sống ảo' }),
    });
    expect(res1.status).toBe(200);
    expect(res1.headers.get('x-ratelimit-remaining-user')).toBe('2');

    // Request 2: Allowed (Remaining = 1)
    const res2 = await fetch(`${baseUrl}/api/v1/drip-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': testDeviceId,
      },
      body: JSON.stringify({ context: 'Cafe sống ảo' }),
    });
    expect(res2.status).toBe(200);
    expect(res2.headers.get('x-ratelimit-remaining-user')).toBe('1');

    // Request 3: Allowed (Remaining = 0)
    const res3 = await fetch(`${baseUrl}/api/v1/drip-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': testDeviceId,
      },
      body: JSON.stringify({ context: 'Cafe sống ảo' }),
    });
    expect(res3.status).toBe(200);
    expect(res3.headers.get('x-ratelimit-remaining-user')).toBe('0');

    // Request 4: Blocked with HTTP 429 Too Many Requests
    const res4 = await fetch(`${baseUrl}/api/v1/drip-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': testDeviceId,
      },
      body: JSON.stringify({ context: 'Cafe sống ảo' }),
    });
    expect(res4.status).toBe(429);

    const body4 = (await res4.json()) as any;
    expect(body4.error).toBe('RATE_LIMIT_EXCEEDED');
    expect(body4.code).toBe('PER_USER_LIMIT');
    expect(body4.retryAfterSeconds).toBeGreaterThan(0);
    expect(res4.headers.get('retry-after')).toBeDefined();
  });

  it('2. should isolate user limits: User B is NOT blocked when User A hits limit', async () => {
    const userA = 'user_alpha';
    const userB = 'user_beta';

    // Exhaust User A's 3 requests
    for (let i = 0; i < 3; i++) {
      await fetch(`${baseUrl}/api/v1/drip-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': userA },
        body: JSON.stringify({ context: 'Cafe sống ảo' }),
      });
    }

    // 4th call for User A -> 429
    const resA4 = await fetch(`${baseUrl}/api/v1/drip-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Device-Id': userA },
      body: JSON.stringify({ context: 'Cafe sống ảo' }),
    });
    expect(resA4.status).toBe(429);

    // 1st call for User B -> 200 OK (Independent session)
    const resB1 = await fetch(`${baseUrl}/api/v1/drip-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Device-Id': userB },
      body: JSON.stringify({ context: 'Cafe sống ảo' }),
    });
    expect(resB1.status).toBe(200);
  });

  it('3. should provide accurate system quota and metrics at /api/v1/stats/quota', async () => {
    const res = await fetch(`${baseUrl}/api/v1/stats/quota`);
    expect(res.status).toBe(200);
    const stats = (await res.json()) as any;

    expect(stats.maxPerUserRpm).toBe(3);
    expect(stats.maxGlobalRpm).toBe(15);
    expect(stats.maxConcurrentUsers).toBe(15);
    expect(stats.maxDailyRequests).toBe(500);
    expect(typeof stats.currentDailyCount).toBe('number');
  });

  it('4. should include Helmet security headers and CORS protection', async () => {
    const res = await fetch(`${baseUrl}/api/v1/health`);
    expect(res.status).toBe(200);
    // Helmet headers
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
    expect(res.headers.get('x-frame-options')).toBe('SAMEORIGIN');
  });
});

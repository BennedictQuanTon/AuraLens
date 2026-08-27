import { Request, Response, NextFunction } from 'express';

interface UserUsage {
  timestamps: number[];
  lastActive: number;
}

export class MultiTierRateLimiter {
  // Configurable thresholds
  private readonly MAX_PER_USER_RPM = 3;       // 3 calls / min / user
  private readonly MAX_GLOBAL_RPM = 15;         // 15 calls / min global web
  private readonly MAX_CONCURRENT_USERS = 15;   // 15 max concurrent users in 5-min window
  private readonly MAX_DAILY_REQUESTS = 500;    // 500 requests / day

  // In-memory state tracking
  private userBuckets: Map<string, UserUsage> = new Map();
  private globalTimestamps: number[] = [];
  private dailyCount = 0;
  private currentDay = new Date().toISOString().split('T')[0];

  /**
   * Cleans up expired timestamps outside of 60s window
   */
  private cleanTimestamps(timestamps: number[], now: number, windowMs = 60_000): number[] {
    return timestamps.filter((t) => now - t < windowMs);
  }

  /**
   * Resets daily counter if new calendar day
   */
  private checkDailyReset(now: Date) {
    const today = now.toISOString().split('T')[0];
    if (today !== this.currentDay) {
      this.currentDay = today;
      this.dailyCount = 0;
      this.userBuckets.clear();
      console.log(`[RateLimiter] Reset daily quota counter for ${today}`);
    }
  }

  /**
   * Counts active users in the past 5 minutes
   */
  private getActiveUsersCount(now: number): number {
    const fiveMinutesAgo = now - 5 * 60_000;
    let active = 0;
    for (const [, usage] of this.userBuckets.entries()) {
      if (usage.lastActive > fiveMinutesAgo) {
        active++;
      }
    }
    return active;
  }

  /**
   * Get client identifier (Device ID from header or IP address)
   */
  public getClientIdentifier(req: Request): string {
    const deviceId = req.headers['x-device-id'];
    if (typeof deviceId === 'string' && deviceId.trim().length > 0) {
      return deviceId.trim();
    }
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return req.ip || req.socket.remoteAddress || 'unknown-client';
  }

  /**
   * Evaluate request against multi-tier rate limits
   */
  public evaluate(req: Request): {
    allowed: boolean;
    reason?: 'PER_USER_LIMIT' | 'GLOBAL_RPM_LIMIT' | 'MAX_CONCURRENT_USERS' | 'DAILY_QUOTA_EXCEEDED';
    remainingPerUser: number;
    remainingGlobalRpm: number;
    remainingDaily: number;
    activeUsers: number;
    retryAfterSeconds: number;
  } {
    const now = Date.now();
    const nowDate = new Date(now);
    this.checkDailyReset(nowDate);

    const clientId = this.getClientIdentifier(req);

    // 1. Check Global Daily Cap (500/day)
    if (this.dailyCount >= this.MAX_DAILY_REQUESTS) {
      return {
        allowed: false,
        reason: 'DAILY_QUOTA_EXCEEDED',
        remainingPerUser: 0,
        remainingGlobalRpm: 0,
        remainingDaily: 0,
        activeUsers: this.getActiveUsersCount(now),
        retryAfterSeconds: 3600, // Check back next hour/day
      };
    }

    // 2. Check Global RPM (15/min)
    this.globalTimestamps = this.cleanTimestamps(this.globalTimestamps, now);
    if (this.globalTimestamps.length >= this.MAX_GLOBAL_RPM) {
      const oldest = this.globalTimestamps[0];
      const retryAfter = Math.max(1, Math.ceil((60_000 - (now - oldest)) / 1000));
      return {
        allowed: false,
        reason: 'GLOBAL_RPM_LIMIT',
        remainingPerUser: 0,
        remainingGlobalRpm: 0,
        remainingDaily: Math.max(0, this.MAX_DAILY_REQUESTS - this.dailyCount),
        activeUsers: this.getActiveUsersCount(now),
        retryAfterSeconds: retryAfter,
      };
    }

    // 3. Check Concurrent Users (Max 15 users in past 5 min)
    let userUsage = this.userBuckets.get(clientId);
    const isExistingUser = userUsage && now - userUsage.lastActive < 5 * 60_000;
    const currentActiveUsers = this.getActiveUsersCount(now);

    if (!isExistingUser && currentActiveUsers >= this.MAX_CONCURRENT_USERS) {
      return {
        allowed: false,
        reason: 'MAX_CONCURRENT_USERS',
        remainingPerUser: 0,
        remainingGlobalRpm: Math.max(0, this.MAX_GLOBAL_RPM - this.globalTimestamps.length),
        remainingDaily: Math.max(0, this.MAX_DAILY_REQUESTS - this.dailyCount),
        activeUsers: currentActiveUsers,
        retryAfterSeconds: 30,
      };
    }

    // 4. Check Per-User Limit (3/min)
    if (!userUsage) {
      userUsage = { timestamps: [], lastActive: now };
      this.userBuckets.set(clientId, userUsage);
    } else {
      userUsage.timestamps = this.cleanTimestamps(userUsage.timestamps, now);
    }

    if (userUsage.timestamps.length >= this.MAX_PER_USER_RPM) {
      const oldestUserTimestamp = userUsage.timestamps[0];
      const retryAfter = Math.max(1, Math.ceil((60_000 - (now - oldestUserTimestamp)) / 1000));
      return {
        allowed: false,
        reason: 'PER_USER_LIMIT',
        remainingPerUser: 0,
        remainingGlobalRpm: Math.max(0, this.MAX_GLOBAL_RPM - this.globalTimestamps.length),
        remainingDaily: Math.max(0, this.MAX_DAILY_REQUESTS - this.dailyCount),
        activeUsers: currentActiveUsers,
        retryAfterSeconds: retryAfter,
      };
    }

    // RECORD USAGE
    userUsage.timestamps.push(now);
    userUsage.lastActive = now;
    this.globalTimestamps.push(now);
    this.dailyCount++;

    return {
      allowed: true,
      remainingPerUser: this.MAX_PER_USER_RPM - userUsage.timestamps.length,
      remainingGlobalRpm: this.MAX_GLOBAL_RPM - this.globalTimestamps.length,
      remainingDaily: this.MAX_DAILY_REQUESTS - this.dailyCount,
      activeUsers: this.getActiveUsersCount(now),
      retryAfterSeconds: 0,
    };
  }

  /**
   * Returns current statistics
   */
  public getStats() {
    const now = Date.now();
    this.checkDailyReset(new Date(now));
    this.globalTimestamps = this.cleanTimestamps(this.globalTimestamps, now);

    return {
      maxPerUserRpm: this.MAX_PER_USER_RPM,
      maxGlobalRpm: this.MAX_GLOBAL_RPM,
      maxConcurrentUsers: this.MAX_CONCURRENT_USERS,
      maxDailyRequests: this.MAX_DAILY_REQUESTS,
      currentGlobalRpm: this.globalTimestamps.length,
      currentDailyCount: this.dailyCount,
      activeUsers5Min: this.getActiveUsersCount(now),
      currentDay: this.currentDay,
    };
  }

  /**
   * Reset helper for automated tests
   */
  public resetForTesting() {
    this.userBuckets.clear();
    this.globalTimestamps = [];
    this.dailyCount = 0;
  }
}

export const rateLimiter = new MultiTierRateLimiter();

/**
 * Express middleware to enforce multi-tier rate limiting on AI endpoints
 */
export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const result = rateLimiter.evaluate(req);

  // Set standard RateLimit headers
  res.setHeader('X-RateLimit-Limit-User', '3');
  res.setHeader('X-RateLimit-Remaining-User', result.remainingPerUser.toString());
  res.setHeader('X-RateLimit-Limit-Global', '15');
  res.setHeader('X-RateLimit-Remaining-Global', result.remainingGlobalRpm.toString());
  res.setHeader('X-RateLimit-Daily-Remaining', result.remainingDaily.toString());

  if (!result.allowed) {
    res.setHeader('Retry-After', result.retryAfterSeconds.toString());
    
    let userMessage = 'Rate limit exceeded. Please try again shortly.';
    if (result.reason === 'PER_USER_LIMIT') {
      userMessage = `Per-user limit reached: Max 3 AI requests/min. Please wait ${result.retryAfterSeconds}s before retrying.`;
    } else if (result.reason === 'GLOBAL_RPM_LIMIT') {
      userMessage = `Global capacity reached (15 RPM). Please retry in ${result.retryAfterSeconds}s.`;
    } else if (result.reason === 'MAX_CONCURRENT_USERS') {
      userMessage = 'Server currently has 15 active concurrent users. Please retry in a few moments.';
    } else if (result.reason === 'DAILY_QUOTA_EXCEEDED') {
      userMessage = 'Daily global demo quota (500 requests) reached. Resets at midnight UTC.';
    }

    res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      code: result.reason,
      message: userMessage,
      retryAfterSeconds: result.retryAfterSeconds,
      activeUsers: result.activeUsers,
    });
    return;
  }

  next();
};

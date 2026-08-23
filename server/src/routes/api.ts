import { Router, Request, Response } from 'express';
import { visionService } from '../services/visionService.js';
import { locationService } from '../services/locationService.js';
import { MOCK_FASHION_ITEMS } from '../data/mockBrands.js';
import { MOCK_PHOTOBOOTH_FRAMES } from '../data/mockPhotoboothFrames.js';
import { DripCheckRequest, PlaceRecommendationRequest, WeatherContext } from '../types/entityGraph.js';

export const apiRouter = Router();

/**
 * Health check endpoint for Cloud Run and container liveness probes.
 */
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'AuraLens Multi-Agent Orchestrator',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
  });
});

/**
 * POST /api/v1/drip-check
 * Evaluates outfit from image/context, returns score, breakdown, Lumi comment, and alternatives.
 */
apiRouter.post('/drip-check', async (req: Request, res: Response) => {
  try {
    const body: DripCheckRequest = req.body;

    if (!body.context) {
      return res.status(400).json({
        error: 'Missing required field: context (e.g., "Hẹn hò", "Quẩy bar / Pub đêm", "Cafe sống ảo")',
      });
    }

    const currentHour = new Date().getHours();
    const weatherSnapshot: WeatherContext = {
      temperature: 28,
      condition: 'Nắng đẹp',
      isRaining: false,
      currentHour,
      city: 'Hồ Chí Minh',
    };

    const evaluation = await visionService.analyzeOutfit(body, weatherSnapshot);
    return res.status(200).json(evaluation);
  } catch (error) {
    console.error('Error in /api/v1/drip-check:', error);
    return res.status(500).json({ error: 'Internal Server Error during Drip Check evaluation' });
  }
});

/**
 * POST /api/v1/recommend-places
 * Recommends F&B places and photospots filtered by weather and open hours.
 */
apiRouter.post('/recommend-places', (req: Request, res: Response) => {
  try {
    const body: PlaceRecommendationRequest = req.body;

    if (!body.aestheticTag) {
      return res.status(400).json({
        error: 'Missing required field: aestheticTag (e.g., "Y2K", "Cyber-Pop", "Minimalist", "Streetwear")',
      });
    }

    const recommendations = locationService.recommendPlaces(body);
    return res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error in /api/v1/recommend-places:', error);
    return res.status(500).json({ error: 'Internal Server Error during Place Recommendation' });
  }
});

/**
 * GET /api/v1/brands/items
 * Retrieves all items in the Local Brand Entity Graph.
 */
apiRouter.get('/brands/items', (_req: Request, res: Response) => {
  return res.status(200).json({
    total: MOCK_FASHION_ITEMS.length,
    items: MOCK_FASHION_ITEMS,
  });
});

/**
 * GET /api/v1/photobooth/frames
 * Retrieves available Photobooth frames and stickers.
 */
apiRouter.get('/photobooth/frames', (_req: Request, res: Response) => {
  return res.status(200).json({
    total: MOCK_PHOTOBOOTH_FRAMES.length,
    frames: MOCK_PHOTOBOOTH_FRAMES,
  });
});

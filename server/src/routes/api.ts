import { Router, Request, Response } from 'express';
import { visionService } from '../services/visionService.js';
import { locationService } from '../services/locationService.js';
import { MOCK_FASHION_ITEMS } from '../data/mockBrands.js';
import { MOCK_PHOTOBOOTH_FRAMES } from '../data/mockPhotoboothFrames.js';
import { DripCheckRequest, PlaceRecommendationRequest, WeatherContext } from '../types/entityGraph.js';
import { rateLimiter, rateLimiterMiddleware } from '../middleware/rateLimiter.js';

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
 * GET /api/v1/stats/quota
 * Real-time usage and rate limiting statistics
 */
apiRouter.get('/stats/quota', (_req: Request, res: Response) => {
  return res.status(200).json(rateLimiter.getStats());
});

/**
 * POST /api/v1/drip-check
 * Evaluates outfit from image/context with Gemini Vision (Rate-limited: 3 req/min/user, 15 global RPM)
 */
apiRouter.post('/drip-check', rateLimiterMiddleware, async (req: Request, res: Response) => {
  try {
    const body: DripCheckRequest = req.body;
    const context = body.context || 'Cafe sống ảo';

    const currentHour = new Date().getHours();
    const weatherSnapshot: WeatherContext = {
      temperature: 28,
      condition: 'Nắng đẹp',
      isRaining: false,
      currentHour,
      city: 'Hồ Chí Minh',
    };

    const evaluation = await visionService.analyzeOutfit({ ...body, context }, weatherSnapshot);
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

/**
 * POST /api/v1/photobooth/ai-template
 * Synthesizes a full Photobooth template using Gemini 3.5 Flash Lite from natural language prompt.
 */
apiRouter.post('/photobooth/ai-template', rateLimiterMiddleware, async (req: Request, res: Response) => {
  try {
    const { aiTemplateService } = await import('../services/aiTemplateService.js');
    const template = await aiTemplateService.generateTemplate(req.body);
    return res.status(200).json(template);
  } catch (error) {
    console.error('Error in /api/v1/photobooth/ai-template:', error);
    return res.status(500).json({ error: 'Internal Server Error generating AI Photobooth Template' });
  }
});

/**
 * POST /api/v1/map/ai-analyze
 * Analyzes weather and vibe to generate Gemini outfit and destination recommendations.
 */
apiRouter.post('/map/ai-analyze', rateLimiterMiddleware, async (req: Request, res: Response) => {
  try {
    const { aestheticTag = 'Cyber-Pop', weather, language = 'vi' } = req.body;
    const isEn = language === 'en';
    const temp = weather?.temperature ?? 29;
    const isRain = weather?.isRaining ?? false;
    const condition = weather?.condition || (isRain ? (isEn ? 'Rainy' : 'Mưa rào') : (isEn ? 'Clear & Sunny' : 'Nắng đẹp'));
    const dateStr = isEn ? 'Thursday, Aug 27, 2026' : 'Thứ Năm, 27/08/2026';
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const geminiModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

    if (geminiApiKey) {
      try {
        const prompt = isEn
          ? `You are Lumi, an expert Gen Z fashion stylist and Saigon local guide.
CRITICAL MANDATE: ALL output fields MUST be 100% in ENGLISH. Do not use Vietnamese.

Scenario:
- Aesthetic / Vibe: ${aestheticTag}
- Weather: ${temp}°C, Condition: ${condition}, Rain: ${isRain ? 'Yes' : 'No'}, City: Ho Chi Minh City
- Date: ${dateStr}
- Target Language: English

Output MUST be a valid JSON matching this schema:
{
  "dateStr": "${dateStr}",
  "weatherBullets": [
    "Temperature ${temp}°C & Saigon outdoor weather feel in English",
    "Sun/rain forecast and best golden hour time window to snap photos"
  ],
  "outfitBullets": [
    "Specific top/bottom/dress recommendations for ${aestheticTag} style",
    "Footwear and statement accessories (sunglasses, bags, jewelry)"
  ],
  "destinationBullets": [
    "Trending cafes/rooftops/speakeasies in Saigon matching this vibe",
    "Signature photo spots or signature drinks to check out"
  ],
  "lumiComment": "Catchy, playful Gen Z stylist quote in English (under 25 words)"
}`
          : `Bạn là Lumi, chuyên gia stylist thời trang Gen Z và thổ địa Sài Gòn.
YÊU CẦU BẮT BUỘC: Toàn bộ nội dung trả về PHẢI BẰNG TIẾNG VIỆT (100% Tiếng Việt).

Ngữ cảnh:
- Phong cách/Vibe: ${aestheticTag}
- Thời tiết: ${temp}°C, Trạng thái: ${condition}, Mưa: ${isRain ? 'Có' : 'Không'}, Thành phố: Hồ Chí Minh
- Ngày: ${dateStr}
- Ngôn ngữ: Tiếng Việt

Đầu ra BẮT BUỘC là JSON hợp lệ theo cấu trúc:
{
  "dateStr": "${dateStr}",
  "weatherBullets": [
    "Nhiệt độ ${temp}°C & cảm nhận thời tiết tại Sài Gòn",
    "Tình trạng nắng/mưa & thời điểm lý tưởng nhất trong ngày để săn ảnh"
  ],
  "outfitBullets": [
    "Gợi ý áo/quần/váy cụ thể phù hợp phong cách ${aestheticTag}",
    "Gợi ý giày & phụ kiện bắt sáng (kính râm, túi xách, trang sức)"
  ],
  "destinationBullets": [
    "Tên quán & phong cách không gian ăn khớp với set đồ",
    "Góc chụp ảnh / Signature item đáng thử nhất"
  ],
  "lumiComment": "Câu nhận xét ngắn gọn, dí dỏm chuẩn Gen Z bằng tiếng Việt (dưới 25 từ)"
}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = (await geminiRes.json()) as any;
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return res.status(200).json(parsed);
          }
        }
      } catch (e) {
        console.warn('Gemini API call failed for map analyze, using fallback:', e);
      }
    }

    const fallbackResponse = isEn
      ? {
          dateStr,
          weatherBullets: [
            `Current Temp: ${temp}°C (${condition}) with pleasant dry breeze`,
            `Zero rain expected – golden sunlight ideal for outdoor photo snaps`,
          ],
          outfitBullets: [
            `Top & Bottom: Breathable oversize ${aestheticTag} jacket paired with high-waisted shorts or cargo pants`,
            `Accessories: Mirrored sunglasses, silver chain necklace, and chunky sneakers`,
          ],
          destinationBullets: [
            `Neo Saigon Cyber Bar & Sunset Rooftop for neon cyberpunk vibes`,
            `Danshari Coffee for clean minimalist aesthetic photos`,
          ],
          lumiComment: `Lumi says: Your ${aestheticTag} fit is going to turn heads today! Go flex your style!`,
        }
      : {
          dateStr,
          weatherBullets: [
            `Nhiệt độ: ${temp}°C (${condition}), không khí thoáng mát dễ chịu`,
            `Trời nắng ráo không mưa – thời điểm vàng để check-in ngoài trời & rooftop`,
          ],
          outfitBullets: [
            `Trang phục chính: Set đồ ${aestheticTag} năng động, áo croptop phối quần cargo hoặc blazer dáng rộng`,
            `Phụ kiện: Kính râm gọng bạc, dây chuyền titan và sneaker đế cao bắt sáng`,
          ],
          destinationBullets: [
            `Neo Saigon Cyber Bar & Speakeasy hoặc Sunset Rooftop Landmark`,
            `Danshari Coffee với không gian tối giản cực tôn outfit`,
          ],
          lumiComment: `Lumi chấm điểm 10/10 cho ngày hôm nay! Set đồ này lên hình ở rooftop là bao cháy máy luôn nha!`,
        };

    return res.status(200).json(fallbackResponse);
  } catch (error) {
    console.error('Error in /api/v1/map/ai-analyze:', error);
    return res.status(500).json({ error: 'Internal Server Error analyzing map with AI' });
  }
});



import { DripCheckRequest, DripCheckResponse, VibeStyle, WeatherContext, FashionItem } from '../types/entityGraph.js';
import { stylistService } from './stylistService.js';
import { MOCK_FASHION_ITEMS } from '../data/mockBrands.js';

export interface VisionAnalysisResult {
  detectedStyle: VibeStyle;
  dominantColors: string[];
  detectedItems: string[];
  score?: number;
  isPassing?: boolean;
  lumiComment?: string;
  styleDirectives?: {
    cyberPop?: string;
    minimalist?: string;
    streetwear?: string;
  };
  pros?: string[];
  cons?: string[];
  confidence: number;
}

export class VisionService {
  private geminiApiKey: string | null = process.env.GEMINI_API_KEY || null;
  private geminiModel: string = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  /**
   * Parses and evaluates outfit from photo using Google Gemini Multimodal API with Few-Shot Prompting or Mock Engine.
   */
  public async analyzeOutfit(
    request: DripCheckRequest,
    weatherSnapshot: WeatherContext
  ): Promise<DripCheckResponse> {
    const { context = 'Cafe sống ảo', mockScenario, userNotes, imageBase64, language = 'vi' } = request;

    // Refresh API key from env in case it was dynamically set
    this.geminiApiKey = process.env.GEMINI_API_KEY || null;
    this.geminiModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

    // If real Gemini API Key is provided and an image was sent
    if (this.geminiApiKey && imageBase64 && imageBase64.length > 50) {
      try {
        const liveResult = await this.analyzeWithGemini(imageBase64, context, language, weatherSnapshot);
        if (liveResult) {
          return liveResult;
        }
      } catch (error) {
        console.warn('⚠️ Gemini Multimodal API call error. Falling back to Mock Vision Engine:', error);
      }
    }

    // Fallback to Mock Vision Engine
    const visionResult = this.mockVisionAnalysis(request);

    return stylistService.evaluateOutfit({
      detectedStyle: visionResult.detectedStyle,
      dominantColors: visionResult.dominantColors,
      detectedItems: visionResult.detectedItems,
      context,
      weatherSnapshot,
      userNotes,
      mockScenario,
    });
  }

  /**
   * Production Google Gemini Multimodal Vision API Call (Google AI Studio / Google Cloud).
   * Executes in 1 single-pass multimodal reasoning request with Structured JSON Schema output.
   */
  private async analyzeWithGemini(
    rawBase64: string,
    context: string,
    language: 'en' | 'vi',
    weatherSnapshot: WeatherContext
  ): Promise<DripCheckResponse | null> {
    if (!this.geminiApiKey) return null;

    // Sanitize pure base64 data and extract mimeType
    let mimeType = 'image/jpeg';
    let base64Data = rawBase64;

    const dataUriMatch = rawBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (dataUriMatch) {
      mimeType = dataUriMatch[1];
      base64Data = dataUriMatch[2];
    }

    const isEn = language === 'en';

    // SYSTEM INSTRUCTIONS: Z-Stylist Gen-Z 2026 Specification (Strictly Tailored by Language)
    const systemInstructionText = isEn
      ? `
You are "Lumi" (Z-Stylist) - The virtual Fashion Creative Director & AI Stylist for AuraLens (#BuildwithGoogleAI Hackathon 2026).
Your task: Analyze the user's OOTD photo using multimodal computer vision, evaluate silhouette proportions, colors, layering, Sandwich Rule, and micro-details, calculate a Fit Score (0-100), and provide sharp, witty, and tasteful Gen-Z fashion advice.

FASHION THEORETICAL FRAMEWORK:
1. Aesthetic Recognition: Y2K/Y3K Neo-Futurism, Grunge/Indie Sleaze, Coquette/Soft Girl, Minimalist/Quiet Luxury, Boho Chic 2026, Athleisure/Techwear, Streetwear, Cyber-Pop, Clean-Fit, Old Money, Vintage.
2. Proportion Play: Check "Little shirt, big pants" vs "Little pants, big shirt", height-enhancing balance, or uncomplimentary boxy silhouettes.
3. The Sandwich Rule: Does the visual weight and color balance between the top (hat/jacket) match the bottom (shoes/boots)? Point out "top-heavy" flaws if applicable.
4. Micro-Details (Maximalism): Inspect charms (Labubu, Jellycat), ribbon ties, lace under blazers, leather belts, chrome chains, and oval sunglasses.
5. Vietnamese Local Brands: HADES, BLANCO, THE BEAT, LIDER Closet, Paradox, Zune.zx, DIRTY COINS, DEGREY.

CRITICAL LANGUAGE RULE:
ALL text values in your JSON response MUST BE 100% IN NATURAL, VIBRANT GEN-Z ENGLISH. DO NOT OUTPUT ANY VIETNAMESE STRINGS.

OUTPUT JSON SCHEMA:
Return ONLY a valid JSON object matching this schema:
{
  "score": number (40 to 98 - weighted overall Fit Score),
  "isPassing": boolean (true if score >= 70),
  "fashionPillars": {
    "colorHarmony": number (0 to 100 - Color palette balance & contrast),
    "silhouetteCut": number (0 to 100 - Proportion play & tailoring fit),
    "vibeMatch": number (0 to 100 - Appropriateness for the specified context/weather),
    "accessoriesDetails": number (0 to 100 - Micro-details, jewelry, shoes, styling layers)
  },
  "detectedStyle": string ("Cyber-Pop" | "Y2K" | "Streetwear" | "Minimalist" | "Clean-Fit" | "Vintage" | "Goth-Chic" | "Old Money"),
  "dominantColors": string[] (e.g. ["Midnight Black", "Metallic Silver", "Navy Blue"]),
  "detectedItems": string[] (e.g. ["Classic colorblock graphic tee", "Baggy parachute pants"]),
  "lumiComment": string (Lumi's friendly Gen-Z breakdown in 2-3 sentences addressing user as 'bestie' and referring to self as 'Lumi'),
  "styleDirectives": {
    "cyberPop": string (Actionable advice to push towards Cyber-Pop in English),
    "minimalist": string (Actionable advice to push towards Clean Minimalist in English)
  },
  "pros": string[] (2-3 glowing highlights of the outfit),
  "cons": string[] (1-2 constructive refinement suggestions),
  "recommendedAccessories": [
    {
      "name": string (Accessory name in English),
      "brandName": string ("BLANCO" | "HADES" | "THE BEAT" | "LIDER Closet" | "DIRTY COINS"),
      "price": number (VND price e.g. 290000),
      "reason": string (Why this accessory elevates the fit)
    }
  ]
}
`.trim()
      : `
Bạn là "Lumi" (Z-Stylist) - Giám đốc Sáng tạo Thời trang ảo kiêm AI Stylist độc quyền của ứng dụng AuraLens (#BuildwithGoogleAI Hackathon 2026).
Nhiệm vụ tối thượng: Tiếp nhận ảnh OOTD của người dùng, sử dụng thị giác máy tính để phân tích mọi lớp cắt trang phục từ tỷ lệ, màu sắc, chi tiết vi mô đến độ hài hòa tổng thể, chấm điểm Fit Score (0-100) và đưa ra lời bình phẩm sắc bén, duyên dáng và có gu chuẩn Gen-Z Việt Nam 2026.

HỆ QUY CHIẾU LÝ THUYẾT THỜI TRANG BẮT BUỘC:
1. Nhận diện Phong cách (Aesthetic): Y2K/Y3K, Grunge/Indie Sleaze, Coquette/Soft Girl, Minimalist/Quiet Luxury, Boho Chic 2026, Athleisure/Techwear, Streetwear, Cyber-Pop, Clean-Fit, Old Money, Vintage.
2. Phân tích Tỷ lệ (Proportion Play): Kiểm tra quy tắc "Little shirt, big pants" (Áo nhỏ gọn, quần siêu rộng) hoặc "Little pants, big shirt". Đánh giá độ tôn dáng, hack chiều cao, hoặc lỗi trang phục oversize nuốt chửng hình thể.
3. Quy tắc Bánh Mì Kẹp (The Sandwich Rule): Màu sắc và trọng lượng thị giác của phần trên cùng (áo/mũ/tóc) có được cân bằng tương đồng ở phần dưới cùng (giày/boots) hay không? Chỉ ra ngay lỗi "đầu nặng đuôi nhẹ" nếu phần trên quá dày/tối màu nhưng giày dép lại quá mỏng manh/lệch tông.
4. Chi tiết vi mô (Maximalism & Micro-Details): Quét các chi tiết điểm nhấn như charm móc khóa (Labubu, Jellycat), ruy băng thắt nơ, layer ren dưới blazer, thắt lưng da, trang sức kim loại/xích bạc, kính râm oval.
5. Hệ sinh thái Local Brands Việt Nam: Paradox, Zune.zx, 5THEWAY, BOBUI, HADES, BLANCO, THE BEAT, LIDER Closet, JIRENE, DIRTY COINS, DEGREY.

QUY TẮC NGÔN NGỮ BẮT BUỘC:
TOÀN BỘ các chuỗi text trong JSON phản hồi BẮT BUỘC PHẢI LÀ 100% TIẾNG VIỆT TỰ NHIÊN, CHUẨN GEN-Z (xưng Lumi gọi bạn/bà ơi, dùng từ: Slay, Keo lỳ, 10 điểm không có nhưng, Over hợp, Hơi xu cà na, Cháy phố). TUYỆT ĐỐI KHÔNG DÙNG TIẾNG ANH.

YÊU CẦU ĐẦU RA (OUTPUT JSON SCHEMA):
Bạn BẮT BUỘC phải trả về một JSON Object hợp lệ theo đúng định dạng sau:
{
  "score": number (tổng điểm từ 40 đến 98),
  "isPassing": boolean (true nếu score >= 70),
  "fashionPillars": {
    "colorHarmony": number (0 đến 100 - Điểm phối màu & độ tương phản),
    "silhouetteCut": number (0 đến 100 - Điểm tỷ lệ form dáng & cắt may),
    "vibeMatch": number (0 đến 100 - Điểm phù hợp bối cảnh & thời tiết),
    "accessoriesDetails": number (0 đến 100 - Điểm phụ kiện & chi tiết vi mô)
  },
  "detectedStyle": string ("Cyber-Pop" | "Y2K" | "Streetwear" | "Minimalist" | "Clean-Fit" | "Vintage" | "Goth-Chic" | "Old Money"),
  "dominantColors": string[] (2-4 màu chính bằng Tiếng Việt, ví dụ: ["Đen Midnight", "Bạc Ánh Kim", "Trắng Sữa"]),
  "detectedItems": string[] (danh sách món đồ nhận diện được bằng Tiếng Việt),
  "lumiComment": string (Lời nhận xét đầy đủ của Lumi 2-3 câu bằng Tiếng Việt xưng Lumi),
  "styleDirectives": {
    "cyberPop": string (Gợi ý cụ thể nếu muốn theo phong cách Cyber-Pop bằng Tiếng Việt),
    "minimalist": string (Gợi ý cụ thể nếu muốn theo phong cách Minimalist bằng Tiếng Việt)
  },
  "pros": string[] (2-3 điểm sáng "Keo lỳ" của set đồ bằng Tiếng Việt),
  "cons": string[] (1-2 điểm cấn "Hơi xu" cần tinh chỉnh bằng Tiếng Việt),
  "recommendedAccessories": [
    {
      "name": string (Tên món phụ kiện bằng Tiếng Việt),
      "brandName": string ("BLANCO" | "HADES" | "THE BEAT" | "LIDER Closet" | "DIRTY COINS"),
      "price": number (Giá tiền VND, ví dụ: 290000),
      "reason": string (Lý do phụ kiện nâng tầm phong cách bằng Tiếng Việt)
    }
  ]
}
`.trim();

    const userPrompt = isEn
      ? `Event/Activity context: "${context}". Current Saigon weather: ${weatherSnapshot.temperature}°C, ${weatherSnapshot.condition}. Language: English. Please evaluate the attached outfit image, calculate overall score & 4 fashion pillars, and return pure JSON output strictly in English.`
      : `Bối cảnh sử dụng: "${context}". Điều kiện thời tiết hiện tại tại Sài Gòn: ${weatherSnapshot.temperature}°C, ${weatherSnapshot.condition}. Ngôn ngữ yêu cầu: 100% Tiếng Việt. Hãy phân tích hình ảnh trang phục đính kèm, tính toán điểm tổng quát và 4 trọng số thành phần (fashionPillars), trả về kết quả JSON theo đúng schema.`;

    const requestUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${this.geminiApiKey}`;

    const requestBody = {
      systemInstruction: {
        parts: [{ text: systemInstructionText }],
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
            {
              text: userPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        responseMimeType: 'application/json',
      },
    };

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
    }

    const responseData = (await response.json()) as any;
    const rawText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Gemini API response contained no content text.');
    }

    // Clean and parse JSON
    const cleanJsonText = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleanJsonText);

    const score = typeof parsed.score === 'number' ? Math.min(99, Math.max(30, parsed.score)) : 88;
    const isPassing = typeof parsed.isPassing === 'boolean' ? parsed.isPassing : score >= 70;
    const detectedStyle = (parsed.detectedStyle || 'Streetwear') as VibeStyle;
    const dominantColors = Array.isArray(parsed.dominantColors) ? parsed.dominantColors : ['Đen', 'Bạc Ánh Kim'];
    const detectedItems = Array.isArray(parsed.detectedItems) ? parsed.detectedItems : ['Áo thun oversize', 'Quần túi hộp'];
    const pros = Array.isArray(parsed.pros) ? parsed.pros : ['Form dáng tỉ lệ chuẩn, visual bắt mắt dưới ánh đèn đô thị.'];
    const cons = Array.isArray(parsed.cons) ? parsed.cons : ['Có thể thêm phụ kiện kim loại để set đồ thêm sắc sảo.'];
    const lumiComment = parsed.lumiComment || '10 điểm không có nhưng! Set đồ này của bạn chuẩn vibe Sài Gòn luôn á!';

    // Parse fashion pillars with smart fallback
    const rawPillars = parsed.fashionPillars || {};
    const fashionPillars = {
      colorHarmony: typeof rawPillars.colorHarmony === 'number' ? Math.min(100, Math.max(0, rawPillars.colorHarmony)) : Math.min(100, score + 3),
      silhouetteCut: typeof rawPillars.silhouetteCut === 'number' ? Math.min(100, Math.max(0, rawPillars.silhouetteCut)) : Math.min(100, score + 1),
      vibeMatch: typeof rawPillars.vibeMatch === 'number' ? Math.min(100, Math.max(0, rawPillars.vibeMatch)) : Math.min(100, score + 4),
      accessoriesDetails: typeof rawPillars.accessoriesDetails === 'number' ? Math.min(100, Math.max(0, rawPillars.accessoriesDetails)) : Math.max(35, score - 6),
    };

    // Map recommended accessories from Gemini to our verified FashionItem inventory or generated items
    const suggestedAccessories: FashionItem[] = (parsed.recommendedAccessories || []).map(
      (acc: any, index: number) => ({
        id: `gemini-acc-${Date.now()}-${index}`,
        brandName: acc.brandName || 'BLANCO',
        name: acc.name || 'Kính Râm Oval Chrome Y2K',
        category: 'Accessory',
        colors: dominantColors,
        aestheticTag: detectedStyle,
        price: typeof acc.price === 'number' ? acc.price : 290000,
        imageUrl:
          index === 0
            ? 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80'
            : index === 1
            ? 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80'
            : index === 2
            ? 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=80',
        buyLink: 'https://auralens.vn',
        description: acc.reason || 'Phụ kiện nâng tầm phong cách từ Local Brand.',
      })
    );

    // If Gemini provided fewer accessories, supplement from verified inventory
    if (suggestedAccessories.length < 4) {
      const fallbackAccs = MOCK_FASHION_ITEMS.filter((item) => item.category === 'Accessory' || item.category === 'Bag');
      for (const item of fallbackAccs) {
        if (suggestedAccessories.length >= 4) break;
        if (!suggestedAccessories.some((a) => a.name === item.name)) {
          suggestedAccessories.push(item);
        }
      }
    }

    return {
      score,
      isPassing,
      breakdown: {
        dominantColors,
        detectedStyle,
        detectedItems,
        harmonyScore: fashionPillars.colorHarmony,
        vibeMatchScore: fashionPillars.vibeMatch,
        fashionPillars,
        pros,
        cons,
        styleDirectives: parsed.styleDirectives || {
          cyberPop: 'Phối thêm kính râm oval kim loại hoặc dây chuyền chrome layer kép.',
          minimalist: 'Đơn giản hóa phụ kiện, kết hợp giày sneaker trắng basic và túi đeo chéo mini.',
        },
      },
      lumiComment,
      suggestedAlternatives: [],
      suggestedAccessories: suggestedAccessories.slice(0, 4),
      weatherSnapshot,
      sessionId: `gemini_session_${Date.now()}`,
    };
  }

  /**
   * Mock vision parser supporting realistic Gen Z scenarios when offline.
   */
  public mockVisionAnalysis(request: DripCheckRequest): VisionAnalysisResult {
    const { mockScenario, context = 'Cafe sống ảo' } = request;

    if (mockScenario === 'low_score') {
      return {
        detectedStyle: 'Clean-Fit',
        dominantColors: ['Xám Nhạt', 'Trắng'],
        detectedItems: ['Áo thun cotton cũ', 'Quần đùi thun', 'Dép xỏ ngón'],
        confidence: 0.92,
      };
    }

    if (mockScenario === 'cyberpunk') {
      return {
        detectedStyle: 'Cyber-Pop',
        dominantColors: ['Bạc Metallic', 'Đen Midnight', 'Xanh Laser'],
        detectedItems: ['Áo khoác phản quang 3M', 'Quần dù cargo parachute', 'Kính râm oval matrix', 'Vòng cổ xích titan'],
        confidence: 0.98,
      };
    }

    if (context === 'Quẩy bar / Pub đêm') {
      return {
        detectedStyle: 'Cyber-Pop',
        dominantColors: ['Hồng Neon', 'Bạc Ánh Kim', 'Đen'],
        detectedItems: ['Áo ống tube top ánh bạc', 'Chân váy xếp ly cạp trễ', 'Túi kẹp nách metallic'],
        confidence: 0.95,
      };
    }

    if (context === 'Hẹn hò') {
      return {
        detectedStyle: 'Minimalist',
        dominantColors: ['Đen', 'Trắng Kem'],
        detectedItems: ['Áo thun cổ lọ dệt kim', 'Quần tây ống suông xếp ly', 'Giày da loafer'],
        confidence: 0.94,
      };
    }

    // Default High-Fashion Streetwear
    return {
      detectedStyle: 'Streetwear',
      dominantColors: ['Xám Khói', 'Đen Midnight', 'Neon Lime'],
      detectedItems: ['Áo thun graphic boxy', 'Quần dù parachute túi hộp', 'Kính râm oval'],
      confidence: 0.94,
    };
  }
}

export const visionService = new VisionService();

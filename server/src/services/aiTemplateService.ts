import { AITemplateRequest, AITemplateResponse } from '../types/entityGraph.js';

export class AITemplateService {
  private geminiApiKey: string | null = process.env.GEMINI_API_KEY || null;
  private geminiModel: string = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

  /**
   * Generates a complete, tailored Photobooth Design Template from natural language user prompt.
   */
  public async generateTemplate(request: AITemplateRequest): Promise<AITemplateResponse> {
    const { prompt, language = 'vi', aspectRatio = '9:16' } = request;

    this.geminiApiKey = process.env.GEMINI_API_KEY || null;
    this.geminiModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

    if (this.geminiApiKey && prompt && prompt.trim().length > 0) {
      try {
        const liveResult = await this.generateWithGemini(prompt, language, aspectRatio);
        if (liveResult) {
          return liveResult;
        }
      } catch (error) {
        console.warn('⚠️ Gemini AI Template API error. Using intelligent fallback template:', error);
      }
    }

    return this.generateFallbackTemplate(prompt, language);
  }

  /**
   * Calls Google Gemini 3.5 Flash Lite with structured JSON output.
   */
  private async generateWithGemini(
    prompt: string,
    language: 'en' | 'vi',
    aspectRatio: string
  ): Promise<AITemplateResponse | null> {
    if (!this.geminiApiKey) return null;

    const isEn = language === 'en';

    const systemInstructionText = isEn
      ? `
You are "Lumi Studio Art Director" - The AI Graphic Designer & Creative Stylist for AuraLens (#BuildwithGoogleAI Hackathon 2026).
Your task: Transform the user's natural language creative prompt into a complete, aesthetic, high-fashion Photobooth Design Template for aspect ratio ${aspectRatio}.

DESIGN FRAMEWORK:
1. Available Color Filters ("recommendedFilter"): "cyber-neon" | "film-1998" | "noir-bw" | "golden-hour" | "y2k-gloss" | "dream-glow" | "cold-chrome" | "normal"
2. Available Border Structures ("borderStyle"): "cyber-magazine" | "film-strip" | "vogue-clean" | "dopamine-pop" | "cyber-hud" | "royal-gold" | "neon-minimal"
3. Color Palettes: Choose aesthetic Hex codes (e.g. Neon Pink #FF2E93, Cyan #00F5FF, Lime #D4FF00, Gold #FCD34D, Off-White #FFFFFF, Pure Black #000000).
4. Stickers Placement: Suggest 2 to 4 tasteful stickers/emojis/badges with proportional x,y coordinates (0-100%) that DO NOT block the center where the user's face is located (place them around corners or edges: x: 10-25 or 75-90, y: 15-30 or 75-88).
5. Custom Typography: Suggest 1 to 2 catchy Gen-Z slogans/dates with fonts ("syne" | "space" | "serif" | "cursive" | "modern") and glowing colors.
6. Lumi Comment: Lumi's witty, encouraging 2-sentence Gen-Z remark explaining why this template slays.

OUTPUT JSON SCHEMA:
Return ONLY valid JSON matching this exact structure in 100% ENGLISH:
{
  "templateName": string,
  "vibeTag": string,
  "conceptDescription": string,
  "recommendedFilter": "cyber-neon" | "film-1998" | "noir-bw" | "golden-hour" | "y2k-gloss" | "dream-glow" | "cold-chrome" | "normal",
  "borderStyle": "cyber-magazine" | "film-strip" | "vogue-clean" | "dopamine-pop" | "cyber-hud" | "royal-gold" | "neon-minimal",
  "colorPalette": {
    "primary": string (Hex code),
    "accent": string (Hex code),
    "text": string (Hex code)
  },
  "headerText": string (Catchy title, e.g. "SAIGON NIGHT DRIVE"),
  "headerSub": string (Subtitle, e.g. "SPECIAL EDITION // 2026"),
  "footerText": string (Footer watermark, e.g. "AURALENS CREATIVE LAB"),
  "stickers": [
    {
      "display": string (Emoji or Text like "⚡ SLAY" or "🌟" or "💖"),
      "name": string,
      "x": number (10 to 90),
      "y": number (10 to 90),
      "scale": number (0.8 to 1.4),
      "rotation": number (-20 to 20),
      "isTextBadge": boolean
    }
  ],
  "customTexts": [
    {
      "text": string,
      "x": number,
      "y": number,
      "fontFamily": "'Syne', sans-serif" | "'Space Grotesk', monospace" | "'Didot', serif" | "'Dancing Script', cursive" | "'Plus Jakarta Sans', sans-serif",
      "color": string (Hex),
      "hasGlow": boolean,
      "scale": number
    }
  ],
  "lumiComment": string
}
`.trim()
      : `
Bạn là "Lumi Studio Art Director" - Giám đốc Sáng tạo & Nhà thiết kế Đồ họa AI của AuraLens (#BuildwithGoogleAI Hackathon 2026).
Nhiệm vụ: Chuyển đổi mô tả bằng ngôn ngữ tự nhiên của người dùng thành một Template Thiết kế Photobooth trọn gói hoàn chỉnh cho khổ ảnh ${aspectRatio}.

QUY CHUẨN THIẾT KẾ:
1. Bộ lọc màu ("recommendedFilter"): "cyber-neon" | "film-1998" | "noir-bw" | "golden-hour" | "y2k-gloss" | "dream-glow" | "cold-chrome" | "normal"
2. Kiểu khung viền ("borderStyle"): "cyber-magazine" | "film-strip" | "vogue-clean" | "dopamine-pop" | "cyber-hud" | "royal-gold" | "neon-minimal"
3. Bảng màu phối: Mã màu Hex (ví dụ: Hồng Cyber #FF2E93, Cyan #00F5FF, Lime #D4FF00, Vàng Hoàng Gia #FCD34D, Trắng #FFFFFF, Đen #000000).
4. Phân bổ Sticker: Đặt 2 đến 4 sticker/nhãn dán tại các tọa độ mép ngoài thẩm mỹ (x: 10-25 hoặc 75-90, y: 15-30 hoặc 75-88) KHÔNG che mặt mẫu ở giữa.
5. Chữ nghệ thuật & Font: Tiêu đề, châm ngôn Gen-Z bắt tai với kiểu font phù hợp.
6. Lời bình của Lumi: 2 câu nhận xét dễ thương bằng Tiếng Việt xưng Lumi (ví dụ: "Lumi đã mix cho bạn template cực keo lỳ rồi nè!").

YÊU CẦU ĐẦU RA:
Trả về DUY NHẤT 1 đối tượng JSON hợp lệ 100% TIẾNG VIỆT theo cấu trúc:
{
  "templateName": string,
  "vibeTag": string,
  "conceptDescription": string,
  "recommendedFilter": "cyber-neon" | "film-1998" | "noir-bw" | "golden-hour" | "y2k-gloss" | "dream-glow" | "cold-chrome" | "normal",
  "borderStyle": "cyber-magazine" | "film-strip" | "vogue-clean" | "dopamine-pop" | "cyber-hud" | "royal-gold" | "neon-minimal",
  "colorPalette": {
    "primary": string (Mã Hex),
    "accent": string (Mã Hex),
    "text": string (Mã Hex)
  },
  "headerText": string (Tiêu đề, ví dụ: "SÀI GÒN NIGHT DRIVE"),
  "headerSub": string (Phụ đề, ví dụ: "PHIÊN BẢN ĐẶC BIỆT // 2026"),
  "footerText": string (Dòng chữ đáy, ví dụ: "AURALENS CREATIVE LAB"),
  "stickers": [
    {
      "display": string (Emoji hoặc chữ như "⚡ SLAY" hoặc "🌟" hoặc "💖"),
      "name": string (Tên nhãn),
      "x": number (10 đến 90),
      "y": number (10 đến 90),
      "scale": number (0.8 đến 1.4),
      "rotation": number (-20 đến 20),
      "isTextBadge": boolean
    }
  ],
  "customTexts": [
    {
      "text": string,
      "x": number,
      "y": number,
      "fontFamily": "'Syne', sans-serif" | "'Space Grotesk', monospace" | "'Didot', serif" | "'Dancing Script', cursive" | "'Plus Jakarta Sans', sans-serif",
      "color": string (Mã Hex),
      "hasGlow": boolean,
      "scale": number
    }
  ],
  "lumiComment": string (Lời bình tiếng Việt xưng Lumi)
}
`.trim();

    const userPrompt = isEn
      ? `User Creative Prompt: "${prompt}". Target aspect ratio: ${aspectRatio}. Generate complete aesthetic photobooth template JSON in English.`
      : `Ý tưởng người dùng: "${prompt}". Khổ ảnh mong muốn: ${aspectRatio}. Hãy thiết kế trọn gói template photobooth độc đáo bằng Tiếng Việt theo JSON schema.`;

    const requestUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${this.geminiApiKey}`;

    const requestBody = {
      systemInstruction: {
        parts: [{ text: systemInstructionText }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.8,
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
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response from Gemini API');
    }

    const parsedJson = JSON.parse(candidateText) as AITemplateResponse;
    return parsedJson;
  }

  /**
   * Intelligent offline fallback synthesizer if API is unreachable.
   */
  private generateFallbackTemplate(prompt: string, language: 'en' | 'vi'): AITemplateResponse {
    const lower = (prompt || '').toLowerCase();
    const isEn = language === 'en';

    if (lower.includes('cyber') || lower.includes('neon') || lower.includes('tím') || lower.includes('tương lai')) {
      return {
        templateName: isEn ? 'Cyber Neon 2026' : 'Cyber Neon Tương Lai',
        vibeTag: 'Cyber-Pop',
        conceptDescription: isEn ? 'Futuristic cyber aesthetics with glowing neon accents' : 'Phong cách tương lai với ánh sáng neon phát sáng',
        recommendedFilter: 'cyber-neon',
        borderStyle: 'cyber-magazine',
        colorPalette: {
          primary: '#FF2E93',
          accent: '#00F5FF',
          text: '#D4FF00',
        },
        headerText: 'NIGHT CITY // 2026',
        headerSub: 'CYBERPOP SPECIAL EDITION',
        footerText: 'FEEL THE AURA // SGN 2026',
        stickers: [
          { display: '⚡ SLAY', name: 'SLAY', x: 80, y: 22, scale: 1.0, isTextBadge: true },
          { display: '🌟', name: 'Star', x: 15, y: 78, scale: 1.2 },
          { display: '█║▌║█║▌', name: 'Barcode', x: 82, y: 78, scale: 1.1, isTextBadge: true },
        ],
        customTexts: [
          {
            text: isEn ? 'FEEL THE AURA' : 'CHÁY PHỐ 2026',
            x: 50,
            y: 86,
            fontFamily: "'Syne', sans-serif",
            color: '#00F5FF',
            hasGlow: true,
            scale: 1,
          },
        ],
        lumiComment: isEn
          ? "Lumi designed a super sharp Cyberpunk template with laser glow tailored for your night vibe!"
          : "Lumi đã phối riêng cho bạn template Cyberpunk ánh neon cực chiến để đi quẩy nè!",
      };
    }

    if (lower.includes('film') || lower.includes('vintage') || lower.includes('retro') || lower.includes('cổ điển') || lower.includes('90')) {
      return {
        templateName: isEn ? 'Vintage 35mm Sài Gòn' : 'Film 35mm Hoài Niệm',
        vibeTag: 'Vintage',
        conceptDescription: isEn ? 'Classic 90s analog film strip with warm nostalgic tones' : 'Dải phim cuộn 35mm ấm áp gợi nhớ Sài Gòn thập niên 90',
        recommendedFilter: 'film-1998',
        borderStyle: 'film-strip',
        colorPalette: {
          primary: '#FFA500',
          accent: '#FFFFFF',
          text: '#FFA500',
        },
        headerText: 'SAIGON MEMORIES',
        headerSub: 'EXP 24+3 // 35MM FILM',
        footerText: 'KODAK GOLD 400 · SGN',
        stickers: [
          { display: '📍 SÀI GÒN 2026', name: 'Saigon', x: 80, y: 22, scale: 1.0, isTextBadge: true },
          { display: '✨', name: 'Sparkle', x: 18, y: 78, scale: 1.2 },
        ],
        customTexts: [
          {
            text: isEn ? 'NOSTALGIA 1998' : 'KỶ NIỆM SÀI GÒN',
            x: 50,
            y: 88,
            fontFamily: "'Dancing Script', cursive",
            color: '#FFA500',
            hasGlow: false,
            scale: 1,
          },
        ],
        lumiComment: isEn
          ? "A warm 90s film aesthetic created by Lumi with analog film borders!"
          : "Tone film hoài niệm cực ấm áp Lumi chuẩn bị riêng cho bạn đây!",
      };
    }

    // Default Dopamine / Trendy Vibe
    return {
      templateName: isEn ? 'Dopamine Sweet Pop' : 'Dopamine Kẹo Ngọt',
      vibeTag: 'Y2K',
      conceptDescription: isEn ? 'Pastel sparkle glitter with playful Gen-Z energy' : 'Tông màu pastel kẹo ngọt tràn đầy năng lượng Gen-Z',
      recommendedFilter: 'y2k-gloss',
      borderStyle: 'dopamine-pop',
      colorPalette: {
        primary: '#FF2E93',
        accent: '#D4FF00',
        text: '#FFFFFF',
      },
      headerText: 'DOPAMINE ENERGY',
      headerSub: 'GEN Z SPECIAL EDITION',
      footerText: '#AURALENS_VIBE · 2026',
      stickers: [
        { display: '💖', name: 'Heart', x: 18, y: 22, scale: 1.2 },
        { display: '💅 KEO LỲ', name: 'Keo Ly', x: 80, y: 22, scale: 1.0, isTextBadge: true },
        { display: '🐰', name: 'Bunny', x: 82, y: 78, scale: 1.3 },
      ],
      customTexts: [
        {
          text: isEn ? 'MAIN CHARACTER' : 'VIBE KEO LỲ',
          x: 50,
          y: 86,
          fontFamily: "'Syne', sans-serif",
          color: '#D4FF00',
          hasGlow: true,
          scale: 1,
        },
      ],
      lumiComment: isEn
        ? "Lumi synthesized a super sweet Y2K pastel template tailored to your prompt!"
        : "Lumi đã thiết kế cho bạn một template Y2K cực ngọt ngào và nổi bật luôn nè!",
    };
  }
}

export const aiTemplateService = new AITemplateService();

import {
  EventContext,
  FashionItem,
  OutfitBreakdown,
  DripCheckResponse,
  VibeStyle,
  WeatherContext,
} from '../types/entityGraph.js';
import { MOCK_FASHION_ITEMS } from '../data/mockBrands.js';

export interface StylistEvaluationInput {
  detectedStyle: VibeStyle;
  dominantColors: string[];
  detectedItems: string[];
  context: EventContext;
  weatherSnapshot: WeatherContext;
  userNotes?: string;
  mockScenario?: 'low_score' | 'high_score' | 'rain_ready' | 'cyberpunk';
}

export class StylistService {
  /**
   * Evaluates outfit and produces score, breakdown, Lumi persona commentary, and Local Brand items.
   */
  public evaluateOutfit(input: StylistEvaluationInput): DripCheckResponse {
    const { detectedStyle, dominantColors, detectedItems, context, weatherSnapshot, mockScenario } = input;

    let score = 75;
    let pros: string[] = [];
    let cons: string[] = [];
    let lumiComment = '';

    // Handle Mock Scenarios if explicitly provided
    if (mockScenario === 'low_score') {
      score = 58;
      pros = ['Màu sắc cơ bản dễ nhìn, tạo cảm giác thoải mái đời thường.'];
      cons = [
        'Form dáng bị xuề xòa, thiếu cấu trúc định hình cơ thể.',
        `Chưa phù hợp với không khí trang trọng hoặc năng động của buổi "${context}".`,
      ];
      lumiComment =
        'Trời ơi bà ơi! Mặc thế này đi dạo siêu thị thì được, chứ đi ' +
        context +
        ' là hơi bị "tàng hình" giữa đám đông nha! Khoác thêm em Blazer cấu trúc vai rộng hoặc đổi áo ống metallic của Local Brand là lên 90 điểm ngay, trông thần thái liền!';
    } else if (mockScenario === 'high_score' || mockScenario === 'cyberpunk') {
      score = 94;
      pros = [
        'Tỉ lệ cơ thể được tôn dáng cực chuẩn với form dáng thời thượng.',
        `Màu sắc phối hợp tương phản đỉnh cao, đúng chuẩn vibe ${detectedStyle}.`,
        'Phụ kiện ăn nhập tạo điểm nhấn thị giác bắt mắt.',
      ];
      cons = ['Đã quá hoàn hảo, chỉ cần thêm một chút phụ kiện bạc nếu muốn bùng nổ hơn nữa.'];
      lumiComment =
        '10 điểm không có nhưng! Bộ này cháy hết nước chấm luôn bà ơi, chuẩn vibe ' +
        detectedStyle +
        ' không lẫn vào đâu được. Lên đồ thế này thì phải phi ngay ra quán sống ảo chụp 8000 bức ảnh up Story mới đã!';
    } else {
      // Dynamic Calculation Logic
      const contextStyleAffinity: Record<EventContext, VibeStyle[]> = {
        'Hẹn hò': ['Old Money', 'Clean-Fit', 'Minimalist', 'Vintage'],
        'Quẩy bar / Pub đêm': ['Cyber-Pop', 'Y2K', 'Goth-Chic', 'Streetwear'],
        'Cafe sống ảo': ['Y2K', 'Cyber-Pop', 'Vintage', 'Minimalist', 'Clean-Fit'],
        'Đi học / Đi làm năng động': ['Clean-Fit', 'Minimalist', 'Streetwear'],
        'Dạo phố cuối tuần': ['Streetwear', 'Y2K', 'Vintage', 'Cyber-Pop'],
      };

      const preferredStyles = contextStyleAffinity[context] || ['Streetwear'];
      const isStyleMatching = preferredStyles.includes(detectedStyle);

      const baseScore = isStyleMatching ? 82 : 62;
      const colorBonus = dominantColors.length >= 2 && dominantColors.length <= 4 ? 6 : 2;
      const itemsCountBonus = detectedItems.length >= 3 ? 5 : 0;

      score = Math.min(98, Math.max(45, baseScore + colorBonus + itemsCountBonus));

      if (score < 70) {
        pros = ['Bảng màu tối giản, không bị rối mắt.'];
        cons = [
          `Phong cách ${detectedStyle} chưa thực sự ăn khớp với mục tiêu "${context}".`,
          'Thiếu phụ kiện điểm nhấn hoặc lớp áo khoác tạo layer chiều sâu.',
        ];
        lumiComment = `Set đồ này hơi an toàn quá nè! Đi "${context}" mà mặc thế này thì Lumi cho ${score} điểm thui. Thử phối thêm món đồ Local Brand bên dưới để bật mood chất lừ nhé!`;
      } else {
        pros = [
          `Sự kết hợp màu sắc ${dominantColors.join(', ')} rất hài hòa.`,
          `Phong cách ${detectedStyle} cực kỳ chuẩn chỉnh cho buổi "${context}".`,
        ];
        cons = ['Có thể thêm kính râm hoặc túi xách mini để tổng thể sắc nét hơn.'];
        lumiComment = `U là trời, outfit này Lumi chấm hẳn ${score} điểm nha! Vibe ${detectedStyle} quá mượt cho buổi "${context}". Bấm nút bên dưới để Lumi dẫn đi quán cafe có góc chụp bao nghệ nào!`;
      }
    }

    const isPassing = score >= 70;

    // Find suggested items from Entity Graph
    const suggestedAlternatives: FashionItem[] = [];
    const suggestedAccessories: FashionItem[] = [];

    if (!isPassing) {
      // Find outerwear, tops, or bottoms to improve the fit
      const matchingItems = MOCK_FASHION_ITEMS.filter(
        (item) => item.category === 'Outerwear' || item.category === 'Top' || item.category === 'Bottom'
      );
      suggestedAlternatives.push(...matchingItems.slice(0, 4));
    } else {
      // Find accessories, bags, or shoes to elevate the look
      const matchingAccessories = MOCK_FASHION_ITEMS.filter(
        (item) =>
          item.category === 'Accessory' ||
          item.category === 'Bag' ||
          item.category === 'Shoes' ||
          item.aestheticTag === detectedStyle
      );
      suggestedAccessories.push(...matchingAccessories.slice(0, 4));
    }

    const breakdown: OutfitBreakdown = {
      dominantColors,
      detectedStyle,
      detectedItems,
      harmonyScore: Math.min(100, score + 4),
      vibeMatchScore: score,
      pros,
      cons,
    };

    return {
      score,
      isPassing,
      breakdown,
      lumiComment,
      suggestedAlternatives,
      suggestedAccessories,
      weatherSnapshot,
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
  }
}

export const stylistService = new StylistService();

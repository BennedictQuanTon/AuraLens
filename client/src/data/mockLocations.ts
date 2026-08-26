import type { Location, VibeStyle } from '../types/entityGraph.js';

/**
 * ============================================================================
 * MOCK DATA STRUCTURE FOR AURALENS VIBE MAP (MAP-READY SCHEMA)
 * ============================================================================
 * Schema adheres to future Google Maps Platform & Places API (New) integration.
 * 
 * TODO: [Google Places API (New)]
 * Replace mock data entries with real-time fetch from:
 * https://places.googleapis.com/v1/places:searchNearby
 * 
 * TODO: [AI Guardrail Agent]
 * Real-time filter verifies open hours, dress-code, and hygiene before ingestion.
 */

export interface MockLocation {
  id: string;
  name: string;
  type: 'Cafe' | 'Pub' | 'Museum' | 'Lounge' | 'Bar';
  aesthetic_tag: VibeStyle;
  is_indoor: boolean;
  open_hours: { open: string; close: string }; // "HH:mm"
  lat: number;
  lng: number;
  distance_km_mock: number;
  eta_min_mock: number;
  match_score: number; // 0 - 100
  is_lumi_pick: boolean;
  photo_url: string;
  address_mock: string;
  district_mock: string;
  signature_item?: string;
  best_photo_spot?: string;
  vibe_description?: string;
}

export const MOCK_HCMC_LOCATIONS: MockLocation[] = [
  {
    id: 'loc-1',
    name: 'Neo Saigon Cyber Bar',
    type: 'Pub',
    aesthetic_tag: 'Cyber-Pop',
    is_indoor: true,
    open_hours: { open: '17:00', close: '02:00' },
    lat: 10.7782,
    lng: 106.7025,
    distance_km_mock: 0.3,
    eta_min_mock: 4,
    match_score: 98,
    is_lumi_pick: true,
    photo_url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&auto=format&fit=crop&q=80',
    address_mock: '26 Lý Tự Trọng, Bến Nghé, Quận 1',
    district_mock: 'Quận 1',
    signature_item: 'Cyberpunk Neon Gin Fizz',
    best_photo_spot: 'Đường hầm laser phản quang & quầy bar titan',
    vibe_description: 'Không gian ánh sáng neon viễn tưởng, quầy bar kim loại phản chiếu outfit ánh bạc cực bén.',
  },
  {
    id: 'loc-2',
    name: 'Danshari Coffee',
    type: 'Cafe',
    aesthetic_tag: 'Minimalist',
    is_indoor: true,
    open_hours: { open: '08:00', close: '22:00' },
    lat: 10.7745,
    lng: 106.6980,
    distance_km_mock: 0.5,
    eta_min_mock: 7,
    match_score: 96,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
    address_mock: '156B Pasteur, Bến Nghé, Quận 1',
    district_mock: 'Quận 1',
    signature_item: 'Kyoto Ceremonial Matcha',
    best_photo_spot: 'Cột bê tông nguyên khối & giếng trời ánh sáng',
    vibe_description: 'Tone màu xi măng thô mộc và kính trong suốt, chuẩn phong cách Wabi-Sabi tinh tế.',
  },
  {
    id: 'loc-3',
    name: 'Blank Lounge Landmark 81',
    type: 'Lounge',
    aesthetic_tag: 'Cyber-Pop',
    is_indoor: false, // Rooftop outdoor sky deck
    open_hours: { open: '09:00', close: '24:00' },
    lat: 10.7950,
    lng: 106.7218,
    distance_km_mock: 2.8,
    eta_min_mock: 18,
    match_score: 95,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    address_mock: 'Tầng 75-76 Landmark 81, Bình Thạnh',
    district_mock: 'Bình Thạnh',
    signature_item: 'Cloud 81 Sparkling Cocktail',
    best_photo_spot: 'Ban công kính ngắm toàn cảnh Sài Gòn ở độ cao 350m',
    vibe_description: 'Tầm nhìn bao trọn Sông Sài Gòn lộng gió, cực kỳ hợp cho các shoot hình thời trang đẳng cấp.',
  },
  {
    id: 'loc-4',
    name: 'Rang Rang Coffee Thảo Điền',
    type: 'Cafe',
    aesthetic_tag: 'Clean-Fit',
    is_indoor: true,
    open_hours: { open: '07:00', close: '23:00' },
    lat: 10.8030,
    lng: 106.7320,
    distance_km_mock: 3.4,
    eta_min_mock: 22,
    match_score: 94,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&auto=format&fit=crop&q=80',
    address_mock: '1 Thảo Điền, TP. Thủ Đức',
    district_mock: 'Thảo Điền',
    signature_item: 'Cold Brew Inox Signature',
    best_photo_spot: 'Bàn inox tráng gương và bức tường kính lớn',
    vibe_description: 'Nội thất inox tương lai kết hợp kính xuyên sáng bắt mắt, không gian hiện đại và yên tĩnh.',
  },
  {
    id: 'loc-5',
    name: 'The Deck Saigon',
    type: 'Bar',
    aesthetic_tag: 'Vintage',
    is_indoor: false, // Outdoor riverfront terrace
    open_hours: { open: '08:00', close: '23:30' },
    lat: 10.8120,
    lng: 106.7400,
    distance_km_mock: 4.2,
    eta_min_mock: 28,
    match_score: 91,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    address_mock: '38 Nguyễn Ư Dĩ, Thảo Điền, TP. Thủ Đức',
    district_mock: 'Thảo Điền',
    signature_item: 'Riverside Sunset Martini',
    best_photo_spot: 'Sàn gỗ sát mép nước ngắm hoàng hôn buông',
    vibe_description: 'Quán ven sông thoáng đãng với sàn gỗ ấm áp, góc ngắm hoàng hôn đắt giá bậc nhất Sài Gòn.',
  },
  {
    id: 'loc-6',
    name: 'S’mores Saigon Caffè',
    type: 'Cafe',
    aesthetic_tag: 'Vintage',
    is_indoor: true,
    open_hours: { open: '08:00', close: '22:00' },
    lat: 10.7710,
    lng: 106.6850,
    distance_km_mock: 1.1,
    eta_min_mock: 12,
    match_score: 92,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80',
    address_mock: '12 Cao Thắng, Phường 5, Quận 3',
    district_mock: 'Quận 3',
    signature_item: 'Cà phê ủ lạnh mứt cam',
    best_photo_spot: 'Mảng tường gạch nung thô và giếng trời xanh mát',
    vibe_description: 'Kiến trúc gạch thô mộc mạc đan xen cây xanh, tạo cảm giác thư thái và nghệ thuật.',
  },
  {
    id: 'loc-7',
    name: 'Saigon Waterbus Rooftop Cafe',
    type: 'Cafe',
    aesthetic_tag: 'Y2K',
    is_indoor: false, // Outdoor Pier Patio
    open_hours: { open: '06:30', close: '21:30' },
    lat: 10.7730,
    lng: 106.7060,
    distance_km_mock: 0.6,
    eta_min_mock: 8,
    match_score: 93,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    address_mock: 'Bến Bạch Đằng, Tôn Đức Thắng, Quận 1',
    district_mock: 'Quận 1',
    signature_item: 'Trà dưa lưới hoàng hôn Bạch Đằng',
    best_photo_spot: 'Cầu tàu hướng thẳng ra Landmark 81 và sông',
    vibe_description: 'Điểm đón gió sông mát lạnh, nơi check-in góc rộng ngắm tàu du ngoạn qua lại.',
  },
  {
    id: 'loc-8',
    name: 'The Factory Contemporary Arts',
    type: 'Museum',
    aesthetic_tag: 'Minimalist',
    is_indoor: true,
    open_hours: { open: '10:00', close: '17:00' }, // Closes early to test closed state
    lat: 10.8010,
    lng: 106.7380,
    distance_km_mock: 3.8,
    eta_min_mock: 25,
    match_score: 88,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&auto=format&fit=crop&q=80',
    address_mock: '15 Nguyễn Ư Dĩ, Thảo Điền, TP. Thủ Đức',
    district_mock: 'Thảo Điền',
    signature_item: 'Artisanal Cold Brew',
    best_photo_spot: 'Khối container nghệ thuật sắp đặt không gian mở',
    vibe_description: 'Trung tâm nghệ thuật đương đại với các khối hình học ấn tượng, background chụp hình siêu chất.',
  },
  {
    id: 'loc-9',
    name: 'Chiêu Cafe 24h Retro',
    type: 'Cafe',
    aesthetic_tag: 'Vintage',
    is_indoor: true,
    open_hours: { open: '00:00', close: '23:59' }, // 24/24 open
    lat: 10.7850,
    lng: 106.6900,
    distance_km_mock: 1.4,
    eta_min_mock: 15,
    match_score: 89,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
    address_mock: '195 Phạm Viết Chánh, Bình Thạnh',
    district_mock: 'Bình Thạnh',
    signature_item: 'Bạc xỉu ba tầng truyền thống',
    best_photo_spot: 'Góc radio cổ và băng cassette thập niên 90',
    vibe_description: 'Mở cửa 24/7 đón những tâm hồn cú đêm, góc hoài niệm đậm chất Sài Gòn xưa.',
  },
  {
    id: 'loc-10',
    name: 'Sunset Rooftop Lounge Đồng Khởi',
    type: 'Lounge',
    aesthetic_tag: 'Cyber-Pop',
    is_indoor: false, // Outdoor Terrace
    open_hours: { open: '17:00', close: '01:00' },
    lat: 10.7755,
    lng: 106.7040,
    distance_km_mock: 0.4,
    eta_min_mock: 5,
    match_score: 97,
    is_lumi_pick: false,
    photo_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    address_mock: 'Tầng Thượng, 151 Đồng Khởi, Quận 1',
    district_mock: 'Quận 1',
    signature_item: 'Aura Electric Cocktail',
    best_photo_spot: 'Góc view Nhà Hát Lớn và phố đi bộ về đêm',
    vibe_description: 'Sân thượng lộng gió ngay trung tâm, ánh đèn lung linh tạo nên những khung hình quyến rũ.',
  },
];

/**
 * Adapter helper to transform MockLocation into Location entity for PlaceDetailModal
 */
export function convertMockToLocation(mock: MockLocation): Location {
  const [openH] = mock.open_hours.open.split(':').map(Number);
  const [closeH] = mock.open_hours.close.split(':').map(Number);

  return {
    id: mock.id,
    name: mock.name,
    type: mock.type === 'Museum' ? 'Photospot' : (mock.type as any),
    aestheticTag: mock.aesthetic_tag,
    gps: {
      lat: mock.lat,
      lng: mock.lng,
      district: mock.district_mock,
    },
    address: mock.address_mock,
    isIndoor: mock.is_indoor,
    openHours: {
      open: openH || 8,
      close: closeH || 22,
    },
    signatureDrinkOrDish: mock.signature_item || 'Signature Mocktail',
    bestPhotoSpot: mock.best_photo_spot || 'Góc chụp ánh sáng tự nhiên',
    imageUrl: mock.photo_url,
    mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      mock.name + ' ' + mock.address_mock
    )}`,
    vibeDescription: mock.vibe_description || 'Không gian đậm chất vibe trẻ trung.',
    matchScore: mock.match_score,
  };
}

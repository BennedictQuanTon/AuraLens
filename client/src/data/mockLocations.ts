import type { Location, VibeStyle } from '../types/entityGraph.js';
import type { AppLanguage } from '../types/settings.js';

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
  address_mock_en?: string;
  district_mock: string;
  district_mock_en?: string;
  signature_item: string;
  signature_item_en: string;
  best_photo_spot: string;
  best_photo_spot_en: string;
  vibe_description: string;
  vibe_description_en: string;
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
    photo_url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop&q=80',
    address_mock: '26 Lý Tự Trọng, Bến Nghé, Quận 1',
    address_mock_en: '26 Ly Tu Trong, Ben Nghe, District 1',
    district_mock: 'Quận 1',
    district_mock_en: 'District 1',
    signature_item: 'Cyberpunk Neon Gin Fizz',
    signature_item_en: 'Cyberpunk Neon Gin Fizz',
    best_photo_spot: 'Đường hầm laser phản quang & quầy bar titan',
    best_photo_spot_en: 'Reflective laser tunnel & titanium bar counter',
    vibe_description: 'Không gian ánh sáng neon viễn tưởng, quầy bar kim loại phản chiếu outfit ánh bạc cực bén.',
    vibe_description_en: 'Futuristic neon lighting with sleek metallic surfaces that reflect silver metallic outfit accents.',
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
    photo_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    address_mock: '156B Pasteur, Bến Nghé, Quận 1',
    address_mock_en: '156B Pasteur, Ben Nghe, District 1',
    district_mock: 'Quận 1',
    district_mock_en: 'District 1',
    signature_item: 'Kyoto Ceremonial Matcha',
    signature_item_en: 'Kyoto Ceremonial Matcha',
    best_photo_spot: 'Cột bê tông nguyên khối & giếng trời ánh sáng',
    best_photo_spot_en: 'Monolithic concrete pillar & natural light well',
    vibe_description: 'Tone màu xi măng thô mộc và kính trong suốt, chuẩn phong cách Wabi-Sabi tinh tế.',
    vibe_description_en: 'Minimalist raw cement tones and glass architecture, embodying serene Wabi-Sabi aesthetics.',
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
    photo_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    address_mock: 'Tầng 75-76 Landmark 81, Bình Thạnh',
    address_mock_en: 'Floor 75-76 Landmark 81, Binh Thanh',
    district_mock: 'Bình Thạnh',
    district_mock_en: 'Binh Thanh',
    signature_item: 'Cloud 81 Sparkling Cocktail',
    signature_item_en: 'Cloud 81 Sparkling Cocktail',
    best_photo_spot: 'Ban công kính ngắm toàn cảnh Sài Gòn ở độ cao 350m',
    best_photo_spot_en: 'Infinity glass balcony overlooking Saigon from 350m high',
    vibe_description: 'Tầm nhìn bao trọn Sông Sài Gòn lộng gió, cực kỳ hợp cho các shoot hình thời trang đẳng cấp.',
    vibe_description_en: 'Breathtaking panoramic Saigon River skyline views, ideal for high-fashion photoshoot vibes.',
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
    photo_url: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800&auto=format&fit=crop&q=80',
    address_mock: '1 Thảo Điền, TP. Thủ Đức',
    address_mock_en: '1 Thao Dien, Thu Duc City',
    district_mock: 'Thảo Điền',
    district_mock_en: 'Thao Dien',
    signature_item: 'Cold Brew Inox Signature',
    signature_item_en: 'Stainless Steel Cold Brew Signature',
    best_photo_spot: 'Bàn inox tráng gương và bức tường kính lớn',
    best_photo_spot_en: 'Mirrored stainless steel bar & large glass facade',
    vibe_description: 'Nội thất inox tương lai kết hợp kính xuyên sáng bắt mắt, không gian hiện đại và yên tĩnh.',
    vibe_description_en: 'Futuristic stainless steel interior with ambient light streaming through glass for clean minimalist vibes.',
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
    photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    address_mock: '38 Nguyễn Ư Dĩ, Thảo Điền, TP. Thủ Đức',
    address_mock_en: '38 Nguyen U Di, Thao Dien, Thu Duc City',
    district_mock: 'Thảo Điền',
    district_mock_en: 'Thao Dien',
    signature_item: 'Riverside Sunset Martini',
    signature_item_en: 'Riverside Sunset Martini',
    best_photo_spot: 'Sàn gỗ sát mép nước ngắm hoàng hôn buông',
    best_photo_spot_en: 'Wooden deck patio right at the water edge during golden hour',
    vibe_description: 'Quán ven sông thoáng đãng với sàn gỗ ấm áp, góc ngắm hoàng hôn đắt giá bậc nhất Sài Gòn.',
    vibe_description_en: 'Breezy riverside outdoor terrace with warm wooden floors and the city finest sunset backdrop.',
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
    photo_url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=80',
    address_mock: '12 Cao Thắng, Phường 5, Quận 3',
    address_mock_en: '12 Cao Thang, Ward 5, District 3',
    district_mock: 'Quận 3',
    district_mock_en: 'District 3',
    signature_item: 'Cà phê ủ lạnh mứt cam',
    signature_item_en: 'Orange Marmalade Cold Brew Coffee',
    best_photo_spot: 'Mảng tường gạch nung thô và giếng trời xanh mát',
    best_photo_spot_en: 'Rustic terracotta brick walls & lush skylight courtyard',
    vibe_description: 'Kiến trúc gạch thô mộc mạc đan xen cây xanh, tạo cảm giác thư thái và nghệ thuật.',
    vibe_description_en: 'Artisanal raw brick architecture intertwined with lush greenery for a soothing retro-artistic vibe.',
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
    photo_url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop&q=80',
    address_mock: 'Bến Bạch Đằng, Tôn Đức Thắng, Quận 1',
    address_mock_en: 'Bach Dang Pier, Ton Duc Thang, District 1',
    district_mock: 'Quận 1',
    district_mock_en: 'District 1',
    signature_item: 'Trà dưa lưới hoàng hôn Bạch Đằng',
    signature_item_en: 'Bach Dang Melon Sunset Iced Tea',
    best_photo_spot: 'Cầu tàu hướng thẳng ra Landmark 81 và sông',
    best_photo_spot_en: 'Pier deck directly framing Landmark 81 across the Saigon River',
    vibe_description: 'Điểm đón gió sông mát lạnh, nơi check-in góc rộng ngắm tàu du ngoạn qua lại.',
    vibe_description_en: 'Open-air waterfront patio with cool river breezes, perfect for wide-angle city skyline shots.',
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
    photo_url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&auto=format&fit=crop&q=80',
    address_mock: '15 Nguyễn Ư Dĩ, Thảo Điền, TP. Thủ Đức',
    address_mock_en: '15 Nguyen U Di, Thao Dien, Thu Duc City',
    district_mock: 'Thảo Điền',
    district_mock_en: 'Thao Dien',
    signature_item: 'Artisanal Cold Brew',
    signature_item_en: 'Artisanal Cold Brew Special',
    best_photo_spot: 'Khối container nghệ thuật sắp đặt không gian mở',
    best_photo_spot_en: 'Geometric shipping container art installations',
    vibe_description: 'Trung tâm nghệ thuật đương đại với các khối hình học ấn tượng, background chụp hình siêu chất.',
    vibe_description_en: 'Contemporary art gallery hub with bold geometric architecture and artistic photo backdrops.',
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
    photo_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    address_mock: '195 Phạm Viết Chánh, Bình Thạnh',
    address_mock_en: '195 Pham Viet Chanh, Binh Thanh',
    district_mock: 'Bình Thạnh',
    district_mock_en: 'Binh Thanh',
    signature_item: 'Bạc xỉu ba tầng truyền thống',
    signature_item_en: 'Classic 3-Layer Vietnamese Milk Coffee (Bac Xiu)',
    best_photo_spot: 'Góc radio cổ và băng cassette thập niên 90',
    best_photo_spot_en: 'Vintage radio corner & 90s cassette tape wall',
    vibe_description: 'Mở cửa 24/7 đón những tâm hồn cú đêm, góc hoài niệm đậm chất Sài Gòn xưa.',
    vibe_description_en: '24/7 cozy night-owl sanctuary filled with nostalgic 90s Saigon memorabilia and warm lighting.',
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
    photo_url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
    address_mock: 'Tầng Thượng, 151 Đồng Khởi, Quận 1',
    address_mock_en: 'Rooftop, 151 Dong Khoi, District 1',
    district_mock: 'Quận 1',
    district_mock_en: 'District 1',
    signature_item: 'Aura Electric Cocktail',
    signature_item_en: 'Aura Electric Signature Cocktail',
    best_photo_spot: 'Góc view Nhà Hát Lớn và phố đi bộ về đêm',
    best_photo_spot_en: 'Saigon Opera House rooftop panoramic night view',
    vibe_description: 'Sân thượng lộng gió ngay trung tâm, ánh đèn lung linh tạo nên những khung hình quyến rũ.',
    vibe_description_en: 'Central rooftop terrace with vibrant ambient lighting and glittering city nightscape views.',
  },
];

/**
 * Adapter helper to transform MockLocation into Location entity for PlaceDetailModal
 */
export function convertMockToLocation(mock: MockLocation, language: AppLanguage = 'en'): Location {
  const isEn = language === 'en';
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
      district: isEn ? (mock.district_mock_en || mock.district_mock) : mock.district_mock,
    },
    address: isEn ? (mock.address_mock_en || mock.address_mock) : mock.address_mock,
    isIndoor: mock.is_indoor,
    openHours: {
      open: openH || 8,
      close: closeH || 22,
    },
    signatureDrinkOrDish: isEn
      ? (mock.signature_item_en || mock.signature_item)
      : (mock.signature_item || mock.signature_item_en),
    bestPhotoSpot: isEn
      ? (mock.best_photo_spot_en || mock.best_photo_spot)
      : (mock.best_photo_spot || mock.best_photo_spot_en),
    imageUrl: mock.photo_url,
    mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      mock.name + ' ' + mock.address_mock
    )}`,
    vibeDescription: isEn
      ? (mock.vibe_description_en || mock.vibe_description)
      : (mock.vibe_description || mock.vibe_description_en),
    matchScore: mock.match_score,
  };
}

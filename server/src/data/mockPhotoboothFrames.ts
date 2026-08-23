import { PhotoboothFrame } from '../types/entityGraph.js';

export const MOCK_PHOTOBOOTH_FRAMES: PhotoboothFrame[] = [
  {
    id: 'frame-01',
    name: 'Y2K Cyber Glitch Magazine',
    vibeTag: 'Cyber-Pop',
    category: 'Magazine Cover',
    aspectRatio: '9:16',
    frameOverlayUrl: '/frames/frame_cyber_glitch.svg',
    previewUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    stickers: [
      { id: 'stk-01', name: 'Cyber Star 3D', svgOrPngUrl: '/stickers/star_3d.svg' },
      { id: 'stk-02', name: 'BarCode 2026', svgOrPngUrl: '/stickers/barcode.svg' },
      { id: 'stk-03', name: 'Lumi Flame Acid', svgOrPngUrl: '/stickers/flame_acid.svg' },
    ],
  },
  {
    id: 'frame-02',
    name: 'Retro 35mm Film Strip (Sài Gòn 2000s)',
    vibeTag: 'Vintage',
    category: 'Y2K Film',
    aspectRatio: '9:16',
    frameOverlayUrl: '/frames/frame_film_strip.svg',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    stickers: [
      { id: 'stk-04', name: 'Date Stamp 2026.08.24', svgOrPngUrl: '/stickers/datestamp.svg' },
      { id: 'stk-05', name: 'Kodak Gold 400', svgOrPngUrl: '/stickers/kodak_tag.svg' },
    ],
  },
  {
    id: 'frame-03',
    name: 'Vogue Fashion Week Edition',
    vibeTag: 'Minimalist',
    category: 'Magazine Cover',
    aspectRatio: '9:16',
    frameOverlayUrl: '/frames/frame_vogue_clean.svg',
    previewUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
    stickers: [
      { id: 'stk-06', name: 'Editorial Bar', svgOrPngUrl: '/stickers/editorial_bar.svg' },
      { id: 'stk-07', name: 'Issue 08 Autumn', svgOrPngUrl: '/stickers/issue_tag.svg' },
    ],
  },
  {
    id: 'frame-04',
    name: 'Dopamine Pop Pastel Candy',
    vibeTag: 'Y2K',
    category: 'Dopamine Pop',
    aspectRatio: '9:16',
    frameOverlayUrl: '/frames/frame_dopamine_pop.svg',
    previewUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
    stickers: [
      { id: 'stk-08', name: 'Pixel Heart Glitter', svgOrPngUrl: '/stickers/heart_pixel.svg' },
      { id: 'stk-09', name: 'Cute Bunny Tamagotchi', svgOrPngUrl: '/stickers/tamagotchi.svg' },
      { id: 'stk-10', name: 'Sparkle Neon Star', svgOrPngUrl: '/stickers/sparkle.svg' },
    ],
  },
  {
    id: 'frame-05',
    name: 'Neon Matrix Grid Cityscape',
    vibeTag: 'Cyber-Pop',
    category: 'Cyberpunk Neon',
    aspectRatio: '9:16',
    frameOverlayUrl: '/frames/frame_matrix_grid.svg',
    previewUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    stickers: [
      { id: 'stk-11', name: 'Laser Crosshair', svgOrPngUrl: '/stickers/crosshair.svg' },
      { id: 'stk-12', name: 'Cyber Warning Tag', svgOrPngUrl: '/stickers/warning_tag.svg' },
    ],
  },
  {
    id: 'frame-06',
    name: 'Old Money Royal Aesthetic',
    vibeTag: 'Old Money',
    category: 'Vintage Tape',
    aspectRatio: '9:16',
    frameOverlayUrl: '/frames/frame_royal_gold.svg',
    previewUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
    stickers: [
      { id: 'stk-13', name: 'Wax Stamp Seal', svgOrPngUrl: '/stickers/wax_seal.svg' },
      { id: 'stk-14', name: 'Gold Leaf Border', svgOrPngUrl: '/stickers/gold_leaf.svg' },
    ],
  },
];

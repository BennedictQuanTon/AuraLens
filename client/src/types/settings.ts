export type AppLanguage = 'en' | 'vi';

export type AppColorTheme = 'cyber_pop' | 'amethyst' | 'sunset' | 'matrix';

export interface UserProfileState {
  name: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  favoriteVibe: string;
  genderTitle: 'Queen' | 'King' | 'Icon';
}

export interface ThemeOption {
  id: AppColorTheme;
  name: string;
  colors: [string, string]; // Primary, Accent
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'cyber_pop',
    name: 'Cyber-Pop Neon',
    colors: ['#D4FF00', '#FF2E93'],
    description: 'Electric Lime & Candy Pink',
  },
  {
    id: 'amethyst',
    name: 'Midnight Amethyst',
    colors: ['#7C3AED', '#00F5FF'],
    description: 'Ultra Violet & Cyber Cyan',
  },
  {
    id: 'sunset',
    name: 'Sunset Euphoria',
    colors: ['#FF6B6B', '#FFD93D'],
    description: 'Warm Coral & Golden Glow',
  },
  {
    id: 'matrix',
    name: 'Emerald Matrix',
    colors: ['#10B981', '#06B6D4'],
    description: 'Futuristic Emerald & Ice Blue',
  },
];

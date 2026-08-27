import type { VibeStyle, WeatherContext } from '../types/entityGraph.js';

export interface VaultPhotoItem {
  id: string;
  type: 'ootd' | 'photobooth';
  image: string;
  score?: number;
  style?: VibeStyle;
  title?: string;
  dateVi: string;
  dateEn: string;
  timestamp: number;
  weatherSnapshot?: WeatherContext;
  lumiComment?: string;
}

const STORAGE_KEY = 'auralens_user_vault';
const DEVICE_ID_KEY = 'auralens_device_id';

/**
 * Returns or generates a unique UUID for this client device
 */
export function getOrCreateDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = 'aura_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

/**
 * Format timestamp into friendly bilingual string
 */
export function formatCaptureDate(date: Date): { dateVi: string; dateEn: string } {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return {
    dateVi: `Hôm nay, ${timeStr} (${day}/${month}/${year})`,
    dateEn: `Today, ${timeStr} (${monthNamesEn[date.getMonth()]} ${day}, ${year})`,
  };
}

/**
 * Default starter demo items shown only when vault is completely fresh
 */
const DEFAULT_VAULT_ITEMS: VaultPhotoItem[] = [
  {
    id: 'vault-demo-1',
    type: 'ootd',
    dateVi: 'Hôm nay, 20:30',
    dateEn: 'Today, 20:30',
    style: 'Cyber-Pop',
    score: 96,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    timestamp: Date.now() - 3600000,
    lumiComment: 'Boxy blazer and chrome details are absolute perfection!',
  },
  {
    id: 'vault-demo-2',
    type: 'photobooth',
    dateVi: 'Hôm qua, 16:45',
    dateEn: 'Yesterday, 16:45',
    style: 'Y2K',
    score: 92,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
    timestamp: Date.now() - 86400000,
    lumiComment: 'Hologram silver top pops under flash lighting.',
  },
  {
    id: 'vault-demo-3',
    type: 'ootd',
    dateVi: '24 Tháng 8, 14:15',
    dateEn: 'Aug 24, 14:15',
    style: 'Minimalist',
    score: 94,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    timestamp: Date.now() - 3 * 86400000,
    lumiComment: 'Clean earth tones and crisp silhouettes.',
  },
];

class VaultStorageService {
  private memoryCache: VaultPhotoItem[] | null = null;

  /**
   * Retrieves all photo vault items for this device
   */
  public getVaultItems(): VaultPhotoItem[] {
    if (this.memoryCache) return this.memoryCache;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryCache = parsed;
          return parsed;
        }
      }
    } catch (error) {
      console.warn('[VaultStorage] Failed to read from storage:', error);
    }

    // Fallback to default items on first launch
    this.memoryCache = [...DEFAULT_VAULT_ITEMS];
    this.persist();
    return this.memoryCache;
  }

  /**
   * Saves a newly captured OOTD or Photobooth photo to local vault
   */
  public saveCapture(item: {
    type: 'ootd' | 'photobooth';
    image: string;
    score?: number;
    style?: VibeStyle;
    title?: string;
    weatherSnapshot?: WeatherContext;
    lumiComment?: string;
  }): VaultPhotoItem {
    const current = this.getVaultItems();
    const now = new Date();
    const { dateVi, dateEn } = formatCaptureDate(now);

    const newItem: VaultPhotoItem = {
      id: `vault-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: item.type,
      image: item.image,
      score: item.score ?? 95,
      style: item.style ?? 'Cyber-Pop',
      title: item.title,
      dateVi,
      dateEn,
      timestamp: now.getTime(),
      weatherSnapshot: item.weatherSnapshot,
      lumiComment: item.lumiComment,
    };

    // Prepend to top of list
    this.memoryCache = [newItem, ...current];
    this.persist();
    return newItem;
  }

  /**
   * Deletes a photo from the local vault
   */
  public deleteItem(id: string): boolean {
    const current = this.getVaultItems();
    this.memoryCache = current.filter((item) => item.id !== id);
    this.persist();
    return true;
  }

  /**
   * Clears all items from the vault
   */
  public clearAll(): void {
    this.memoryCache = [];
    localStorage.removeItem(STORAGE_KEY);
  }

  private persist(): void {
    try {
      if (this.memoryCache) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.memoryCache));
      }
    } catch (e) {
      console.warn('[VaultStorage] Storage quota exceeded when saving image:', e);
    }
  }
}

export const vaultStorage = new VaultStorageService();

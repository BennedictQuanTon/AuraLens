import { describe, it, expect } from 'vitest';
import { locationService } from '../src/services/locationService.js';

describe('LocationService Unit Tests (Weather & Time Awareness)', () => {
  it('should strictly return ONLY indoor locations when isRaining is true', () => {
    const response = locationService.recommendPlaces({
      aestheticTag: 'Cyber-Pop',
      weather: {
        isRaining: true,
        currentHour: 19,
        temperature: 25,
      },
    });

    expect(response.recommendedPlaces.length).toBeGreaterThan(0);
    // 100% of locations must be indoor
    const allIndoor = response.recommendedPlaces.every((place) => place.isIndoor === true);
    expect(allIndoor).toBe(true);

    // Make sure no rooftop/outdoor places like Zion Sky Lounge or Katinat Bạch Đằng outdoor are returned
    const outdoorPlaces = response.recommendedPlaces.filter((place) => !place.isIndoor);
    expect(outdoorPlaces.length).toBe(0);
    expect(response.lumiSuggestion).toContain('mưa');
  });

  it('should correctly filter places open late at night (23h)', () => {
    const response = locationService.recommendPlaces({
      aestheticTag: 'Streetwear',
      weather: {
        isRaining: false,
        currentHour: 23, // 11 PM
      },
    });

    expect(response.recommendedPlaces.length).toBeGreaterThan(0);
    // Ensure places that close at 21h or 22h are not returned
    response.recommendedPlaces.forEach((place) => {
      const isOpen = locationService.isLocationOpen(place.openHours, 23);
      expect(isOpen).toBe(true);
    });
  });

  it('should rank locations with exact aesthetic tag match higher', () => {
    const response = locationService.recommendPlaces({
      aestheticTag: 'Minimalist',
      weather: {
        isRaining: false,
        currentHour: 14, // 2 PM
      },
    });

    expect(response.recommendedPlaces.length).toBeGreaterThan(0);
    const topPlace = response.recommendedPlaces[0];
    expect(topPlace.aestheticTag).toBe('Minimalist');
    expect(topPlace.matchScore).toBeGreaterThanOrEqual(90);
  });
});

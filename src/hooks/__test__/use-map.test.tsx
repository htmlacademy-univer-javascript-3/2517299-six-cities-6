import { renderHook } from '@testing-library/react';
import useMap from '../use-map';
import { Location } from '../../types/offers';

describe('useMap', () => {
  it('should return null if mapRef.current is null', () => {
    const mapRef: { current: HTMLDivElement | null } = { current: null };
    const location: Location = { latitude: 50, longitude: 50 };
    const zoom = 10;

    const { result } = renderHook(() => useMap({ mapRef, location, zoom }));

    expect(result.current).toBeNull();
  });
});

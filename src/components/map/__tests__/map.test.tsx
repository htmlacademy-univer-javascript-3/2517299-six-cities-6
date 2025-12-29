import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Map from '..';
import * as useMapModule from '../../../hooks/use-map';
import { Offer } from '../../../types/offers';
import leaflet from 'leaflet';

describe('Map component', () => {
  const offers: Offer[] = [
    { id: '1', location: { latitude: 50, longitude: 50 } } as Offer,
    { id: '2', location: { latitude: 51, longitude: 51 } } as Offer,
  ];

  const center = { latitude: 50, longitude: 50 };

  beforeEach(() => {
    vi.spyOn(useMapModule, 'default').mockImplementation(
      (): leaflet.Map =>
        ({
          removeLayer: vi.fn(),
          addLayer: vi.fn(),
          setView: vi.fn(),
          addTo: vi.fn(),
          on: vi.fn(),
          off: vi.fn(),
        } as unknown as leaflet.Map)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the map container', () => {
    render(<Map offers={offers} center={center} />);
    const mapContainer = screen.getByRole('region');
    expect(mapContainer).toBeInTheDocument();
  });

  it('renders without activeOfferId', () => {
    render(<Map offers={offers} center={center} />);
    const mapContainer = screen.getByRole('region');
    expect(mapContainer).toBeInTheDocument();
  });

  it('renders with activeOfferId', () => {
    render(<Map offers={offers} center={center} activeOfferId="1" />);
    const mapContainer = screen.getByRole('region');
    expect(mapContainer).toBeInTheDocument();
  });
});

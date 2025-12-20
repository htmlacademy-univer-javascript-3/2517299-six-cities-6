import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { Location } from '../types/offers';

type UseMapProps = {
  mapRef: React.RefObject<HTMLDivElement | null>;
  location: Location;
  zoom: number;
};

function useMap({ mapRef, location, zoom }: UseMapProps): leaflet.Map | null {
  const mapInstanceRef = useRef<leaflet.Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstanceRef.current === null) {
      mapInstanceRef.current = leaflet
        .map(mapRef.current)
        .setView([location.latitude, location.longitude], zoom);

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        })
        .addTo(mapInstanceRef.current);
    }
  }, [mapRef, location, zoom]);

  useEffect(() => {
    if (mapInstanceRef.current !== null) {
      mapInstanceRef.current.setView(
        [location.latitude, location.longitude],
        zoom
      );
    }
  }, [location, zoom]);

  return mapInstanceRef.current;
}

export default useMap;

import { useEffect } from 'react';
import leaflet from 'leaflet';
import { Offer } from '../types/offers';

const defaultIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const activeIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const useMarkers = (
  map: leaflet.Map | null,
  offers: Offer[],
  activeOfferId?: string | null
) => {
  useEffect(() => {
    if (!map) {
      return;
    }

    const markersLayer = leaflet.layerGroup().addTo(map);

    offers.forEach((offer) => {
      leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: offer.id === activeOfferId ? activeIcon : defaultIcon,
        })
        .addTo(markersLayer);
    });

    return () => {
      map.removeLayer(markersLayer);
    };
  }, [map, offers, activeOfferId]);
};

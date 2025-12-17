import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { Offer } from '../../types/offers';
import useMap from '../../hooks/use-map';

import styles from './styles.module.css';

const defaultIcon = leaflet.icon({
  iconUrl: 'pin.svg',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const activeIcon = leaflet.icon({
  iconUrl: 'pin-active.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

leaflet.Marker.prototype.options.icon = leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapProps = {
  offers: Offer[];
  center: {
    latitude: number;
    longitude: number;
  };
  activeOfferId?: string | null;
};

const DEFAULT_ZOOM = 13;

function Map({ offers, center, activeOfferId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const map = useMap({
    mapRef,
    location: center,
    zoom: DEFAULT_ZOOM,
  });

  useEffect(() => {
    if (!map) {
      return;
    }

    const markersLayer = leaflet.layerGroup().addTo(map);

    offers.forEach((offer) => {
      leaflet
        .marker([offer.city.location.latitude, offer.city.location.longitude], {
          icon: offer.id === activeOfferId ? activeIcon : defaultIcon,
        })
        .addTo(markersLayer);
    });

    return () => {
      map.removeLayer(markersLayer);
    };
  }, [map, offers, activeOfferId]);

  return (
    <div className={styles.map}>
      <div className={styles.map__container} ref={mapRef} />
    </div>
  );
}

export default Map;

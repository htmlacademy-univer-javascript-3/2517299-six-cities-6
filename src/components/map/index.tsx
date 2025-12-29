import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { useMarkers } from '../../hooks/use-markers';
import { Offer } from '../../types/offers';
import styles from './styles.module.css';

const DEFAULT_ZOOM = 13;

type MapProps = {
  offers: Offer[];
  center: {
    latitude: number;
    longitude: number;
  };
  activeOfferId?: string | null;
};

function Map({ offers, center, activeOfferId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const map = useMap({
    mapRef,
    location: center,
    zoom: DEFAULT_ZOOM,
  });

  useMarkers(map, offers, activeOfferId);

  return (
    <div className={styles.map}>
      <div className={styles.map__container} ref={mapRef} role="region" />
    </div>
  );
}

export default Map;

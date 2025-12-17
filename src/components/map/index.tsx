import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Offer } from '../../types/offers';
import useMap from '../../hooks/use-map';

import styles from './styles.module.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

leaflet.Marker.prototype.options.icon = leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapProps = {
  offers: Offer[];
};

const DEFAULT_ZOOM = 13;

function Map({ offers }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const cityLocation = offers[0]?.city.location;

  const map = useMap({
    mapRef,
    location: cityLocation ?? {
      latitude: 0,
      longitude: 0,
    },
    zoom: DEFAULT_ZOOM,
  });

  useEffect(() => {
    if (!map || offers.length === 0) {
      return;
    }

    const markersLayer = leaflet.layerGroup().addTo(map);

    offers.forEach((offer) => {
      leaflet
        .marker([
          offer.city.location.latitude,
          offer.city.location.longitude,
        ])
        .addTo(markersLayer);
    });

    return () => {
      map.removeLayer(markersLayer);
    };
  }, [map, offers]);


  return (
    <div className={styles.map}>
      {offers.length > 0 && (
        <div className={styles['map__container']} ref={mapRef} />
      )}
    </div>
  );
}

export default Map;

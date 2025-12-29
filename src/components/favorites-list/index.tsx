import React, { memo, useMemo } from 'react';
import { Offer } from '../../types/offers';
import PlaceCard from '../place-card';

type FavoritesListProps = {
  offers: Offer[];
  isAuthorized: boolean;
};

const FavoritesList: React.FC<FavoritesListProps> = ({
  offers,
  isAuthorized,
}) => {
  const offersByCity = useMemo(() => {
    const grouped: Record<string, Offer[]> = {};
    offers.forEach((offer) => {
      const city = offer.city.name;
      if (!grouped[city]) {
        grouped[city] = [];
      }
      grouped[city].push(offer);
    });
    return grouped;
  }, [offers]);

  const cities = useMemo(
    () => Object.keys(offersByCity).sort(),
    [offersByCity]
  );

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {offersByCity[city].map((offer) => (
              <PlaceCard
                key={offer.id}
                offer={offer}
                isAuthorized={isAuthorized}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

const MemoFavoritesList = memo(FavoritesList);
MemoFavoritesList.displayName = 'FavoritesList';

export default MemoFavoritesList;

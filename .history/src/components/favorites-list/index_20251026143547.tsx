import { Offer } from '../../types/offers';
import PlaceCard from '../place-card';

type FavoritesListProps = {
  offers: Offer[];
};

function FavoritesList({ offers }: FavoritesListProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const offersByCity = favoriteOffers.reduce<Record<string, Offer[]>>(
    (acc, offer) => {
      if (!acc[offer.city]) {
        acc[offer.city] = [];
      }
      acc[offer.city].push(offer);
      return acc;
    },
    {}
  );

  return (
    <ul className="favorites__list">
      {Object.entries(offersByCity).map(([city, cityOffers]) => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <PlaceCard key={offer.id} offer={offer} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;

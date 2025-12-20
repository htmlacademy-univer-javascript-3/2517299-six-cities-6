import { Offer } from '../../types/offers';
import PlaceCard from '../place-card';

type FavoritesListProps = {
  offers: Offer[];
};

function FavoritesList({ offers }: FavoritesListProps): JSX.Element {
  const cities = Array.from(
    new Set(offers.map((offer) => offer.city.name))
  ).sort();

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
            {offers
              .filter((offer) => offer.city.name === city)
              .map((offer) => (
                <PlaceCard key={offer.id} offer={offer} />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;

import { Offer } from '../../types/offers';
import PlaceCard from '../place-card';

type OffersListProps = {
  offers: Offer[];
  onHover?: (id: string | null) => void;
};

function OffersList({ offers, onHover }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} onHover={onHover} />
      ))}
    </div>
  );
}

export default OffersList;

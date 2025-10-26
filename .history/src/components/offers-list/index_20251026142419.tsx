import { useState } from 'react';
import { Offer } from '../../types/offers';
import PlaceCard from '../place-card';

type OffersListProps = {
  offers: Offer[];
};

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  const handleCardHover = (id: number) => {
    setActiveOfferId(id);
  };

  const handleCardLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onHover={handleCardHover}
          onLeave={handleCardLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;

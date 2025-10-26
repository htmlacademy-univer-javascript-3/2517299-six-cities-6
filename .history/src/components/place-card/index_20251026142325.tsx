import React from 'react';
import { Offer } from '../../types/offers';

type PlaceCardProps = {
  offer: Offer;
  onHover: (id: number) => void;
  onLeave: () => void;
};

const PlaceCard: React.FC<PlaceCardProps> = ({ offer, onHover, onLeave }) => (
  <article
    className="cities__card place-card"
    onMouseEnter={() => onHover(offer.id)}
    onMouseLeave={onLeave}
  >
    {offer.isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img
          className="place-card__image"
          src={offer.previewImage}
          width="260"
          height="200"
          alt={offer.title}
        />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;80</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button button ${
            offer.isFavorite ? 'place-card__bookmark-button--active' : ''
          }`}
          type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">
            {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
          </span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: '80%' }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{offer.title}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);

export default PlaceCard;

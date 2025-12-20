import React from 'react';
import { Offer } from '../../types/offers';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { toggleFavoriteStatus } from '../../store/app-actions';

type PlaceCardProps = {
  offer: Offer;
  onHover?: (id: string | null) => void;
};

const PlaceCard: React.FC<PlaceCardProps> = ({ offer, onHover }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleBookmarkClick = () => {
    const status: 0 | 1 = offer.isFavorite ? 0 : 1;
    dispatch(toggleFavoriteStatus({ offerId: offer.id, status }));
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onHover && onHover(offer.id)}
      onMouseLeave={() => onHover && onHover(null)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            onClick={handleBookmarkClick}
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
};

export default PlaceCard;

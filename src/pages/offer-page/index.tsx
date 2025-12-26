import React, { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form';
import ReviewsList from '../../components/review-list';
import Map from '../../components/map';
import OffersList from '../../components/offers-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useFavorite } from '../../hooks/use-favorite';
import { useFetchOfferData } from '../../hooks/use-fetch-offer-data';
import Header from '../../components/header';

const OfferPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { authorizationStatus, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { currentOffer, isNotFound, nearbyOffers, comments } = useSelector(
    (state: RootState) => state.offer
  );

  const { favoriteOffers } = useSelector((state: RootState) => state.offers);

  const { toggleFavorite } = useFavorite();

  const isAuthorized = authorizationStatus === 'AUTH';

  useFetchOfferData(id);

  const nearbyOffersToShow = useMemo(
    () => nearbyOffers.slice(0, 3),
    [nearbyOffers]
  );

  if (isNotFound) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="page">
      <Header
        isAuthorized={isAuthorized}
        user={user}
        favoriteCount={favoriteOffers?.length ?? 0}
      />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer?.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Interior" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer?.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer?.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    currentOffer?.isFavorite
                      ? 'offer__bookmark-button--active'
                      : ''
                  }`}
                  type="button"
                  onClick={() =>
                    currentOffer &&
                    toggleFavorite(currentOffer.id, currentOffer.isFavorite)}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer?.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer?.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer?.bedrooms}{' '}
                  {currentOffer?.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {'Max'} {currentOffer?.maxAdults}{' '}
                  {currentOffer?.maxAdults === 1 ? 'Adult' : 'Adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">
                  &euro;{currentOffer?.price}
                </b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer?.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer?.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer?.host.name}
                  </span>
                  {currentOffer?.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer?.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={comments} />
                {isAuthorized && <ReviewForm />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            {currentOffer && (
              <Map
                offers={nearbyOffersToShow}
                center={currentOffer.city.location}
              />
            )}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList offers={nearbyOffersToShow} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
export default OfferPage;

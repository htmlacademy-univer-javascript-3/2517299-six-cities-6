import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OffersList from '../../components/offers-list';
import Map from '../../components/map';
import { AppDispatch, RootState } from '../../store';
import CitiesList from '../../components/cities-list';
import SortingOptions, { SortingType } from '../../components/sorting-options';
import { selectSortedOffers } from '../../store/offers/offers.selectors';
import { setSortType } from '../../store/offers/offers.slice';
import { useFetchFavoritesIfAuth } from '../../hooks/use-fetch-favorites';
import Header from '../../components/header';
import MainEmpty from '../main-empty-page';

const MainPage: React.FC = () => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { city, offers, sortType, favoriteOffers } = useSelector(
    (state: RootState) => state.offers
  );

  const { authorizationStatus, user } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthorized = authorizationStatus === 'AUTH';

  useFetchFavoritesIfAuth();

  const filteredOffers = offers.filter((offer) => offer.city.name === city);
  const sortedOffers = useSelector(selectSortedOffers);

  const cityLocation = useMemo(
    () => sortedOffers[0]?.city.location,
    [sortedOffers]
  );

  const handleOfferHover = useCallback((id: string | null) => {
    setActiveOfferId(id);
  }, []);

  const handleSortChange = useCallback(
    (type: SortingType) => dispatch(setSortType(type)),
    [dispatch]
  );

  const hasOffers = filteredOffers.length > 0;

  return (
    <div className="page page--gray page--main">
      <Header
        isAuthorized={isAuthorized}
        user={user}
        favoriteCount={favoriteOffers?.length ?? 0}
      />

      {hasOffers ? (
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>

          <div className="tabs">
            <section className="locations container">
              <CitiesList />
            </section>
          </div>

          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filteredOffers.length} places to stay in {city}
                </b>

                <SortingOptions
                  currentSort={sortType as SortingType}
                  onChangeSort={handleSortChange}
                />

                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={sortedOffers}
                    onHover={handleOfferHover}
                    isAuthorized={isAuthorized}
                  />
                </div>
              </section>

              <div className="cities__right-section">
                <section className="cities__map map">
                  {cityLocation && (
                    <Map
                      offers={sortedOffers}
                      center={cityLocation}
                      activeOfferId={activeOfferId}
                    />
                  )}
                </section>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <MainEmpty city={city} />
      )}
    </div>
  );
};
export default MainPage;

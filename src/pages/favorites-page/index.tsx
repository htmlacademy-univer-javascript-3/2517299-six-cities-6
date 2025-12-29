import React, { useEffect } from 'react';
import FavoritesList from '../../components/favorites-list';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteOffers } from '../../store/offers/offers.thunks';
import Header from '../../components/header';

const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { favoriteOffers } = useSelector((state: RootState) => state.offers);
  const { authorizationStatus, user } = useSelector(
    (state: RootState) => state.auth
  );
  const isAuthorized = authorizationStatus === 'AUTH';

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, isAuthorized]);

  return (
    <div className="page">
      <Header
        isAuthorized={isAuthorized}
        user={user}
        favoriteCount={favoriteOffers.length}
      />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {favoriteOffers.length === 0 ? (
              <p>No saved offers yet</p>
            ) : (
              <FavoritesList offers={favoriteOffers} isAuthorized={isAuthorized}/>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;

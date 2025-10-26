import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './main-page';
import LoginPage from './login-page';
import FavoritesPage from './favorites-page';
import OfferPage from './offer-page';
import NotFoundPage from './not-found-page';
import PrivateRoute from './private-route';
import { Offer } from './mocks/offers';

type AppProps = {
  offers: Offer[];
};

const App: React.FC<AppProps> = ({ offers }) => {
  const isAuthorized = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage offers={offers} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

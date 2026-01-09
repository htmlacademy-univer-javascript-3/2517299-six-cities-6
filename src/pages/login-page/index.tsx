import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginForm } from '../../hooks/use-login-form';
import { AuthorizationStatus } from '../../types/auth';
import { CityNames } from '../../types/offers';
import { setCity } from '../../store/offers/offers.slice';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const authorizationStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [randomCity, setRandomCity] = useState<CityNames | null>(null);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const { handleSubmit, isSubmitting, errorMessage } = useLoginForm(formData);

  useEffect(() => {
    const cities = Object.values(CityNames);
    const randomIndex = Math.floor(Math.random() * cities.length);
    setRandomCity(cities[randomIndex]);
  }, []);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  const handleCityClick = useCallback(
    (city: CityNames) => {
      dispatch(setCity(city));
    },
    [dispatch]
  );

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              role="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMessage && <p className="login__error">{errorMessage}</p>}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isSubmitting}
              >
                Sign in
              </button>
            </form>
          </section>
          {randomCity && (
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link
                  className="locations__item-link"
                  to="/"
                  onClick={() => handleCityClick(randomCity)}
                >
                  <span>{randomCity}</span>
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

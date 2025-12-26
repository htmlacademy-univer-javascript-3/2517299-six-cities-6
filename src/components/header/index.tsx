import React, { memo } from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  isAuthorized: boolean;
  user?: { email: string; avatarUrl: string } | null;
  favoriteCount: number;
};

const HeaderComponent: React.FC<HeaderProps> = ({
  isAuthorized,
  user,
  favoriteCount,
}) => {
  const handleSignOut = () => {
    localStorage.removeItem('six-cities-token');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to="/"
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorized && user ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="/favorites"
                    >
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{ backgroundImage: `url(${user.avatarUrl})` }}
                      />
                      <span className="header__user-name user__name">
                        {user.email}
                      </span>
                    </Link>
                    <span className="header__favorite-count">
                      {favoriteCount}
                    </span>
                  </li>
                  <li className="header__nav-item">
                    <button
                      className="header__nav-link header__signout"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const Header = memo(HeaderComponent);

export default Header;

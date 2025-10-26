import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const NotFoundPage: React.FC = () => (
  <div className="not-found">
    <h1 className="not-found__title">404</h1>
    <p className="not-found__text">Page Not Found</p>
    <Link to="/" className="not-found__link">
            Вернуться на главную
    </Link>
  </div>
);

export default NotFoundPage;

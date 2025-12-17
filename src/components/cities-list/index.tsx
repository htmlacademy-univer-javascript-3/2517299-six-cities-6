import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setCity } from '../../store/reducer';

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const CitiesList: React.FC = () => {
  const selectedCity = useSelector((state: RootState) => state.app.city);
  const dispatch = useDispatch<AppDispatch>();

  const handleCityClick = (city: string) => {
    dispatch(setCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${city === selectedCity ? 'tabs__item--active' : ''}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCityClick(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CitiesList;

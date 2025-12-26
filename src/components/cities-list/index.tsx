import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectCity } from '../../store/offers/offers.selectors';
import { setCity } from '../../store/offers/offers.slice';

const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const CitiesList: React.FC = () => {
  const selectedCity = useSelector(selectCity);

  const dispatch = useDispatch<AppDispatch>();

  const handleCityClick = useCallback(
    (city: string) => {
      dispatch(setCity(city));
    },
    [dispatch]
  );

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${
              city === selectedCity ? 'tabs__item--active' : ''
            }`}
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

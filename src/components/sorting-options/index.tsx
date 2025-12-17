import React from 'react';

export type SortingType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type SortingOptionsProps = {
  currentSort: SortingType;
  onChangeSort: (sort: SortingType) => void;
};

const SORT_TYPES: SortingType[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

const SortingOptions: React.FC<SortingOptionsProps> = ({ currentSort, onChangeSort }) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex={0}>
      {currentSort}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className="places__options places__options--custom places__options--opened">
      {SORT_TYPES.map((type) => (
        <li
          key={type}
          className={`places__option ${type === currentSort ? 'places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => onChangeSort(type)}
        >
          {type}
        </li>
      ))}
    </ul>
  </form>
);

export default SortingOptions;

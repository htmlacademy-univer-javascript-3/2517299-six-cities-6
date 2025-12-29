import React, { useCallback, useState } from 'react';

export type SortingType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

type SortingOptionsProps = {
  currentSort: SortingType;
  onChangeSort: (sort: SortingType) => void;
};

const SORT_TYPES: SortingType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

const SortingOptions: React.FC<SortingOptionsProps> = ({
  currentSort,
  onChangeSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleSelect = useCallback(
    (type: SortingType) => {
      onChangeSort(type);
      setIsOpen(false);
    },
    [onChangeSort]
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleOpen();
          }
        }}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {SORT_TYPES.map((type) => (
          <li
            key={type}
            className={`places__option ${
              type === currentSort ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSelect(type)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelect(type);
              }
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortingOptions;

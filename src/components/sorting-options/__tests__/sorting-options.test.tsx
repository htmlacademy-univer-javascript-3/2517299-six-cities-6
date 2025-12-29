import { render, screen, within } from '@testing-library/react';
import SortingOptions from '..';

describe('SortingOptions', () => {
  it('renders sorting options with current sort', () => {
    render(<SortingOptions currentSort="Popular" onChangeSort={() => {}} />);

    const currentSort = screen.getByText('Popular', { selector: 'span.places__sorting-type' });
    expect(currentSort).toBeInTheDocument();

    const optionsList = screen.getByRole('list');
    const { getByText: getOption } = within(optionsList);
    expect(getOption('Popular')).toBeInTheDocument();
    expect(getOption('Price: low to high')).toBeInTheDocument();
    expect(getOption('Price: high to low')).toBeInTheDocument();
    expect(getOption('Top rated first')).toBeInTheDocument();
  });
});

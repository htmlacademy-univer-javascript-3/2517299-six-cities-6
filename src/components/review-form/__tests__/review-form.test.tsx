import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createTestStore } from '../../../utils/create-test-store';
import ReviewForm from '..';

const renderForm = () => {
  const store = createTestStore();
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    </Provider>
  );
};

describe('ReviewForm', () => {
  it('renders textarea, rating inputs and submit button', () => {
    renderForm();

    expect(
      screen.getByPlaceholderText(/tell how was your stay/i)
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    [1, 2, 3, 4, 5].forEach((star) => {
      expect(
        screen.getByLabelText(
          new RegExp(
            `^${
              ['terribly', 'badly', 'not bad', 'good', 'perfect'][5 - star]
            }$`,
            'i'
          )
        )
      ).toBeInTheDocument();
    });
  });

  it('enables submit button when rating and comment are valid', () => {
    renderForm();

    const textarea = screen.getByPlaceholderText(/tell how was your stay/i);
    const perfectRating = screen.getByLabelText(/perfect/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(textarea, { target: { value: 'a'.repeat(50) } });
    fireEvent.click(perfectRating);

    expect(submitButton).not.toBeDisabled();
  });

  it('keeps submit button disabled if rating or comment are invalid', () => {
    renderForm();

    const textarea = screen.getByPlaceholderText(/tell how was your stay/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(textarea, { target: { value: 'short' } });
    expect(submitButton).toBeDisabled();
  });
});

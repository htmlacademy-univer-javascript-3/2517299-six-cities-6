import React, { useState, ChangeEvent, FormEvent } from 'react';

type ReviewFormData = {
  rating: number;
  review: string;
};

const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    review: '',
  });

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: Number(e.target.value) });
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, review: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ rating: 0, review: '' });
  };

  const isSubmitDisabled = formData.rating === 0 || formData.review.length < 50;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={formData.rating === star}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={
                star === 5
                  ? 'perfect'
                  : star === 4
                  ? 'good'
                  : star === 3
                  ? 'not bad'
                  : star === 2
                  ? 'badly'
                  : 'terribly'
              }
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleReviewChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

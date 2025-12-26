import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NewCommentData } from '../../types/review';
import { postOfferComment } from '../../store/offer/offer.thunks';

const getRatingTitle = (star: number): string => {
  switch (star) {
    case 5:
      return 'perfect';
    case 4:
      return 'good';
    case 3:
      return 'not bad';
    case 2:
      return 'badly';
    case 1:
      return 'terribly';
    default:
      return '';
  }
};

const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState<NewCommentData>({
    rating: 0,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: Number(e.target.value) });
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, comment: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      return;
    }

    const submit = async () => {
      setIsSubmitting(true);
      try {
        await dispatch(
          postOfferComment({
            offerId: id,
            data: { comment: formData.comment, rating: formData.rating },
          })
        ).unwrap();
        setFormData({ rating: 0, comment: '' });
      } finally {
        setIsSubmitting(false);
      }
    };

    void submit();
  };

  const isReviewValid =
    formData.rating > 0 &&
    formData.comment.length >= 50 &&
    formData.comment.length <= 300;

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
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={getRatingTitle(star)}
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
        value={formData.comment}
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
          disabled={!isReviewValid || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

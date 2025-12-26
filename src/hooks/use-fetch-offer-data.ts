import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNearbyOffers, fetchOfferById, fetchOfferComments } from '../store/offer/offer.thunks';
import { AppDispatch } from '../store';

export const useFetchOfferData = (offerId?: string) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferById(offerId));
      dispatch(fetchNearbyOffers(offerId));
      dispatch(fetchOfferComments(offerId));
    }
  }, [dispatch, offerId]);
};

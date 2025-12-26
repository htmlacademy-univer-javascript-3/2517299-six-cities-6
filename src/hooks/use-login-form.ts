import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/auth/auth.thunks';
import { AppDispatch } from '../store';

export const useLoginForm = (formData: { email: string; password: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await dispatch(login(formData)).unwrap();
      navigate('/');
    } catch {
      setErrorMessage('Login failed. Check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, formData, navigate]);

  return { handleSubmit, isSubmitting, errorMessage };
};

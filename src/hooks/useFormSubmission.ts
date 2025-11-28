import { useState } from 'react';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export function useFormSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const submitContactForm = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Thank you for your message! I will get back to you soon.');
        return true;
      } else {
        setSubmitError(result.error || 'Failed to submit form');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An error occurred. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitHireMeForm = async (formData: {
    name: string;
    email: string;
    company: string;
    position: string;
    budget: string;
    timeline: string;
    description: string;
  }) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/hire-me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Thank you for your inquiry! I will review it and get back to you soon.');
        return true;
      } else {
        setSubmitError(result.error || 'Failed to submit form');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An error occurred. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearMessages = () => {
    setSubmitMessage('');
    setSubmitError('');
  };

  return {
    isSubmitting,
    submitMessage,
    submitError,
    submitContactForm,
    submitHireMeForm,
    clearMessages,
  };
}

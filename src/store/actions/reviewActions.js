export const SET_AGREEMENT = 'SET_AGREEMENT';
export const SUBMIT_REVIEW = 'SUBMIT_REVIEW';
export const CLEAR_REVIEW = 'CLEAR_REVIEW';

export const setAgreement = (isAccepted) => ({
  type: SET_AGREEMENT,
  payload: isAccepted,
});

export const submitReview = (reviewData) => ({
  type: SUBMIT_REVIEW,
  payload: reviewData,
});

export const clearReview = () => ({
  type: CLEAR_REVIEW,
});
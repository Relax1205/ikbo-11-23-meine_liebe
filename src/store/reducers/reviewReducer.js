import { SET_AGREEMENT, SUBMIT_REVIEW, CLEAR_REVIEW } from '../actions/reviewActions';

const initialState = {
  agreementAccepted: false,
  reviews: [],
  isSubmitting: false,
  submitSuccess: false,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AGREEMENT:
      return {
        ...state,
        agreementAccepted: action.payload,
      };
    case SUBMIT_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        isSubmitting: false,
        submitSuccess: true,
      };
    case CLEAR_REVIEW:
      return {
        ...state,
        submitSuccess: false,
      };
    default:
      return state;
  }
};

export default reviewReducer;
import { CALCULATE_PIT, TAX_TYPES, TAX_ERROR, PAYSTACK_PAYMENT, PAYMENT_HISTORY } from '../actions/types';

const initialState = {
  taxtypes: [],
  pit: null,
  paystack: null,
  loading: true,
  paymenthistory: [],
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TAX_TYPES:
      return {
        ...state,
        taxtypes: payload,
        loading: false
      };
    case CALCULATE_PIT:
      return {
        ...state,
        pit: payload,
        loading: false
      };
    case PAYSTACK_PAYMENT:
      return {
        ...state,
        pasystack: payload,
        loading: false
      };
    case PAYMENT_HISTORY:
      return {
        ...state,
        paymenthistory: payload,
        loading: false
      };
    case TAX_ERROR:
      return {
        ...state,
        taxtypes: payload,
        loading: false
      };
    default:
      return state;
  }
}

import Axios from 'axios';
import { setAlert } from './alert';
import { CALCULATE_PIT, TAX_TYPES, PAYSTACK_PAYMENT, TAX_ERROR, PAYMENT_HISTORY } from './types';

const url = 'https://paytax-app.herokuapp.com/api/v1/payments';

// Get Tax Types
export const taxTypes = () => async dispatch => {
  try {
    const config = {
      headers: {
        'Cache-Control': 'no-cache',
      }
    };
    const res = await Axios.get(
      `${url}/tax_types`,
      config
    );

    dispatch({
      type: TAX_TYPES,
      payload: res.data.data
    });
  } catch (error) {
    dispatch({
      type: TAX_ERROR,
      payload: { msg: error }
    });
  }
};

// Calculate PIT
export const calaculatePit = (income, taxPayerId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = { income, taxPayerId }
  try {
    const res = await Axios.post(
      `${url}/payment_income_tax`,
      body,
      config
    );
    dispatch(setAlert(res.data.data, 'success'));
    dispatch(window.location.reload());
    dispatch({
      type: CALCULATE_PIT,
      payload: res.data.data
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: TAX_ERROR,
      payload: { msg: error }
    });
    }
    
};

// PayStack Payments
export const paystackPayment = (formData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    try {
      const res = await Axios.post(
        `${url}/history`,
        formData,
        config
      );
      console.log(res.data);
      dispatch(setAlert('Payment Successful', 'success'));
      dispatch(window.location.href='/paymenthistory');
      dispatch({
        type: PAYSTACK_PAYMENT,
        payload: res.data
      });
    } catch (error) {
      console.log(error)
      dispatch({
        type: TAX_ERROR,
        payload: { msg: error }
      });
      }
      
  };

  // PayStack Payments
export const paymentHistory = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  try {
    const res = await Axios.get(
      `${url}/history/${localStorage.taxId}`,
      config
    );
    dispatch({
      type: PAYMENT_HISTORY,
      payload: res.data.data
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: TAX_ERROR,
      payload: { msg: error }
    });
    }
    
};

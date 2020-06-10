import Axios from 'axios';
import { setAlert } from './alert';
import { CALCULATE_PIT, TAX_TYPES, PAYSTACK_PAYMENT, TAX_ERROR } from './types';
import setAuthToken from '../Utils/setAuthToken';

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

// Get Paystack Object
export const verifyPaystack = async (reference) => {
  try {
    const config = {
      headers: {
        'Authorization': 'Bearer sk_test_30b3e04f11b84a6f52360c86d1159c5b33e4e933',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };
    delete Axios.defaults.headers.common["x-access-token"];
    const res = await Axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      config
    );
    setAuthToken(localStorage.token);
    return res.data.data;
  } catch (error) {
    console.log(error)
  }
};

// // PayStack Payments
// export const paystackPayment = (formData) => async dispatch => {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };
//     try {
//       const res = await Axios.post(
//         'https://cors-anywhere.herokuapp.com/' +
//         'https://paytax-app.herokuapp.com/api/v1/gateway/pay',
//         formData,
//         config
//       );
//       console.log(res.data);
//       dispatch(setAlert('Payment Successful', 'success'));
//       dispatch({
//         type: PAYSTACK_PAYMENT,
//         payload: res.data
//       });
//     } catch (error) {
//       console.log(error)
//       dispatch({
//         type: TAX_ERROR,
//         payload: { msg: error }
//       });
//       }
      
//   };


import Axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
    LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../Utils/setAuthToken';
import { setAlert } from './alert';

const url = 'http://localhost:8000/api/v1/user';

export const loadUser = () => async dispatch => {
  
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }else{
    console.log('no token')
  }
  const loadUserApi = `${url}/${localStorage.taxId}`;
  
  try {
    const config = {
      headers: {
        'Cache-Control': 'no-cache',
      }
    };
    const res = await Axios.get(loadUserApi, config);
    console.log(res.data);

    dispatch({
      type: USER_LOADED,
      payload: res.data.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Signup User

export const signup = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const registerApi = `${url}/register`;
    const res = await Axios.post(registerApi, formData, config);
    console.log(res.data)
    if(res.data.status === true){
      dispatch(setAlert('You have Successfully Registered', 'success'));
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    } else{
      dispatch(setAlert(res.data[0], 'error'));
    }
  } catch (err) {
    console.log(err)
    // setTimeout(() => {
    //   dispatch(window.location.reload())
    // }, 3000); 
    dispatch({
      type: REGISTER_FAIL
    });
  }
}; 

// Login User

export const login = (taxPayerId, password) => async dispatch => {
  const loginApi = `${url}/login`;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({taxPayerId, password });

  try {
    const res = await Axios.post(loginApi, body, config);
    console.log(res.data);
    if(res.data.status === true) {
      dispatch(setAlert('Login Successful', 'success'));
      dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    console.log(res.data)
    dispatch(loadUser());
    } else {
      dispatch(setAlert(res.data[0], 'error'));
    }
      
    
  } catch(error) {
    console.log(error)
    dispatch(setAlert('Invalid Login, Try Again', 'error'));
    // dispatch(setAlert(error, 'error'))
  //   error.map(sweetItem => {
  //     return dispatch(setAlert(sweetItem, 'error'))
  // })
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout /Clear Profile

export const logout = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  dispatch(window.location.href='/');
};

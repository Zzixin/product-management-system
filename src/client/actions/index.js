/*
1. open sign in
2. open sign up
3. open forget password
*/
import { signModal, status, product } from '../constants/index.js';
import { ajaxConfigHelper } from '../helper/index';

// modal
export const signOutClose =
  (dispatch) =>
  (choice = '') => {
    dispatch({
      type: status.signedOut,
      payload: choice,
    });
  };

export const signInModal =
  (dispatch) =>
  (choice = '') => {
    dispatch({
      type: signModal.signIn,
      payload: choice,
    });
  };

export const signUpModal =
  (dispatch) =>
  (choice = '') => {
    dispatch({
      type: signModal.signUp,
      payload: choice,
    });
  };

export const passwordModal =
  (dispatch) =>
  (email = '') => {
    dispatch({
      type: signModal.forgetPassword,
      payload: email,
    });
  };

// data transfer
export const signUpData = (dispatch) => async (data) => {
  try {
    const response = await fetch('/signUp', ajaxConfigHelper(data));

    const result = await response.json();
    dispatch({
      type: status.signedUp,
      payload: result.status,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signInData = (dispatch) => async (data) => {
  try {
    const response = await fetch('/signIn', ajaxConfigHelper(data));
    const result = await response.json();
    dispatch({
      type: status.signedIn,
      payload: result.status,
    });
  } catch (error) {
    console.log(error);
  }
};

export const modifyPassword = (dispatch) => async (data) => {
  try {
    const response = await fetch('/changePass', ajaxConfigHelper(data, 'PUT'));
    const result = await response.json();
    dispatch({
      type: status.changedPassword,
      payload: result.status,
    });
  } catch (error) {
    console.log(error);
  }
};

// product page
export const createProduct = (dispatch) => () => {
  dispatch({
    type: product.createProduct,
    payload: null,
  });
};

export const showProduct = (dispatch) => () => {
  dispatch({
    type: product.showProducts,
    payload: null,
  });
};

/*
1. open sign in
2. open sign up
3. open forget password
*/
import { ajaxConfigHelper } from '../helper/index';
export const signInModal = (dispatch) => (isVisible) => {
  dispatch({
    type: 'signInModal_visible',
    payload: isVisible,
  });
};

export const signUpModal = (dispatch) => (isVisible) => {
  dispatch({
    type: 'signUpModal_visible',
    payload: isVisible,
  });
};

export const passwordModal = (dispatch) => (email) => {
  dispatch({
    type: 'passwordModal_visible',
    payload: email,
  });
};

export const giveFeedback = (dispatch) => (isVisible) => {
  dispatch({
    type: 'feedback',
    payload: isVisible,
  });
};

export const signUpData = (dispatch) => async (data) => {
  try {
    const response = await fetch('/signUp', ajaxConfigHelper(data));

    const { message, newData } = await response.json();
    console.log('Success');
    dispatch({
      type: 'signUpUserData',
      payload: newData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signInData = (dispatch) => async (data) => {
  try {
    const response = await fetch('/signIn', ajaxConfigHelper(data, 'DELETE'));
    const result = await response.json();
    dispatch({
      type: 'signInUserData',
      payload: data,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const modifyPassword = (dispatch) => async (data) => {
  try {
    const response = await fetch('/changePass', ajaxConfigHelper(data, 'PUT'));
    const result = await response.json();
    console.log(result);
    dispatch({
      type: 'modifyPassword',
      payload: data,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

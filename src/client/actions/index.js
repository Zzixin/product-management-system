/*
1. open sign in
2. open sign up
3. open forget password
*/
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

export const passwordModal = (dispatch) => (isVisible) => {
  dispatch({
    type: 'passwordModal_visible',
    payload: isVisible,
  });
};

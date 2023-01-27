export const optionReducer = (state = 0, { type, payload }) => {
  // sign in, signup, forget
  switch (type) {
    case 'signInModal_visible':
      return 1;
    case 'signUpModal_visible':
      return 2;
    case 'passwordModal_visible':
      return 3;
    default:
      return state;
  }
};

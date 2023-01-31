import { combineReducers } from 'redux';
import { signModal, status } from '../constants';

export const optionReducer = (state = status.signedOut, { type, payload }) => {
  // sign in, signup, forget
  switch (type) {
    case signModal.signIn:
      return signModal.signIn;
    case signModal.signUp:
      return signModal.signUp;
    case signModal.forgetPassword:
      return signModal.forgetPassword;
    case status.signedOut:
      return status.signedOut;
    default:
      return state;
  }
};

export const productReducer = (state = status.signedOut, { type, payload }) => {
  switch (type) {
    case status.signedIn:
      if (payload === 200) {
        return status.signedIn;
      } else {
        return status.signedOut;
      }
    case status.signedUp:
      if (payload === 200) {
        return status.signedUp;
      } else {
        return status.signedOut;
      }
    case status.changedPassword:
      if (payload === 200) {
        return status.changedPassword;
      } else {
        return status.signedOut;
      }
    case status.signedOut:
      return status.signedOut;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  modalSwitch: optionReducer,
  productOption: productReducer,
});

export default allReducers;

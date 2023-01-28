import { combineReducers } from 'redux';

export const optionReducer = (state = 0, { type, payload }) => {
  // sign in, signup, forget
  switch (type) {
    case 'signInModal_visible':
      return 1;
    case 'signUpModal_visible':
      return 2;
    case 'passwordModal_visible':
      return payload;
    case 'feedback':
      return 0;
    default:
      return state;
  }
};

export const dataReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'signUpUserData':
      return payload;
    case 'modifyPassword':
      return payload;
    case 'signInUserData':
      return payload;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  modalSwitch: optionReducer,
  dataSwitch: dataReducer,
});

export default allReducers;

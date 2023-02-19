import { combineReducers } from 'redux';
import { status, product } from '../constants';

// export const optionReducer = (state = status.signedOut, { type, payload }) => {
//   // sign in, signup, forget
//   switch (type) {
//     case signModal.signIn:
//       return signModal.signIn;
//     case signModal.signUp:
//       return signModal.signUp;
//     case signModal.forgetPassword:
//       return signModal.forgetPassword;
//     case status.signedOut:
//       return status.signedOut;
//     default:
//       return state;
//   }
// };

export const reducer1 = (state = 'SignOutSuccess', { type, payload }) => {
  switch (type) {
    case 'SignInSuccess':
      return 'SignInSuccess';
    case 'SignOutSuccess':
      return 'SignOutSuccess';
    default:
      return 'SignOutSuccess';
  }
};

export const reducer2 = (
  state = { user: '', isSignedIn: false },
  { type, payload }
) => {
  if (type === 'doSomeMemo') {
    return payload;
  } else {
    return state;
  }
};

export const statusReducer = (
  state = { type: '', error: true, msg: '' },
  { type, payload }
) => {
  switch (type) {
    case status.signedIn:
      if (payload.status === 200) {
        return { type: status.signedIn, error: false, msg: payload.message };
      } else {
        return { type: status.signedIn, error: true, msg: payload.message };
      }
    case status.signedUp:
      if (payload.status === 200) {
        return { type: status.signedUp, error: false, msg: payload.message };
      } else {
        return { type: status.signedUp, error: true, msg: payload.message };
      }
    case status.changedPassword:
      if (payload === 200) {
        return {
          type: status.changedPassword,
          error: false,
          msg: payload.message,
        };
      } else {
        return {
          type: status.changedPassword,
          error: true,
          msg: payload.message,
        };
      }
    case 'default':
      return { type: '', error: true, msg: '' };
    default:
      return state;
  }
};

export const productReducer = (
  state = product.showProducts,
  { type, payload }
) => {
  switch (type) {
    case product.createProduct:
      return product.createProduct;
    case product.showProducts:
      return product.showProducts;
    case product.editProduct:
      return product.editProduct;
    case product.detailProduct:
      return product.detailProduct;
    case product.addProduct2DB:
      if (payload === 200) {
        return product.showProducts;
      }
    case product.editProduct2DB:
      if (payload) {
        return product.showProducts;
        // return;
      }
    default:
      return state;
  }
};

export const productManage = (state = [], { type, payload }) => {
  switch (type) {
    case product.showProductFromDB:
      return payload;
    default:
      return state;
  }
};

export const productEdit = (state = {}, { type, payload }) => {
  switch (type) {
    case product.editProduct:
      return payload;
    case product.detailProduct:
      return payload;
    case product.editProduct2DB:
      return payload;
    default:
      return state;
  }
};

export const getCartInfo = (state = [], { type, payload }) => {
  switch (type) {
    case 'getCartInfo':
      return [...payload];
    case 'addToCart':
      return [...state, { ...payload }];
    case 'editToCart':
      return state.map((item) => {
        if (payload.id !== item.id) {
          return item;
        }
        return { ...item, num: payload.num };
      });
    case 'delToCart':
      return state.filter(({ id }) => {
        return id !== payload.id;
      });
    default:
      return state;
  }
};

export const searchReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'searchItem':
      return [...payload];
    case 'NotsearchItem':
      return state;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  signInOut: reducer1,
  someMemo: reducer2,
  statusOption: statusReducer,
  // productOption: productReducer,
  productManage: productManage,
  productEdit: productEdit,
  getCartInfo: getCartInfo,
  searchReducer: searchReducer,
});

export default allReducers;

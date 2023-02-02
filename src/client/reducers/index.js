import { combineReducers } from 'redux';
import { signModal, status, product } from '../constants';

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

export const statusReducer = (state = status.signedOut, { type, payload }) => {
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
      if (payload === 200) {
        return product.showProducts;
      }
    default:
      return state;
  }
};

export const productManage = (state = [], { type, payload }) => {
  switch (type) {
    case product.showProductFromDB:
      return [...payload];
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
    default:
      return state;
  }
};

const allReducers = combineReducers({
  modalSwitch: optionReducer,
  statusOption: statusReducer,
  productOption: productReducer,
  productManage: productManage,
  productEdit: productEdit,
});

export default allReducers;

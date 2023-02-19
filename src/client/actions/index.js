/*
1. open sign in
2. open sign up
3. open forget password
*/
import { status, product } from '../constants/index.js';
import { ajaxConfigHelper } from '../helper/index';

export const memoCookie = (dispatch) => (content) => {
  dispatch({
    type: 'doSomeMemo',
    payload: content,
  });
};

export const signInSuccess = (dispatch) => () => {
  dispatch({
    type: 'SignInSuccess',
    payload: null,
  });
};

export const signOutSuccess = (dispatch) => () => {
  dispatch({
    type: 'SignOutSuccess',
    payload: null,
  });
};

export const getUser = (dispatch) => async () => {
  try {
    const response = await fetch('/getUser');
    const result = await response.json();
    // if (response.ok) {
    //   return result;
    // }
    return result;
  } catch (error) {
    console.log('get user: ', error);
  }
};

// data transfer
export const signUpData = (dispatch) => async (data) => {
  try {
    const response = await fetch('/signUp', ajaxConfigHelper(data));
    const result = await response.json();
    dispatch({
      type: status.signedUp,
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signInDefault = (dispatch) => () => {
  dispatch({
    type: 'default',
    payload: null,
  });
};

export const signInData = (dispatch) => async (data) => {
  try {
    const response = await fetch('/signIn', ajaxConfigHelper(data));
    const result = await response.json();
    dispatch({
      type: status.signedIn,
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signOut = (dispatch) => async () => {
  try {
    const response = await fetch('/signOut', ajaxConfigHelper());
    const result = await response.json();
    dispatch({});
  } catch (error) {}
};

export const isEmailExist = (dispatch) => async (email) => {
  try {
    const response = await fetch(
      '/isEmailExist',
      ajaxConfigHelper({ user: email })
    );
    const result = await response.json();
    // dispatch({
    //   type: status.signedUp,
    //   payload: result,
    // });
    return result.existed;
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
// export const createProduct = (dispatch) => () => {
//   dispatch({
//     type: product.createProduct,
//     payload: null,
//   });
// };

export const editProduct = (dispatch) => (productInfo) => {
  dispatch({
    type: product.editProduct,
    payload: productInfo,
  });
};

// export const showProduct = (dispatch) => () => {
//   dispatch({
//     type: product.showProducts,
//     payload: {},
//   });
// };

export const productDetail = (dispatch) => (productInfo) => {
  dispatch({
    type: product.detailProduct,
    payload: productInfo,
  });
};

// product data transfer
export const showProductFromDB = (dispatch) => () => {
  fetch('/allProducts')
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: product.showProductFromDB,
        payload: data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const addProduct2DB = (dispatch) => async (data) => {
  try {
    const response = await fetch('/addProduct', ajaxConfigHelper(data));
    const result = await response.json();
    dispatch({
      type: product.addProduct2DB,
      payload: result.status,
    });
    return result.status;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct2DB = (dispatch) => async (data) => {
  try {
    const response = await fetch('/editProduct', ajaxConfigHelper(data, 'PUT'));
    const result = await response.json();
    dispatch({
      type: product.editProduct2DB,
      payload: data,
    });
    return result.status;
  } catch (error) {
    console.log(error);
  }
};

// things about cart
export const addCart = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      '/addToCart',
      ajaxConfigHelper(content, 'PUT')
    );
    const result = await response.json();
    dispatch({
      type: 'addToCart',
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const editCart = (dispatch) => async (content) => {
  try {
    const response = await fetch(
      '/editToCart',
      ajaxConfigHelper(content, 'PUT')
    );
    const result = await response.json();
    dispatch({
      type: 'editToCart',
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const delCartItem = (dispatch) => async (content) => {
  try {
    await fetch('/delToCart', ajaxConfigHelper(content, 'PUT'));
    dispatch({
      type: 'delToCart',
      payload: {
        id: content.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCart = (dispatch) => async (user) => {
  try {
    const response = await fetch(
      '/getCartInfo',
      ajaxConfigHelper({ email: user })
    );
    const result = await response.json();
    dispatch({
      type: 'getCartInfo',
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchItem = (dispatch) => async (pName) => {
  try {
    if (pName === -1) {
      dispatch({
        type: 'NotsearchItem',
        payload: null,
      });
      return;
    }
    const response = await fetch(
      '/searchProduct',
      ajaxConfigHelper({ name: pName })
    );
    const result = await response.json();
    dispatch({
      type: 'searchItem',
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

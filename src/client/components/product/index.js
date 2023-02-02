import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { product } from '../../constants/index.js';
import ProductDisplay from './showProduct/index.js';
import ProductCreate from './createProduct/index.js';
import { showProductFromDB } from '../../actions/index.js';
import ProductDetail from './productDetail/index.js';
import './index.css';

const ProductPage = () => {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.productOption);
  // useEffect(() => {
  //   showProductFromDB(dispatch)();
  // }, currentState);

  switch (currentState) {
    case product.showProducts:
      showProductFromDB(dispatch)();
      return <ProductDisplay />;
    case product.createProduct:
      return <ProductCreate />;
    case product.editProduct:
      return <ProductCreate title={'Edit Product'} btn={'Edit Product'} />;
    case product.detailProduct:
      return <ProductDetail />;
    default:
      return <ProductDisplay />;
  }
};

export default ProductPage;

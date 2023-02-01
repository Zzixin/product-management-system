import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { product } from '../../constants/index.js';
import ProductDisplay from './showProduct/index.js';
import ProductCreate from './createProduct/index.js';
import { showProductFromDB } from '../../actions/index.js';
import './index.css';

const ProductPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    showProductFromDB(dispatch)();
  }, [dispatch]);

  const currentState = useSelector((state) => state.productOption);
  switch (currentState) {
    case product.showProducts:
      return <ProductDisplay />;
    case product.createProduct:
      return <ProductCreate />;
    default:
      return <ProductDisplay />;
  }
};

export default ProductPage;

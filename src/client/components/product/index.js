import { useSelector } from 'react-redux';
import { product } from '../../constants/index.js';
import ProductDisplay from './showProduct/index.js';
import './index.css';

const ProductPage = () => {
  const currentState = useSelector((state) => state.productOption);
  switch (currentState) {
    case product.showProducts:
      return <ProductDisplay />;
    case product.createProduct:
      return <div>"test"</div>;
    default:
      return <ProductDisplay />;
  }
};

export default ProductPage;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductDisplay from './showProduct/index.js';
import ProductCreate from './createProduct/index.js';
import { showProductFromDB, getCart } from '../../actions/index.js';
import ProductDetail from './productDetail/index.js';
import './index.css';

const ProductPage = ({ isAdmin, user, isSignedIn, isSearch }) => {
  const [isShowProducts, setIsShowProducts] = useState(true);
  const [isCreateProduct, setIsCreateProduct] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  // const [isAdmin, setAdmin] = useState(user === 'admin@gmail.com');
  const memo = useSelector((state) => state.someMemo);
  const cartData = useSelector((state) => state.getCartInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    showProductFromDB(dispatch)();
    if (memo.user) {
      // console.log('memo.user: ', memo.user);
      getCart(dispatch)(memo.user);
    }
  }, []);

  // const currentState = useSelector((state) => state.productOption);
  // useEffect(() => {
  //   showProductFromDB(dispatch)();
  // }, currentState);

  if (isEditProduct) {
    return (
      <ProductCreate
        title={'Edit Product'}
        btn={'Edit Product'}
        setIsShowProducts={setIsShowProducts}
        setIsCreateProduct={setIsCreateProduct}
        setIsEditProduct={setIsEditProduct}
      />
    );
  } else if (isShowDetail) {
    return (
      <ProductDetail
        setIsShowProducts={setIsShowProducts}
        setIsEditProduct={setIsEditProduct}
        setIsShowDetail={setIsShowDetail}
        isAdmin={isAdmin}
        user={user}
      />
    );
  } else if (isShowProducts) {
    return (
      <ProductDisplay
        setIsShowProducts={setIsShowProducts}
        setIsCreateProduct={setIsCreateProduct}
        setIsEditProduct={setIsEditProduct}
        setIsShowDetail={setIsShowDetail}
        isAdmin={isAdmin}
        isSignedIn={isSignedIn}
        user={user}
        isSearch={isSearch}
      />
    );
  } else if (isCreateProduct) {
    return (
      <ProductCreate
        setIsShowProducts={setIsShowProducts}
        setIsCreateProduct={setIsCreateProduct}
        setIsEditProduct={setIsEditProduct}
      />
    );
  } else {
    return <ProductDisplay />;
  }

  // switch (currentState) {
  //   case product.showProducts:
  //     showProductFromDB(dispatch)();
  //     return <ProductDisplay />;
  //   case product.createProduct:
  //     return <ProductCreate />;
  //   case product.editProduct:
  //     return <ProductCreate title={'Edit Product'} btn={'Edit Product'} />;
  //   case product.detailProduct:
  //     return <ProductDetail />;
  //   default:
  //     return <ProductDisplay />;
  // }
};

export default ProductPage;

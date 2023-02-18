import { Button, Select, Pagination, Row } from 'antd';
import { displayOption } from '../../../constants';
import { createProduct } from '../../../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { showProductFromDB, getCart } from '../../../actions/index.js';
import ColItem from './colItem';
import EmptyItem from './emptyItem';
import './index.css';
import ErrorPage from '../../errorPage';

const ProductDisplay = ({
  setIsShowProducts,
  setIsCreateProduct,
  setIsEditProduct,
  setIsShowDetail,
  isAdmin,
  isSignedIn,
  user,
  isSearch,
}) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   showProductFromDB(dispatch)();
  // }, dispatch);
  // showProductFromDB(dispatch)();
  const pData = useSelector((state) => state.productManage);
  const searchData = useSelector((state) => state.searchReducer);
  const productEdit = useSelector((state) => state.productEdit);
  const cartData = useSelector((state) => state.getCartInfo);
  const memo = useSelector((state) => state.someMemo);
  // const [tmpCart, setTmpCart] = useState(sessionStorage.getItem('cart'));
  // const [cartData, setCartData] = useState(cartDataDB);
  // useEffect(() => {
  //   if (!isSignedIn) {
  //     if (sessionStorage.getItem('cart') !== null) {
  //       setCartData([]);
  //     }
  //   }
  // }, []);

  const [productData, setProductData] = useState(pData);

  useEffect(() => {
    if (isSearch) {
      setProductData(searchData);
    } else {
      setProductData(pData);
    }
  }, [searchData, isSearch, pData]);

  // useEffect(() => {
  //   setProductData(pData);
  // }, [pData]);

  const [gridShowPage, setGridShowPage] = useState(1);

  // useEffect(() => {
  //   if (memo.user) {
  //     getCart(dispatch)(memo.user);
  //   }
  // }, [memo]);

  useEffect(() => {
    showProductFromDB(dispatch)();
  }, [productEdit]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleAddProduct = () => {
    setIsCreateProduct(true);
    setIsShowProducts(false);
    //createProduct(dispatch)();
  };

  // if (productData) {
  //   setImageGrid(
  //     productData.map(({ name, price, quantity, imageURL }) => {
  //       return colCell(name, price, quantity, imageURL);
  //     })
  //   );
  // }

  const onChange = (value) => {
    setGridShowPage(value);
  };

  if (productData.length === 0 && isSearch) {
    return <EmptyItem />;
  }
  return (
    <div>
      <div className='show-header'>
        <h1 className='show-title'>Products</h1>
        <div className='show-btns'>
          <Select
            defaultValue={displayOption.lastAdd}
            style={{ width: 160 }}
            onChange={handleChange}
            options={[
              {
                value: displayOption.lastAdd,
                label: displayOption.lastAdd,
              },
              {
                value: displayOption.priceL2H,
                label: displayOption.priceL2H,
              },
              {
                value: displayOption.priceH2L,
                label: displayOption.priceH2L,
              },
            ]}
            // disabled={isSignedIn ? false : true}
          />
          {isAdmin ? (
            <Button
              type='primary'
              onClick={handleAddProduct}
              style={{ marginLeft: 20 }}
            >
              add product
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='grid-container'>
        <Row
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 24 }]}
          justify='start'
          className='grid-row'
        >
          {productData.map((item, index) => {
            if (index >= (gridShowPage - 1) * 10 && index < gridShowPage * 10) {
              const res = cartData.find((ele) => ele.id === item.id);
              return (
                <ColItem
                  product={item}
                  key={item.id}
                  setIsShowProducts={setIsShowProducts}
                  setIsEditProduct={setIsEditProduct}
                  setIsShowDetail={setIsShowDetail}
                  isAdmin={isAdmin}
                  isSignedIn={isSignedIn}
                  productNum={res ? res.num : 0}
                  user={user}
                />
              );
            }
          })}
        </Row>
      </div>
      {/* {gridShowPage} */}
      <Pagination
        className='pagination'
        defaultCurrent={1}
        total={productData.length}
        onChange={onChange}
        size='small'
      />
    </div>
  );
};

export default ProductDisplay;

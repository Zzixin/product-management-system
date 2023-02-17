import { Col, Image, Input, Button, InputNumber } from 'antd';
import { editProduct, editProduct2DB } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  productDetail,
  addCart,
  editCart,
  delCartItem,
} from '../../../actions';
import { useEffect, useState } from 'react';
import './index.css';
import { userSchema } from '../../../../server/database/schema';

const ColItem = ({
  product,
  setIsShowProducts,
  setIsEditProduct,
  setIsShowDetail,
  isAdmin,
  isSignedIn,
  productNum,
  user,
}) => {
  const { name, price, quantity, imageURL, id } = product;
  const [amount, setAmount] = useState(productNum); // amount of products
  // const [tmpCart, setTmpCart] = useState(sessionStorage.getItem('cart'));

  const dispatch = useDispatch();
  const memo = useSelector((state) => state.someMemo);
  const cartData = useSelector((state) => state.getCartInfo);

  // useEffect(() => {
  //   if (cartData.length > 0) {
  //     let target = cartData.find((item) => item.id === id);
  //     if (target) {
  //       setAmount(target.num);
  //     }
  //   }
  // }, [id]);

  // useEffect(() => {
  //   sessionStorage.setItem('cart', tmpCart);
  // }, [tmpCart]);

  useEffect(() => {
    setAmount(productNum);
    // if (memo.isSignedIn === false) {
    //   if (tmpCart === null) {
    //     setAmount(0);
    //   }
    // }
  }, [cartData, memo]);

  const handleClickImage = () => {
    productDetail(dispatch)(product);
    setIsShowDetail(true);
    setIsShowProducts(false);
  };

  const handleEdit = () => {
    // product.choose = productChoose;
    editProduct(dispatch)(product);
    setIsEditProduct(true);
    setIsShowProducts(false);
  };

  const handleAdd = () => {
    //showProductFromDB(dispatch)();
    setAmount(1);
    addCart(dispatch)({
      email: user,
      id: id,
      num: 1,
    });
    // editProduct2DB(dispatch)(product);
    // showProductFromDB(dispatch)();
  };

  const onChange = (value) => {
    setAmount(value);
    if (value === 0) {
      delCartItem(dispatch)({
        email: user,
        id: id,
      });
    } else {
      editCart(dispatch)({
        email: user,
        id: id,
        num: value,
      });
    }

    //product.choose = value;
    //editProduct2DB(dispatch)(product);
  };

  const handleMinusPlus = (op) => {
    let value = op === '-' ? amount - 1 : amount + 1;
    setAmount(value);
    if (value === 0) {
      delCartItem(dispatch)({
        email: user,
        id: id,
      });
    } else {
      editCart(dispatch)({
        email: user,
        id: id,
        num: value,
      });
    }
  };

  return (
    <Col span={4} className='grid-cell' key={id} md={4} xs={20}>
      <Image
        src={imageURL}
        onClick={handleClickImage}
        preview={false}
        className='img'
        max-height={180}
      />
      <div className='col-name'>{name}</div>
      <div className='col-price'>${price.toFixed(2)}</div>
      <span className='col-span-container'>
        {/* <Input.Group>
          <Button
            size='small'
            type='primary'
            className='add-minus-btn'
            onClick={() => {
              showProductFromDB(dispatch)();
              product.choose = productChoose + 1;
              editProduct2DB(dispatch)(product);
              showProductFromDB(dispatch)();
              setProductChoose(productChoose + 1);
            }}
          >
            +
          </Button>
          <InputNumber
            controls={false}
            defaultValue={productChoose}
            size='small'
            className='quantity-input'
            value={productChoose}
          ></InputNumber> 
          <Button
            size='small'
            type='primary'
            className='add-minus-btn'
            onClick={() => {
              showProductFromDB(dispatch)();
              product.choose = productChoose - 1;
              editProduct2DB(dispatch)(product);
              showProductFromDB(dispatch)();
              setProductChoose(productChoose - 1);
            }}
          >
            -
          </Button>
        </Input.Group>
        */}
        {amount === 0 ? (
          <Button
            style={{
              width: '45%',
            }}
            size='small'
            type='primary'
            onClick={handleAdd}
            // disabled={isSignedIn ? false : true}
          >
            Add
          </Button>
        ) : (
          // <InputNumber
          //   style={{
          //     width: '45%',
          //   }}
          //   size='small'
          //   min={0}
          //   max={quantity}
          //   defaultValue={amount}
          //   onChange={onChange}
          // />
          <div className='edit-btns'>
            <button
              className='add-minus-btn'
              onClick={() => handleMinusPlus('-')}
            >
              -
            </button>
            <span className='quantity-text'>{amount}</span>
            <button
              className='add-minus-btn'
              disabled={amount < quantity ? false : true}
              onClick={() => handleMinusPlus('+')}
            >
              +
            </button>
          </div>
        )}

        {isAdmin ? (
          <Button
            style={{
              width: '45%',
            }}
            size='small'
            className='quantity-btn'
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          <></>
        )}
      </span>
    </Col>
  );
};
export default ColItem;

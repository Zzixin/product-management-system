import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Image, Button, InputNumber, Input, Space } from 'antd';
import { showProductFromDB } from '../../../actions';
import { editProduct, addCart, delCartItem, editCart } from '../../../actions';
import './index.css';

const ProductDetail = ({
  setIsShowProducts,
  setIsEditProduct,
  setIsShowDetail,
  isAdmin,
  user,
}) => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productEdit); // the current product (single)
  const cartData = useSelector((state) => state.getCartInfo); // current shopping cart (all)
  const findProductNum = () => {
    let pNum = cartData.find((ele) => ele.id === productData.id);
    return pNum ? pNum.num : 0;
  };
  const [amount, setAmount] = useState(findProductNum);
  const [pCategory, setPCategory] = useState(productData.category);
  const [pName, setPName] = useState(productData.name);
  const [pPrice, setPPrice] = useState(productData.price);
  const [pDescription, setPDescription] = useState(productData.description);
  const [pQuantity, setPQuantity] = useState(productData.quantity);

  useEffect(() => {
    setPCategory(productData.category);
    setPName(productData.name);
    setPPrice(productData.price);
    setPDescription(productData.description);
    setPQuantity(productData.quantity);
  }, [productData]);

  const handleCancel = () => {
    // showProduct(dispatch)();
    setIsShowDetail(false);
    setIsShowProducts(true);
  };

  const handleEdit = () => {
    editProduct(dispatch)(productData);
    // setIsShowDetail(false);
    setIsEditProduct(true);
  };

  // const handleAdd = () => {
  //   // productData.choose += 1;
  //   setCurrent(current + 1);
  //   // editProduct2DB(dispatch)(productData);
  //   //setProductChoose(productChoose + 1);
  // };

  const handleAdd = () => {
    //showProductFromDB(dispatch)();
    setAmount(1);
    addCart(dispatch)({
      email: user,
      id: productData.id,
      num: 1,
    });
    // editProduct2DB(dispatch)(product);
    // showProductFromDB(dispatch)();
  };

  const handleMinusPlus = (op) => {
    let value = op === '-' ? amount - 1 : amount + 1;
    setAmount(value);
    if (value === 0) {
      delCartItem(dispatch)({
        email: user,
        id: productData.id,
      });
    } else {
      editCart(dispatch)({
        email: user,
        id: productData.id,
        num: value,
      });
    }
  };

  // const onChange = (event) => {
  //   //productData.choose = value;
  //   setCurrent(event.target.value);
  //   // productData.choose = event.target.value;
  //   editProduct2DB(dispatch)(productData);
  // };

  return (
    <div>
      <div className='detail-header'>
        <h1 className='detail-title'>Product Detail</h1>
      </div>
      <div className='detail-container'>
        <div>
          <Image
            rootClassName='detail-img'
            // width={400}
            src={productData.imageURL}
          />
        </div>
        <div className='detail-content'>
          <p>{pCategory}</p>
          <h2>{pName}</h2>
          <h2>${pPrice.toFixed(2)}</h2>
          <p>{pDescription}</p>
          <div className='detail-btns'>
            {amount === 0 ? (
              <Button type='primary' onClick={handleAdd}>
                Add to Cart
              </Button>
            ) : (
              <div id='minus-plus-btns'>
                <Button
                  type='primary'
                  style={{ marginRight: 14 }}
                  onClick={() => handleMinusPlus('-')}
                >
                  -
                </Button>
                <Space className='quantity-text'>{amount}</Space>
                <Button
                  type='primary'
                  style={{ marginLeft: 14 }}
                  disabled={amount < pQuantity ? false : true}
                  onClick={() => handleMinusPlus('+')}
                >
                  +
                </Button>
              </div>
            )}

            {isAdmin ? (
              <Button onClick={handleEdit} id='edit-btn'>
                Edit Product
              </Button>
            ) : (
              <></>
            )}

            <Button onClick={handleCancel} id='backBtn'>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

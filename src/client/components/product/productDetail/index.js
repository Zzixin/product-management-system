import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Image, Button, InputNumber, Input } from 'antd';
import { showProduct, editProduct2DB } from '../../../actions';
import { editProduct } from '../../../actions';
import './index.css';
import { product } from '../../../constants';

const ProductDetail = ({
  setIsShowProducts,
  setIsEditProduct,
  setIsShowDetail,
  isAdmin,
  isSignedIn,
}) => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productEdit);
  const [current, setCurrent] = useState(0);
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

  const handleAdd = () => {
    // productData.choose += 1;
    setCurrent(current + 1);
    editProduct2DB(dispatch)(productData);
    //setProductChoose(productChoose + 1);
  };

  const onChange = (event) => {
    //productData.choose = value;
    setCurrent(event.target.value);
    // productData.choose = event.target.value;
    editProduct2DB(dispatch)(productData);
  };

  return (
    <div>
      <div className='detail-header'>
        <h1 className='detail-title'>Product Detail</h1>
      </div>
      <div className='detail-container'>
        <div>
          <Image
            className='detail-img'
            width={'90%'}
            src={productData.imageURL}
          />
        </div>
        <div className='detail-content'>
          <p>{productData.category}</p>
          <h2>{productData.name}</h2>
          <h2>${productData.price}</h2>
          <p>{productData.description}</p>
          <div className='detail-btns'>
            {/* <Button onClick={handleAddtoCart} type='primary'>
              {' '}
              Add to Cart
            </Button> */}

            <Input
              style={{
                width: '20%',
              }}
              prefix='Qty.'
              defaultValue={0}
              onChange={onChange}
              id='addInput'
              value={current}
            />
            <Button
              // style={{
              //   width: '45%',
              // }}
              type='primary'
              onClick={handleAdd}
              id='addBtn'
              disabled={isSignedIn ? false : true}
            >
              Add to cart
            </Button>

            {isAdmin ? (
              <Button onClick={handleEdit} id='edit-btn'>
                {' '}
                Edit Product
              </Button>
            ) : (
              <></>
            )}

            <Button onClick={handleCancel} id='backBtn'>
              {' '}
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

import { Col, Image, Input, Button, InputNumber } from 'antd';
import { editProduct, editProduct2DB } from '../../../actions';
import { useDispatch } from 'react-redux';
import { showProductFromDB } from '../../../actions';
import { productDetail } from '../../../actions';
import { useState } from 'react';
import './index.css';

const ColItem = ({ product }) => {
  const { name, price, choose, imageURL, id } = product;
  const dispatch = useDispatch();
  const [productChoose, setProductChoose] = useState(choose);

  const handleClickImage = () => {
    productDetail(dispatch)(product);
  };

  const handleEdit = () => {
    product.choose = productChoose;
    editProduct(dispatch)(product);
    //showProductFromDB(dispatch)();
  };

  return (
    <Col span={4} className='grid-col' key={id}>
      <Image src={imageURL} onClick={handleClickImage} preview={false} />
      <div className='col-name'>{name}</div>
      <div className='col-price'>{'$' + price}</div>
      <span className='col-span-container'>
        <Input.Group>
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
        <Button size='small' className='quantity-btn' onClick={handleEdit}>
          Edit
        </Button>
      </span>
    </Col>
  );
};
export default ColItem;

import { Button, Select, Col, Row, InputNumber, Image, Input } from 'antd';
import { displayOption } from '../../../constants';
import { createProduct } from '../../../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { showProductFromDB } from '../../../actions/index.js';
import ColItem from './colItem';
import './index.css';

const ProductDisplay = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   showProductFromDB(dispatch)();
  // }, dispatch);

  // showProductFromDB(dispatch)();
  const productData = useSelector((state) => state.productManage);
  // const productData = useSelector((state) => state.productManage);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleAddProduct = () => {
    console.log('add');
    createProduct(dispatch)();
  };

  // if (productData) {
  //   setImageGrid(
  //     productData.map(({ name, price, quantity, imageURL }) => {
  //       return colCell(name, price, quantity, imageURL);
  //     })
  //   );
  // }

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div className='show-header'>
        <h1 className='show-title'>Product</h1>
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
          />
          <Button
            type='primary'
            onClick={handleAddProduct}
            style={{ marginLeft: 20 }}
          >
            add product
          </Button>
        </div>
      </div>
      <div className='grid-container'>
        <Row gutter={[24, 24]} justify='start' className='grid-row'>
          {productData.map((item) => {
            return <ColItem product={item} key={item.id} />;
          })}
        </Row>
      </div>
    </div>
  );
};

export default ProductDisplay;

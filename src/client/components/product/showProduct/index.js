import { Button, Select } from 'antd';
import { displayOption } from '../../../constants';
import { createProduct } from '../../../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { showProduct } from '../../../actions/index.js';
import './index.css';

const ProductDisplay = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productManage);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleAddProduct = () => {
    console.log('add');
    createProduct(dispatch)();
  };

  const handleTEst = () => {
    console.log(productData);
  };

  return (
    <div>
      <div className='show-container'>
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
          <Button type='primary' onClick={handleAddProduct}>
            add product
          </Button>
        </div>
      </div>
      <Button onClick={handleTEst}> Button </Button>
    </div>
  );
};

export default ProductDisplay;

import { Button, Select } from 'antd';
import { displayOption } from '../../constants';
import './index.css';

const ProductPage = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleAddProduct = () => {
    console.log('add product');
  };

  return (
    <div className='container'>
      <h1 className='title'>Product</h1>
      <div className='btns'>
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
  );
};

export default ProductPage;

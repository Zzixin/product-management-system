import { Button, Input, Upload, Select, InputNumber } from 'antd';
import { productCategory } from '../../../constants';

const ProductCreate = () => {
  const handleCategory = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Create Product</h1>
      <span className='label'>Product name</span>
      <Input />
      <span className='label'>Product Description</span>
      <Input.TextArea />
      <div>
        <span className='label'>Category</span>
        <span className='label'>Price</span>
      </div>
      <div>
        <Select
          defaultValue='Grocery'
          // style={{ width: 120 }}
          onChange={handleCategory}
          options={[
            {
              value: productCategory.Grocery,
              label: productCategory.Grocery,
            },
            {
              value: productCategory.Electronics,
              label: productCategory.Electronics,
            },
            {
              value: productCategory.GiftCards,
              label: productCategory.GiftCards,
            },
          ]}
        />
        <InputNumber />
      </div>
    </div>
  );
};

export default ProductCreate;

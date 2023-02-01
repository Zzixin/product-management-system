import { Button, Form, Input, Select, InputNumber, Empty, Image } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { productCategory } from '../../../constants';
import { addProduct2DB } from '../../../actions';
import './index.css';

const ProductCreate = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState(productCategory.Grocery);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [uploadImage, setUploadImage] = useState(
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='image preivew' />
  );

  const productDetail = {
    name: productName,
    description: productDescription,
    category: category,
    price: price,
    quantity: quantity,
    imageURL: imageURL,
  };

  const onChangeCategory = (value) => {
    // console.log(`selected ${value}`);
    setCategory(value);
  };

  const onChangePrice = (value) => {
    setPrice(value);
  };

  const onChangeQuantity = (value) => {
    setQuantity(value);
  };

  const handleUpload = () => {
    if (imageURL) {
      setUploadImage(<Image width={300} src={imageURL} />);
    }
  };

  const handleSubmit = () => {
    console.log(productDetail);
    addProduct2DB(dispatch)(productDetail);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      price: '${label} is not a valid price!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <div className='create-container'>
      <p className='create-title'>Create Product</p>
      <Form
        validateMessages={validateMessages}
        style={{
          maxWidth: 700,
        }}
        layout='vertical'
        className='create-form'
      >
        <Form.Item
          name='productName'
          label='Product name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            defaultValue={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </Form.Item>

        <Form.Item name='productDescription' label='Product Description'>
          <Input.TextArea
            style={{ height: 100 }}
            defaultValue={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Form.Item
            label='Category'
            style={{
              display: 'inline-block',
              // width: 'calc(50% + 10px)',
            }}
          >
            <Select
              defaultValue={category}
              // onChange={(event) => setCategory(event.target.value)}
              style={{ width: 290, marginRight: 20 }}
              onChange={onChangeCategory}
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
          </Form.Item>

          <Form.Item
            label='Price'
            rules={[
              {
                type: 'number',
              },
            ]}
            style={{
              display: 'inline-block',
            }}
          >
            <InputNumber
              style={{ width: 290 }}
              min={0}
              defaultValue={price}
              onChange={onChangePrice}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Form.Item
            label='In Stock Quantity'
            rules={[
              {
                type: 'number',
              },
            ]}
            style={{
              display: 'inline-block',
            }}
          >
            <InputNumber
              style={{ width: 200, marginRight: 20 }}
              defaultValue={quantity}
              onChange={onChangeQuantity}
            />
          </Form.Item>

          <Form.Item
            label='Add Image Link'
            style={{
              display: 'inline-block',
            }}
          >
            <Input.Group compact>
              <Input
                addonBefore='https://'
                style={{ width: 300 }}
                defaultValue={imageURL}
                onChange={(event) =>
                  setImageURL('https://' + event.target.value)
                }
              />
              <Button type='primary' onClick={handleUpload}>
                Upload
              </Button>
            </Input.Group>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div className='image-preview'>{uploadImage}</div>
        </Form.Item>

        <Form.Item>
          <Button type='primary' onClick={handleSubmit}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductCreate;

import { Button, Form, Input, Select, InputNumber, Empty, Image } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productCategory } from '../../../constants';
import { addProduct2DB, showProduct, editProduct2DB } from '../../../actions';
import './index.css';

const ProductCreate = ({ title = 'Create Product', btn = 'Add Product' }) => {
  // const [title, setTitle] = useState('Edit Product');
  // const [btn, setBtn] = useState('Edit Product');
  // if (productData === {}) {
  //   setTitle('Create Product');
  //   setBtn('Add Product');
  // }
  let productData = useSelector((state) => state.productEdit);

  if (title === 'Create Product') {
    productData = {
      category: productCategory.Grocery,
      price: 0,
      choose: 0,
      quantity: 0,
    };
  }

  let { name, description, category, price, choose, quantity, imageURL, id } =
    productData;

  const dispatch = useDispatch();
  const [productName, setProductName] = useState(name);
  // const [productChoose, setProductChoose] = useState(choose);
  const [productDescription, setProductDescription] = useState(description);
  const [productCategory1, setProductCategory1] = useState(category);
  const [productPrice, setProductPrice] = useState(price);
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [productImageURL, setProductImageURL] = useState(imageURL);
  const [uploadImage, setUploadImage] = useState(
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='image preivew' />
  );

  const onChangeCategory = (value) => {
    // console.log(`selected ${value}`);
    setProductCategory1(value);
  };

  const onChangePrice = (value) => {
    setProductPrice(value);
  };

  const onChangeQuantity = (value) => {
    setProductQuantity(value);
  };

  const handleUpload = () => {
    if (productImageURL) {
      setUploadImage(<Image width={300} src={productImageURL} />);
    }
  };

  const handleSubmit = () => {
    const productDetail = {
      name: productName,
      description: productDescription,
      category: productCategory1,
      choose: choose,
      price: productPrice,
      quantity: productQuantity,
      imageURL: productImageURL,
      id: id,
    };
    if (title === 'Create Product') {
      addProduct2DB(dispatch)(productDetail);
    } else {
      editProduct2DB(dispatch)(productDetail);
    }
  };

  const handleCancel = () => {
    showProduct(dispatch)();
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
      <p className='create-title'>{title}</p>
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
              defaultValue={productCategory1}
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
              defaultValue={productPrice}
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
              defaultValue={productQuantity}
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
                defaultValue={productImageURL}
                onChange={(event) =>
                  setProductImageURL('https://' + event.target.value)
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
          <Button
            type='primary'
            onClick={handleSubmit}
            style={{ marginRight: 20 }}
          >
            {btn}
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductCreate;

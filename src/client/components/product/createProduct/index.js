import { Button, Form, Input, Select, InputNumber, Empty, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productCategory } from '../../../constants';
import { addProduct2DB, showProduct, editProduct2DB } from '../../../actions';
import './index.css';

const ProductCreate = ({
  title = 'Create Product',
  btn = 'Add Product',
  setIsShowProducts,
  setIsCreateProduct,
  setIsEditProduct,
}) => {
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
      price: 0.01,
      quantity: 0,
    };
  }

  let { name, description, category, price, quantity, imageURL, id } =
    productData;

  const dispatch = useDispatch();
  const [productName, setProductName] = useState(name);
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

  const handleSubmit = async () => {
    const productDetail = {
      name: productName,
      description: productDescription,
      category: productCategory1,
      price: productPrice,
      quantity: productQuantity,
      imageURL: productImageURL,
      id: id,
    };
    if (title === 'Create Product') {
      const status = await addProduct2DB(dispatch)(productDetail);
      console.log(status);
      // without error handling
      if (status === 200) {
        setIsCreateProduct(false);
        setIsShowProducts(true);
      }
    } else {
      const status = await editProduct2DB(dispatch)(productDetail);
      // without error handling
      if (status === 200) {
        setIsEditProduct(false);
        setIsShowProducts(true);
      }
    }
  };

  const handleCancel = () => {
    // showProduct(dispatch)();
    setIsCreateProduct(false);
    setIsEditProduct(false);
    setIsShowProducts(true);
  };

  const validateMessages = {
    required: '${label} is required!',
    // types: {
    //   number: '${label} is not a valid number!',
    // },
    // number: {
    //   min: "'${label}' cannot be less than ${min}",
    // },
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
        onFinish={handleSubmit}
      >
        <Form.Item
          name='productName'
          label='Product name'
          rules={title === 'Create Product' ? [{ required: true }] : []}
        >
          <Input
            defaultValue={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          name='productDescription'
          label='Product Description'
          rules={title === 'Create Product' ? [{ required: true }] : []}
        >
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
            name='productPrice'
            validateTrigger='onBlur'
            rules={[
              {
                type: 'number',
                min: 0.01,
                message: 'Quantity cannot be less than 0.01',
              },
            ]}
            style={{
              display: 'inline-block',
            }}
          >
            <InputNumber
              style={{ width: 290 }}
              // min={0.01}
              defaultValue={productPrice}
              onChange={onChangePrice}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          style={{
            marginTop: -25,
            marginBottom: -15,
          }}
        >
          <Form.Item
            label='In Stock Quantity'
            name='ProductQty'
            validateTrigger='onBlur'
            rules={[
              {
                type: 'number',
                min: 0,
                message: 'Quantity cannot be less than 0',
              },
            ]}
            style={{
              display: 'inline-block',
            }}
          >
            <InputNumber
              // min={0}
              style={{ width: 200, marginRight: 20 }}
              defaultValue={productQuantity}
              onChange={onChangeQuantity}
            />
          </Form.Item>

          <Form.Item
            label='Image Link'
            style={{
              display: 'inline-block',
            }}
          >
            <Input.Group compact>
              <Form.Item
                validateTrigger='onBlur'
                name='ImageLink'
                rules={title === 'Create Product' ? [{ required: true }] : []}
              >
                <Input
                  addonBefore='https://'
                  style={{ width: 300 }}
                  defaultValue={productImageURL}
                  onChange={(event) =>
                    setProductImageURL('https://' + event.target.value)
                  }
                />
              </Form.Item>
              <Button type='primary' onClick={handleUpload}>
                <UploadOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div className='image-preview'>{uploadImage}</div>
        </Form.Item>

        <Form.Item className='upload-btn'>
          <Button
            type='primary'
            // onClick={handleSubmit}
            style={{ marginRight: 20 }}
            htmlType='submit'
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

import { useSelector, useDispatch } from 'react-redux';
import { Image, Button } from 'antd';
import { showProduct } from '../../../actions';
import './index.css';
import { product } from '../../../constants';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productEdit);
  const handleCancel = () => {
    showProduct(dispatch)();
  };

  const handleEdit = () => {};
  const handleAddtoCart = () => {};

  return (
    <div>
      <div className='detail-header'>
        <h1 className='detail-title'>Product Detail</h1>
      </div>
      <div className='detail-container'>
        <div>
          <Image width={600} src={productData.imageURL} />
        </div>
        <div className='detail-content'>
          <p>{productData.category}</p>
          <h2>{productData.name}</h2>
          <h2>${productData.price}</h2>
          <p>{productData.description}</p>
          <div className='detail-btns'>
            <Button onClick={handleAddtoCart} type='primary'>
              {' '}
              Add to Cart
            </Button>
            <Button onClick={handleEdit} id='edit-btn'>
              {' '}
              Edit Product
            </Button>

            <Button onClick={handleCancel}> Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

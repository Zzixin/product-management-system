import { Image, InputNumber, Button, Typography } from 'antd';
import { delCartItem, editCart } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
const { Text, Link } = Typography;

const CartCell = ({
  isSignedIn,
  pid,
  pImg,
  pName,
  pNum,
  pPrice,
  pQuantity,
}) => {
  const dispatch = useDispatch();
  const memo = useSelector((state) => state.someMemo);
  const [amount, setAmount] = useState(pNum);
  // const [tmpCart, setTmpCart] = useState(sessionStorage.getItem('cart'));

  const handleChange = (value) => {
    setAmount(value);
    if (value === 0) {
      delCartItem(dispatch)({
        email: memo.user,
        id: pid,
      });
    } else {
      editCart(dispatch)({
        email: memo.user,
        id: pid,
        num: value,
      });
    }
  };

  const handleRemove = () => {
    delCartItem(dispatch)({
      email: memo.user,
      id: pid,
    });
  };

  return (
    <div className='cart-cell-container'>
      <Image className='cart-pImg' width={112} src={pImg} preview={false} />
      <div className='cart-part1'>
        <p className='cart-pName'>{pName}</p>
        <InputNumber
          style={{
            width: '35%',
          }}
          size='small'
          min={0}
          max={pQuantity}
          defaultValue={amount}
          onChange={handleChange}
          className='cart-pNum'
        />
      </div>
      <div className='cart-part2'>
        <p className='cart-pPrice'>${pPrice.toFixed(2)}</p>
        <Link
          className='remove-btn'
          underline
          style={{ color: 'grey' }}
          onClick={handleRemove}
        >
          Remove
        </Link>
      </div>
    </div>
  );
};

export default CartCell;

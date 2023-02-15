import { Layout, Input, Avatar, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { signOutSuccess } from '../../actions/index.js';
import { status } from '../../constants/index.js';
import SignModal from '../../components/signModal/index.js';

const HeaderSignIn = ({
  isSignedIn,
  setIsSignedIn,
  setIsModalPop,
  setUser,
  setCartOn,
}) => {
  const [cnt, setCnt] = useState(0);
  const [money, setMoney] = useState(0.0);
  //const cartData = useSelector((state) => state.getCartInfo);

  const strip = (number) => {
    return parseFloat(number);
  };

  // useEffect(() => {
  //   setCnt(
  //     cartData.reduce((acc, product) => {
  //       return acc + product.num;
  //     }, 0)
  //   );
  //   setMoney(
  //     productData.reduce((acc, product) => {
  //       return acc + product.choose * product.price;
  //     }, 0)
  //   );
  // }, [cartData]);

  const handleOnClick = () => {
    setIsModalPop(true);
  };

  const handleOnCart = () => {
    setCartOn(true);
  };

  return (
    <>
      <a href='#default' className='headerSignIn' onClick={handleOnClick}>
        <UserOutlined style={{ fontSize: '20px', paddingRight: '5px' }} />
        <span id='signIn-text'>Sign In</span>
      </a>

      <a href='#default' className='headerCart' onClick={handleOnCart}>
        <Badge count={cnt} showZero={true} size='small'>
          <Avatar
            size='medieum'
            icon={<ShoppingCartOutlined style={{ fontSize: '25px' }} />}
          />
        </Badge>
        <span id='amount' type='number'>
          ${strip(money).toFixed(2)}
        </span>
      </a>
    </>
  );
};

export default HeaderSignIn;

import { Layout, Input, Avatar, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import {
  signOutSuccess,
  memoCookie,
  signOut,
  getCart,
} from '../../actions/index.js';
import { status } from '../../constants/index.js';
import SignModal from '../../components/signModal/index.js';

const HeaderSignOut = ({
  isSignedIn,
  setIsSignedIn,
  setAdmin,
  setUser,
  setCartOn,
  setIsModalPop,
}) => {
  const dispatch = useDispatch();
  const [cnt, setCnt] = useState(0);
  const [money, setMoney] = useState(0);
  const cartData = useSelector((state) => state.getCartInfo);
  const productData = useSelector((state) => state.productManage);
  const memo = useSelector((state) => state.someMemo);

  const strip = (number) => {
    return parseFloat(number);
  };

  useEffect(() => {
    setCnt(
      cartData.reduce((acc, item) => {
        return acc + item.num;
      }, 0)
    );
    setMoney(
      cartData.reduce((acc, item) => {
        return productData.reduce((acc, product) => {
          if (item.id === product.id) {
            acc += item.num * product.price;
          }
          return acc;
        }, acc);
      }, 0)
    );
  }, [cartData]);

  const handleOnClick = () => {
    if (!isSignedIn) {
      setIsModalPop(true);
    } else {
      setIsModalPop(false);
      localStorage.clear();
      setIsSignedIn(false);
      setAdmin(false);
      setUser('');
      memoCookie(dispatch)({ user: '', isSignedIn: false });
      signOut(dispatch)();
      getCart(dispatch)();
      //setTimeout(100);
    }
  };

  const handleOnCart = () => {
    setCartOn(true);
  };

  return (
    <>
      <a href='#default' className='headerSignIn' onClick={handleOnClick}>
        <UserOutlined style={{ fontSize: '20px', paddingRight: '5px' }} />
        {isSignedIn ? (
          <span id='signout-icon'>{memo.user.split('@')[0]}</span>
        ) : (
          <span id='signIn-text'>Sign In</span>
        )}
      </a>

      <a href='#default' className='headerCart' onClick={handleOnCart}>
        <Badge count={cnt} showZero={true} size='small'>
          <Avatar
            size='medieum'
            icon={<ShoppingCartOutlined style={{ fontSize: '25px' }} />}
          />
        </Badge>
        <span id='amount'>${strip(money).toFixed(2)}</span>
      </a>
    </>
  );
};

export default HeaderSignOut;

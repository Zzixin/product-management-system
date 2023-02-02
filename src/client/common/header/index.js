import { Layout, Input, Avatar, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { signInModal, signOutClose, showProduct } from '../../actions/index.js';
import { useSelector } from 'react-redux';
import { signModal, status } from '../../constants';
import { useState } from 'react';
import { useEffect } from 'react';
import { showProductFromDB } from '../../actions/index.js';

import './index.css';

const { Header } = Layout;
const { Search } = Input;

const MyHeader = () => {
  const [cnt, setCnt] = useState(0);
  const [sum, setSum] = useState(0.0);
  const onSearch = (value) => console.log(value);
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.statusOption);
  const productData = useSelector((state) => state.productManage);
  const test = useSelector((state) => state.productEdit);
  // let sum = 0;
  // productData.map((product) => {
  //   sum += product.choose;
  // });
  // setCnt(sum);

  const roundFun = (value, n) => {
    return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
  };

  useEffect(() => {
    setCnt(
      productData.reduce((acc, product) => {
        return acc + product.choose;
      }, 0)
    );
    setSum(
      productData.reduce((acc, product) => {
        return acc + product.choose * product.price;
      }, 0)
    );
  }, [productData]);

  const handleOnclick = () => {
    if (currentState === status.signedOut) {
      signInModal(dispatch)();
      showProduct(dispatch)();
    } else {
      signOutClose(dispatch)();
      setCnt(0);
      setSum(0);
    }
  };

  return (
    <Layout>
      <Header className='header'>
        <a href='#default' className='headerLogo'>
          <span className='headerText1'>Management</span>
          <span className='headerText2'>chuwa</span>
        </a>

        <span className='headerInput'>
          <Search
            placeholder='Search'
            allowClear
            onSearch={onSearch}
            size='large'
          />
        </span>

        <a className='headerSignIn' onClick={handleOnclick}>
          <UserOutlined style={{ fontSize: '20px', paddingRight: '10px' }} />
          {currentState === status.signedIn ? 'Sign Out' : 'Sign In'}
        </a>

        <span className='headerCart'>
          <Badge count={cnt} showZero={true} size='small'>
            <Avatar
              size='medieum'
              icon={<ShoppingCartOutlined style={{ fontSize: '25px' }} />}
            />
          </Badge>
          <span id='amount'>${roundFun(sum, 2)}</span>
        </span>
      </Header>
    </Layout>
  );
};
// backend initialized
// redux: up to date database
// redux-store: up to date database
// react lotter

export default MyHeader;

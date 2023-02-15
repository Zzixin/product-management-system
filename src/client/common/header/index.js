import { Layout, Input, Avatar, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import HeaderSignIn from './headerSignIn.js';
import HeaderSignOut from './headerSignOut.js';
import { signOutSuccess } from '../../actions/index.js';
import { status } from '../../constants/index.js';
import SignModal from '../../components/signModal/index.js';
import { searchItem } from '../../actions/index.js';

import './index.css';

const { Search } = Input;

const MyHeader = ({
  isSignedIn,
  setIsSignedIn,
  setIsModalPop,
  setUser,
  setAdmin,
  setCartOn,
  setIsSearch,
}) => {
  const dispatch = useDispatch();
  const onSearch = (value) => {
    if (value === '') {
      setIsSearch(false);
      searchItem(dispatch)(-1);
    } else {
      setIsSearch(true);
      searchItem(dispatch)(value);
    }
  };

  return (
    <header className='header'>
      <a href='#default' className='headerLogo'>
        <span className='headerText1'>Management</span>
        <span className='headerText3'> M</span>
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
      {isSignedIn ? (
        <HeaderSignOut
          setIsSignedIn={setIsSignedIn}
          setAdmin={setAdmin}
          setUser={setUser}
          setCartOn={setCartOn}
        />
      ) : (
        <HeaderSignIn
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          setIsModalPop={setIsModalPop}
          setUser={setUser}
          setCartOn={setCartOn}
        />
      )}
    </header>
  );
};

export default MyHeader;

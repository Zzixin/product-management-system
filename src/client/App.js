import './App.css';

import MyHeader from './common/header/index.js';
import MyFooter from './common/footer/index.js';
import Home from './components/home/home.js';
import { useEffect, useState } from 'react';
import ErrorPage from './components/errorPage';
import SignModal from './components/signModal';
import './index.css';
import { memoCookie, getCart, getUser } from './actions';
import { useDispatch } from 'react-redux';
import CartModal from './components/cart/index.js';
import { CodepenOutlined } from '@ant-design/icons';

function App() {
  let tmpUser = localStorage.getItem('user');
  const [isSignedIn, setIsSignedIn] = useState(tmpUser !== null); // if user is signed in
  const [isModalPop, setIsModalPop] = useState(false);
  const [user, setUser] = useState(tmpUser === null ? '' : tmpUser);
  const [isAdmin, setAdmin] = useState(
    tmpUser === null ? false : tmpUser === 'admin'
  );
  const [isCartOn, setCartOn] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   var memo = sessionStorage.getItem('current');
  //   if (memo !== null) {
  //     setIsSignedIn(true);
  //     setUser(memo);
  //     if (memo === 'admin@gmail.com') {
  //       setAdmin(true);
  //     }
  //     getCart(dispatch)(memo);
  //
  //   } else {
  //     if (sessionStorage.getItem('cart') === null) {
  //       sessionStorage.setItem(
  //         'cart',
  //         JSON.stringify([
  //           { a: 1, b: 2 },
  //           { c: 3, d: 4 },
  //         ])
  //       );
  //     }
  //   }
  // }, []);
  // cookie
  // token jwt, 后端来解密
  // localstorage 未登录的购物车加入localstorage

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await getUser(dispatch)();
        if (response.id) {
          localStorage.setItem('user', response.email.split('@')[0]);
          setIsSignedIn(true);
          setUser(response.email);
          memoCookie(dispatch)({ user: response.email, isSignedIn: true });
        } else {
          setIsSignedIn(false);
          console.log('getFailed');
        }
        if (response.email === 'admin@gmail.com') {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {}
    };

    getCurrentUser();
  }, []);

  return (
    <div className='APP'>
      <MyHeader
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        setIsModalPop={setIsModalPop}
        setAdmin={setAdmin}
        setUser={setUser}
        setCartOn={setCartOn}
        setIsSearch={setIsSearch}
      />
      <CartModal
        isSignedIn={isSignedIn}
        isCartOn={isCartOn}
        setCartOn={setCartOn}
      />
      <SignModal
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        isModalPop={isModalPop}
        setIsModalPop={setIsModalPop}
        setUser={setUser}
        setAdmin={setAdmin}
      />

      <Home
        isSignedIn={isSignedIn}
        user={user}
        isAdmin={isAdmin}
        isSearch={isSearch}
      />
      <MyFooter />
    </div>
  );
}

export default App;

import './App.css';

import MyHeader from './common/header/index.js';
import MyFooter from './common/footer/index.js';
import Home from './components/home/home.js';
import { useEffect, useState } from 'react';
import ErrorPage from './components/errorPage';
import SignModal from './components/signModal';
import './index.css';
import { memoCookie, getCart } from './actions';
import { useDispatch } from 'react-redux';
import CartModal from './components/cart/index.js';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // if user is signed in
  const [isModalPop, setIsModalPop] = useState(false);
  const [user, setUser] = useState('');
  const [isAdmin, setAdmin] = useState(false);
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
  //     memoCookie(dispatch)({ user: memo, isSignedIn: true });
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

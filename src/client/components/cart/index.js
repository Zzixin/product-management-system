import CartList from './cartList';
import CartContent from './cartContent';
import { useState, useEffect } from 'react';
import './index.css';

const CartModal = ({ isSignedIn, isCartOn, setCartOn, user }) => {
  return (
    <div>
      <CartList isCartOn={isCartOn} setCartOn={setCartOn}>
        <CartContent isSignedIn={isSignedIn} user={user} />
      </CartList>
    </div>
  );
};

export default CartModal;

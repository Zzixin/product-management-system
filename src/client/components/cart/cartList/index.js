import Modal from 'antd/es/modal/Modal';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.css';

const CartList = ({ isCartOn, setCartOn, children }) => {
  const [cnt, setCnt] = useState(0);
  const cartData = useSelector((state) => state.getCartInfo);

  useEffect(() => {
    setCnt(
      cartData.reduce((acc, item) => {
        return acc + item.num;
      }, 0)
    );
  }, [cartData]);

  return (
    <div>
      <Modal
        title={<div id='cart-title'>Cart({cnt})</div>}
        className='cart-modal'
        style={{ top: 5 }}
        //</div>bodyStyle={{ maxHeight: 700 }}
        open={isCartOn}
        onCancel={() => {
          setCartOn(false);
        }}
        hea
        footer={null}
        // width={'35%'}
      >
        {children}
      </Modal>
    </div>
  );
};

export default CartList;

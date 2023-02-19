import { Divider, Input, Button, Alert } from 'antd';
import CartCell from './cartCell';
import { useSelector } from 'react-redux';
import './index.css';
import { useEffect, useState } from 'react';

const CartContent = ({ isSignedIn, user }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [cntID, setCntID] = useState(0);
  const [couponValidate, setCouponValidate] = useState(<></>);
  const productData = useSelector((state) => state.productManage);
  const cartData = useSelector((state) => state.getCartInfo);
  const memo = useSelector((state) => state.someMemo);
  // const tmpCart = sessionStorage.getItem('cart');

  useEffect(() => {
    let cp = localStorage.getItem('cp');
    let tmpPer = 1;
    if (cp === null) {
      return;
    }
    switch (cp) {
      case '20 DOLLAR OFF':
        tmpPer = 20;
      case '10 OFF':
        tmpPer = 0.1;
      default:
        tmpPer = 1;
    }

    setCouponValidate(
      <Alert
        // key={-1}
        message={`Coupon ${cp} applied!`}
        type='success'
        closable
        showIcon
        onClose={clearCoupon}
      />
    );

    let tmpDiscount = tmpPer < 1 ? subtotal * tmpPer : tmpPer;
    setDiscount(tmpDiscount);
    setTax((subtotal - tmpDiscount) * 0.01);
    setEstimatedTotal((subtotal - tmpDiscount) * 1.01);
  }, []);

  useEffect(() => {
    const total = cartData.reduce((acc, item) => {
      return productData.reduce((acc, product) => {
        if (item.id === product.id) {
          acc += item.num * product.price;
        }
        return acc;
      }, acc);
    }, 0);

    setSubtotal(total);

    setTax(total * 0.01);

    setEstimatedTotal(total + total * 0.01);
  }, [cartData, user]);

  const clearCoupon = () => {
    setCoupon('');
    setDiscount(0);
    setTax(subtotal * 0.01);
    setEstimatedTotal(subtotal * 1.01);
  };

  useEffect(() => {
    setCouponValidate(<></>);
    clearCoupon();
  }, [user]);

  const handleCoupon = () => {
    setCntID(cntID + 1);
    // if (coupon !== '') {
    //   setCouponValidate(
    //     <Alert
    //       key={cntID}
    //       message={`Coupon ${coupon}  is already applied!`}
    //       type='warning'
    //       closable
    //       showIcon
    //       onClose={clearCoupon}
    //     />
    //   );
    //   return;
    // }
    let tmpPercentage = 0;
    if (coupon === '20 DOLLAR OFF') {
      tmpPercentage = 20;
      localStorage.setItem('cp', '20 DOLLAR OFF');
    } else if (coupon === '10 OFF') {
      tmpPercentage = 0.1;
      localStorage.setItem('cp', '10 OFF');
    } else {
      setCouponValidate(
        <Alert
          key={cntID}
          message='Coupon cannot be applied'
          type='error'
          closable
          showIcon
        />
      );
      return;
    }
    setCouponValidate(
      <Alert
        key={cntID}
        message={`Coupon ${coupon} applied!`}
        type='success'
        closable
        showIcon
        onClose={clearCoupon}
      />
    );

    let tmpDiscount =
      tmpPercentage < 1 ? subtotal * tmpPercentage : tmpPercentage;
    setDiscount(tmpDiscount);
    setTax((subtotal - tmpDiscount) * 0.01);
    setEstimatedTotal((subtotal - tmpDiscount) * 1.01);
  };

  if (cartData.length === 0) {
    return <h3>empty cart</h3>;
  } else {
    return (
      <div>
        <Divider id='header-divider' />
        {cartData.map((item) => {
          return productData.map((product) => {
            if (item.id === product.id) {
              return (
                <CartCell
                  isSignedIn={isSignedIn}
                  key={item.id}
                  pid={item.id}
                  pImg={product.imageURL}
                  pName={product.name}
                  pNum={item.num}
                  pPrice={product.price}
                  pQuantity={product.quantity}
                />
              );
            }
          });
        })}
        <p id='coupon-label'>Apply Discount Code</p>
        <div className='coupon-container'>
          <Input
            style={{ width: '75%' }}
            allowClear
            value={coupon}
            onChange={(event) => {
              setCoupon(event.target.value);
              // if (event.target.value === '') {
              //   setCouponValidate(<></>);
              // }
            }}
          />
          <Button type='primary' onClick={handleCoupon}>
            Apply
          </Button>
        </div>
        <div>{couponValidate}</div>

        <Divider id='footer-divider' />

        <div className='subtotal-container'>
          <div>
            <div className='subtotal-labels'>Subtotal</div>
            <div className='subtotal-labels'>Discount</div>
            <div className='subtotal-labels'>Tax</div>
            <div className='subtotal-labels'>Estimated total</div>
          </div>

          <div>
            <div className='subtotal-number'>{subtotal.toFixed(2)}</div>
            <div className='subtotal-number'>{discount.toFixed(2)}</div>
            <div className='subtotal-number'>{tax.toFixed(2)}</div>
            <div className='subtotal-number'>{estimatedTotal.toFixed(2)}</div>
          </div>
        </div>

        <Button type='primary' id='checkout-btn'>
          Continue to checkout
        </Button>
      </div>
    );
  }
};

export default CartContent;

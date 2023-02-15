import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import './index.css';
import { useSelector } from 'react-redux';

const MyModal = ({ title, isModalPop, setIsModalPop, setSignIn, children }) => {
  return (
    <>
      <Modal
        title={<div className='modal-title'>{title}</div>}
        centered
        open={isModalPop}
        onCancel={() => {
          setIsModalPop(false);
          setSignIn(true);
        }}
        footer={null}
        width={450}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;

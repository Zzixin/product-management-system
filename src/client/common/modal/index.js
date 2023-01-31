import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import './index.css';
import { useSelector } from 'react-redux';
import { signOutClose } from '../../actions/index.js';

const MyModal = ({ title, show, children }) => {
  const [isVisible, setIsVisible] = useState(show);
  const type = useSelector((state) => state.modalSwitch);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(true);
  }, [type]);

  return (
    <>
      <Modal
        title={<div className='modal-title'>{title}</div>}
        centered
        open={isVisible}
        onCancel={() => {
          setIsVisible(false);
          signOutClose(dispatch)();
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

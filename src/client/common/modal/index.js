import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { signInModal } from '../../actions/index.js';
import { useDispatch } from 'react-redux';
import './index.css';
import { useSelector } from 'react-redux';

const MyModal = ({ title, show, children }) => {
  const [isVisible, setIsVisible] = useState(show);
  const type = useSelector((state) => state);

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

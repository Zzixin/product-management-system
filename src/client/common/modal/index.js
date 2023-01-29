import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { giveFeedback } from '../../actions/index.js';
import { useDispatch } from 'react-redux';
import './index.css';
import { useSelector } from 'react-redux';

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
          giveFeedback(dispatch)(true);
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

import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './index.css';

const ForgetPassword = ({}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = () => {
    console.log('password:', password);
  };

  return (
    <div>
      <Form layout='vertical' className='password-modal'>
        <Form.Item
          name='password'
          label='New Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        >
          <Input placeholder='you@example.com' type='email' />
        </Form.Item>
        <Form.Item
          name='passwordConfirm'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
          ]}
          hasFeedback
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
        >
          <Input.Password />
        </Form.Item>
        <Button type='primary' className='passwordBtn' onClick={handleSubmit}>
          Update Password
        </Button>
      </Form>
    </div>
  );
};

export default ForgetPassword;

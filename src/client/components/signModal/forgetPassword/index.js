import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modifyPassword } from '../../../actions/index.js';
import './index.css';

const ForgetPassword = (email) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    modifyPassword(dispatch)({
      email: email.email,
      password: password,
    });
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
            {
              pattern: new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
              ),
              message:
                'Password must have at least 8 characters and contain at least one lowercase letter, uppercase letter, number, and special character',
            },
          ]}
          hasFeedback
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='passwordConfirm'
          label='Confirm Password'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
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

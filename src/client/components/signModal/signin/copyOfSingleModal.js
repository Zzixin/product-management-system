import MyModal from '../../../common/modal/index.js';
import { Button, Form, Input, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpModal } from '../../../actions/index.js';
import './index.css';

const SignIn = ({ show, type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleTitle = () => {
    switch (type) {
      case 1:
        return 'Sign in to your account';
      case 2:
        return 'Sign up an account';
    }
  };

  const handleBtn = () => {
    switch (type) {
      case 1:
        return 'Sign In';
      case 2:
        return 'Create an account';
    }
  };

  const handleSubmit = () => {
    console.log('email:', email);
    console.log('password:', password);
  };

  const handleSignUp = () => {
    signUpModal(dispatch)(true);
  };

  return (
    <MyModal title={handleTitle()} show={show}>
      <Form layout='vertical'>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          hasFeedback
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        >
          <Input placeholder='you@example.com' type='email' />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
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
          <Input.Password />
        </Form.Item>
        <Button type='primary' className='signInBtn' onClick={handleSubmit}>
          Sign In
        </Button>
      </Form>
      <div className='signin-footer'>
        <span id='signin-signUp'>
          Don't have an account?<a onClick={handleSignUp}>Sign up</a>
        </span>

        <a id='signin-forgetpassword'> Forget password</a>
      </div>
    </MyModal>
  );
};

export default SignIn;

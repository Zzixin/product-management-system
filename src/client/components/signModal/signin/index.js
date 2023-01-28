import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpModal } from '../../../actions/index.js';
import { passwordModal } from '../../../actions/index.js';
import { signInData } from '../../../actions/index.js';
import { giveFeedback } from '../../../actions/index.js';
import './index.css';

const SignIn = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('email:', email);
    console.log('password:', password);
    signInData(dispatch)({
      email: email,
      password: password,
    });
    giveFeedback(dispatch)(true);
  };

  const handleSignUp = () => {
    signUpModal(dispatch)(true);
  };

  const handlePassword = () => {
    passwordModal(dispatch)(email);
  };

  return (
    <div>
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

        <a id='signin-forgetpassword' onClick={handlePassword}>
          {' '}
          Forget password
        </a>
      </div>
    </div>
  );
};

export default SignIn;

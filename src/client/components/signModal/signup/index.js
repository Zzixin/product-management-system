import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { signInModal } from '../../../actions/index.js';
import { useDispatch } from 'react-redux';
import { signUpData } from '../../../actions/index.js';
import './index.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('email:', email);
    console.log('password:', password);
    signUpData(dispatch)({
      email: email,
      password: password,
    });
  };

  const handleSignIn = () => {
    signInModal(dispatch)(true);
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
        <Button type='primary' className='signUpBtn' onClick={handleSubmit}>
          Create account
        </Button>
      </Form>
      <div className='signUp-footer'>
        <span id='signUp-signUp'>
          Already have an account?<a onClick={handleSignIn}>Sign in</a>
        </span>
      </div>
    </div>
  );
};

export default SignUp;

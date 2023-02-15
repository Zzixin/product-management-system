import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  signInData,
  signInDefault,
  memoCookie,
  getCart,
} from '../../../actions/index.js';
import { status } from '../../../constants/index.js';
import './index.css';

const SignIn = ({
  setSignIn,
  setSignUp,
  setEditPassword,
  setIsSignedIn,
  setUser,
  setAdmin,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidateType, setEmailValidateType] = useState('onBlur');
  const [emailFeedbackState, setEmailFeedbackState] = useState(false);

  const dispatch = useDispatch();
  const { type, error, msg } = useSelector((state) => state.statusOption);

  useEffect(() => {
    signInDefault(dispatch)(); // make the statusOption to the default one
  }, [dispatch]);

  useEffect(() => {
    if (type === status.signedUp && error === false) {
      messageApi.open({
        key: 'signUp',
        type: 'success',
        content: 'Sign up successfully.',
      });
      message.destroy();
    }

    if (type === status.changedPassword && error === false) {
      messageApi.open({
        key: 'passwordChange',
        type: 'success',
        content: 'Change Password Successfully.',
      });
    }

    if (type === status.signedIn && error !== undefined) {
      messageApi.open({
        type: { error } ? 'error' : 'success',
        content: msg,
      });

      if (type === status.signedIn && error === false) {
        signInDefault(dispatch)();
        setUser(email);
        if (email === 'admin@gmail.com') {
          setAdmin(true);
        }
        setIsSignedIn(true);
        memoCookie(dispatch)({ user: email, isSignedIn: true });
        getCart(dispatch)(email);
        // sessionStorage.setItem('current', email);
        // signInSuccess(dispatch)();
      }
    }
  }, [msg]);

  const handleSubmit = () => {
    signInData(dispatch)({
      email: email,
      password: password,
    });
  };

  const handleSignUp = () => {
    setSignIn(false);
    setSignUp(true);
    setEditPassword(false);
  };

  const handlePassword = () => {
    setSignIn(false);
    setSignUp(false);
    setEditPassword(true);
  };

  return (
    <div>
      {contextHolder}
      <Form layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          name='email'
          validateTrigger={emailValidateType}
          label='Email'
          rules={[
            {
              type: 'email',
              message: 'Please input a valid email address',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          hasFeedback={emailFeedbackState}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        >
          <Input
            placeholder='you@example.com'
            type='email'
            onBlur={() => {
              setEmailValidateType('onChange');
              setEmailFeedbackState(true);
            }}
          />
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
          //hasFeedback
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        >
          <Input.Password />
        </Form.Item>

        <Button type='primary' className='signInBtn' htmlType='submit'>
          Sign In
        </Button>
      </Form>
      <div className='signin-footer'>
        <span id='signin-signUp'>
          Don't have an account?<a onClick={handleSignUp}>Sign up</a>
        </span>

        <a id='signin-forgetpassword' onClick={handlePassword}>
          Forget password
        </a>
      </div>
    </div>
  );
};

export default SignIn;

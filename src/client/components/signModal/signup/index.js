import { Button, Form, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpData } from '../../../actions/index.js';
import { status } from '../../../constants/index.js';
import './index.css';

const SignUp = ({ setSignIn, setSignUp }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidateType, setEmailValidateType] = useState('onBlur');
  const [emailFeedbackState, setEmailFeedbackState] = useState(false);
  const [passwordValidateType, setPasswordValidateType] = useState('onBlur');
  const [passwordFeedbackState, setPasswordFeedbackState] = useState(false);

  const { type, error, msg } = useSelector((state) => state.statusOption);

  useEffect(() => {
    if (type === status.signedUp && error !== undefined) {
      messageApi.open({
        type: { error } ? 'error' : 'success',
        content: msg,
      });

      if (type === status.signedUp && error === false) {
        setSignIn(true);
        setSignUp(false);
      }
    }
  }, [msg]);

  const handleSubmit = () => {
    signUpData(dispatch)({
      email: email,
      password: password,
    });
  };

  const handleSignIn = () => {
    setSignIn(true);
    setSignUp(false);
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
              message: 'The input is not valid E-mail!',
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
            onBlur={() => {
              setEmailValidateType('onChange');
              setEmailFeedbackState(true);
            }}
          />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          validateTrigger={passwordValidateType}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              pattern: new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
              ),
              message: [
                '- Password must have at least 8 characters',
                '- at least one lowercase letter, uppercase letter',
                '- at least one number, and special character',
              ],
            },
          ]}
          hasFeedback={passwordFeedbackState}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        >
          <Input.Password
            onBlur={() => {
              setPasswordValidateType('onChange');
              setPasswordFeedbackState(true);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='signUpBtn' htmlType='submit'>
            Create account
          </Button>
        </Form.Item>
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

import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modifyPassword } from '../../../actions/index.js';
import './index.css';

const ConfirmPassword = ({ setSignIn, emailToUpdate, setConfirmPassword }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [pwdValidateType, setPwdValidateType] = useState('onBlur');
  const [pwdFeedbackState, setPwdFeedbackState] = useState(false);
  const [pwdConValidateType, setPwdConValidateType] = useState('onBlur');
  const [pwdConFeedbackState, setpPwdConFeedbackState] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    modifyPassword(dispatch)({
      email: emailToUpdate,
      password: password,
    });
    setConfirmPassword(false);
    setSignIn(true);
  };

  return (
    <div>
      <Form
        layout='vertical'
        className='password-modal'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='password'
          label='New Password'
          validateTrigger={pwdValidateType}
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
          hasFeedback={pwdFeedbackState}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        >
          <Input.Password
            onBlur={() => {
              setPwdValidateType('onChange');
              setPwdFeedbackState(true);
            }}
          />
        </Form.Item>
        <Form.Item
          name='passwordConfirm'
          label='Confirm Password'
          validateTrigger={pwdConValidateType}
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
          hasFeedback={pwdConFeedbackState}
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
        >
          <Input.Password
            onBlur={() => {
              setPwdConValidateType('onChange');
              setpPwdConFeedbackState(true);
            }}
          />
        </Form.Item>
        <Button type='primary' className='passwordBtn' htmlType='submit'>
          Update Password
        </Button>
      </Form>
    </div>
  );
};

export default ConfirmPassword;

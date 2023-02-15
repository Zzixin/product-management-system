import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmailExist } from '../../../actions';
import './index.css';

const ForgetPassword = ({
  setEditPassword,
  setEmailToUpdate,
  setConfirmPassword,
}) => {
  const [email, setEmail] = useState('');
  const [emailValidateType, setEmailValidateType] = useState('onBlur');
  const [emailFeedbackState, setEmailFeedbackState] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    const existed = await isEmailExist(dispatch)(email);
    console.log(existed);
    if (existed) {
      setEditPassword(false);
      setEmailToUpdate(email);
      setConfirmPassword(true);
    } else {
      messageApi.open({
        // key: 'signUp',
        type: 'error',
        content: 'email does not exist',
      });
      setEmailValidateType('onBlur');
    }
  };

  return (
    <div>
      {contextHolder}
      <p id='instruction'>
        {/* Enter your email link, we will send you the recovery link */}
      </p>
      <Form
        layout='vertical'
        className='password-modal'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='email'
          label='Email'
          validateTrigger={emailValidateType}
          rules={[
            {
              type: 'email',
              message: 'Please input a valid email address',
            },
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback={emailFeedbackState}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        >
          <Input
            onBlur={() => {
              setEmailValidateType('onChange');
              setEmailFeedbackState(true);
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

export default ForgetPassword;

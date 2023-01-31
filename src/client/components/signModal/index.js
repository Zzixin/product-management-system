import MyModal from '../../common/modal';
import SignIn from './signin/index.js';
import SignUp from './signup/index.js';
import ForgetPassword from './forgetPassword';
import { signModal } from '../../constants';

const SignModal = ({ show, type, email = '' }) => {
  const handleTitle = () => {
    switch (type) {
      case signModal.signIn:
        return 'Sign in to your account';
      case signModal.signUp:
        return 'Sign up an account';
      case signModal.forgetPassword:
        return 'Change your passowrd';
    }
  };

  const chooseModal = () => {
    switch (type) {
      case signModal.signIn:
        return <SignIn />;
      case signModal.signUp:
        return <SignUp />;
      case signModal.forgetPassword:
        return <ForgetPassword email={email} />;
    }
  };

  return (
    <MyModal title={handleTitle()} show={show}>
      {chooseModal()}
    </MyModal>
  );
};

export default SignModal;

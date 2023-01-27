import MyModal from '../../common/modal';
import SignIn from './signin/index.js';
import SignUp from './signup/index.js';
import ForgetPassword from './forgetPassword';

const SignModal = ({ show, type }) => {
  const handleTitle = () => {
    switch (type) {
      case 1:
        return 'Sign in to your account';
      case 2:
        return 'Sign up an account';
      case 3:
        return 'Change your passowrd';
    }
  };

  const chooseModal = () => {
    switch (type) {
      case 1:
        return <SignIn />;
      case 2:
        return <SignUp />;
      case 3:
        return <ForgetPassword />;
    }
  };

  return (
    <MyModal title={handleTitle()} show={show}>
      {chooseModal()}
    </MyModal>
  );
};

export default SignModal;

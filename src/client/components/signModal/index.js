import MyModal from '../../common/modal';
import SignIn from './signin/index.js';
import SignUp from './signup/index.js';
import ForgetPassword from './forgetPassword/index.js';
import ConfirmPassword from './forgetPassword/setNewPWD';
import { signModal } from '../../constants';
import { useEffect, useState } from 'react';

const SignModal = ({
  isSignedIn,
  setIsSignedIn,
  isModalPop,
  setIsModalPop,
  setUser,
  setAdmin,
}) => {
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [emailToUpdate, setEmailToUpdate] = useState('');

  return (
    <div>
      {!isSignedIn ? (
        <MyModal
          title={
            signIn
              ? 'Sign in to your account'
              : signUp
              ? 'Sign up an account'
              : 'Update your password'
          }
          isModalPop={isModalPop}
          setIsModalPop={setIsModalPop}
          setSignIn={setSignIn}
        >
          {signIn ? (
            <SignIn
              setSignIn={setSignIn}
              setSignUp={setSignUp}
              setEditPassword={setEditPassword}
              setIsSignedIn={setIsSignedIn}
              setUser={setUser}
              setAdmin={setAdmin}
            />
          ) : signUp ? (
            <SignUp setSignIn={setSignIn} setSignUp={setSignUp} />
          ) : editPassword ? (
            <ForgetPassword
              setEditPassword={setEditPassword}
              setEmailToUpdate={setEmailToUpdate}
              setConfirmPassword={setConfirmPassword}
            />
          ) : (
            <ConfirmPassword
              setSignIn={setSignIn}
              emailToUpdate={emailToUpdate}
              setConfirmPassword={setConfirmPassword}
            />
          )}
        </MyModal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SignModal;

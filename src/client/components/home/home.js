import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SignModal from '../signModal';
import { signModal, status } from '../../constants';
import ProductPage from '../product/index.js';

const Home = ({ isSignedIn, user, isAdmin, isSearch }) => {
  const statusChoice = useSelector((state) => state.statusOption);
  return (
    <div>
      {
        <ProductPage
          isAdmin={isAdmin}
          user={user}
          isSignedIn={isSignedIn}
          isSearch={isSearch}
        />
      }
    </div>
  );
  // if (isSignedIn) {
  //   console.log(isSignedIn);
  //   return <ProductPage />;
  // } else {
  //   console.log(isSignedIn);
  //   return <></>;
  // }

  // if (statusChoice === status.signedIn) {
  //   return <ProductPage />;
  // } else {
  //   if (type === signModal.forgetPassword) {
  //     return <SignModal show={true} type={type} email={type} />;
  //   } else if (type === signModal.signIn || type === signModal.signUp) {
  //     return <SignModal show={true} type={type} />;
  //   } else {
  //     return <div>You have not signed in yet</div>;
  //   }
  // }
};

export default Home;

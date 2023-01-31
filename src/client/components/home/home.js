import { useSelector } from 'react-redux';
import SignModal from '../signModal';
import { signModal, status } from '../../constants';
import ProductPage from '../product/index.js';

const Home = () => {
  const type = useSelector((state) => state.modalSwitch);
  const statusChoice = useSelector((state) => state.statusOption);
  if (statusChoice === status.signedIn) {
    return <ProductPage />;
  } else {
    if (type === signModal.forgetPassword) {
      return <SignModal show={true} type={type} email={type} />;
    } else if (type === signModal.signIn || type === signModal.signUp) {
      return <SignModal show={true} type={type} />;
    } else {
      return <div>You have not signed in yet</div>;
    }
  }
};

export default Home;

import { useSelector } from 'react-redux';
import SignModal from '../signModal';
import { signModal, status } from '../../constants';
import ProductPage from '../product/index.js';

const Home = () => {
  const type = useSelector((state) => state.modalSwitch);
  const productChoice = useSelector((state) => state.productOption);
  if (productChoice === status.signedIn) {
    return <ProductPage />;
  } else {
    if (type === status.signedOut) {
      return <div>You have not signed in yet</div>;
    } else if (type === signModal.forgetPassword) {
      return <SignModal show={true} type={type} email={type} />;
    } else {
      return <SignModal show={true} type={type} />;
    }
  }
};

export default Home;

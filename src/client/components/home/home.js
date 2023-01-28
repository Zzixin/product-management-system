import { useSelector } from 'react-redux';
import SignModal from '../signModal';

const Home = () => {
  const type = useSelector((state) => state.modalSwitch); // 1-signin, 2- signup, 3- password, 4- blank

  if (type === 0) {
    return <></>;
  } else {
    if (type === 1 || type === 2) {
      return <SignModal show={true} type={type} />;
    } else {
      console.log(type);
      return <SignModal show={true} type={3} email={type} />;
    }
  }
};

export default Home;

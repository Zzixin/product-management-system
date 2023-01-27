import { useSelector } from 'react-redux';
import SignModal from '../signModal';

const Home = () => {
  const type = useSelector((state) => state); // 1-signin, 2- signup, 3- password, 4- blank

  if (type == 0) {
    return <></>;
  } else {
    return <SignModal show={true} type={type} />;
  }
};

export default Home;

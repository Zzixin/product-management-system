import { Layout, Input } from 'antd';
import './index.css';
import { useDispatch } from 'react-redux';
import { signInModal } from '../../actions/index.js';
import { useState } from 'react';

const { Header } = Layout;
const { Search } = Input;

const MyHeader = () => {
  const onSearch = (value) => console.log(value);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleOnclick = () => {
    signInModal(dispatch)(true);
    setCount(count + 1);
  };

  return (
    <Layout>
      <Header className='header'>
        <span className='headerText1'>Management</span>
        <span className='headerText2'>chuwa</span>
        <span className='headerInput'>
          <Search
            placeholder='Search'
            allowClear
            onSearch={onSearch}
            size='large'
          />
        </span>
        <a className='headerSignIn' onClick={handleOnclick}>
          Sign In
        </a>
        <span className='headerCart'>Cart</span>
      </Header>
    </Layout>
  );
};

export default MyHeader;

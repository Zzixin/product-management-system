import { Layout, Input, Avatar, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { signInModal } from '../../actions/index.js';
import { useSelector } from 'react-redux';
import { signModal, status } from '../../constants';

import './index.css';

const { Header } = Layout;
const { Search } = Input;

const MyHeader = () => {
  const onSearch = (value) => console.log(value);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.statusSwitch);

  const handleOnclick = () => {
    signInModal(dispatch)();
  };

  return (
    <Layout>
      <Header className='header'>
        <a href='#' className='headerLogo'>
          <span className='headerText1'>Management</span>
          <span className='headerText2'>chuwa</span>
        </a>

        <span className='headerInput'>
          <Search
            placeholder='Search'
            allowClear
            onSearch={onSearch}
            size='large'
          />
        </span>

        <a className='headerSignIn' onClick={handleOnclick}>
          <UserOutlined style={{ fontSize: '20px', paddingRight: '10px' }} />
          {type === status.signedIn ? 'Sign Out' : 'Sign In'}
        </a>

        <span className='headerCart'>
          <Badge count={0} showZero={true} size='small'>
            <Avatar
              size='medieum'
              icon={<ShoppingCartOutlined style={{ fontSize: '25px' }} />}
            />
          </Badge>
          <span id='amount'>$0.00</span>
        </span>
      </Header>
    </Layout>
  );
};

export default MyHeader;

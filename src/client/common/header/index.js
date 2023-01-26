import { Layout, Input } from 'antd';
import './index.css';

const { Header } = Layout;
const { Search } = Input;

const MyHeader = () => {
  const onSearch = (value) => console.log(value);

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
        <span className='headerSignIn'>Sign In</span>
        <span className='headerCart'>Cart</span>
      </Header>
    </Layout>
  );
};

export default MyHeader;

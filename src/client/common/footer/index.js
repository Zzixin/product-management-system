import { Space } from 'antd';
import {
  createFromIconfontCN,
  YoutubeFilled,
  FacebookFilled,
  TwitterOutlined,
} from '@ant-design/icons';

import './index.css';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const MyFooter = () => {
  return (
    // <Layout>
    //   <Footer
    //     className='footer'
    //     theme='dark'
    //     style={{
    //       textAlign: 'center',
    //     }}
    //   >
    //     Ant Design ©2023 Created by Ant UED
    //   </Footer>
    // </Layout>
    <footer>
      <Space id='footerCopyRight'>&copy;2023 All rights reserved</Space>
      <Space size={10} id='footerIcon'>
        {/* <IconFont type='icon-tuichu' />
        <IconFont type='icon-twitter' />
        <IconFont type='icon-facebook' /> */}
        <YoutubeFilled />
        <FacebookFilled />
        <TwitterOutlined />
      </Space>
      <Space size={20} id='footerOthers'>
        <span>contact us</span>
        <span>Privacy Policies</span>
        <span>Help</span>{' '}
      </Space>
    </footer>
  );
};

export default MyFooter;

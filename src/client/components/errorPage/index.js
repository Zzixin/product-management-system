import React from 'react';
import { Button, Result } from 'antd';

const ErrorPage = () => (
  <Result
    status='404'
    title='404'
    subTitle='Oop, something went wrong.'
    extra={<Button type='primary'>Back Home</Button>}
  />
);

export default ErrorPage;

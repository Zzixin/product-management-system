import { Result } from 'antd';

const EmptyItem = () => {
  return (
    <Result
      status='404'
      title='No Item found'
      subTitle="Sorry, we didn't find the item you search."
    />
  );
};

export default EmptyItem;

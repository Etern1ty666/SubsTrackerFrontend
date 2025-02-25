import { Space } from 'antd';
import React from 'react';
import { observer } from 'mobx-react-lite';

const InsideContent = ({children}) => {

  return (
    <Space
      direction="vertical"
      size="middle"
      align='center'
      style={{width: '100%', alignItems: 'stretch'}}
    >
      {children}
    </Space>
  );
};
export default observer(InsideContent);
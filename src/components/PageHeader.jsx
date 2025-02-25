import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { Typography } from 'antd';
import { observer } from 'mobx-react-lite';

const { Title } = Typography;

const headerStyle = {
    textAlign: 'center',
    backgroundColor: '#0C0C0C'
};

const PageHeader = ({PageName}) => {
  return(
    <Header style={headerStyle}>
      <Title level={5}>{PageName}</Title>
    </Header>
  )
};
export default observer(PageHeader);
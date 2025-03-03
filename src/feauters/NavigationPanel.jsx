import React, { useState, useEffect } from 'react';
import { BarsOutlined, CalendarOutlined, PieChartOutlined, SettingOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const iconStyle = { fontSize: '26px', marginTop: 15}

const NavigationPanel = () => {
  
  const [selectedPage, setSelectedPage] = useState('/main');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location]);

  const redirect = (path) => {
    setSelectedPage(path);
    navigate(path);
  }
  return <>
    <Segmented
        style={{
          zIndex: 999,
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 60,
          backgroundColor:'#111111',
          borderRadius: 0
        }}
        key={location.pathname}
        value={selectedPage}
        onChange={redirect}
        block
        size="large"
        options={[
        {
          value: '/main',
          icon: <BarsOutlined style={iconStyle}/>,
        },
        {
          value: '/calendar',
          icon: <CalendarOutlined style={iconStyle}/>,
        },
        {
          value: '/statistics',
          icon: <PieChartOutlined style={iconStyle}/>,
        },
        {
          value: '/settings',
          icon: <SettingOutlined style={iconStyle}/>,
        },
      ]}
    />
  </>;
};
export default observer(NavigationPanel);
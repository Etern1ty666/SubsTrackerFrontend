import React, { useState, useEffect } from 'react';
import { BarsOutlined, CalendarOutlined, PieChartOutlined, SettingOutlined } from '@ant-design/icons';
import { Segmented, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { observer } from 'mobx-react-lite';

const tg = window.Telegram.WebApp;

const iconStyle = { fontSize: '24px', marginTop: 10}

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
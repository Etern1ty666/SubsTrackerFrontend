import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import { ConfigProvider, theme } from "antd";
import ruRU from "antd/es/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.locale("ru");
document.body.style.background = '#0C0C0C'
const mainTheme = {
  "token": {
    "colorPrimary": "#13c2c2",
    "colorInfo": "#13c2c2",
    "colorLink": "#1677ff"
  },
  "algorithm": theme.darkAlgorithm
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <React.StrictMode>
      <ConfigProvider locale={ruRU} theme={mainTheme}>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  
);

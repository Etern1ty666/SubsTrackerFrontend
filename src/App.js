import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ConfigProvider } from 'antd';
import { theme } from 'antd';
import AppRouter from './routes/AppRouter';



function App() {

    /*useEffect(() => {
        const tg = window.Telegram.WebApp;
        axios.get( process.env.REACT_APP_API_URL + 'api/checkTelegramData/', { params: { init_data: tg.initData, user_info: tg.initDataUnsafe.user}})
            .then(response => console.log('Telegram data valid', response))
            .catch(error => console.error('Error when checking telegram data', error));
    }, []);*/
    return (
        <AppRouter/>            
    );
}

export default App;
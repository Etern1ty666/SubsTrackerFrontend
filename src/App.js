import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Result } from 'antd';
import AppRouter from './routes/AppRouter';
import subscriptionsStore from './store/subscriptionsStore';
import Loading from './components/Loading';



function App() {
    const { getSubscriptions } = subscriptionsStore
    const [isTelegramUser, setIsTelgramUser] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        setLoading(true)
        axios.get( process.env.REACT_APP_API_URL + 'api/checkTelegramData/', { params: { init_data: tg.initData, user_info: tg.initDataUnsafe.user}})
            .then(response => {
                console.log('Telegram data valid', response);
                if(response.data === true){
                    setIsTelgramUser(true);
                    getSubscriptions()
                }else{
                    setIsTelgramUser(false);
                }
            })
            .catch(error => {console.error('Error when checking telegram data', error); setIsTelgramUser(false)});
        setLoading(false)

    }, []);
    return (
        loading
        ?
        <Loading/>
        :
        <>
            {
                isTelegramUser
                ?
                <AppRouter/>
                :
                <Result title='Войдите через Telegram'/>

            }
        </>
    );
}

export default App;
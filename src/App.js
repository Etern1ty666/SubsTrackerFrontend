import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Result } from 'antd';
import AppRouter from './routes/AppRouter';
import subscriptionsStore from './store/subscriptionsStore';
import Loading from './components/Loading';
import Link from 'antd/es/typography/Link';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';



function App() {
    const { getSubscriptions } = subscriptionsStore
    const [isTelegramUser, setIsTelgramUser] = useState(true)
    const [loading, setLoading] = useState(true)
    const [errorInfo, setErrorInfo] = useState('')
    useEffect(() => {
        const tg = window.Telegram.WebApp;
        setLoading(true)
        axios.get( process.env.REACT_APP_API_URL + 'api/checkTelegramData/', { params: { init_data: tg.initData, user_info: tg.initDataUnsafe.user}})
            .then(response => {
                console.log('Telegram data is valid:', response.data);
                if(response.data === true){
                    setIsTelgramUser(true);
                    setLoading(false)
                    getSubscriptions();
                }else{
                    setIsTelgramUser(false);
                    setLoading(false)
                }
            })
            .catch(error => {console.error('Error when checking telegram data', error); setErrorInfo(error.message+' ['+error.code+']'); setIsTelgramUser(false); setLoading(false)
            });

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
                (window.Telegram.WebApp.initData?
                    <Result
                        icon={<FrownOutlined />}
                        title='Что-то пошло не так'
                        subTitle={
                            <>
                                Проверьте параметры соединения или попробуйте позже
                            </>
                        }
                        extra={<Title level={5}>{errorInfo}</Title>}
                    />
                    :
                    <Result
                        icon={<SmileOutlined/>}
                        title='Давайте начнем!'
                        subTitle={
                            <>
                                Откройте приложение в
                                <Link href='https://t.me/SubsTracker_mybot'>  Telegram </Link>
                            </>
                        }
                    />
                )
                

            }
        </>
    );
}

export default App;
import React, { useState } from 'react';
import { Button, message, Result, Space } from 'antd';
import PageHeader from '../components/PageHeader';
import { Typography } from 'antd';
import subscriptionsStore from '../store/subscriptionsStore';
import SubscriptionDetails from '../feauters/SubscriptionDetails';
import { observer } from 'mobx-react-lite';
import { SmileOutlined } from '@ant-design/icons';
import Loading from '../components/Loading';
import CategorySubscriptions from '../components/CategorySubscriptions';
import AddSubscription from '../feauters/AddSubscription';
import { addTestSubscriptions } from '../services/api/api';


const SubscriptionPage = () => {
    const [detailsOpened, setDetailsOpened] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState();
    
    
    const updateSubscription = (subscription) => {
        setSelectedSubscription(subscription)
        subscriptionsStore.update(subscription)
    }

    const openDetails = (subscription) => {
        setSelectedSubscription(subscription)
        setDetailsOpened(true)
    }

    const [messageApi, contextHolder] = message.useMessage();

    const alertMessage = (type, text) => {
        messageApi.open({
            type: type,
            content: text,
        });
      };

    const [addLoading, setAddLoading] = useState(false)

    async function addTest () {
        setAddLoading(true)
        const response = await addTestSubscriptions();
        if (response != 'Error'){
            response.map(subscription => {subscriptionsStore.add(subscription)})
            alertMessage('success', 'Подписки добавлены')
        }else{
            alertMessage('error', 'Не удалось добавить подписки, попробуйте еще раз')
        }
        setAddLoading(false)
    }


    const renderSubscriptions = (categorized) => {
        if(categorized.soon.length === 0 && categorized.halfYear.length === 0 && categorized.year.length === 0 && categorized.later.length === 0){
            return <Result
                icon={<SmileOutlined />}
                title="Подписки еще не добавлены. Начнем сейчас?"
                extra={<Space direction='vertical'>
                    <Button onClick={() => document.querySelector('.add-subscription-button').click()} type="primary">Добавить подписку</Button>
                    <Typography level={5}>или</Typography>
                    <Button onClick={addTest} loading={addLoading}>Добавить тестовые подписки</Button>
                </Space>}
            />
        }
        return Object.entries(categorized).map(([key, subscriptions]) => {
            if(subscriptions.length !== 0){
                let title = ''
                switch (key) {
                    case 'soon': 
                        title = 'Ближайшие 30 дней';
                        break;
                    case 'halfYear': 
                        title = 'В течение 3 месяцев';
                        break;
                    case 'year': 
                        title = 'В течение года';
                        break;
                    case 'later': 
                        title = 'Позднее';
                        break;
                    default: 
                        title = 'Неизвестно';
                }
                return <CategorySubscriptions
                            category={title}
                            onClick={openDetails}
                            subscriptions={subscriptions}
                        />
            }
          });
    }

    return (
        <>
            {contextHolder}
            <PageHeader PageName={'Подписки'}/>
            <Space
                direction="vertical"
                size="middle"
                style={{display: 'flex', margin: 10}}
            >
                <>

                    {
                        subscriptionsStore.isLoading
                        ?
                        <Loading/>
                        :
                        <>
                        {renderSubscriptions(subscriptionsStore.categorizedData)}

                        <AddSubscription/>

                        {selectedSubscription&&<SubscriptionDetails
                            open={detailsOpened}
                            onClose={setDetailsOpened}
                            onEdit={updateSubscription}
                            {...selectedSubscription}
                        />}
                        
                        </>
                    }
                </>

            </Space>
        </>
    )
};

export default observer(SubscriptionPage);
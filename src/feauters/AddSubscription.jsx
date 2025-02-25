import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import AddSubscriptionButton from '../components/AddSubscriptionButton';
import subscriptionsStore from '../store/subscriptionsStore';
import SettingsSubscriptions from './SettingsSubscriptions';
import { createSubscription } from '../services/api/api';

const AddSubscription = () => {
    const [opened, setOpened] = useState(false)
    
    const tg = window.Telegram.WebApp;
    console.log(tg.initDataUnsafe)
    async function addSubscription (subscription) {
        subscriptionsStore.add(subscription)
    };

    return (
        <>
            <AddSubscriptionButton className="add-subscription-button" onChange={() => setOpened(true)} />
            <SettingsSubscriptions
                type='add'
                open={opened}
                onClose={setOpened}
                onFinish={addSubscription}
            />
        </>
    );
};
export default observer(AddSubscription);
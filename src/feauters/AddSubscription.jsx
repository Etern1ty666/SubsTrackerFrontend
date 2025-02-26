import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import AddSubscriptionButton from '../components/AddSubscriptionButton';
import subscriptionsStore from '../store/subscriptionsStore';
import SettingsSubscriptions from './SettingsSubscriptions';

const AddSubscription = () => {
    const [opened, setOpened] = useState(false)
    
    async function addSubscription (subscription) {
        subscriptionsStore.add(subscription)
    };

    return (
        <>
            <AddSubscriptionButton onChange={() => setOpened(true)} />
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
import { observer } from 'mobx-react-lite';
import PageHeader from "../components/PageHeader";

import { Button, message, Popconfirm, Space } from "antd";
import { useState } from 'react';
import { addTestSubscriptions, deleteAllSubscriptions } from '../services/api/api';
import subscriptionsStore from '../store/subscriptionsStore';

function SettingsPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [addLoading, setAddLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const alert = (type, text) => {
        messageApi.open({
            type: type,
            content: text,
        });
      };

    async function addTest () {
        setAddLoading(true)
        const response = await addTestSubscriptions();
        if (response != 'Error'){
            response.map(subscription => {subscriptionsStore.add(subscription)})
            alert('success', 'Подписки добавлены')
        }else{
            alert('error', 'Не удалось добавить подписки, попробуйте еще раз')
        }
        setAddLoading(false)
    }


    async function deleteAll () {
        setDeleteLoading(true)
        const response = await deleteAllSubscriptions();
        if (response != 'Error'){
            response.map(subId => {subscriptionsStore.delete(subId)})
            alert('success', 'Подписки удалены')
        }else{
            alert('error', 'Не удалось удалить подписки, попробуйте еще раз')
        }
        setDeleteLoading(false)
    }

    return (
        <div style={{width: "100v"}}>
            {contextHolder}
            <PageHeader PageName={'Настройки'}/>
            <Space
                direction="vertical"
                size="middle"
                style={{display: 'flex', margin: 10}}
            >
                <Popconfirm
                    placement='bottom'
                    title="Добавить тестовые подписки?"
                    description="Добавятся заготовленные шаблоны подписок, позже их можно будет удалить в настройках."
                    onConfirm={addTest}
                    okText="Продолжить"
                    cancelText="Отменить"
                >
                    <Button loading={addLoading} style={{width: '100%'}} color="primary" variant="outlined" size='large'>Добавить тестовые подписки</Button>
                </Popconfirm>
                <Popconfirm
                    placement='bottom'
                    title="Удалить все ваши подписки?"
                    description="Восстановить удаленные подписки будет невозможно."
                    onConfirm={deleteAll}
                    okText="Продолжить"
                    cancelText="Отменить"
                >
                    <Button loading={deleteLoading} style={{width: '100%'}} color="danger" variant="outlined" size='large'>Удалить все подписки</Button>
                </Popconfirm>
            </Space>
        </div>
    );
}

export default observer(SettingsPage);
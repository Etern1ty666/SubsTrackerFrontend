import React, { useState } from 'react';
import { Avatar, Button, Card, Divider, message, Modal, Space, Statistic } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';
import InsideContent from '../components/InsideContent';
import SettingsSubscription from './SettingsSubscriptions';
import dayjs from "dayjs";
import { categories } from '../assets/ListOptions';
import { getNextPaymentDate } from '../utils/DateFunctions';
import { getClearCost, getPluralForm, parseSubPlan } from '../utils/Formatting';
import { Icons } from '../assets/IconsList';
import { observer } from 'mobx-react-lite';
import subscriptionsStore from '../store/subscriptionsStore';
import { deleteSubscription } from '../services/api/api';

const { Meta } = Card;

const SubscriptionDetails = ({open, onClose, onEdit, ...props}) => {
    const [settingsOpened, setSettingsOpened] = useState(false);
    const renderExspenses = (cost, period, periodType) => {
        let costPerDay = 0;

        if (periodType === "day") {
            costPerDay = cost / period;
        } else if (periodType === "week") {
            costPerDay = cost / (period * 7);
        } else if (periodType === "month") {
            costPerDay = cost / (period * 30.44);
        } else if (periodType === "year") {
            costPerDay = cost / (period * 365);
        } else {
            throw new Error("Error");
        }

        const result = {
            perDay: costPerDay,
            perMonth: costPerDay * 30.44,
            perYear: costPerDay * 365
        };

        return(
            <Space align="center">
                <Space  direction='vertical'>
                    <Statistic title="Месяц" value={getClearCost(result.perMonth)} />
                    <Statistic title="День" value={getClearCost(result.perDay)} />
                </Space>
                <Statistic style={{marginLeft: 70}} title="Год" value={getClearCost(result.perYear)} />
            </Space>            
        )
    }
    const renderAdditionalInfo = (category, notification) => {
        var categoryStr;
        categories.map(obj => {
            if(obj.value == category){
                categoryStr = obj.label
                return
            }
        })
        var notificationStr;
        if(notification == 0){
            notificationStr = 'Без уведомлений.'
        }else{
            notificationStr = 'Уведомления за ' + notification + ' ' + getPluralForm(notification, 'день', 'дня', 'дней') + ' до платежа.'
        }
        return(
            <>
                <Paragraph>{categoryStr}</Paragraph>
                <Paragraph>{notificationStr}</Paragraph>
            </>
            
        )
    }
    const [messageApi, contextHolder] = message.useMessage();

    const alert = (type, text) => {
        messageApi.open({
            type: type,
            content: text,
        });
      };
    const tg = window.Telegram.WebApp;
    console.log(tg.initDataUnsafe)
    async function delSubscription (subscription) {
        const result = await deleteSubscription(subscription.id)
        if (result != 'Delete error'){
            subscriptionsStore.delete(result)
            alert('success', 'Подписка удалена')
        }else{
            alert('error', 'Не удалось удалить подписку, попробуйте позже')
        }
    };

    return (
        <Modal
            title={'Информация'}
            centered
            open={open}
            onCancel={() => onClose(false)}
            width={'100%'}
            footer={[
                <Button key="back" onClick={() => onClose(false)}>
                    Назад
                </Button>
            ]}
        >
            {contextHolder}
             <SettingsSubscription
                type='edit'
                open={settingsOpened}
                onClose={setSettingsOpened}
                onFinish={onEdit}
                {...props}
            />
            <InsideContent>
                
                <Card
                    title={props.name}
                >
                    <Meta
                        avatar={<Avatar
                            style={{backgroundColor: props.color}}
                            icon={Icons[props.icon]}
                            shape="square" size="large"
                        />}
                        title={parseSubPlan(props.period, props.periodType)}
                        description={getClearCost(props.cost)}
                    />
                    <Divider/>
                        <Paragraph>Следующий платеж {getNextPaymentDate(props.paymentDate, props.period, props.periodType).nextPaymentDateStr} </Paragraph>
                        <Paragraph>{getNextPaymentDate(props.paymentDate, props.period, props.periodType).nextPaymentInStr}</Paragraph>
                </Card>

                <Card title='Расходы'>
                    {renderExspenses(props.cost, props.period, props.periodType)}
                </Card>

                <Card title='Дополнительно'>
                    <div style={{textAlign: 'center'}}>
                        {renderAdditionalInfo(props.category, props.notifications)}
                        <Divider/>
                        <Space.Compact style={{width: '100%'}}>
                            <Button onClick={() => {setSettingsOpened(true)}} style={{width: '50%'}} icon={<EditOutlined />} />
                            <Button onClick={() => {delSubscription(props); onClose(false)}} style={{width: '50%'}} variant="solid" color='danger' icon={<DeleteOutlined />} />
                        </Space.Compact>
                    </div>
                </Card>
            </InsideContent>
        </Modal>
    );
};
export default observer(SubscriptionDetails);

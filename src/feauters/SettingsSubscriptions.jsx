import React, { useEffect, useState } from 'react';
import { Calendar, InputNumber, Modal, Select, Tooltip, Card, Space, Input, Button, Divider } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import ChooseIcon from '../components/ChooseIcon';
import { categories, notificationsList, PeriodTypes } from '../assets/ListOptions';
import dayjs from 'dayjs';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import InsideContent from '../components/InsideContent';
import { executePayments } from '../utils/DateFunctions';
import { observer } from 'mobx-react-lite';
import { createSubscription, updateSubscription } from '../services/api/api';
import subscriptionsStore from '../store/subscriptionsStore';

const { TextArea } = Input;

const SettingsSubscription = ({ type='edit', open, onClose, onFinish, ...props}) => {
    const [newIcon, setIcon] = useState('')
    const [newColor, setColor] = useState('')
    const [newName, setName] = useState('')
    const [newCost, setCost] = useState('')
    const [newPeriod, setPeriod] = useState('')
    const [newPeriodType, setPeriodType] = useState('')
    const [newPaymentDate, setPaymentDate] = useState(dayjs())
    const [newNotifications, setNotifications] = useState('')
    const [newCategory, setCategory] = useState('')
    const [nameValid, setNameValid] = useState(true)

    useEffect(() => {
        if (type == 'add') {
            setIcon(2);
            setColor('#33a754');
            setName('');
            setCost('399.99');
            setPeriod(1);
            setPeriodType('month');
            setPaymentDate(dayjs());
            setNotifications(1);
            setCategory('nocategory');
        } else {
            setIcon(props.icon);
            setColor(props.color);
            setName(props.name);
            setCost(props.cost);
            setPeriod(props.period);
            setPeriodType(props.periodType);
            setPaymentDate(dayjs(props.paymentDate));
            setNotifications(props.notifications);
            setCategory(props.category);
        }
      }, [open]);

      
    const nameIsCorrect = (name) => {
        if(name == '' || name == null){
            setNameValid(false)
            return false
        }
        setNameValid(true)
        return true
    }
    async function saveSubscription () {
        
        if(nameIsCorrect(newName)){
            const tg = window.Telegram.WebApp;

            var newSubscription = {
                id: props.id,
                icon: newIcon, 
                color: newColor,
                name: newName,
                cost: Number(newCost),
                period: newPeriod,
                periodType: newPeriodType,
                paymentDate: newPaymentDate,
                notifications: newNotifications,
                category: newCategory
            }
            if (type === 'add'){
                console.log('add')
                const response = await createSubscription(tg.initDataUnsafe.user_id, newSubscription)
                if (response != 'Create error'){
                    onClose(false);
                    onFinish(response);
                }

            }else if(type === 'edit'){
                const response = await updateSubscription(newSubscription)
                if(response != 'Update error'){
                    onClose(false);
                    onFinish(newSubscription)
                }else{
                    console.log('Cant edit on server')
                }
            }
        }
        else{
            console.log('Form not valid')
        }
    }

    const renderNotifications = (list, days, type) => {
        if (type !== 'day'){
            return list
        }else{
            if(days>5){
                return list
            }else{
                return list.map(obj => obj.value > days ? { ...obj, disabled: true } : obj)
            }
        }
    }
    return (
        <Modal
            title={type=='add'?'Добавить подписку':'Изменить подписку'}
            centered
            open={open}
            onCancel={() => onClose(false)}
            width={'100%'}
            footer={[
                <Button key="back" onClick={() => onClose(false)}>
                    Назад
                </Button>,
                <Button key="submit" type="primary" onClick={() => saveSubscription()}>
                    Сохранить
                </Button>
            ]}
        >
            <InsideContent>
                <Card title="Информация">
                    <div style={{textAlign: 'center'}}>
                        <ChooseIcon
                            color={newColor}
                            icon={newIcon}
                            onColorChange={(e) => setColor(e)}
                            onIconChange={(e) => setIcon(e)}
                        />
                        <br/>
                        <br/>
                        <TextArea
                            status={nameValid?'':'error'}
                            value={newName}
                            onChange={(e) => {setNameValid(true); setName(e.target.value)}}
                            autoSize
                            placeholder='Название'
                            showCount
                            maxLength={30}
                        />
                    </div>
                </Card>

                <Card title="Платеж">
                    <Space size='large' direction='vertical' style={{width: '100%'}}>
                        <InputNumber
                            style={{width: '100%'}}
                            defaultValue="299"
                            min="0.01"
                            max="99999999999.99"
                            step="0.01"
                            value={newCost}
                            onChange={(value) => setCost(value)}
                            stringMode
                            addonAfter="₽"
                        />
                        <Space.Compact style={{width: '100%'}}>
                            <InputNumber
                                style={{width: '50%'}}
                                min={1}
                                max={999}
                                step={1} value={newPeriod} onChange={(e) => setPeriod(e)} addonBefore="Каждый" />
                            <Select
                                style={{width: '50%'}}
                                value={newPeriodType}
                                onChange={(value) => setPeriodType(value)}
                                defaultValue="месяц"
                                options={PeriodTypes}
                            />
                        </Space.Compact>
                    </Space>
                </Card>

                <Card title="Дата платежа">
                    <Calendar value={newPaymentDate} onSelect={(e) => setPaymentDate(e)} fullscreen={false} />
                    <Divider/>
                    <Title level={5}>
                        <Tooltip placement="topLeft" title="Обратите внимание, некоторые сервисы могут оплачиваться раз в 30 дней. Для точного расчета, можно поставить периодичность платежа - 30 дней.">
                            <QuestionCircleFilled />
                        </Tooltip> Расписание платежей:
                    </Title>
                    <Space
                        direction="vertical"
                        style={{marginLeft: 25}}
                    >
                        {
                            executePayments(newPaymentDate, newPeriod, newPeriodType, 3).map((upcomingPayment, key) =>{
                                return <Paragraph key={key}>{upcomingPayment.formatted}</Paragraph>
                            })
                        }
                    </Space>
                </Card>

                <Card title="Дополнительно">
                    <Select
                        style={{width: '100%'}}
                        onChange={(value) => setCategory(value)}
                        value={newCategory}
                        options={categories}
                    />
                    <br/>
                    <br/>
                    <Select
                        style={{width: '100%'}}
                        value={newNotifications}
                        onChange={(value) => setNotifications(value)}
                        options={renderNotifications(notificationsList, newPeriod, newPeriodType)}
                    />
                </Card>
            </InsideContent>
        </Modal>
  );
};
export default observer(SettingsSubscription);
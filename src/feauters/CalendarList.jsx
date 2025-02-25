import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import SubscriptionCard from '../components/SubscriptionCard';
import { observer } from 'mobx-react-lite';
import { getClearCost } from '../utils/Formatting';
import InsideContent from '../components/InsideContent';

const CalendarList = ({text, data, date}) => {
    const [opened, setOpened] = useState(false)
    const test = (te) => {
        console.log(te)
    }
    return (
        <Space>
            <Button variant='solid' color='primary' onClick={()=> setOpened(true)} style={{width: 40, height: 32}}>
                {text}
            </Button>
            <Modal
                title={'Платежи на ' + date.format("D MMMM YYYY")} 
                centered
                open={opened}
                onCancel={() => {setOpened(false)}}
                footer={null}
                width={'100%'}
            >
                <InsideContent>
                    {
                        data.map(subscription => {
                            console.log(subscription)
                            return (
                                <SubscriptionCard
                                    onClick={test}
                                    title={subscription.name}
                                    description={getClearCost(subscription.cost)}
                                    {...subscription}
                                />
                            )
                        })
                    }
                </InsideContent>
            </Modal>
        </Space>
  );
};
export default observer(CalendarList);
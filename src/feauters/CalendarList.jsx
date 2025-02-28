import React, { useState } from 'react';
import { Badge, Button, Modal, Space } from 'antd';
import SubscriptionCard from '../components/SubscriptionCard';
import { observer } from 'mobx-react-lite';
import { getClearCost, parseSubPlan } from '../utils/Formatting';
import InsideContent from '../components/InsideContent';
import dayjs from "dayjs"

const CalendarList = ({text, data, date}) => {
    const [opened, setOpened] = useState(false)

    return (
        <Space>
            <Badge count={data.length}>
                <Button variant='solid' color={date.startOf('day').isSame(dayjs().startOf('day'))?'primary':null} onClick={()=> setOpened(true)} style={{width: 40, height: 32}}>
                    {text}
                </Button>
            </Badge>
            
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
                            return (
                                <SubscriptionCard
                                    title={getClearCost(subscription.cost)}
                                    description={parseSubPlan(subscription.period, subscription.periodType)}
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
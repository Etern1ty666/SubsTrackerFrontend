import React from 'react';
import { observer } from 'mobx-react-lite';
import Title from 'antd/es/typography/Title';
import SubscriptionCard from './SubscriptionCard';
import { getNextPaymentDate } from '../utils/DateFunctions';
import { parseSubPlan } from '../utils/Formatting';
import InsideContent from './InsideContent';

const CategorySubscriptions = ({category, onClick, subscriptions}) => {

    return (
        <InsideContent>
            <Title level={5}>{category}</Title>
            {subscriptions.map(sub => 
                <SubscriptionCard
                hoverable={true}
                onClick={() => onClick(sub)}
                description={parseSubPlan(sub.period, sub.periodType)}
                title={getNextPaymentDate(sub.paymentDate, sub.period, sub.periodType).nextPaymentInStr}
                {...sub}
                />)
            }
        </InsideContent>
    )
};
export default observer(CategorySubscriptions);

import React from 'react';
import { observer } from 'mobx-react-lite';
import Title from 'antd/es/typography/Title';
import SubscriptionCard from './SubscriptionCard';
import { getNextPaymentDate } from '../utils/DateFunctions';
import { getClearCost, parseSubPlan } from '../utils/Formatting';
import InsideContent from './InsideContent';

const CategorySubscriptions = ({category, onClick, subscriptions}) => {

    return (
        <InsideContent>
            <Title level={5}>{category}</Title>
            {subscriptions.map(sub => 
                <SubscriptionCard
                hoverable={true}
                onClick={() => onClick(sub)}
                description={getClearCost(sub.cost) + ' ' + parseSubPlan(sub.period, sub.periodType, false)}
                title={getNextPaymentDate(sub.paymentDate, sub.period, sub.periodType).nextPaymentInStr}
                {...sub}
                />)
            }
        </InsideContent>
    )
};
export default observer(CategorySubscriptions);

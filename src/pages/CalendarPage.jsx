import React, { useState } from "react";
import { Calendar, Space } from "antd";
import PageHeader from "../components/PageHeader";
import { subscriptionHavePayment } from "../utils/DateFunctions";
import CalendarList from "../feauters/CalendarList";
import { observer } from 'mobx-react-lite';
import subscriptionsStore from "../store/subscriptionsStore";
import Loading from "../components/Loading";
import dayjs from "dayjs"


const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs())

    const renderDate = (date) => {
        const dateSubscriptions = []
    
        subscriptionsStore.data.map(subscription => {
            if(subscriptionHavePayment(subscription.paymentDate, subscription.period, subscription.periodType, date)){
                dateSubscriptions.push(subscription)
            }
        })
        
    return <Space size='small' align='center' style={{height: 40}}> 
                    {
                        dateSubscriptions.length > 0 && selectedDate.month() == date.month()
                        ?
                        <CalendarList text={date.date()} data={dateSubscriptions} date={date}/>
                        :
                        date.date()
                    }
                </Space>
    }
    

    return (
        <>
            <PageHeader PageName={'Календарь платежей'}/>
            {subscriptionsStore.isLoading
                ?
                <Loading/>
                :
                <>
                    <div style={{margin: 20}}>
                        <Calendar value={selectedDate} onChange={setSelectedDate} fullscreen={false} fullCellRender={renderDate} />
                    </div>
                </>
            }
            
        </>
)};
  
export default observer(CalendarPage);

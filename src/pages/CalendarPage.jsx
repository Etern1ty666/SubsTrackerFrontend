import React, { useEffect } from "react";
import { Calendar, Avatar } from "antd";
import PageHeader from "../components/PageHeader";
import { subscriptionHavePayment } from "../utils/DateFunctions";
import CalendarList from "../feauters/CalendarList";
import { Icons } from "../assets/IconsList";
import { observer } from 'mobx-react-lite';
import subscriptionsStore from "../store/subscriptionsStore";


const renderDate = (date) => {
    const dateSubscriptions = []

    subscriptionsStore.data.map(subscription => {
        if(subscriptionHavePayment(subscription.paymentDate, subscription.period, subscription.periodType, date)){
            dateSubscriptions.push(subscription)
        }
    })
    var icons = []
    let leftOffset = 36

    if(dateSubscriptions.length > 3){
        dateSubscriptions.slice(0, 2).map(subscription => {
            icons.push(
                <Avatar style={{left: leftOffset,  top: 30, textAlign: 'center', width: 20, height: 20, position: 'absolute', backgroundColor: subscription.color, borderRadius: 5}}>
                    {Icons[subscription.icon]}
                </Avatar>
            )
            leftOffset -= 12
        })
        leftOffset = 12
        icons.push(
            <Avatar style={{textAlign: 'center', width: 20, height: 20, left: leftOffset, top: 30, position: 'absolute', backgroundColor: '#CE0931', borderRadius: 5}}>
                {dateSubscriptions.length-2}+
            </Avatar>
        )
    }else{
        dateSubscriptions.map(subscription => {
            icons.push(
                <Avatar style={{left: leftOffset,  top: 30, textAlign: 'center', width: 20, height: 20, position: 'absolute', backgroundColor: subscription.color, borderRadius: 5}}>
                    {Icons[subscription.icon]}
                </Avatar>
            )
            leftOffset -= 12
        })
    }
return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center' ,
    }}>
    <div style={{
    height: 40}}>
        {
            dateSubscriptions.length > 0?
            <>
                <CalendarList text={date.date()} data={dateSubscriptions} date={date}/>
                {
                    icons.map(icon => {
                        return icon
                    })
                }
            </>
            :
            date.date()
        }
    </div>
</div>
}
const CalendarPage = () => {

    return (
        <>
            <PageHeader PageName={'Календарь платежей'}/>
            <div style={{margin: 20}}>
                <Calendar fullscreen={false} fullCellRender={renderDate} />
            </div>
        </>
)};
  
export default observer(CalendarPage);
  
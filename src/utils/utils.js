import { getNextPaymentDate } from "./DateFunctions"
import dayjs from "dayjs"

export function sortSubscriptions(subscriptions){
    return subscriptions.sort((a, b) => {
        let aNextPayment = getNextPaymentDate(dayjs(a.paymentDate), a.period, a.periodType).daysUntil
        let bNextPayment = getNextPaymentDate(dayjs(b.paymentDate), b.period, b.periodType).daysUntil
        return aNextPayment - bNextPayment
    })
}


export function categorizeSubscriptions(subscriptions){
    const sortedSubscriptions = sortSubscriptions(subscriptions)

    return sortedSubscriptions.reduce(
        (acc, subscription) => {
            const paymentDate = getNextPaymentDate(subscription.paymentDate, subscription.period, subscription.periodType);
            console.log(subscription.name, 'дней до следующего платежа', paymentDate.daysUntil)
            if (paymentDate.daysUntil < 31){
                acc.soon.push(subscription);
            }else if(paymentDate.monthsUntil < 3){
                acc.halfYear.push(subscription)
            }else if(paymentDate.monthsUntil < 12){
                acc.year.push(subscription)
            }else{
                acc.later.push(subscription)
            }
            return acc;
        },
        { soon: [], halfYear: [], year: [], later: [] })
}


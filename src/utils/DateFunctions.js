import dayjs from "dayjs"
import { getPluralForm } from "./Formatting";

export function subscriptionHavePayment(subscriptionDate, period, type, date) {
    const nextPaymentDate = getNextPaymentDate(dayjs(subscriptionDate), period, type).nextPaymentDate.startOf("day")
    const compareDate = dayjs(date).startOf("day");

    if (compareDate.isBefore(nextPaymentDate)) return false;

    const diff = compareDate.diff(nextPaymentDate, type, true);
    if(type == 'month'){
        if(diff % period === 0){
            return nextPaymentDate.add(diff, type).isSame(compareDate)
        }
    }
    return diff % period === 0;

}


export function getNextPaymentDate(date, period, type) {
    var paymentDate = dayjs(date);
    const now = dayjs();
    var nextPayment;
    if (paymentDate.isAfter(now, "day")) {
        nextPayment = paymentDate;

    }else{
        const diff = now.diff(paymentDate, type);

        const periodsToAdd = Math.ceil(diff / period) * period;
        nextPayment = paymentDate.add(periodsToAdd, type);

        if (nextPayment.isBefore(now, "day")) {
            nextPayment = nextPayment.add(period, type);
        }
    }

    const differenceDays = nextPayment.diff(now, 'day')
    const differenceMonths = nextPayment.diff(now, 'month')
    const differenceYears = nextPayment.diff(now, 'year')
    var result = ''

    if(differenceDays == 0){
        result = 'Сегодня'
    }else if(differenceDays == 1){
        result = 'Завтра'
    }else if(differenceDays < 31){
        result = `Через ${differenceDays} ${getPluralForm(differenceDays, "день", "дня", "дней")}`
    }else if(differenceMonths == 1){
        result = 'Через месяц'
    }else if(differenceMonths < 12){
        result = `Через ${differenceMonths} ${getPluralForm(differenceMonths, "месяц", "месяца", "месяцев")}`
    }else if(differenceYears == 1){
        result = 'Через год'
    }else{
        result = `Через ${differenceYears} ${getPluralForm(differenceYears, "год", "года", "лет")}`
    }
    return {
        nextPaymentDate: nextPayment,
        nextPaymentDateStr: nextPayment.format("D MMMM YYYY"),
        nextPaymentInStr: result,
        daysUntil: differenceDays,
        monthsUntil: differenceMonths,
        yearsUntil: differenceYears,
    }
}


export const executePayments = (date, period, type, countUpcomingPayments=5) => {
    let paymentDate = dayjs(date)
    const nextPaymentDate = getNextPaymentDate(paymentDate, period, type).nextPaymentDate
    let upcomingPayments = []
    for (let i = 0; i < countUpcomingPayments; i++) {
        let nextPayment = nextPaymentDate.add(period*i, type)
        upcomingPayments.push({date: nextPayment, formatted: nextPayment.format("D MMMM YYYY")})
    }

    return upcomingPayments
}

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

export function getNextPaymentDate(date, period, periodType) {
    let paymentDate = new Date(date);
    let now = new Date();
    var result = ''

    let nextPayment = new Date(paymentDate);
    if (dayjs(nextPayment).startOf("day").isBefore(dayjs(now).startOf("day")) || dayjs(nextPayment).startOf("day").isSame(dayjs(now).startOf("day"))) {
        var diffDays = Math.floor((now - nextPayment) / (1000 * 60 * 60 * 24));
        if (diffDays !== 0) {
            var periodsCount;
            switch (periodType) {
                case 'day':
                    periodsCount = Math.floor(diffDays / period) + 1;
                    nextPayment.setDate(nextPayment.getDate() + periodsCount * period);
                    break;
                case 'week':
                    periodsCount = Math.floor(diffDays / (period * 7)) + 1;
                    nextPayment.setDate(nextPayment.getDate() + periodsCount * period * 7);
                    break;
                case 'year':
                    var yearsBeforeNow = Math.abs(now.getFullYear() - paymentDate.getFullYear());
                    periodsCount = Math.floor(yearsBeforeNow / period) + 1;
                    nextPayment.setFullYear(nextPayment.getFullYear() + periodsCount * period);
                    break;
                case 'month':
                    var monthsBeforeNow = Math.abs(now.getFullYear() - paymentDate.getFullYear()) * 12 + (now.getMonth() - paymentDate.getMonth())
                    periodsCount = Math.floor(monthsBeforeNow / period) + 1;
                    nextPayment.setMonth(nextPayment.getMonth() + periodsCount * period);
                    break;
                default:
                    return 'err';
            }
        }
    }
    const dayjsNow = dayjs().startOf('day')
    nextPayment = dayjs(nextPayment).startOf('day')
    var differenceDays = nextPayment.diff(dayjsNow, 'day')
    var differenceMonths = nextPayment.diff(dayjsNow, 'month')
    var differenceYears = nextPayment.diff(dayjsNow, 'year')
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
        nextPaymentDate: dayjs(nextPayment),
        nextPaymentDateStr: dayjs(nextPayment).format("D MMMM YYYY"),
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

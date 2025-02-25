export function getPluralForm(number, one, few, many) {
    const mod10 = number % 10;
    const mod100 = number % 100;

    if (mod10 === 1 && mod100 !== 11) {
        return one;
    }
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return few;
    }
    return many; 
}

export function getClearCost(cost) {
    console.log(Number(cost))
    return (Number(cost).toFixed(2).endsWith(".00") ? Math.floor(Number(cost)) : Number(cost).toFixed(2)) + '₽'
}

export function parseSubPlan(period, type, capital=true) {
    let k = (capital?'К':'к')
    var typeStr = ''
    if(type === 'day'){
        typeStr = getPluralForm(period, "день", "дня", "дней")
    }else if(type === 'week'){
        typeStr = getPluralForm(period, "неделю", "недели", "недель")
    }else if(type === 'month'){
        typeStr = getPluralForm(period, "месяц", "месяца", "месяцев")
    }else if(type === 'year'){
        typeStr = getPluralForm(period, "год", "года", "лет")
    }

    var everyStr = ''
    if(period == 1){
        if(type === 'week'){
            return k + 'аждую неделю'
        }
        return k + 'аждый ' + typeStr
    }else{
        everyStr = getPluralForm(period, k + "аждый", k + "аждые", k + "аждые")
    }
    return everyStr + ' ' + period + ' ' + typeStr
}
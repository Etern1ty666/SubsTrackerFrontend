import axios from "axios";

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

const tg = window.Telegram.WebApp;
console.log(tg.initDataUnsafe)

const headers1 = {
    'Content-Type': 'application/json',
    'Tg-Init-Data': tg.initData,
    'Tg-User-Info': tg.initDataUnsafe.user,
}

const headers = {
    'Tg-Init-Data': tg.initData,
    'Tg-User-Info': JSON.stringify(tg.initDataUnsafe.user),
    'Content-Type': 'application/json'
};
export async function fetchSubscriptions (){
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `api/getSubscriptions/?user_id=${tg.initDataUnsafe.user.id}`, {headers: headers});
        return response.data;
    } catch (error) {
        console.error('Error getting subscriptions', error);
        return [];
    }
}

export async function updateSubscription (subscription){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + `api/updateSubscription/`, {
            id: subscription.id,
            name: subscription.name,
            icon: subscription.icon,
            color: subscription.color,
            cost: subscription.cost,
            period: subscription.period,
            periodType: subscription.periodType,
            paymentDate: subscription.paymentDate.format("YYYY-MM-DD"),
            notifications: subscription.notifications,
            category: subscription.category
        },
        { headers });
        return response.data;
    } catch (error) {
        console.error('Error update subscription', error);
        return 'Update error';
    }
}

export async function deleteSubscription (subscriptionId){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + `api/deleteSubscription/`, {subscription_id: subscriptionId}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error deleting subscriptions', error);
        return 'Delete error';
    }
}

export async function createSubscription (subscription){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + 'api/createSubscription/', {
            user_id: tg.initDataUnsafe.user.id,
            name: subscription.name,
            icon: subscription.icon,
            color: subscription.color,
            cost: subscription.cost,
            period: subscription.period,
            periodType: subscription.periodType,
            paymentDate: subscription.paymentDate.format("YYYY-MM-DD"),
            notifications: subscription.notifications,
            category: subscription.category
        },
        { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating subscriptions', error);
        return 'Create error';
    }
}

export async function addTestSubscriptions (){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + 'api/addTestSubscriptions/', {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error adding test subscriptions', error);
        return 'Error';
    }
}

export async function deleteAllSubscriptions (){
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + 'api/deleteAllSubscriptions/', {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error deletind all subscriptions', error);
        return 'Error';
    }
}
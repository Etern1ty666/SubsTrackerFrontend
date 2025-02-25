import axios from "axios";

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


export async function fetchSubscriptions (userId){
    try {
        const response = await axios.get(`http://localhost:8000/api/getSubscriptions/?user_id=${6}`);
        return response.data;
    } catch (error) {
        console.error('Error getting subscriptions', error);
        return [];
    }
}

export async function updateSubscription (subscription){
    try {
        const response = await axios.post(`http://localhost:8000/api/updateSubscription/`, {
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
        });
        return response.data;
    } catch (error) {
        console.error('Error update subscription', error);
        return 'Update error';
    }
}

export async function deleteSubscription (subscriptionId){
    try {
        const response = await axios.post(`http://localhost:8000/api/deleteSubscription/`, {subscription_id: subscriptionId});
        return response.data;
    } catch (error) {
        console.error('Error deleting subscriptions', error);
        return 'Delete error';
    }
}

export async function createSubscription (userId, subscription){
    try {
        const response = await axios.post('http://localhost:8000/api/createSubscription/', {
            user_id: userId,
            name: subscription.name,
            icon: subscription.icon,
            color: subscription.color,
            cost: subscription.cost,
            period: subscription.period,
            periodType: subscription.periodType,
            paymentDate: subscription.paymentDate.format("YYYY-MM-DD"),
            notifications: subscription.notifications,
            category: subscription.category
        });
        return response.data;
    } catch (error) {
        console.error('Error creating subscriptions', error);
        return 'Create error';
    }
}

export async function addTestSubscriptions (){
    try {
        const response = await axios.post('http://localhost:8000/api/addTestSubscriptions/');
        return response.data;
    } catch (error) {
        console.error('Error adding test subscriptions', error);
        return 'Error';
    }
}

export async function deleteAllSubscriptions (){
    try {
        const response = await axios.post('http://localhost:8000/api/deleteAllSubscriptions/');
        return response.data;
    } catch (error) {
        console.error('Error deletind all subscriptions', error);
        return 'Error';
    }
}
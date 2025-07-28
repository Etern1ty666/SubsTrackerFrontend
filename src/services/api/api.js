import axios from "axios";

const tg = window.Telegram.WebApp;

function getTelegramPayload(extra = {}) {
  return {
    initData: tg.initData,
    userInfo: tg.initDataUnsafe.user,
    ...extra,
  };
}

export async function fetchSubscriptions() {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `api/getSubscriptions/`,
      getTelegramPayload()
    );
    return response.data;
  } catch (error) {
    console.error("Error getting subscriptions", error);
    return [];
  }
}

export async function updateSubscription(subscription) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `api/updateSubscription/`,
      getTelegramPayload({
        id: subscription.id,
        name: subscription.name,
        icon: subscription.icon,
        color: subscription.color,
        cost: subscription.cost,
        period: subscription.period,
        periodType: subscription.periodType,
        paymentDate: subscription.paymentDate.format("YYYY-MM-DD"),
        notifications: subscription.notifications,
        category: subscription.category,
      })
    );
    return response.data;
  } catch (error) {
    console.error("Error update subscription", error);
    return "Update error";
  }
}

export async function deleteSubscription(subscriptionId) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `api/deleteSubscription/`,
      getTelegramPayload({ subscription_id: subscriptionId })
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting subscriptions", error);
    return "Delete error";
  }
}

export async function createSubscription(subscription) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "api/createSubscription/",
      getTelegramPayload({
        name: subscription.name,
        icon: subscription.icon,
        color: subscription.color,
        cost: subscription.cost,
        period: subscription.period,
        periodType: subscription.periodType,
        paymentDate: subscription.paymentDate.format("YYYY-MM-DD"),
        notifications: subscription.notifications,
        category: subscription.category,
      })
    );
    return response.data;
  } catch (error) {
    console.error("Error creating subscriptions", error);
    return "Create error";
  }
}

export async function addTestSubscriptions() {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "api/addTestSubscriptions/",
      getTelegramPayload()
    );
    return response.data;
  } catch (error) {
    console.error("Error adding test subscriptions", error);
    return "Error";
  }
}

export async function deleteAllSubscriptions() {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "api/deleteAllSubscriptions/",
      getTelegramPayload()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting all subscriptions", error);
    return "Error";
  }
}

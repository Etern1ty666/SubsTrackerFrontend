import { action, makeAutoObservable, runInAction } from "mobx";
import { getNextPaymentDate } from "../utils/DateFunctions";
import { categorizeSubscriptions } from "../utils/utils";
import { fetchSubscriptions } from "../services/api/api";

class SubscriptionsStore {
    data = [];
    selectedSubscription = {};
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    add(object) {
        this.data.push(object);
    }

    delete(sub_id) {
        this.data.replace(this.data.filter(subscription => subscription.id !== sub_id));
    }

    update(object) {
        this.data.replace(this.data.map(subscription => 
            object.id === subscription.id ? object : subscription
        ));
    }

    getSubscriptions = async () => {
        try{
            runInAction(() => {
                this.isLoading = true;
            });            
            const result = await fetchSubscriptions()
            console.log(result)
            runInAction(() => {
                this.data = result;
                this.isLoading = false;
            })
        }catch{
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    get categorizedData() {
        return categorizeSubscriptions(this.data.slice());
    }
  
}

const subscriptionsStore = new SubscriptionsStore();
export default subscriptionsStore;

import { state } from "../../store";
export const [ordersActions, ordersSelector, ordersState] = state("ordersPage", {
  initial: {
    customersOrders:[],
    orders: [],
    orderDetails:[],
    loading:false,
    apiError: {status:false,message:""},
    
  },
  on: {
    load: (_, data) => {
     
      const newStoreObj = {
        ..._
      };
      newStoreObj.loading = true;
      newStoreObj.customersOrders =data;
           
      return { ...newStoreObj };
    },
    loadOrder: (_, data) => {
     
      const newStoreObj = {
        ..._
      };
      newStoreObj.loading = true;
           
      newStoreObj.orders =data;
     console.log(newStoreObj);
      return { ...newStoreObj };
    },
    loadOrderDetails: (_, data) => {
     
      const newStoreObj = {
        ..._
      };
      newStoreObj.loading = true;
           
      newStoreObj.orderDetails =data;
     
      return { ...newStoreObj };
    },
    setApiError: (_, data) => {
      const newStoreObj = {
        ..._
      };
      newStoreObj.apiError.status =data.status;
      newStoreObj.apiError.message =data.message;
      return newStoreObj;
    },
    
  },
  events: ["customersOrderList","selectCustomer","selectOrder"]
});
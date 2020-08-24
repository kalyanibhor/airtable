import { state } from "../../store";
export const [shoppingActions, shoppingSelector, shoppingState] = state(
  "shoppingPage",
  {
    initial: {
      customers: { loading: false, item: [] },
      product: { loading: false, item: [] },      
      customerCode:"",
      apiError: { status: false, message: "" },
    },
    on: {
      load: (_, data) => {
          console.log(data);
        const newStoreObj = {
          ..._,
        };
        newStoreObj.customers.loading = true;
        newStoreObj.product.loading = true;
        newStoreObj.customers.item = data.customers;
        newStoreObj.product.item = data.product;
        
        console.log(newStoreObj);
        return { ...newStoreObj };
      },
     setCustomerCode:(_,data)=>{

        const newStoreObj = {
            ..._,
          }; 
          newStoreObj.customerCode = data;
          return { ...newStoreObj };
     },

      setApiError: (_, data) => {
        const newStoreObj = {
          ..._,
        };
        newStoreObj.apiError.status = data.status;
        newStoreObj.apiError.message = data.message;
        return newStoreObj;
      },
    },
    events: ["loadCustomerProductData","customerOrderDetails"],
  }
);

import { putResolve, take, call, spawn } from "redux-saga/effects";
import { shoppingActions } from "./store";
import { api } from "../../App/api";


export function* loadShoppingSaga() {
    console.log("load saga called");
    while (true) {
        try {
          const { } = yield take(shoppingActions.loadCustomerProductData().type);
          let customers = yield call(
            api,
            `https://api.airtable.com/v0/appy19HtBkyLLeEF1/customers?api_key=keypO3dUKSWTYI2X2`
          );
         
          let product = yield call(
            api,
            `https://api.airtable.com/v0/appy19HtBkyLLeEF1/products?api_key=keypO3dUKSWTYI2X2`
          );
          console.log(customers);
          console.log(product);
          yield putResolve(shoppingActions.setApiError({status:false,message:""}));
          yield putResolve(shoppingActions.load({customers:customers.records,product:product.records}));
      
        } catch (err) {
          console.log(err);
                  yield putResolve(shoppingActions.setApiError({status:true,message:err}))
        }
      }
    
}
export function* customerOrderDetailsSaga() {
    console.log("load saga called");
    while (true) {
        try {
          const {payload:data } = yield take(shoppingActions.customerOrderDetails().type);
          let apidata = yield call(
            api,
            `http://localhost:8000/orders/add`,'POST',data
          );
         
         
          console.log(apidata.message);
          
          // yield putResolve(shoppingActions.setApiError({status:false,message:""}));
          // yield putResolve(shoppingActions.load(apidata.result));
      
        } catch (err) {
          console.log(err);
                  yield putResolve(shoppingActions.setApiError({status:true,message:err}))
        }
      }

}
export default function* ShoppingPageRootSaga() {
 yield spawn(loadShoppingSaga);
 yield spawn(customerOrderDetailsSaga);
 
  
 
}

import { putResolve, take, call, spawn, put, select } from "redux-saga/effects";
import { customersActions, customersSelector } from "./store";
import { api } from "../../App/api";
import { searchText } from "../../helper";
export function* loadCustomerSaga() {
  console.log("load saga called");
  while (true) {
    try {
      const { payload: data } = yield take(
        customersActions.loadCustomerData().type
      );
      
      let temp=[];
      let offsetId = [];
      let flag = true;
      let apiData;
      let i=0;
      let offset;
      while (true) {
        if (flag === true) {
          apiData = yield call(
            api,
            `https://api.airtable.com/v0/appy19HtBkyLLeEF1/customers?api_key=keypO3dUKSWTYI2X2`
          );
          offset=apiData.offset;
          offsetId.push(apiData.offset);
          console.log(offsetId);
          temp.push(...apiData.records);
          console.log(temp);
          flag=false;
        }
        else{
          if(offsetId.length>0 && offset){
            apiData = yield call(
              api,
              `https://api.airtable.com/v0/appy19HtBkyLLeEF1/customers?api_key=keypO3dUKSWTYI2X2&offset=${offsetId[i]}`
            );
            offset=apiData.offset;
            if(apiData.offset){
            offsetId.push(apiData.offset);

            console.log(offsetId);
            i=i+1;
            }
            temp.push(...apiData.records);
            console.log(temp);
            
          }
         else{
           break;
         }
        }


       
      }
     
      console.log(temp);
      // yield putResolve(customersActions.setApiError({status:false,message:""}));
      yield putResolve(customersActions.load({customers:temp,totalCount:temp.length,offsetId:apiData.offsetId}));
    } catch (err) {
      console.log(err);
      yield putResolve(
        customersActions.setApiError({ status: true, message: err })
      );
    }
  }
}
export function* addRecordSaga() {
  console.log("addRecord saga called");
  while (true) {
    try {
      const { payload: data } = yield take(customersActions.addRecord().type);

      let apiData = yield call(
        api,
        `http://localhost:8000/customers/add`,
        "POST",
        data
      );

      // console.log(apiData.data);
      yield putResolve(customersActions.load(apiData.data));
    } catch (err) {
      console.log(err);
      yield putResolve(
        customersActions.setApiError({ status: true, message: err })
      );
    }
  }
}
export function* deleteRecordSaga() {
  console.log("deleteRecord saga called");
  while (true) {
    try {
      const { payload: data } = yield take(
        customersActions.deleteRecord().type
      );
      let custId = data.custId;
      let size = data.size;
      let apiData = yield call(
        api,
        `http://localhost:8000/customers/delete/${custId}?size=${size}`,
        "DELETE"
      );

      yield putResolve(customersActions.load(apiData.data));
      console.log(apiData.data);
    } catch (err) {
      console.log(err);
      yield putResolve(
        customersActions.setApiError({ status: true, message: err })
      );
    }
  }
}
export function* updateRecordSaga() {
  console.log("editRecord saga called");
  while (true) {
    try {
      const { payload: data } = yield take(customersActions.editRecord().type);

      let size = data.size;

      delete data.size;
      let customerData = yield select(
        customersSelector((state) => state.editData)
      );
      console.log(customerData);
      let custId = customerData.ccode;
      console.log(custId);
      let apiData = yield call(
        api,
        `http://localhost:8000/customers/update/${custId}?size=${size}`,
        "PUT",
        data
      );

      yield putResolve(customersActions.load(apiData.data));
      console.log(apiData.data);
    } catch (err) {
      console.log(err);
      yield putResolve(
        customersActions.setApiError({ status: true, message: err })
      );
    }
  }
}
export function* searchCustomerSaga() {
  console.log("search customer saga is called");
  while (true) {
    const searchTextAction = yield take(customersActions.searchCustomer().type);

    var searchTextEvent = searchTextAction.payload;
    var text = searchTextEvent.target.value.toLowerCase();
    console.log(text);

    var customerData = yield select(
      customersSelector((state) => state.customers)
    );
    console.log(customerData);

    var filteredCustomer = searchText(customerData)(text);

    console.log(filteredCustomer);
    yield putResolve(
      customersActions.loadFilteredCustomer({
        filteredCustomer: filteredCustomer,
      })
    );
  }
}
export default function* CustomersPageRootSaga() {
  yield spawn(loadCustomerSaga);
  yield spawn(addRecordSaga);
  yield spawn(deleteRecordSaga);
  yield spawn(updateRecordSaga);
  yield spawn(searchCustomerSaga);
}

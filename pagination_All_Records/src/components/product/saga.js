import { putResolve, take, call, spawn ,put,select} from "redux-saga/effects";
import { productActions,productSelector } from "./store";
import { api } from "../../App/api";
import {searchText} from "../../helper";

export function* loadProductSaga() {
    console.log("load saga called");
    while (true) {
        try {
          const { payload: data } = yield take(productActions.loadProductData().type);
          let apiData = yield call(
            api,
            `https://api.airtable.com/v0/appy19HtBkyLLeEF1/products?api_key=keypO3dUKSWTYI2X2`
          );
         
         
         
          yield putResolve(productActions.load(apiData.records));
        console.log(apiData.records);
        } catch (err) {
          console.log(err);
                  yield putResolve(productActions.setApiError({status:true,message:err}))
        }
      }
    
}
export function* addRecordSaga() {
  console.log("addRecord saga called");
  while (true) {
    try {
      
      const { payload: data } = yield take(productActions.addRecord().type);
      let apiData = yield call(
        api,
        `http://localhost:8000/product/add`,"POST",data
      );
     
     
      yield putResolve(productActions.setApiError({status:false,message:""}));
      yield putResolve(productActions.load(apiData.data));
    console.log(apiData);
    } catch (err) {
      console.log(err);
              yield putResolve(productActions.setApiError({status:true,message:err}))
    }
  }

}
export function* deleteRecordSaga() {
  console.log("deleteRecord saga called");
  while (true) {
    try {
    
      const { payload:pId } = yield take(productActions.deleteRecord().type);
      console.log(pId);
      let apiData = yield call(
        api,
        `http://localhost:8000/product/delete/${pId}`,'DELETE'
      );
     
     
     
      yield putResolve(productActions.load(apiData.data));
    console.log(apiData.data);
    } catch (err) {
      console.log(err);
              yield putResolve(productActions.setApiError({status:true,message:err}))
    }
  }
}
export function* editRecordSaga() {
  console.log("editRecord saga called");
  while (true) {
    try {
     
      
      const { payload:data} = yield take(productActions.editRecord().type);
      console.log(data);
      let productData = yield select(
        productSelector(state => state.editData)
      );
  console.log(productData);
      let pId=productData.pcode;
      console.log(pId);
      let apiData = yield call(
        api,
        `http://localhost:8000/product/update/${pId}`,'PUT',data
      );
     
     
    
       yield putResolve(productActions.load(apiData.data));
    console.log(apiData.data);
    } catch (err) {
      console.log(err);
             yield putResolve(productActions.setApiError({status:true,message:err}))
    }
  }
}
export function* searchProductSaga() {
  
  console.log("search product saga is called");
    while (true) {
      const searchTextAction = yield take(productActions.searchProduct().type);
  
      var searchTextEvent = searchTextAction.payload;
      var text = searchTextEvent.target.value.toLowerCase();
      console.log(text);
       
      var productData = yield select(
        productSelector(state => state.product)
      );
  console.log(productData);
      
      var filteredProduct =searchText(productData)(text);
  
     console.log(filteredProduct);
      yield putResolve(
        productActions.loadFilteredProduct({filteredProduct:filteredProduct})
      );
    }
  }

export default function* ProductPageRootSaga() {
  yield spawn(loadProductSaga);
  yield spawn(searchProductSaga);
  yield spawn(addRecordSaga);
  yield spawn(deleteRecordSaga);
  yield spawn(editRecordSaga);
 
}

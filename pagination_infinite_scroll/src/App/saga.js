import { spawn } from "redux-saga/effects";
import CustomerPageRootSaga from "../components/customer/saga";
import ProductPageRootSaga from "../components/product/saga";
import ShoppingPageRootSaga from "../components/shopping/saga";
import OrderPageRootSaga from "../components/order/saga";
export default function* rootSaga() {

console.log("rootSaga Loaded");
 
  yield spawn(CustomerPageRootSaga);
  yield spawn(ProductPageRootSaga);
 yield spawn(ShoppingPageRootSaga);
 yield spawn(OrderPageRootSaga);
 
}
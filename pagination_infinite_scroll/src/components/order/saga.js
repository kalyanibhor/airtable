import { putResolve, take, call, spawn } from "redux-saga/effects";
import { ordersActions } from "./store";
import { api } from "../../App/api";
export function* loadOrderSaga() {
  console.log("load saga called");
  while (true) {
    try {
      const { payload: data } = yield take(ordersActions.customersOrderList().type);
      let apiData = yield call(
        api,
        `http://localhost:8000/orders/display`
      );

      yield putResolve(
        ordersActions.setApiError({ status: false, message: "" })
      );
      yield putResolve(ordersActions.load(apiData.data));
      console.log(apiData);
    } catch (err) {
      console.log(err);
      yield putResolve(
        ordersActions.setApiError({ status: true, message: err })
      );
    }
  }
}

export function* selectCustomerSaga() {
  console.log("selectCustomer saga called");
  while (true) {
    try {
      const { payload: ccode } = yield take(ordersActions.selectCustomer().type);
      let apiData = yield call(
        api,
        `http://localhost:8000/orders/list/${ccode}`
      );
      console.log(apiData.data);
      yield putResolve(
        ordersActions.setApiError({ status: false, message: "" })
      );
      yield putResolve(ordersActions.loadOrder(apiData.data));
      
    } catch (err) {
      console.log(err);
      yield putResolve(
        ordersActions.setApiError({ status: true, message: err })
      );
    }
  }
}
export function* selectOrderSaga() {
  console.log("selectOrder saga called");
  while (true) {
    try {
      const { payload: ocode } = yield take(ordersActions.selectOrder().type);
      let apiData = yield call(
        api,
        `http://localhost:8000/orders/display/${ocode}`
      );

      yield putResolve(
        ordersActions.setApiError({ status: false, message: "" })
      );
      yield putResolve(ordersActions.loadOrderDetails(apiData.data));
      console.log(apiData);
    } catch (err) {
      console.log(err);
      yield putResolve(
        ordersActions.setApiError({ status: true, message: err })
      );
    }
  }
}

export default function* OrderPageRootSaga() {
  yield spawn(loadOrderSaga);
  yield spawn(selectCustomerSaga);
  yield spawn(selectOrderSaga);
}

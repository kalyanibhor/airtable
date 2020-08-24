import { applyMiddleware, createStore } from "redux";
import { state } from ".";
export default ({ middleware = [], initialState } = {}) => {
  const store = createStore(
    state.reducer(),
    initialState,
    applyMiddleware(...middleware, (store) => (next) => (action) => {
      /* istanbul ignore if */
      if (process.env.NODE_ENV === "development") {
        console.log(action);
      }
      return next(action);
    })
  );
  return store;
};
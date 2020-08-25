import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';

import {Provider} from 'react-redux';

import createSagaMiddleware from "redux-saga";

//store
import bootstrap from "./store/bootstrap";
//saga
import rootSaga from "./App/saga";
import * as serviceWorker from './serviceWorker';
const sagaMiddleware = createSagaMiddleware();
const store = bootstrap({
  initialState: {},
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

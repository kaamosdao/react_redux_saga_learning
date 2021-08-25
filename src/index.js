import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './redux/rootReducer';
import sagaWatcher from './redux/sagas';
import forbiddenWordsMiddleware from './redux/middleware';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, sagaMiddleware, forbiddenWordsMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(sagaWatcher)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

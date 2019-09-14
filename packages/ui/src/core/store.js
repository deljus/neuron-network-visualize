import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import createSagas from './sagas';
import reducers from './reducers';

const { ipcRenderer } = window.require('electron') || {
  ipcRenderer: { send: () => {}, on: () => {} }
};

const sagas = createSagas(ipcRenderer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(sagas);

export default store;

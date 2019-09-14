import { all, fork } from 'redux-saga/effects';
import createLearningSaga from './learning';
import createMessageSaga from './messages';

export default ipcRenderer =>
  function* saga() {
    yield fork(createMessageSaga(ipcRenderer));
    yield all([...createLearningSaga(ipcRenderer)]);
  };

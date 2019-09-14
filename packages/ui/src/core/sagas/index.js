import { all, fork } from 'redux-saga/effects';
import learningSaga from './learning';
import messages from './messages';

export default function* sagas() {
  yield fork(messages);
  yield all([...learningSaga]);
}

import { takeEvery, put } from 'redux-saga/effects';
import { setNotificationAction } from '../actions/notifications';
import { VALIDATE_DATA_LEADNING_FILE, START_LEARNING, STOP_LEARNING } from '../constants/learning';
import { updateLearningProgressAction } from '../actions/learning';

const { ipcRenderer } = window.require('electron');

function* validateLearningFile({ data }) {
  const { samples } = JSON.stringify(data);

  if (!samples || !samples.input || !samples.output) {
    yield put(setNotificationAction('fileParamsMissing', 'required fields are missing'));
  }
}

function* startLearning() {
  ipcRenderer.send('START_LEARNING_MESSAGE');
  yield put(updateLearningProgressAction(true));
}

function* stopLearning() {
  ipcRenderer.send('STOP_LEARNING_MESSAGE');
  yield put(updateLearningProgressAction(false));
}

export default [
  takeEvery(VALIDATE_DATA_LEADNING_FILE, validateLearningFile),
  takeEvery(START_LEARNING, startLearning),
  takeEvery(STOP_LEARNING, stopLearning)
];

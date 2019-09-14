import { takeEvery, put, select } from 'redux-saga/effects';
import { setNotificationAction } from '../actions/notifications';
import {VALIDATE_DATA_LEADNING_FILE, START_LEARNING, STOP_LEARNING } from '../constants/learning';
import { updateLearningProgressAction, uptateSamplesActions, updateVisualize } from '../actions/learning';

export function* validateLearningFile({ data }) {
  if (!data) {
    yield put(setNotificationAction('fileParamsMissing', 'empty file'));
  }

  const { samples } = JSON.parse(data);

  switch (true) {
    case !samples || !samples.input || !samples.output:
      yield put(setNotificationAction('fileParamsMissing', 'required fields are missing'));
      break;
    case !samples.input.length || !samples.output.length:
      yield put(setNotificationAction('fileParamsMissing', 'field lengths is empty'));
      break;
    case samples.input.length !== samples.output.length:
      yield put(setNotificationAction('fileParamsMissing', 'field lengths do not match'));
      break;
    case !samples.input.every(inp => inp.length === samples.input[0].length) ||
      !samples.output.every(out => out.length === samples.output[0].length):
      yield put(setNotificationAction('fileParamsMissing', 'different field lengths'));
      break;
    default:
      yield put(uptateSamplesActions(samples));
  }
}

function* startLearning(ipcRenderer) {
  const data = yield select(state => state.learning);
  ipcRenderer.send('START_LEARNING_MESSAGE', data);
  yield put(updateVisualize([]));
  yield put(updateLearningProgressAction(true));
}

function* stopLearning(ipcRenderer) {
  ipcRenderer.send('STOP_LEARNING_MESSAGE');
  yield put(updateLearningProgressAction(false));
}

export default ipcRenderer => [
  takeEvery(VALIDATE_DATA_LEADNING_FILE, validateLearningFile),
  takeEvery(START_LEARNING, startLearning, ipcRenderer),
  takeEvery(STOP_LEARNING, stopLearning, ipcRenderer),
];

// @flow
import { eventChannel } from 'redux-saga';
import { take, put } from 'redux-saga/effects';
import { VALIDATE_DATA_LEADNING_FILE } from '../constants/learning';
import { setNotificationAction } from '../actions/notifications';

const { ipcRenderer } = window.require('electron');

function listenMainProcess(emit) {
  const loadSamplesFile = (event, data) => emit({ type: VALIDATE_DATA_LEADNING_FILE, data });
  const errorMainProcess = (event, message) => emit(setNotificationAction('main', message));

  ipcRenderer.on('NEW_LEANING_SAMPLES', loadSamplesFile);
  ipcRenderer.on('ERROR_MAIN_PROCESS', errorMainProcess);

  return () => {
    ipcRenderer.removeAllListeners('NEW_LEANING_SAMPLES', loadSamplesFile);
    ipcRenderer.removeAllListeners('ERROR_MAIN_PROCESS', errorMainProcess);
  };
}

function* ipc() {
  const channel = yield eventChannel(listenMainProcess);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default ipc;

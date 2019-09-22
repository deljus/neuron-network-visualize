// @flow
import { eventChannel } from 'redux-saga';
import { take, put } from 'redux-saga/effects';
import { VALIDATE_DATA_LEADNING_FILE, PART_OF_LEARNING_DATA } from '../constants/learning';
import { setNotificationAction } from '../actions/notifications';
import { stopLearningAction } from '../actions/learning';

const listenMainProcess = ipcRenderer => emit => {
  const loadSamplesFile = (event, data) => emit({ type: VALIDATE_DATA_LEADNING_FILE, data });
  const errorMainProcess = (event, message) => emit(setNotificationAction('main', message));
  const dataOfLearning = (event, message) => emit({ type: PART_OF_LEARNING_DATA, message });
  const finishLearning = () => emit(stopLearningAction());

  ipcRenderer.on('NEW_LEANING_SAMPLES', loadSamplesFile);
  ipcRenderer.on('ERROR_MAIN_PROCESS', errorMainProcess);
  ipcRenderer.on('PART_OF_LEARNING_DATA_MESSAGE', dataOfLearning);
  ipcRenderer.on('FINISH_LEARNING_MESSAGE', finishLearning);

  return () => {
    ipcRenderer.removeAllListeners('NEW_LEANING_SAMPLES', loadSamplesFile);
    ipcRenderer.removeAllListeners('ERROR_MAIN_PROCESS', errorMainProcess);
    ipcRenderer.removeAllListeners('PART_OF_LEARNING_DATA_MESSAGE', dataOfLearning);
    ipcRenderer.removeAllListeners('FINISH_LEARNING_MESSAGE', finishLearning);
  };
};

const createMessageSaga = ipcRenderer =>
  function* ipc() {
    const channel = yield eventChannel(listenMainProcess(ipcRenderer));

    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  };

export default createMessageSaga;

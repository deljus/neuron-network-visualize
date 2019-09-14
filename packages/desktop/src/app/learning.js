import { ipcMain } from 'electron';
import path from 'path';
import { fork } from 'child_process';

class Learning {
  constructor(win) {
    this.worker = fork(path.join(__dirname, 'learningWorker.js'), null, { silent: true });
    this.worker.on('message', this.workerMessageHandler);
    this.worker.on('error', err => {
      console.log(`\n\t\tERROR: spawn failed! (${err})`);
    });
    this.worker.stderr.on('data', data => {
      console.log(`stdout: ${data}`);
    });
    this.webContent = win.webContents;
    ipcMain.on('START_LEARNING_MESSAGE', this.startLearning);
  }

  workerMessageHandler = ({ type, data }) => {
    switch (type) {
      case 'FINISH_LEARNING_MESSAGE':
        this.webContent.send('FINISH_LEARNING_MESSAGE');
        break;
      case 'DATA_OF_LEARNING':
        this.webContent.send('PART_OF_LEARNING_DATA_MESSAGE', data);
    }
  };

  startLearning = (e, data) => {
    this.worker.send({ type: 'START_LEARNING_MESSAGE', data });
  };

  stopLearning = (e, data) => {
    this.worker.send({ type: 'STOP_LEARNING_MESSAGE', data });
  };
}

export default Learning;

import { ipcMain } from 'electron';
import path from 'path';
import { fork } from 'child_process';
import { Matrix } from 'neuron-network';

class Learning {
  constructor(win) {
    this.worker = fork(path.join(__dirname, 'learningWorker.js'), null, { silent: true });
    this.worker.on('message', this.workerMessageHandler);
    this.worker.on('error', err => {
      console.log(`\n\t\tERROR: spawn failed! (${err})`);
    });
    this.worker.stderr.on('example.json', data => {
      console.log(`stdout: ${data}`);
    });

    this.buff = null;
    this.timer = null;
    this.finish = true;
    this.webContent = win.webContents;
    ipcMain.on('START_LEARNING_MESSAGE', this.startLearning);
  }

  concentrateData(data, timeOut = 500) {
    console.log('hiiii', data);
    if (this.timer && !this.finish) {
      const { epoch, weightMatrix: baseWeidth } = data;

      const weightMatrix = new Matrix(...baseWeidth);
      if (!this.buff) {
        console.log(weightMatrix);
        this.buff = {
          epoch,
          weightMatrix: weightMatrix.deepMap(el => [[el]])
        };
      } else {
        this.buff = {
          epoch,
          weightMatrix: this.buff.weightMatrix.deepMap((el, i, k) => [...el, [weightMatrix[i][k]]])
        };
      }
    } else if (!this.timer && !this.finish) {
      this.timer = setTimeout(() => {
        this.webContent.send('DATA_OF_LEARNING', this.buff);
      }, timeOut);
    } else {
      this.buff = null;
      clearTimeout(this.timer);
    }
  }

  workerMessageHandler = ({ type, data }) => {
    switch (type) {
      case 'FINISH_LEARNING':
        this.webContent.send('FINISH_LEARNING_MESSAGE');
        this.finish = true;
        break;
      case 'DATA_OF_LEARNING':
        this.concentrateData(data);
    }
  };

  startLearning = (e, data) => {
    this.finish = false;
    this.worker.send({ type: 'START_LEARNING', data });
  };

  stopLearning = (e, data) => {
    this.finish = false;
    this.worker.send({ type: 'STOP_LEARNING', data });
  };
}

export default Learning;

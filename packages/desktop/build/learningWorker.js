const { Perceptron, Matrix } = require('neuron-network');

let neuron = null;

const callBack = data => {
  process.send({ type: 'DATA_OF_LEARNING', data });
};

const start = data => {
  neuron = new Perceptron(data);
  const input = new Matrix(...data.samples.input);
  const output = new Matrix(...data.samples.output);
  neuron.learn(input, output, callBack);
};

process.on('message', ({ type, data }) => {
  switch (type) {
    case 'START_LEARNING_MESSAGE':
      start(data);
      break;
    case 'STOP_LEARNING_MESSAGE':
      neuron.stopLearning();
      break;
  }

  neuron = null;
  process.send({ type: 'FINISH_LEARNING_MESSAGE', data: type });
});

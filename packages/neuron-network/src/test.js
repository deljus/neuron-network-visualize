require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-flow'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
});
require('@babel/polyfill');

const { Perceptron } = require('./main');
const ACTIVATION = require('./activation');

const input = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 0],
  [0, 1, 1],
  [0, 1, 0]
];

const output = [[1], [0], [0], [1], [0]];

const schema = [3, 1];

const per = new Perceptron({
  schema,
  bias: false,
  epoch: 100000,
  activation: ACTIVATION.ReLU
});

console.log(per.learn(input, output));

console.log(per.result([[1, 1, 0], [0, 0, 0]]));

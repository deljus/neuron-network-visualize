const { exp, pow, atan, abs } = Math;

const sigmoid = x => 1 / (1 + exp(-x));
const th = x => (exp(x) - exp(-x)) / (exp(x) + exp(-x));

export default {
  SIGMOID: {
    name: 'Sigmoid function',
    fn: x => sigmoid(x),
    dfn: x => sigmoid(x) * (1 - sigmoid(x))
  },
  ReLU: {
    name: 'Rectified linear unit (ReLU)',
    fn: x => Math.max(0, x),
    dfn: x => (x > 0 ? 1 : 0)
  },
  TH: {
    name: 'Hyperbolic tangent',
    fn: x => th(x),
    dfn: x => 1 - pow(th(x), 2)
  },
  ARCTG: {
    name: 'Arctangent',
    fn: x => atan(x),
    dfn: x => 1 / (pow(x, 2) + 1)
  },
  SOFTSIGN: {
    name: 'Soft sign',
    fn: x => x / 1 - abs(x),
    dfn: x => 1 / pow(1 + abs(x), 2)
  }
};

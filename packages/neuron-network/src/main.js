// @flow
import type { MatrixType } from './matrix/matrix';
import Matrix from './matrix/matrix';
import ACTIVATION from './activation';

type Schema = Array<number>;
type WeightMatrix = Array<MatrixType>;

type PerceptronType = {
  weightMatrix?: Array<MatrixType>,
  schema?: Schema,
  epoch?: number,
  activation?: {
    fn: Function,
    dfn: Function
  }
};

const createRandomWeightMatrix = (schema: Schema): WeightMatrix => {
  const newSchema = schema.map((num, i) => {
    if (i === 0) {
      return Matrix.createRandomMatrix(num, num);
    }
    return Matrix.createRandomMatrix(num, schema[i - 1]);
  });
  return new Matrix(...newSchema);
};

const createWeightMatrix = (data: WeightMatrix): WeightMatrix => data.map(dt => new Matrix(dt));

class Perceptron {
  weightMatrix: Array<MatrixType>;

  epoch: number;

  flinders: number;

  activation: {
    fn: Function,
    dfn: Function
  };

  constructor({ weightMatrix, schema, activation, epoch }: PerceptronType) {
    this.weightMatrix =
      (weightMatrix && createWeightMatrix(weightMatrix)) ||
      (schema && createRandomWeightMatrix(schema)) ||
      createRandomWeightMatrix([3, 1]);
    this.activation = activation || ACTIVATION.SIGMOID;
    this.epoch = epoch || 100000;
    this.flinders = Math.floor(epoch / 30);
  }

  get weight() {
    return this.weightMatrix;
  }

  set setEpoch(epoch) {
    this.epoch = epoch;
  }

  result(data: Matrix) {
    const steps = new Matrix(data);
    const result = this.weightMatrix.reduce((acc: Matrix, layer: Matrix) => {
      const res = acc.dot(layer.T).deepMap(this.activation.fn);
      steps.push(res);
      return res;
    }, data);
    return { data: result, steps: steps.slice(0, -1) };
  }

  learn(input: Matrix, output: Matrix, callback) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.epoch; i++) {
      const { data, steps } = this.result(input);
      const divergence = output.sub(data);

      if (callback && !(i % this.flinders)) {
        callback({
          epoch: i,
          weightMatrix: this.weightMatrix,
          divergence
        });
      }

      this.weightMatrix.reduceRight((acc: Matrix, layer: Matrix, k: number) => {
        const dResult = (steps[k + 1] || data).deepMap(this.activation.dfn);
        const sigma = acc.multi(dResult);
        // $FlowFixMe
        this.weightMatrix[k] = this.weightMatrix[k].add(steps[k].T.dot(sigma).T);
        return sigma.dot(this.weightMatrix[k]);
      }, divergence);
    }
  }

  stopLearning() {}
}

export { Matrix, ACTIVATION, Perceptron };

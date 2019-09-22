// @flow
import { isSameSizes, checkMultipleParams } from './decorators';

export type MatrixElemType = Array<number>;
export type MatrixType = Array<MatrixElemType>;

class Matrix extends Array<MatrixElemType> {
  static createRandomMatrix(row: number, col: number): MatrixType {
    const matrix = [...Array(row)].map(() => [...Array(col)].map(() => Math.random()));
    return new Matrix(...matrix);
  }

  get T(): MatrixType {
    const matrix = this[0] ? this[0].map((col, i) => [...this.map(row => row[i])]) : [];
    return new Matrix(...matrix);
  }

  deepMap(callback: Function): MatrixType {
    return this.map((row, i) => row.map((el, k) => callback(el, i, k, row)));
  }

  @isSameSizes
  add(matrix: MatrixType): MatrixType {
    return this.deepMap((el, i, k) => el + matrix[i][k]);
  }

  @isSameSizes
  sub(matrix: MatrixType): MatrixType {
    return this.deepMap((el, i, k) => el - matrix[i][k]);
  }

  mapEnd(callback) {
    const newData = this.map(dt => {
      const newDt = [...dt];
      newDt[dt.length - 1] = callback(newDt[dt.length - 1]);
      return newDt;
    });
    return new Matrix(...newData);
  }

  @isSameSizes
  multi(matrix: MatrixType): MatrixType {
    return this.deepMap((el, i, k) => el * matrix[i][k]);
  }

  @checkMultipleParams
  dot(matrix: MatrixType): MatrixType {
    return this.map(row => [
      ...matrix[0].map((val, j) =>
        row.reduce((sum, elm, k) => {
          return sum + elm * matrix[k][j];
        }, 0)
      )
    ]);
  }

  concatMatrix(matrix: MatrixType) {}
}

export default Matrix;

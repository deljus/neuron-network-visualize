// @flow
import type { MatrixType } from "./matrix";

export const isSameSizes2Matrix = (matrix1: MatrixType, matrix2: MatrixType): boolean => {
  if(!matrix1.length && !matrix2.length){
    return true;
  }
  if((matrix1.length && !matrix2.length) || (!matrix1.length && matrix2.length)){
    return false;
  }
  return !!(matrix1.length === matrix2.length && matrix1[0] && matrix2[0] && matrix1[0].length === matrix2[0].length);
};

export const isSameSizes = (target: Object, key: string, descriptor: Object): ?MatrixType => {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function(matrix2) {
      if(!isSameSizes2Matrix(this, matrix2)){
        throw new Error('Input arguments invalid')
      }
      return original.call(this, matrix2)
    }
  }
  return descriptor;
};

export const checkMultipleParams = (target: Object, key: string, descriptor: Object): ?MatrixType => {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function(matrix2) {
      if(!matrix2 || !matrix2[0]){
        throw new Error('Input arguments invalid');
      }
      return original.call(this, matrix2)
    }
  }
  return descriptor;
};

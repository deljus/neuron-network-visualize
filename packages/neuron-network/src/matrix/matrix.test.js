import Matrix from './matrix'

const m1 = new Matrix([1,2,2],[3,1,1]);
const m2 = new Matrix([4,2],[3,1],[1,5]);
const m3 = new Matrix();

describe('transpose', () => {
  test('Should return empty array', () => {
    expect(m3.T).toEqual([]);
  });
  test('Should return transpose matrix', () => {
    expect(m1.T).toEqual([[1,3],[2,1],[2,1]]);
    expect(m2.T).toEqual([[4,3,1], [2,1,5]]);
  });
});

describe('add', () => {
  test('Should to throw error', () => {
    expect(() => m1.add(m3)).toThrowError('Input arguments invalid');
  });
  test('Should return matrix', () => {
    expect(m3.add(m3)).toEqual([]);
    expect(m1.add(m1)).toEqual([[2,4,4],[6,2,2]]);
    expect(m2.add(m2)).toEqual([[8,4],[6,2],[2,10]]);
  });
});

describe('sub', () => {
  test('Should to throw error', () => {
    expect(() => m1.sub(m3)).toThrowError('Input arguments invalid');
  });
  test('Should return matrix', () => {
    expect(m3.sub(m3)).toEqual([]);
    expect(m1.sub(m1)).toEqual([[0,0,0],[0,0,0]]);
    expect(m2.sub(m2)).toEqual([[0,0],[0,0],[0,0]]);
  });
});

describe('multi', () => {
  test('Should to throw error', () => {
    expect(() => m1.multi(m3)).toThrowError('Input arguments invalid');
  });
  test('Should return matrix', () => {
    expect(m3.multi(m3)).toEqual([]);
    expect(m1.multi(m1)).toEqual([[1,4,4],[9,1,1]]);
    expect(m2.multi(m2)).toEqual([[16,4],[9,1],[1,25]]);
  });
});

describe('dot', () => {
  test('Should to throw error', () => {
    expect(() => m1.dot(m3)).toThrowError('Input arguments invalid');
    expect(() => m2.dot(m3)).toThrowError('Input arguments invalid');
  });
  test('Should return matrix', () => {
    expect(m1.dot(m2)).toEqual([[12,14],[16,12]]);
    expect(m2.dot(m1)).toEqual([[10,10,10], [6,7,7], [16,7,7]]);
    const m4 = new Matrix([1,2,3], [1,2,3]);
    const m5 = new Matrix([1],[1],[1]);
    expect(m4.dot(m5)).toEqual([[6],[6]]);
  });
});

describe('deepMap', () => {
  test('Should return empty array', () => {
    expect(m3.deepMap((el) => el + 1)).toEqual([]);
  });
  test('Should return matrix', () => {
    expect(m1.deepMap((el) => el + 1)).toEqual([[2,3,3],[4,2,2]]);
    expect(m2.deepMap((el) => el + 1)).toEqual([[5,3],[4,2],[2,6]]);
  });
});

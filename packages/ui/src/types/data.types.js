// @flow
export type Schema = Array<number>;
export type ActivationFnName = string;
export type Epoch = number;
export type Samples = {
  input: Array<number>,
  output: Array<number>
};

export type Notification = {
  id: string,
  message: string,
  type: string,
  global: boolean,
};

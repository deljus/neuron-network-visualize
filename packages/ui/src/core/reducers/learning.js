// @flow
import { ACTIVATION } from 'neuron-network';
import {
  UPDATE_LEARNING_PROGRESS,
  UPDATE_EPOCH,
  UPDATE_SAMPLES,
  UPDATE_SCHEMA,
  UPDATE_VISUALIZE,
  SKIP_TO_DEFAULT_LEARNING,
  PART_OF_LEARNING_DATA
} from '../constants/learning';
import type { Samples, Schema, Epoch } from '../../types/data.types';

type State = {
  schema: Schema,
  samples: ?Samples,
  isLearning: boolean,
  epoch: Epoch,
  activationFnName: string,
  visualize: Array
};

const initState = {
  schema: [1, 1],
  samples: null,
  isLearning: false,
  epoch: 100,
  activationFnName: Object.keys(ACTIVATION)[0],
  visualize: []
};

const learning = (state: State = initState, action) => {
  switch (action.type) {
    case UPDATE_SCHEMA:
      return { ...state, schema: action.schema };
    case UPDATE_EPOCH:
      return { ...state, epoch: action.epoch };
    case UPDATE_VISUALIZE:
      return { ...state, visualize: action.visualize };
    case UPDATE_SAMPLES:
      const { samples } = action;
      return {
        ...state,
        samples,
        schema: [samples.input[0].length, ...state.schema.slice(1, -1), samples.output[0].length]
      };
    case UPDATE_LEARNING_PROGRESS:
      return { ...state, isLearning: action.progress };
    case SKIP_TO_DEFAULT_LEARNING:
      return { ...initState };

    case PART_OF_LEARNING_DATA:
      return { ...state, visualize: [...state.visualize, action.message] };

    default:
      return { ...state };
  }
};

export default learning;

// @flow
import { ACTIVATION } from 'neuron-network';
import {
  UPDATE_LEARNING_PROGRESS,
  UPDATE_EPOCH,
  UPDATE_SAMPLES,
  UPDATE_SCHEMA,
  UPDATE_VISUALIZE_WEIGHT_MATRIX,
  SKIP_TO_DEFAULT_LEARNING
} from '../constants/learning';
import type { Samples, Schema, Epoch } from '../../types/data.types';

type State = {
  schema: Schema,
  samples: ?Samples,
  isLearning: boolean,
  epoch: Epoch,
  activationFnName: string,
  visualize?: {
    weightMatrix: Array<number>
  }
};

const initState = {
  schema: [1, 1],
  samples: null,
  isLearning: false,
  epoch: 100,
  activationFnName: Object.keys(ACTIVATION)[0],
  visualize: {
    weightMatrix: null
  }
};

const learning = (state: State = initState, action) => {
  switch (action.type) {
    case UPDATE_SCHEMA:
      return { ...state, schema: action.schema };
    case UPDATE_EPOCH:
      return { ...state, epoch: action.epoch };
    case UPDATE_SAMPLES:
      return { ...state, samples: action.samples };
    case UPDATE_LEARNING_PROGRESS:
      return { ...state, isLearning: action.progress };
    case UPDATE_VISUALIZE_WEIGHT_MATRIX:
      return {
        ...state,
        visualize: {
          ...state.visualize,
          weightMatrix: action.weightMatrix
        }
      };
    case SKIP_TO_DEFAULT_LEARNING:
      return { ...initState };
    default:
      return { ...state };
  }
};

export default learning;

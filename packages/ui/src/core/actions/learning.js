// @flow
import {
  UPDATE_LEARNING_PROGRESS,
  UPDATE_EPOCH,
  UPDATE_SCHEMA,
  UPDATE_ACTIVATION_FN_NAME,
  STOP_LEARNING,
  START_LEARNING,
  UPDATE_SAMPLES,
  UPDATE_VISUALIZE,
  UPDATE_BIAS
} from '../constants/learning';
import type { Schema, Samples } from '../../types/data.types';

export const updateLearningProgressAction = (progress: boolean) => ({
  type: UPDATE_LEARNING_PROGRESS,
  progress
});

export const uptateSamplesActions = (samples: Samples) => ({
  type: UPDATE_SAMPLES,
  samples
});

export const updateVisualize = visualize => ({
  type: UPDATE_VISUALIZE,
  visualize
});

export const updateSchemaAction = (schema: Schema) => ({
  type: UPDATE_SCHEMA,
  schema
});

export const updateEpochAction = epoch => ({
  type: UPDATE_EPOCH,
  epoch
});

export const updateActivationFnNameAction = name => ({
  type: UPDATE_ACTIVATION_FN_NAME,
  name
});

export const startLearningAction = () => ({
  type: START_LEARNING
});

export const stopLearningAction = () => ({
  type: STOP_LEARNING
});

export const updateBiasAction = bias => ({
  type: UPDATE_BIAS,
  bias
});

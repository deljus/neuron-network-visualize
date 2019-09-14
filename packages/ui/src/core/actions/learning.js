// @flow
import {
  UPDATE_LEARNING_PROGRESS,
  UPDATE_EPOCH,
  UPDATE_SCHEMA,
  UPDATE_ACTIVATION_FN_NAME,
  STOP_LEARNING,
  START_LEARNING
} from '../constants/learning';
import type { Schema } from '../../types/data.types';

export const updateLearningProgressAction = (progress: boolean) => ({
  type: UPDATE_LEARNING_PROGRESS,
  progress
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

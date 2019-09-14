// @flow
import {
  SET_NOTIFICATION,
  CLEAR_ALL_NOTIFICATION,
  CLEAR_NOTIFICATION
} from '../constants/notifications';

export type SetNotificationAction = {
  +type: typeof SET_NOTIFICATION,
  id: string,
  message: string,
  options: {
    type: string,
    global: boolean
  }
};

export type ClearNotificationAction = {
  +type: typeof CLEAR_NOTIFICATION,
  id: string
};

export type ClearAllNotificationAction = {
  +type: typeof CLEAR_ALL_NOTIFICATION
};

type Options = {
  type: string,
  global: boolean
};

export const setNotificationAction = (
  id: string,
  message: string,
  options: Options = { type: 'error', global: true }
): SetNotificationAction => ({
  type: SET_NOTIFICATION,
  id,
  message,
  options
});

export const clearNotificationAction = (id: string): ClearNotificationAction => ({
  type: CLEAR_NOTIFICATION,
  id
});

export const clearAllNotificationAction = (): ClearAllNotificationAction => ({
  type: CLEAR_ALL_NOTIFICATION
});

// @flow
import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
  CLEAR_ALL_NOTIFICATION
} from '../constants/notifications';
import type {
  ClearAllNotificationAction,
  SetNotificationAction,
  ClearNotificationAction
} from '../actions/notifications';
import type { Notification } from '../../types/data.types';

type State = Array<?Notification>;
type Actions = ClearAllNotificationAction | SetNotificationAction | ClearNotificationAction;

const initState = [];

const notifications = (state: State = initState, action: Actions) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      // eslint-disable-next-line no-case-declarations
      const { id, message, options } = action;
      state.push({ id, message, ...options });
      return [...state];
    case CLEAR_NOTIFICATION:
      return state.filter(err => err.id !== action.id);
    case CLEAR_ALL_NOTIFICATION:
      return [];
    default:
      return state;
  }
};

export default notifications;

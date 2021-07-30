import { NOTIFICATION_COUNT } from "../actions";

export const updateNotificationCounter = (notification_count) => {
  return {
    type: NOTIFICATION_COUNT,
    payload: notification_count,
  };
};

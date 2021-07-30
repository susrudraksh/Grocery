import { NOTIFICATION_COUNT } from "../actions";

const INIT_STATE = {
  notification_count:0
};

export default (state = INIT_STATE, action) => {
    
  switch (action.type) {
    case NOTIFICATION_COUNT:
      return { ...state, notification_count: action.payload };
    default:
      return { ...state };
  }
};

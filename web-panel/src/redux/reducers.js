import { combineReducers } from "redux";
import menu from "./menu/reducer";
import authUser from "./auth/reducer";
import settings from "./settings/reducer";
import globalstate from "./globalstate/reducer";

const reducers = combineReducers({
  menu,
  authUser,
  settings,
  globalstate
});

export default reducers;

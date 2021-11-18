import { CombinedState, combineReducers } from "redux";

import { AuthReducer } from "./AuthRedux/AuthReducer";
import { UserReducer } from "./User/Reducer";

import { LOG_OUT } from "./AuthRedux/AuthTypes";
import { ReducerActionType } from "../Utils/types";

export const toPersistReducers = {
  AuthReducer,
  UserReducer,
};
const appReducer = combineReducers({
  ...toPersistReducers,
});

const rootReducer = (
  state: CombinedState<RootState>,
  action: ReducerActionType
): RootState => {
  return appReducer(
    action.type === LOG_OUT.SUCCESS ? undefined : state,
    action
  );
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;

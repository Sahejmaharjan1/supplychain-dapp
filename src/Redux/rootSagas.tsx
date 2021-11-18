import { all } from "redux-saga/effects";

import AuthRootSaga from "./AuthRedux/AuthSagas";
import UserRootSaga from "./User/Saga";

export default function* rootSagas(): Generator {
  yield all([AuthRootSaga(), UserRootSaga()]);
}

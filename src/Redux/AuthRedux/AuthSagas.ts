import { AxiosResponse } from "axios";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  StrictEffect,
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import {
  changePassword,
  completeNewPassword,
  forgotPassword,
  logOut,
  login,
  resetPassword,
  selfInfo,
} from "./AuthActions";
import {
  CHANGE_PASSWORD,
  COMPLETE_NEW_PASSWORD,
  FORGOT_PASSWORD,
  GET_SELF_INFO,
  LOGIN,
  LOG_OUT,
  RESET_PASSWORD,
  ResponseTypeSelfInfo,
} from "./AuthTypes";
import {
  changePasswordApi,
  completeNewPasswordApi,
  forgotPasswordApi,
  resetPasswordApi,
  selfInfoApi,
  signInApi,
  signOutApi,
} from "./AuthApi";

import { notifier } from "../../Utils/Notifiers/Notifier";
import { generateErrorMessage } from "../../Utils/utilFunctions";
import {
  ChangePasswordFieldType,
  CompleteNewPasswordFieldType,
  ErrorObject,
  ForgotPasswordFieldType,
  LoginFieldType,
  ReducerActionType,
  ResetPasswordFieldType,
} from "../../Utils/types";
import { AwsChangePasswordErrorCode, NotifierTitle } from "../../Utils/enums";

//LOGIN SAGA
function* tryLogin(params: ReducerActionType) {
  const { payload } = params;
  try {
    const res: AxiosResponse = yield call(signInApi, payload as LoginFieldType);
    if (!res) throw NotifierTitle.GENERIC;
    notifier.success(NotifierTitle.LOGIN);
    yield put(login.success(res));
  } catch (err) {
    yield put(login.failure(generateErrorMessage(NotifierTitle.LOGIN)));
    notifier.error(NotifierTitle.LOGIN, err.message);
  }
  return true;
}

function* watchTryLogin(): Generator {
  yield takeLatest(LOGIN.REQUEST, tryLogin);
}

//CHANGE PASSWORD SAGA
function* tryChangePassword(params: ReducerActionType) {
  const { payload } = params;
  try {
    const res: AxiosResponse = yield call(
      changePasswordApi,
      payload as ChangePasswordFieldType
    );
    if (!res) throw NotifierTitle.GENERIC;
    notifier.success(NotifierTitle.CHANGE_PASSWORD);
    yield put(changePassword.success(res));
  } catch (err) {
    yield put(
      changePassword.failure(
        generateErrorMessage(NotifierTitle.CHANGE_PASSWORD)
      )
    );
    notifier.error(
      NotifierTitle.CHANGE_PASSWORD,
      err.code === AwsChangePasswordErrorCode.NOT_AUTHORIZE
        ? "Invalid old password"
        : err.message
    );
  }
  return true;
}

function* watchTryChangePassword(): Generator {
  yield takeLatest(CHANGE_PASSWORD.REQUEST, tryChangePassword);
}

//COMPLETE NEW PASSWORD SAGA
function* tryCompleteNewPassword(params: ReducerActionType) {
  const { payload } = params;
  try {
    const res: AxiosResponse = yield call(
      completeNewPasswordApi,
      payload as CompleteNewPasswordFieldType
    );
    if (!res) throw NotifierTitle.GENERIC;
    notifier.success(NotifierTitle.CHANGE_PASSWORD);
    yield put(completeNewPassword.success(res));
  } catch (err) {
    yield put(
      completeNewPassword.failure(
        generateErrorMessage(NotifierTitle.CHANGE_PASSWORD)
      )
    );
    notifier.error(NotifierTitle.CHANGE_PASSWORD, err.message);
  }
  return true;
}

function* watchTryCompleteNewPassword(): Generator {
  yield takeLatest(COMPLETE_NEW_PASSWORD.REQUEST, tryCompleteNewPassword);
}

//FORGOT PASSWORD SAGA
function* tryForgotPassword(params: ReducerActionType) {
  const { payload } = params;
  try {
    const res: AxiosResponse = yield call(
      forgotPasswordApi,
      payload as ForgotPasswordFieldType
    );
    if (!res) throw NotifierTitle.GENERIC;
    notifier.success(NotifierTitle.SEND_EMAIL);
    yield put(forgotPassword.success(res));
  } catch (err) {
    yield put(
      forgotPassword.failure(generateErrorMessage(NotifierTitle.SEND_EMAIL))
    );
    notifier.error(NotifierTitle.SEND_EMAIL, err.message);
  }
  return true;
}

function* watchTryForgotPassword(): Generator {
  yield takeLatest(FORGOT_PASSWORD.REQUEST, tryForgotPassword);
}

//RESET PASSWORD SAGA
function* tryResetPassword(params: ReducerActionType) {
  const { payload } = params;
  try {
    const res: AxiosResponse = yield call(
      resetPasswordApi,
      payload as ResetPasswordFieldType
    );
    notifier.success(NotifierTitle.RESET_PASSWORD);
    yield put(resetPassword.success(res));
  } catch (err) {
    yield put(
      resetPassword.failure(generateErrorMessage(NotifierTitle.RESET_PASSWORD))
    );
    notifier.error(NotifierTitle.RESET_PASSWORD, err.message);
  }
  return true;
}

function* watchTryResetPassword(): Generator {
  yield takeLatest(RESET_PASSWORD.REQUEST, tryResetPassword);
}

//RESET PASSWORD SAGA
function* tryLogOut() {
  try {
    const res: AxiosResponse = yield call(signOutApi);
    localStorage.clear();
    notifier.success(NotifierTitle.LOG_OUT);
    yield put(logOut.success(res));
  } catch (err) {
    yield put(logOut.failure(generateErrorMessage(NotifierTitle.LOG_OUT)));
  }
  return true;
}

function* watchTryLogOut(): Generator {
  yield takeLatest(LOG_OUT.REQUEST, tryLogOut);
}

//USER INFORMATION SAGA
function* handleUserInformationRequest() {
  try {
    const res: GraphQLResult<ResponseTypeSelfInfo> = yield call(() =>
      selfInfoApi()
    );
    if (!res.data?.selfInfo.result)
      throw { message: res.data?.selfInfo.msg } as ErrorObject;
    yield put(selfInfo.success(res.data));
  } catch (err) {
    yield put(
      selfInfo.failure(
        generateErrorMessage(NotifierTitle.USER_INFORMATION, err.message || "")
      )
    );
    notifier.error(NotifierTitle.USER_INFORMATION, err.message);
  }
}

function* watchUserInformation(): Generator {
  yield takeEvery(GET_SELF_INFO.REQUEST, handleUserInformationRequest);
}

//EXPORT ALL SAGA
export default function* AuthSagas(): Generator<StrictEffect, void> {
  yield all([
    fork(watchTryChangePassword),
    fork(watchTryCompleteNewPassword),
    fork(watchTryForgotPassword),
    fork(watchTryLogin),
    fork(watchTryResetPassword),
    fork(watchTryLogOut),
    fork(watchUserInformation),
  ]);
}

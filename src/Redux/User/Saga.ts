import { GraphQLResult } from '@aws-amplify/api-graphql'
import { StrictEffect, all, call, fork, put, takeEvery } from 'redux-saga/effects'

import {
  ACTION,
  FieldTypeUserCreate,
  FieldTypeUserDelete, FieldTypeUserList,
  FieldTypeUserStatusToggle,
  FieldTypeUserUpdate,
  ResponseTypeUserCreate,
  ResponseTypeUserDelete,
  ResponseTypeUserList,
  ResponseTypeUserStatusToggle,
  ResponseTypeUserUpdate
} from './Types'

import { userAction } from './Action'
import userApis from './Api'

import { ErrorObject, ReducerActionType } from '../../Utils/types'
import { generateErrorMessage } from '../../Utils/utilFunctions'
import { NotifierTitle } from '../../Utils/enums'
import { notifier } from '../../Utils/Notifiers/Notifier'

//USER LIST SAGA
function* handleUserListRequest(payload: ReducerActionType<FieldTypeUserList>) {
  try {
    const res: GraphQLResult<ResponseTypeUserList> = yield call(() => userApis.list(payload.payload as FieldTypeUserList))
    if (!res.data?.users.result) throw { message: res.data?.users.msg } as ErrorObject
    yield put(userAction.list.success(res.data))
  } catch (err) {
    yield put(userAction.list.failure(generateErrorMessage(NotifierTitle.USER_LIST, err.message || '')))
    notifier.error(NotifierTitle.USER_LIST, err.message)
  }
}

function* watchUserList(): Generator {
  yield takeEvery(ACTION.USER_LIST.REQUEST, handleUserListRequest)
}

//USER ADD SAGA
function* handleUserCreateRequest(payload: ReducerActionType<FieldTypeUserCreate>) {
  try {
    const res: GraphQLResult<ResponseTypeUserCreate> = yield call(() => userApis.create(payload.payload as FieldTypeUserCreate))
    if (!res?.data?.createUser?.result) throw { message: res.data?.createUser.msg } as ErrorObject
    notifier.success(NotifierTitle.USER_ADD)
    yield put(userAction.create.success(res.data))
  } catch (err) {
    yield put(userAction.create.failure(generateErrorMessage(NotifierTitle.USER_ADD, err.message || '')))
    notifier.error(NotifierTitle.USER_ADD, err.message)
  }
}

function* watchUserCreate(): Generator {
  yield takeEvery(ACTION.USER_CREATE.REQUEST, handleUserCreateRequest)
}

//USER UPDATE SAGA
function* handleUserUpdateRequest(payload: ReducerActionType<FieldTypeUserUpdate>) {
  try {
    const res: GraphQLResult<ResponseTypeUserUpdate> = yield call(() => userApis.update(payload.payload as FieldTypeUserUpdate))
    if (!res?.data?.updateUser?.result) throw { message: res.data?.updateUser.msg } as ErrorObject
    notifier.success(NotifierTitle.USER_UPDATE)
    yield put(userAction.update.success(res.data))
  } catch (err) {
    yield put(userAction.update.failure(generateErrorMessage(NotifierTitle.USER_UPDATE, err.message || '')))
    notifier.error(NotifierTitle.USER_UPDATE, err.message)
  }
}

function* watchUserUpdate(): Generator {
  yield takeEvery(ACTION.USER_UPDATE.REQUEST, handleUserUpdateRequest)
}

//TOGGLE STATUS USER
function* handleChangeUserStatusRequest(payload: ReducerActionType<FieldTypeUserStatusToggle>) {
  try {
    const res: GraphQLResult<ResponseTypeUserStatusToggle> = yield call(() => userApis.status(payload.payload as FieldTypeUserStatusToggle))
    if (!res.data?.userEnableDisable?.result) throw { message: res.data?.userEnableDisable.msg } as ErrorObject
    const { enabled } = res.data.userEnableDisable.user
    notifier.success(enabled ? NotifierTitle.USER_ENABLE : NotifierTitle.USER_DISABLE)
    yield put(userAction.statusToggle.success(res.data))
  } catch (err) {
    yield put(userAction.statusToggle.failure(generateErrorMessage(NotifierTitle.USER_UPDATE, err.message || '')))
    notifier.error(NotifierTitle.USER_UPDATE, err.message)
  }
}

function* watchChangeUserStatus(): Generator {
  yield takeEvery(ACTION.USER_STATUS_TOGGLE.REQUEST, handleChangeUserStatusRequest)
}

//USER DELETE SAGA
function* handleUserDeleteRequest(payload: ReducerActionType<FieldTypeUserDelete>) {
  try {
    const res: GraphQLResult<ResponseTypeUserDelete> = yield call(() => userApis.remove(payload.payload as FieldTypeUserDelete))
    if (!res?.data?.deleteUser?.result) throw { message: res.data?.deleteUser.msg } as ErrorObject
    notifier.success(NotifierTitle.USER_DELETE)
    yield put(userAction.remove.success(res.data))
  } catch (err) {
    yield put(userAction.remove.failure(generateErrorMessage(NotifierTitle.USER_DELETE, err.message || '')))
    notifier.error(NotifierTitle.USER_DELETE, err.message)
  }
}

function* watchUserDelete(): Generator {
  yield takeEvery(ACTION.USER_DELETE.REQUEST, handleUserDeleteRequest)
}


export default function* rootSagaUser(): Generator<StrictEffect, void> {
  yield all([
    fork(watchUserCreate),
    fork(watchUserDelete),
    fork(watchUserList),
    fork(watchUserUpdate),
    fork(watchChangeUserStatus)
  ]) }

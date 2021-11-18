import { ErrorObject, ReducerActionType } from '../../Utils/types'
import {
  ACTION,
  FieldTypeUserCreate,
  FieldTypeUserDelete,
  FieldTypeUserList,
  FieldTypeUserStatusToggle,
  FieldTypeUserUpdate,
  ResponseTypeUserCreate,
  ResponseTypeUserDelete,
  ResponseTypeUserList,
  ResponseTypeUserStatusToggle,
  ResponseTypeUserUpdate
} from './Types'

const list = {
  request : (payload: FieldTypeUserList): ReducerActionType<FieldTypeUserList> => ({
    type: ACTION.USER_LIST.REQUEST,
    payload
  }),
  success : (response: ResponseTypeUserList): ReducerActionType<unknown, ResponseTypeUserList> => ({
    type: ACTION.USER_LIST.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.USER_LIST.FAILURE,
    error
  })
}

const create = {
  request : (payload: FieldTypeUserCreate): ReducerActionType<FieldTypeUserCreate> => ({
    type: ACTION.USER_CREATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeUserCreate): ReducerActionType<unknown, ResponseTypeUserCreate> => ({
    type: ACTION.USER_CREATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.USER_CREATE.FAILURE,
    error
  })
}

const update = {
  request : (payload: FieldTypeUserUpdate): ReducerActionType<FieldTypeUserUpdate> => ({
    type: ACTION.USER_UPDATE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeUserUpdate): ReducerActionType<unknown, ResponseTypeUserUpdate> => ({
    type: ACTION.USER_UPDATE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.USER_UPDATE.FAILURE,
    error
  })
}

const statusToggle = {
  request : (payload: FieldTypeUserStatusToggle): ReducerActionType<FieldTypeUserStatusToggle> => ({
    type: ACTION.USER_STATUS_TOGGLE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeUserStatusToggle): ReducerActionType<unknown, ResponseTypeUserStatusToggle> => ({
    type: ACTION.USER_STATUS_TOGGLE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.USER_STATUS_TOGGLE.FAILURE,
    error
  })
}

const remove = {
  request : (payload: FieldTypeUserDelete): ReducerActionType<FieldTypeUserDelete> => ({
    type: ACTION.USER_DELETE.REQUEST,
    payload
  }),
  success : (response: ResponseTypeUserDelete): ReducerActionType<unknown, ResponseTypeUserDelete> => ({
    type: ACTION.USER_DELETE.SUCCESS,
    response
  }),
  failure : (error: ErrorObject): ReducerActionType => ({
    type: ACTION.USER_DELETE.FAILURE,
    error
  })
}

export const userAction = { list, create, update, remove, statusToggle }

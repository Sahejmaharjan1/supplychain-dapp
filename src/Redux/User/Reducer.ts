import {
  ACTION,
  FieldTypeUserMain,
  ReducerUserType,
  ResponseTypeUserCreate,
  ResponseTypeUserDelete,
  ResponseTypeUserList,
  ResponseTypeUserStatusToggle,
  ResponseTypeUserUpdate
} from './Types'
import { Reducer } from 'redux'
import { ErrorObject, ReducerActionType } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'

const initialOperationStatus = {
  create: null,
  delete: null,
  list: null,
  statusToggle: null,
  update: null
}

const initialErrorMessageState = {
  error: null,
  message: ''
}

const initialReducerStateUser: ReducerUserType = {
  ...initialErrorMessageState,
  operationStatus: initialOperationStatus ,
  userData: null,
  userLastFetchedTime: 0
}

export const UserReducer:Reducer<ReducerUserType,
    ReducerActionType<
        FieldTypeUserMain,
        ResponseTypeUserList | ResponseTypeUserCreate | ResponseTypeUserUpdate | ResponseTypeUserStatusToggle | ResponseTypeUserDelete
        >
    > = (state = initialReducerStateUser, action): ReducerUserType => {
      switch (action.type) {
      // LIST PORTAL
      case ACTION.USER_LIST.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, list: OperationStatus.IN_PROGRESS } })
      case ACTION.USER_LIST.SUCCESS: {
        return {
          ...state,
          error: null,
          userData: (action?.response as ResponseTypeUserList).users.users as FieldTypeUserMain[],
          operationStatus: { ...state.operationStatus, list: OperationStatus.SUCCEEDED },
          userLastFetchedTime: Date.now(),
        }
      }
      case ACTION.USER_LIST.FAILURE: return ({ ...state, error: action.error as ErrorObject, operationStatus: { ...state.operationStatus, list: OperationStatus.FAILED } })

        // CREATE PORTAL
      case ACTION.USER_CREATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, create: OperationStatus.IN_PROGRESS } })
      case ACTION.USER_CREATE.SUCCESS: {
        const newUser = (action?.response as ResponseTypeUserCreate).createUser?.user as FieldTypeUserMain
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeUserCreate)?.createUser?.msg,
          userData: newUser ? [...state.userData as FieldTypeUserMain[], newUser] : [...state.userData as FieldTypeUserMain[]],
          operationStatus: { ...initialOperationStatus, create: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.USER_CREATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, create: OperationStatus.FAILED } })

        // UPDATE PORTAL
      case ACTION.USER_UPDATE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, update: OperationStatus.IN_PROGRESS } })
      case ACTION.USER_UPDATE.SUCCESS: {
        const updatedUser: FieldTypeUserMain = (action?.response as ResponseTypeUserUpdate)?.updateUser?.user
        const orgIndex: number = state.userData?.findIndex(od => od?.id === updatedUser?.id) as number
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeUserUpdate)?.updateUser?.msg,
          userData: state.userData?.map((od, i) => i === orgIndex ? updatedUser : od) as FieldTypeUserMain[],
          operationStatus: { ...initialOperationStatus, update: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.USER_UPDATE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, update: OperationStatus.FAILED } })

        // STATUS TOGGLE PORTAL
      case ACTION.USER_STATUS_TOGGLE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, statusToggle: OperationStatus.IN_PROGRESS } })
      case ACTION.USER_STATUS_TOGGLE.SUCCESS: {
        const updatedUser: FieldTypeUserMain = (action?.response as ResponseTypeUserStatusToggle)?.userEnableDisable?.user
        const orgIndex: number = state.userData?.findIndex(od => od?.id === updatedUser?.id) as number
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeUserStatusToggle)?.userEnableDisable?.msg,
          userData: state.userData?.map((od, i) => i === orgIndex ? updatedUser : od) as FieldTypeUserMain[],
          operationStatus: { ...initialOperationStatus, statusToggle: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.USER_STATUS_TOGGLE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, statusToggle: OperationStatus.FAILED } })

        // DELETE PORTAL
      case ACTION.USER_DELETE.REQUEST: return ({ ...state, ...initialErrorMessageState, operationStatus: { ...initialOperationStatus, delete: OperationStatus.IN_PROGRESS } })
      case ACTION.USER_DELETE.SUCCESS: {
        return {
          ...state,
          error: null,
          message: (action?.response as ResponseTypeUserDelete)?.deleteUser?.msg,
          operationStatus: { ...initialOperationStatus, delete: OperationStatus.SUCCEEDED }
        }
      }
      case ACTION.USER_DELETE.FAILURE:  return ({ ...state, error: action.error as ErrorObject, message: '', operationStatus: { ...initialOperationStatus, delete: OperationStatus.FAILED } })
      default:
        return state
      }
    }

import { CommonReducerState, GraphQLDataResponse, Nullable } from '../../Utils/types'
import { OperationStatus } from '../../Utils/enums'

interface FieldTypeUserCommon {
    gender: string,
    name: string,
    phoneNumber: string,
    portalsId: string[],
    role: string,
}

interface FieldTypeUserCreate extends FieldTypeUserCommon{
    email: string,
    organizationId?: string,
}

interface FieldTypeUserUpdate extends FieldTypeUserCommon{
    userId: string,
}

interface FieldTypeUserMain extends FieldTypeUserCommon {
    id: string,
    enabled: boolean,
    email: string,
    organization : {
        id: string,
        name: string,
    },
    portals : {
        id: string,
        name: string,
    }[]
}

interface FieldTypeUserStatusToggle {
    userId: string,
    enabled: boolean
}

interface FieldTypeUserDelete {
    userId: string
}

interface FieldTypeUserList {
    role: string
}

interface ReducerUserType extends CommonReducerState {
    userData: Nullable<FieldTypeUserMain[]>,
    operationStatus: {
        create: Nullable<OperationStatus>,
        delete: Nullable<OperationStatus>,
        list: Nullable<OperationStatus>,
        statusToggle: Nullable<OperationStatus>,
        update: Nullable<OperationStatus>,
    },
    userLastFetchedTime: number
}

interface ResponseTypeUserCreate { createUser: GraphQLDataResponse & { user: FieldTypeUserMain } }
interface ResponseTypeUserDelete { deleteUser: GraphQLDataResponse }
interface ResponseTypeUserList { users: GraphQLDataResponse & { users: FieldTypeUserMain[] } }
interface ResponseTypeUserStatusToggle { userEnableDisable: GraphQLDataResponse & { user: FieldTypeUserMain } }
interface ResponseTypeUserUpdate { updateUser: GraphQLDataResponse & { user: FieldTypeUserMain } }


const USER_CREATE = {
  REQUEST: 'USER_CREATE_REQUEST',
  SUCCESS: 'USER_CREATE_SUCCESS',
  FAILURE: 'USER_CREATE_FAILURE',
}

const USER_DELETE = {
  REQUEST: 'USER_DELETE_REQUEST',
  SUCCESS: 'USER_DELETE_SUCCESS',
  FAILURE: 'USER_DELETE_FAILURE',
}

const USER_LIST = {
  REQUEST: 'USER_LIST_REQUEST',
  SUCCESS: 'USER_LIST_SUCCESS',
  FAILURE: 'USER_LIST_FAILURE',
}

const USER_STATUS_TOGGLE = {
  REQUEST: 'USER_STATUS_TOGGLE_REQUEST',
  SUCCESS: 'USER_STATUS_TOGGLE_SUCCESS',
  FAILURE: 'USER_STATUS_TOGGLE_FAILURE',
}

const USER_UPDATE = {
  REQUEST: 'USER_UPDATE_REQUEST',
  SUCCESS: 'USER_UPDATE_SUCCESS',
  FAILURE: 'USER_UPDATE_FAILURE',
}

export type {
  FieldTypeUserCreate,
  FieldTypeUserDelete,
  FieldTypeUserList,
  FieldTypeUserMain,
  FieldTypeUserStatusToggle,
  FieldTypeUserUpdate,
  ReducerUserType,
  ResponseTypeUserCreate,
  ResponseTypeUserDelete,
  ResponseTypeUserList,
  ResponseTypeUserStatusToggle,
  ResponseTypeUserUpdate,
}

export const ACTION = { USER_CREATE, USER_DELETE, USER_LIST, USER_STATUS_TOGGLE, USER_UPDATE }

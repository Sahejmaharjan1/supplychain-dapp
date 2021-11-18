import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API, graphqlOperation } from 'aws-amplify'
import * as Types from './Types'
import {
  gqlMutationUserCreate,
  gqlMutationUserDelete,
  gqlMutationUserToggleStatus,
  gqlMutationUserUpdate,
  gqlQueryUserList
} from './GraphQL'

const list = async (payload: Types.FieldTypeUserList): Promise<GraphQLResult<Types.ResponseTypeUserList>> =>
      API.graphql(graphqlOperation(gqlQueryUserList, payload)) as Promise<GraphQLResult<Types.ResponseTypeUserList>>

const create = async (payload: Types.FieldTypeUserCreate): Promise<GraphQLResult<Types.ResponseTypeUserCreate>> =>
        API.graphql(graphqlOperation(gqlMutationUserCreate, payload)) as Promise<GraphQLResult<Types.ResponseTypeUserCreate>>

const remove = async (payload: Types.FieldTypeUserDelete): Promise<GraphQLResult<Types.ResponseTypeUserDelete>> =>
    API.graphql(graphqlOperation(gqlMutationUserDelete, payload)) as Promise<GraphQLResult<Types.ResponseTypeUserDelete>>

const status = async (payload: Types.FieldTypeUserStatusToggle): Promise<GraphQLResult<Types.ResponseTypeUserStatusToggle>> =>
      API.graphql(graphqlOperation(gqlMutationUserToggleStatus, payload)) as Promise<GraphQLResult<Types.ResponseTypeUserStatusToggle>>

const update = async (payload: Types.FieldTypeUserUpdate): Promise<GraphQLResult<Types.ResponseTypeUserUpdate>> =>
    API.graphql(graphqlOperation(gqlMutationUserUpdate, payload)) as Promise<GraphQLResult<Types.ResponseTypeUserUpdate>>

export default { create, remove, list, status, update }

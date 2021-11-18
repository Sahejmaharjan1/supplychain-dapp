const gqlMutationUserCreate = /* GraphQL */`
mutation createUser( $email: String!, $gender: String!, $name: String!, $organizationId: String, $phoneNumber: String, $portalsId: [String]!, $role: String! ){
  createUser( 
    email: $email
    gender: $gender
    name: $name
    organizationId: $organizationId
    phoneNumber: $phoneNumber
    portalsId: $portalsId
    role: $role
  ) {
    result
    msg
    statusCode
    user {
      email
      enabled
      gender
      id
      name
      organization {
        id
        name
      }
      phoneNumber
      portals {
        id
        name
      }
      role
    }
  }
}`

const gqlMutationUserUpdate = /* GraphQL */`
mutation updateUser( $gender: String,$name: String,$phoneNumber: String,$portalsId: [String],$role: String,$userId: String! ){
  updateUser(
    gender: $gender
    name: $name
    phoneNumber: $phoneNumber
    portalsId: $portalsId
    role: $role
    userId: $userId
    ) {
    result
    msg
    statusCode
    user {
      email
      enabled
      gender
      id
      name
      organization {
        id
        name
      }
      phoneNumber
      portals {
        id
        name
      }
      role
    }
  }
}`

const gqlMutationUserToggleStatus = /* GraphQL */`
mutation userEnableDisable( $userId: String!, $enabled: Boolean! ){
    userEnableDisable (
        userId: $userId
        enabled: $enabled
    ) {
    result
    msg
    statusCode
    user {
      email
      enabled
      gender
      id
      name
      organization {
        id
        name
      }
      phoneNumber
      portals {
        id
        name
      }
      role
    }
  }
}`

const gqlMutationUserDelete = /* GraphQL */`
mutation deleteUser ( $userId: String! ){
  deleteUser(
    userId: $userId
  ) {
      result
      msg
      statusCode
  }
}`

export {
  gqlMutationUserCreate,
  gqlMutationUserDelete,
  gqlMutationUserToggleStatus,
  gqlMutationUserUpdate,
}

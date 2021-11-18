const gqlQueryUserList = /* GraphQL */ `
query usersQuery( $role: String ){
  users(
    role: $role
  ) {
    result
    msg
    statusCode
    users {
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

export { gqlQueryUserList }

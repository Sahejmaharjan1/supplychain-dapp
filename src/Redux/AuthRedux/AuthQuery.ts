const gqlQuerySelfInfo = /* GraphQL */ `
  query {
    selfInfo {
      result
      msg
      user {
        id
        name
        email
        role
        organization {
          name
        }
      }
    }
  }
`;

export { gqlQuerySelfInfo };

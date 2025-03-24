/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRSVP = /* GraphQL */ `
  query GetRSVP($id: ID!) {
    getRSVP(id: $id) {
      id
      firstName
      lastName
      email
      attending
      bringingGuest
      guestFirstName
      guestLastName
      foodRestrictions
      group
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRSVPS = /* GraphQL */ `
  query ListRSVPS(
    $filter: ModelRSVPFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRSVPS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        attending
        bringingGuest
        guestFirstName
        guestLastName
        foodRestrictions
        group
        timestamp
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

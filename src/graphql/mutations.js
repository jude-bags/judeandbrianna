/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateRSVP = /* GraphQL */ `
  mutation UpdateRSVP(
    $input: UpdateRSVPInput!
    $condition: ModelRSVPConditionInput
  ) {
    updateRSVP(input: $input, condition: $condition) {
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
      needsHotelRoom
      numberOfRooms
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRSVP = /* GraphQL */ `
  mutation DeleteRSVP(
    $input: DeleteRSVPInput!
    $condition: ModelRSVPConditionInput
  ) {
    deleteRSVP(input: $input, condition: $condition) {
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
      needsHotelRoom
      numberOfRooms
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRSVP = /* GraphQL */ `
  mutation CreateRSVP(
    $input: CreateRSVPInput!
    $condition: ModelRSVPConditionInput
  ) {
    createRSVP(input: $input, condition: $condition) {
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
      needsHotelRoom
      numberOfRooms
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;

import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        firstName
        lastName
        fullName
        email
        isDriving
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;

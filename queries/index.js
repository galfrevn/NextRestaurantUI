import { gql } from "@apollo/client";

export const MENU = gql`
  query {
    foods {
      name
      description
      price
      type
      slug
      image
      stars
      stimatedTime
    }
  }
`;

export const MENU_BY_TYPE = (category) => gql`
  query {
    findFoodByType(type: "${category}") {
      name
      description
      price
      type
      slug
      image
      stars
      stimatedTime
    }
  }
`;

export const PATHS = gql`
  query {
    foods {
      name
    }
  }
`;

export const FIND_BY_TYPE = gql`
  query ($type: FoodType!) {
    findFoodByType(type: $type) {
      name
      description
      price
      type
    }
  }
`;

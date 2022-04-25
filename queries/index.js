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

export const FOOD_BY_SLUG = (slug) => gql`
  query {
    findFood(slug: "${slug}") {
      name
      price
      type
      description
      stars
      image
      stimatedTime
    }
  }
`;

export const FOODS_BY_SLUG = gql`
  query FoodsBySlug($slug: [String]) {
    foodsBySlug(slug: $slug) {
      name
      type
      price
      description
      slug
      stimatedTime
      image
      stars
    }
  }
`;

export const TYPES = gql`
  query {
    getTypes
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

export const DELETE_DISH = gql`
  mutation ($id: String!) {
    deleteFood(slug: $id) {
      name
      price
      description
    }
  }
`;

export const CREATE_DISH = gql`
  mutation AddFood(
    $name: String!
    $price: Int!
    $description: String!
    $type: String
    $stimatedTime: Int
    $image: String
    $stars: Float
  ) {
    addFood(
      name: $name
      price: $price
      description: $description
      type: $type
      stimatedTime: $stimatedTime
      image: $image
      stars: $stars
    ) {
      name
      price
      type
      description
      slug
      stimatedTime
      image
      stars
    }
  }
`;

export const SEARCH_FOODS = gql`
  query Query($search: String) {
    searchFoods(search: $search) {
      name
      type
      price
      description
      slug
      stimatedTime
      image
      stars
    }
  }
`;
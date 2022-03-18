import { gql } from "@apollo/client";

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      last_name
      user_name
      email
    }
  }
`;

export const USERS = gql`
  query Users($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      prev
      next
      data {
        id
        user_name
      }
    }
  }
`;

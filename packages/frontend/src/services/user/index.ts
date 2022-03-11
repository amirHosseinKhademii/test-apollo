import { gql } from '@apollo/client'

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      last_name
      user_name
    }
  }
`

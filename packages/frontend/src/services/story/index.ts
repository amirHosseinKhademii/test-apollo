import { gql } from "@apollo/client";

export const USER_STORIES = gql`
  query getUserStories($page: Int, $title: String, $todoId: ID!) {
    userStories(page: $page, title: $title, todoId: $todoId) {
      prev
      next
      data {
        id
        title
      }
    }
  }
`;

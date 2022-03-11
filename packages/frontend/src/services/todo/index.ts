import { gql } from '@apollo/client'

export const TODOS = gql`
  query getTodos($page: Int, $title: String) {
    todos(page: $page, title: $title) {
      prev
      next
      data {
        id
        created_at
        updated_at
        title
        completed
        created_at
        updated_at
        date
        description
        user {
          first_name
          last_name
          user_name
          email
          id
        }
      }
    }
  }
`

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

export const ADD_TODO = gql`
  mutation add($title: String!) {
    addTodo(date: "2022-01-29", title: $title) {
      id
    }
  }
`
export const COMPLETE_TODO = gql`
  mutation com($id: ID!, $completed: Boolean!) {
    completeTodo(id: $id, completed: $completed) {
      id
    }
  }
`

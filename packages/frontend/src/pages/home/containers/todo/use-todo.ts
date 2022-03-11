import { useMutation } from '@apollo/client'
import { client } from 'graphql/client'
import { ChangeEvent, useCallback } from 'react'
import { COMPLETE_TODO, DELETE_TODO, TODOS } from 'services/todo'

export const useTodo = () => {
  const [deleteTodo] = useMutation(DELETE_TODO, {
    update: (
      _,
      {
        data: {
          deleteTodo: { id },
        },
      }
    ) => {
      const { todos } = client.readQuery({
        query: TODOS,
      })
      client.writeQuery({
        query: TODOS,
        data: {
          todos: {
            ...todos,
            data: todos?.data?.filter((todo: TTodo) => todo.id !== id) ?? [],
          },
        },
      })
    },
    refetchQueries: [{ query: TODOS }],
  })

  const [completeTodo] = useMutation(COMPLETE_TODO, {
    update: (
      _,
      {
        data: {
          completeTodo: { id, completed },
        },
      }
    ) => {
      const { todos } = client.readQuery({
        query: TODOS,
      })
      client.writeQuery({
        query: TODOS,
        data: {
          todos: {
            ...todos,
            data:
              todos?.data?.map((todo: TTodo) =>
                todo.id === id ? { ...todo, completed } : todo
              ) ?? [],
          },
        },
      })
    },
    refetchQueries: [{ query: TODOS }],
  })

  return {
    onDelete: useCallback(
      (id: TTodo['id']) => () =>
        deleteTodo({
          variables: { id },
          optimisticResponse: {
            deleteTodo: {
              id,
            },
          },
        }),
      []
    ),
    onComplete: useCallback(
      (id: TTodo['id']) => (e: ChangeEvent<HTMLInputElement>) =>
        completeTodo({
          variables: { id, completed: e.target.checked },
          optimisticResponse: {
            completeTodo: {
              id,
              completed: e.target.checked,
            },
          },
        }),
      []
    ),
  }
}

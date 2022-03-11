import { useMutation } from '@apollo/client'
import { client } from 'graphql/client'
import { useCallback, useRef } from 'react'
import { ADD_TODO, TODOS } from 'services/todo'

export const useCreateTodo = () => {
  const ref = useRef(null) as any

  const [addTodo] = useMutation(ADD_TODO, {
    update: (_, { data: { addTodo } }) => {
      ref?.current?.reset()
      const { todos } = client.readQuery({
        query: TODOS,
      })
      const newTodo = {
        __typename: 'Todo',
        title: addTodo.title,
        id: 'test',
        created_at: new Date(),
        updated_at: new Date(),
        completed: false,
        date: '2020-01-01',
        description: '',
        user: {
          first_name: 'amir',
          last_name: 'khan',
          user_name: 'amir',
          email: '',
          id: 'test',
        },
      }
      client.writeQuery({
        query: TODOS,
        data: {
          todos: { ...todos, data: [...todos?.data, newTodo] },
        },
      })
    },
    refetchQueries: [{ query: TODOS }],
  })

  return {
    ref,
    onSubmit: useCallback(
      (state: { title: string }) =>
        addTodo({
          variables: { title: state.title },
          optimisticResponse: {
            addTodo: {
              __typename: 'Todo',
              title: state.title,
            },
          },
        }),
      []
    ),
  }
}

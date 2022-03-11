import { useQuery } from '@apollo/client'
import { ChangeEvent, useCallback } from 'react'
import { TODOS } from 'services/todo'

export const useList = () => {
  const { data, error, fetchMore, networkStatus, refetch } = useQuery(TODOS, {
    notifyOnNetworkStatusChange: true,
  })

  return {
    data,
    networkStatus,
    error,
    onSearch: useCallback(
      (e: ChangeEvent<HTMLInputElement>) =>
        refetch({ page: 0, title: e.target.value }),
      []
    ),
    fetchMore: useCallback(
      () =>
        fetchMore({
          variables: { page: data?.todos?.next },
          updateQuery: (prev: any, { fetchMoreResult }: any) => {
            if (!fetchMoreResult) return prev
            return {
              ...fetchMoreResult,
              todos: {
                ...fetchMoreResult?.todos,
                data: [...prev?.todos?.data, ...fetchMoreResult?.todos?.data],
              },
            }
          },
        }),
      [data?.todos?.next]
    ),
  }
}

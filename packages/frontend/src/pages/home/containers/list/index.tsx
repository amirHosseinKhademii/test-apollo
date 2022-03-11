import { Todo } from '../todo'
import { useList } from './use-list'

export const TodoList = () => {
  const { data, networkStatus, error, fetchMore, onSearch } = useList()

  if (networkStatus === 1 && data === undefined) return <div>loading</div>
  else if (error) return <div>error</div>
  return (
    <div
      className={`flex flex-col space-y-4 pb-32 ${
        (networkStatus === 1 || networkStatus === 2) &&
        'animate-pulse opacity-60'
      }`}
    >
      <input
        type="text"
        className="w-full h-12"
        placeholder="Search here"
        onChange={onSearch}
      />
      {data?.todos?.data.map((todo: TTodo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      {data?.todos?.next && (
        <button
          className="h-12 rounded bg-green-300 text-white text-sm"
          disabled={networkStatus === 3}
          onClick={fetchMore}
        >
          {networkStatus === 3 ? 'Loading' : 'Load More'}
        </button>
      )}
    </div>
  )
}

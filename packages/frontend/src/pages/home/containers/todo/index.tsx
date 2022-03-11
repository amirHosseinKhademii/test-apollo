import { ICDelete } from 'icons/delete'
import { useTodo } from './use-todo'

export const Todo = ({ todo }: { todo: TTodo }) => {
  const { onDelete, onComplete } = useTodo()
  return (
    <div className="flex flex-col py-3 rounded bg-cyan-100 px-4 h-20 space-y-2">
      <div key={todo.id} className=" w-full flex items-center justify-between">
        <span className=" text-gray-800">{todo.title}</span>
        <ICDelete
          className="w-4 h-4 text-red-500 cursor-pointer"
          onClick={onDelete(todo.id)}
        />
      </div>
      <div className=" w-full flex items-center justify-start space-x-2">
        <span className="text-sm text-gray-400 ">Completed</span>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onComplete(todo.id)}
        />
      </div>
    </div>
  )
}

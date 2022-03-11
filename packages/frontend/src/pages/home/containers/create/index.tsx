import { Form } from 'components/form'
import { Input } from 'components/input'
import { useCreateTodo } from './use-create'

export const CreateTodo = () => {
  const { ref, onSubmit } = useCreateTodo()
  return (
    <Form
      ref={ref}
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 items-center mb-6"
    >
      <Input name="title" label="Title" required />
      <button type="submit">Create todo</button>
    </Form>
  )
}

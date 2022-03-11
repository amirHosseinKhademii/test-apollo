import {
  ChangeEvent,
  ComponentProps,
  ElementType,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { classNames } from 'utils'

export const useForm = <T extends {}>(initialState: T) => {
  const [form, setForm] = useState(initialState as T)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  return { form, onChange }
}

const initialState = { name: '', age: 0 }

export const Form = () => {
  const { onChange, form } = useForm<typeof initialState>(initialState)

  return (
    <form>
      <input name="name" onChange={onChange} />
      <input name="age" onChange={onChange} type="number" />
    </form>
  )
}

export const useFetch = <T extends any>() => {
  const [data, setData] = useState(undefined as T)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)

  const fetchData = async () =>
    await fetch('https://api.github.com/users/octocat').then((res) =>
      res.json()
    )

  useEffect(() => {
    const controller = new AbortController()
    fetchData()
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => setError(err))

    return () => controller?.abort()
  }, [])

  return {
    data,
    loading,
    error,
  }
}

export const Fetch = () => {
  const { data, loading, error } = useFetch<{ name: string; id: number }[]>()
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </div>
      )}
    </div>
  )
}

type TFormHandler<T> = {
  [P in keyof T as `on${Capitalize<string & P>}Change`]: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

export const useFormHandler = <T extends {}>(initialState: T) => {
  const [form, setForm] = useState(initialState as T)

  const handlers = {} as TFormHandler<T>

  Object.keys(form).forEach((key) => {
    handlers[
      `on${key.substring(0, 1).toUpperCase()}${key.substring(1)}Change`
    ] = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  })

  return { form, ...handlers }
}

export const FormHandler = () => {
  const { onNameChange, onAgeChange } =
    useFormHandler<typeof initialState>(initialState)

  return (
    <form>
      <input name="name" value={form.name} onChange={onNameChange} />
      <input name="age" type="number" value={form.age} onChange={onAgeChange} />
    </form>
  )
}

type TForm = {
  name: string
  age: number
  isMarried: boolean
}

type MappedTform<T> = {
  readonly [P in keyof T]: T[P]
}

type TActual = MappedTform<TForm>

type TTextOwn<E extends ElementType> = {
  className?: string
  size?: 'header' | 'title'
  children?: ReactNode
  slot?: string
  as?: E
}

type TText<E extends ElementType> = TTextOwn<E> &
  Omit<ComponentProps<E>, keyof TTextOwn<E>>

export const Text = <E extends ElementType>(props: TText<E>) => {
  const Wrapper = props.as || 'div'
  return (
    <Wrapper className={classNames('text-gray-300', props.className)}>
      {props.children}
    </Wrapper>
  )
}

export const TextUsage = () => {
  return (
    <Text as="a" href="d">
      Hi
    </Text>
  )
}

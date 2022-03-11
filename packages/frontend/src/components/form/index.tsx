import { ComponentProps, forwardRef, useImperativeHandle } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type TFormControl = {
  defaultValues?: any
  onSubmit: (state: any) => void
} & Omit<ComponentProps<'form'>, 'onSubmit'>

const Provider = FormProvider as any

export const Form = forwardRef((props: TFormControl, ref) => {
  const { children, onSubmit, defaultValues, ...rest } = props
  const { control, handleSubmit, setValue, setError, reset } = useForm({
    defaultValues,
  })

  useImperativeHandle(ref, () => ({ reset }))

  return (
    <Provider control={control} setValue={setValue} setError={setError}>
      <form onSubmit={handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </Provider>
  )
})

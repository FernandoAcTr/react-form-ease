import { useForm } from '../hooks/useForm'

export interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  onSubmit: () => Promise<void>
  form: Partial<ReturnType<typeof useForm>>
  resetAfterSubmit?: boolean
  children: React.ReactNode
}

export default function Form(props: Omit<FormProps, 'noValidate'>) {
  const { form, onSubmit, resetAfterSubmit = false, children, ...other } = props

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.validateForm && !form.validateForm()) return
    if (form.validateFormAsync && !(await form.validateFormAsync())) return

    form.setIsLoading && form.setIsLoading(true)
    onSubmit && (await onSubmit())
    form.setIsLoading && form.setIsLoading(false)
    resetAfterSubmit && form.resetForm && form.resetForm()
  }

  return (
    <form {...other} onSubmit={submit} noValidate>
      {children}
    </form>
  )
}

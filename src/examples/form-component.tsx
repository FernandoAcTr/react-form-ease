import { useForm } from '../hooks/useForm'
import Form from '../components/form'

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export default function FormComponent() {
  const { formData, updateForm, isLoading, errors, ...form } = useForm({
    data: {
      email: '',
      password: '',
      name: '',
      check: false,
    },
    validations: {
      email: (value) => {
        if (!value) return 'Please enter an email'
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(value)) return 'Please enter a valid email'
      },
      name: (value) => {
        if (!value) return 'Please enter your name'
      },
      password: (value) => {
        if (!value) return 'Please enter a password'
      },
      check: (value) => {
        if (!value) return 'Please enter accept the privacy policies'
      },
    },
    asyncValidations: {
      email: async (value) => {
        //Checking in backend if email already exists
        await sleep(1000)
        if (value.includes('example')) return 'This email is already taken'
      },
    },
  })

  const onSubmit = async () => {
    await sleep(1000)
    alert(JSON.stringify(formData))
  }

  return (
    <Form onSubmit={onSubmit} form={form} resetAfterSubmit>
      <div className='mb-4'>
        <label htmlFor='exampleInputEmail4' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-control'
          id='exampleInputEmail4'
          value={formData.name}
          onChange={(e) => updateForm({ name: e.target.value })}
        />
        {errors?.name && <p className='invalid-feedback d-block'>{errors.name}</p>}
      </div>
      <div className='mb-4'>
        <label htmlFor='exampleInputEmail4' className='form-label'>
          Email address
        </label>
        <input
          type='email'
          className='form-control'
          id='exampleInputEmail4'
          onChange={(e) => updateForm({ email: e.target.value })}
          value={formData.email}
        />
        {errors?.email && <p className='invalid-feedback d-block'>{errors.email}</p>}
      </div>
      <div className='mb-4'>
        <label htmlFor='exampleInputPassword4' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control'
          id='exampleInputPassword4'
          onChange={(e) => updateForm({ password: e.target.value })}
          value={formData.password}
        />
        {errors?.password && <p className='invalid-feedback d-block'>{errors.password}</p>}
      </div>
      <div className='mb-3 form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          id='exampleCheck4'
          onChange={(e) => updateForm({ check: e.target.checked })}
          checked={formData.check}
        />
        <label className='form-check-label' htmlFor='exampleCheck4'>
          I accept the Privacy Policy
        </label>
        {errors?.check && <p className='invalid-feedback d-block'>{errors.check}</p>}
      </div>
      <button type='submit' className='btn btn-primary' disabled={isLoading}>
        Submit
      </button>
    </Form>
  )
}

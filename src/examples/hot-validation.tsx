import { useForm } from '../hooks/useForm'

export default function HotValidation() {
  const { formData, updateForm, isLoading, setIsLoading, validateForm, errors, resetForm, validateInput } = useForm({
    data: {
      email: '',
      password: '',
      name: '',
      check: false,
    },
    validations: {
      email: (value) => {
        if (!value) return 'Please enter an email'
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Please enter a valid email'
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
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    setTimeout(() => {
      alert(JSON.stringify(formData))
      setIsLoading(false)
      resetForm()
    }, 1000)
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className='mb-3'>
        <label htmlFor='exampleInputEmail2' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-control'
          id='exampleInputEmail2'
          onChange={(e) => updateForm({ name: e.target.value })}
          value={formData.name}
          onBlur={() => validateInput('name')}
        />
        {errors?.name && <p className='invalid-feedback d-block'>{errors.name}</p>}
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleInputEmail2' className='form-label'>
          Email address
        </label>
        <input
          type='email'
          className='form-control'
          id='exampleInputEmail2'
          onChange={(e) => updateForm({ email: e.target.value })}
          value={formData.email}
          onBlur={() => validateInput('email')}
        />
        {errors?.email && <p className='invalid-feedback d-block'>{errors.email}</p>}
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleInputPassword2' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control'
          id='exampleInputPassword2'
          onChange={(e) => updateForm({ password: e.target.value })}
          value={formData.password}
          onBlur={() => validateInput('password')}
        />
        {errors?.password && <p className='invalid-feedback d-block'>{errors.password}</p>}
      </div>
      <div className='mb-3 form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          id='exampleCheck2'
          onChange={(e) => updateForm({ check: e.target.checked })}
          checked={formData.check}
          onBlur={() => validateInput('check')}
        />
        <label className='form-check-label' htmlFor='exampleCheck2'>
          I accept the Privacy Policy
        </label>
        {errors?.check && <p className='invalid-feedback d-block'>{errors.check}</p>}
      </div>
      <button type='submit' className='btn btn-primary' disabled={isLoading}>
        Submit
      </button>
    </form>
  )
}

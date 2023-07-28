import { useForm } from '../hooks/useForm'
import { boolean, string } from '../validators'

export default function WithValidators() {
  const { formData, updateForm, isLoading, setIsLoading, validateForm, errors, resetForm } = useForm({
    data: {
      email: '',
      password: '',
      name: '',
      check: false,
    },
    validations: {
      email: (value) => string(value).required('Please enter an email').email().validate(),
      name: (value) => string(value).required().name().validate(),
      password: (value) => string(value).required().min(4).max(8).validate(),
      check: (value) => boolean(value).required().isTrue('Please accept the privacy policies').validate(),
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
        <label htmlFor='exampleInputEmail1' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-control'
          id='exampleInputEmail1'
          onChange={(e) => updateForm({ name: e.target.value })}
          value={formData.name}
        />
        {errors?.name && <p className='invalid-feedback d-block'>{errors.name}</p>}
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleInputEmail1' className='form-label'>
          Email address
        </label>
        <input
          type='email'
          className='form-control'
          id='exampleInputEmail1'
          onChange={(e) => updateForm({ email: e.target.value })}
          value={formData.email}
        />
        {errors?.email && <p className='invalid-feedback d-block'>{errors.email}</p>}
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleInputPassword1' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          onChange={(e) => updateForm({ password: e.target.value })}
          value={formData.password}
        />
        {errors?.password && <p className='invalid-feedback d-block'>{errors.password}</p>}
      </div>
      <div className='mb-3 form-check'>
        <input
          type='checkbox'
          className='form-check-input'
          id='exampleCheck1'
          onChange={(e) => updateForm({ check: e.target.checked })}
          checked={formData.check}
        />
        <label className='form-check-label' htmlFor='exampleCheck1'>
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

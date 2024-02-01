# React Form Ease

React Form Ease is a simple no-option form manager that will help you maintain a clean and tidy state of your forms and their validations.

## Demo

[![Edit react-form-ease](https://codesandbox.io/static/img/play-codesandbox.svg)](https://stackblitz.com/edit/stackblitz-starters-7i2aih?file=src%2FApp.js)

## Basic Usage  

All you have to do is call the `useForm()` hook, give it some initial data, which will correspond to the fields of your form, and get a function to update it.

```TSX
import { useForm } from 'react-form-ease'

const { formData, updateForm } = useForm({
    data: {
      email: '',
      password: '',
      name: '',
      check: false,
    },
})
<form>
  <div>
    <label>Name</label>
    <input type='text' onChange={(e) => updateForm({ name: e.target.value })} value={formData.name} />
  </div>
  <div>
    <label>Email address</label>
    <input type='email' onChange={(e) => updateForm({ email: e.target.value })} value={formData.email} />
  </div>
  <div>
    <label>Password</label>
    <input type='password' onChange={(e) => updateForm({ password: e.target.value })} value={formData.password} />
  </div>
  <div>
    <input type='checkbox' onChange={(e) => updateForm({ check: e.target.checked })} checked={formData.check} />
    <label>I accept the Privacy Policy</label>
  </div>
  <button type='submit' disabled={isLoading}>
    Submit
  </button>
</form>
```

## Validations

To create validations, pass a second argument to `useForm()` called validations.
A validator function must be passed for each property that you want to validate, which may or may not return an error message. If an error message is returned, it will be taken as a failed validation and the errors can be recovered in the errors object provided by the hook.
To execute the validations you must call the `validateForm()` function, also provided by the hook, for example in the submit handler.

```TSX
import { useForm } from 'react-form-ease'

const { formData, updateForm, isLoading, validateForm, errors } = useForm({
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
        if (!value) return 'Please accept the privacy policies'
      },
    },
})

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!validateForm()) return

  //Here formData contains valid data
}

<form onSubmit={onSubmit} noValidate>
    <div>
      <label>Name</label>
      <input type='text' onChange={(e) => updateForm({ name: e.target.value })} value={formData.name} />
      {/* Check here, we are displaying erros inside a p tag */}
      {errors?.name && <p className='invalid-feedback d-block'>{errors.name}</p>}
    </div>
    <div>
      <label>Email address</label>
      <input type='email' onChange={(e) => updateForm({ email: e.target.value })} value={formData.email} />
      {/* Check here, we are displaying erros inside a p tag */}
      {errors?.email && <p className='invalid-feedback d-block'>{errors.email}</p>}
    </div>
    <div>
      <label>Password</label>
      <input type='password' onChange={(e) => updateForm({ password: e.target.value })} value={formData.password} />
      {/* Check here, we are displaying erros inside a p tag */}
      {errors?.password && <p className='invalid-feedback d-block'>{errors.password}</p>}
    </div>
    <div>
      <input type='checkbox' onChange={(e) => updateForm({ check: e.target.checked })} checked={formData.check} />
      <label>I accept the Privacy Policy</label>
      {/* Check here, we are displaying erros inside a p tag */}
      {errors?.check && <p className='invalid-feedback d-block'>{errors.check}</p>}
    </div>
    <button type='submit' disabled={isLoading}>
      Submit
    </button>
  </form>

```

## Async validations

Sometimes you will need asynchronous validations, for example to check in the backend if an email is already registered or not.
For this type of case you can use the property called `asyncValidations` of the `useForm()` hook, which works exactly the same as validations but they must return a string promise instead of a string, since they must be async functions.
There is also its counterpart `validateFormAsync`, a function that will execute all asynchronous validators and update the error messages corresponding to their validator function.

```TSX
import { useForm } from 'react-form-ease'

const { formData, updateForm, isLoading, validateForm, validateFormAsync, errors } = useForm({
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
        if (!value) return 'Please accept the privacy policies'
      },
    },
    //Check here the async validation
    asyncValidations: {
      email: async (value) => {
        const isEmailTaken = await someAsyncFunction()
        if (isEmailTaken) return 'This email is already taken'
      },
    },
  })

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!validateForm()) return
  if (!(await validateFormAsync())) return //<- Check here the async validation after sync validation

  //Here formData contains valid data
}
```

## Hot validations

All validations are executed manually (usually before processing the data in the submit method), but it can also be executed on the fly, once the user has left an input.
For this we use the `validateInput()` or `validateInputAsync()` functions, in case there is an asynchronous validation for that field.

```TSX
import { useForm } from 'react-form-ease'

const { 
  formData, 
  updateForm, 
  isLoading, 
  validateForm, 
  errors, 
  validateFormAsync, 
  validateInput, 
  validateInputAsync 
} = useForm({
  ...
})
  
<form onSubmit={onSubmit} noValidate>
  <div>
    <label>Name</label>
    <input
      type='text'
      onChange={(e) => updateForm({ name: e.target.value })}
      onBlur={() => validateInput('name')} //<- Check here the hot validation
      value={formData.name}
    />
    {errors?.name && <p className='invalid-feedback d-block'>{errors.name}</p>}
  </div>
  <div>
    <label>Email address</label>
    <input
      type='email'
      onChange={(e) => updateForm({ email: e.target.value })}
      onBlur={() => validateInput('email') && validateInputAsync('email')} //<- Check here the hot validation
      value={formData.email}
    />
    {errors?.email && <p className='invalid-feedback d-block'>{errors.email}</p>}
  </div>
  <div>
    <label>Password</label>
    <input
      type='password'
      onChange={(e) => updateForm({ password: e.target.value })}
      onBlur={() => validateInput('password')} //<- Check here the hot validation
      value={formData.password}
    />
    {errors?.password && <p className='invalid-feedback d-block'>{errors.password}</p>}
  </div>
  <div>
    <input
      type='checkbox'
      onChange={(e) => updateForm({ check: e.target.checked })}
      onBlur={() => validateInput('check')} //<- Check here the hot validation
      checked={formData.check}
    />
    <label>I accept the Privacy Policy</label>
    {errors?.check && <p className='invalid-feedback d-block'>{errors.check}</p>}
  </div>
  <button type='submit' disabled={isLoading}>
    Submit
  </button>
</form>
```

## Reset form state

You can reset the form via the `resetForm()` method provided by the `useForm()` hook. Only run it once you have used the entered data.
All your inputs will need to be controlled by their value property.

```TSX
import { useForm } from 'react-form-ease'

const { 
  formData, 
  updateForm, 
  isLoading, 
  validateForm, 
  errors, 
  validateFormAsync, 
  validateInput, 
  validateInputAsync 
} = useForm({
  ...
})

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!validateForm()) return
  if (!(await validateFormAsync())) return

  //Process data ...

  resetForm()
}
```

## Loading state

The hook provides a state called `isLoading` and its mutator function `setIsLoading()`.
These are useful in case you want to make an asynchronous process, for example an ajax call with the form data and you need to reflect the wait in the UI, for example disable the submit button or show a spinner.

```TSX
import { useForm } from 'react-form-ease'

const { isLoading, setIsLoading, formData, resetForm} = useForm({
   ...
})

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

   //More code after...

   setIsLoading(true)

   setTimeout(() => {
      alert(JSON.stringify(formData))
      setIsLoading(false)
      resetForm()
   }, 1000)
}

<form>
   {/* ...inputs */}

   <button type='submit' disabled={isLoading}>
        Submit
   </button>
</form>
```

## Form component

React Form Ease provides an optional component called Form, which receives an asynchronous `onSubmit` callback and will perform validations automatically before the callback, as well as set the isLoading state to true until the callback has been resolved. you need to pass the rest of the hook properties that you don't use where you are using the form. If you use Form component, you don't need to call e.preventDefault().
If you want to reset the form after submitting it, you can use resetAfterSubmit prop of Form component.  

This is completely optional, but it can save you a few lines of code.

```TSX
import Form, { useForm } from 'react-form-ease'

//Check how to extract all other properties inside ...form
const { formData, updateForm, isLoading, errors, ...form } = useForm({
  ...
})

//Check how to relate a Form component with the hook with "form" prop
return (
<Form onSubmit={onSubmit} form={form} resetAfterSubmit>
  <div>
    <label>Name</label>
    <input
      type='text'
      onChange={(e) => updateForm({ name: e.target.value })}
      value={formData.name}
    />
    {errors?.name && <p className='invalid-feedback d-block'>{errors.name}</p>}
  </div>
  ...
  <button type='submit' disabled={isLoading}>
    Submit
  </button>
</Form>
```

## Built in validators

React Form Ease comes with pre-built validators with which you can validate common use cases for:
- strings
- numbers
- booleans
- dates 
- objects
- arrays 
  
For example you can rewrite this:
```TS
import { useForm } from 'react-form-ease'

const { formData, updateForm, isLoading, setIsLoading, validateForm, errors, resetForm } = useForm({
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
        if (!value) return 'Please accept the privacy policies'
      },
    },
  })
```
like this

```TS
import { useForm, string, boolean } from 'react-form-ease'

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
```

All you have to do is start a validation string with the data type you need to validate, for example string(), number(), boolean() or date() and pass the validated value as an argument.

```TS
validations: {
   email: (value) => string(value)...,
},
```

You can then continue the chain with as many validations as you require. At the end you must finalize the chain by calling the validate() method.

```TS
validations: {
   email: (value) => string(value).required().email().min(5).max(20).validate(),
},
```

Each validator has a predefined error message, but you can pass a custom message as the last argument to each validator.

```TS
validations: {
   email: (value) => string(value).required("Please enter an email").email("Please enter a valid email").min(5, "Al least 5 chars").max(20, "Less than 20 chars").validate(),
},
```

### Combine built in validators and custom validations

You can use the predefined validators and still do more specific validations, for example.

```TS
validations: {
      email: (value) => string(value).required('Please enter an email').email().validate(),
      name: (value) => string(value).required().name().validate(),
      password: (value) => {
        const error = string(value).required().min(4).max(8).validate()
        if (error) return error
        if(value.includes('.')) return '. is forbidden'
      },
      check: (value) => boolean(value).required().isTrue('Please accept the privacy policies').validate(),
}
```
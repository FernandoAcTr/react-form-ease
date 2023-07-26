import AsyncValidation from './examples/async-validation'
import BasicValidation from './examples/basic-validation'
import FormComponent from './examples/form-component'
import HotValidation from './examples/hot-validation'
import WithValidators from './examples/validators'

function App() {
  return (
    <div className='px-5 py-5'>
      <h2>Basic Validation</h2>
      <BasicValidation />

      <h2 className='mt-5'>Hot Validation</h2>
      <HotValidation />

      <h2 className='mt-5'>Async Validation</h2>
      <AsyncValidation />

      <h2 className='mt-5'>Form Component</h2>
      <FormComponent />

      <h2 className='mt-5'>Form With validators Component</h2>
      <WithValidators />
    </div>
  )
}

export default App

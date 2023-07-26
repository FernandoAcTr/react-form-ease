import { describe, expect, test } from 'vitest'
import { boolean } from '../src/validators/boolean.validators'

describe('Boolean Validators', () => {
  test('required', () => {
    expect(boolean(true).required('X').validate()).toBeFalsy()
    expect(boolean(null).required('X').validate()).toBe('X')
    expect(boolean().required('X').validate()).toBe('X')
  })
})

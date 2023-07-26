class Validator {
  private message?: string
  private value?: boolean | null

  private constructor() {}

  static fromValue(value?: boolean | null) {
    const validator = new Validator()
    validator.value = value
    return validator
  }

  validate() {
    return this.message
  }

  required(message = 'Required field') {
    if (this.value === null || this.value === undefined) this.message = message
    return this
  }

  isTrue(message = 'Required field to be true') {
    if (this.value === null || this.value === undefined) return this 
    if (this.value === false) this.message = message
    return this
  }

  isFalse(message = 'Required field to be false') {
    if (this.value === null || this.value === undefined) return this 
    if (this.value === true) this.message = message
    return this
  }
}

export function boolean(value?: boolean | null) {
  return Validator.fromValue(value)
}

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
}

export function boolean(value?: boolean | null) {
  return Validator.fromValue(value)
}

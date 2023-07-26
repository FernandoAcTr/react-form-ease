class Validator {
  private message?: string
  private value?: number | null

  private constructor() {}

  static fromValue(value?: number | null) {
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

  integer(message = 'Value must be an integer') {
    if (this.value === null || this.value === undefined) return this
    if (isNaN(this.value) || !Number.isInteger(this.value)) this.message = message
    return this
  }

  decimal(message = 'Value must be a decimal') {
    if (this.value === null || this.value === undefined) return this
    if (isNaN(this.value) || Number.isInteger(this.value)) this.message = message
    return this
  }

  positive(message = 'Value must be positive') {
    if (this.value === null || this.value === undefined) return this
    if (this.value < 0) this.message = message
    return this
  }

  negative(message = 'Value must be negative') {
    if (this.value === null || this.value === undefined) return this
    if (this.value >= 0) this.message = message
    return this
  }

  range(min: number, max: number, message = `Value must be between ${min} and ${max}`) {
    if (this.value === null || this.value === undefined) return this
    if (this.value < min || this.value > max) this.message = message
    return this
  }

  min(min: number, message = `Value must be more than ${min}`) {
    if (this.value === null || this.value === undefined) return this
    if (this.value < min) this.message = message
    return this
  }

  max(max: number, message = `Value must be less than ${max}`) {
    if (this.value === null || this.value === undefined) return this
    if (this.value > max) this.message = message
    return this
  }
}

export function number(value?: number | null) {
  return Validator.fromValue(value)
}

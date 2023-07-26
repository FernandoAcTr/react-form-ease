class Validator {
  private message?: string
  private value?: string | null

  private constructor() {}

  static fromValue(value?: string | null) {
    const validator = new Validator()
    validator.value = value
    return validator
  }

  validate() {
    return this.message
  }

  required(message = 'Required field') {
    if (!this.value) this.message = message
    return this
  }

  match(regex: RegExp, message = 'Invalid value') {
    if (!this.value) return this
    if (!regex.test(this.value)) this.message = message
    return this
  }

  email(message = 'Invalid email') {
    return this.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message)
  }

  integer(message = 'Value must be a integer') {
    return this.match(/^\d+$/, message)
  }

  alphabetic(message = 'Value must be alphabetic') {
    return this.match(/^[A-Za-z]+$/, message)
  }

  alphanumeric(message = 'Value must be alphanumeric') {
    return this.match(/^[A-Za-z0-9]+$/, message)
  }

  numeric(message = 'Value must be a number') {
    return this.match(/^[-+]?\d*\.?\d+$/, message)
  }

  url(message = 'Invalid URL') {
    if (!this.value) return this
    try {
      new URL(this.value)
    } catch (error) {
      this.message = message
    }
    return this
  }

  length(length: number, message: string = `Value must contain exact ${length} chars`) {
    if (!this.value) return this
    if (this.value.length != length) this.message = message

    return this
  }

  min(minLength: number, message: string = `Value must contain at least ${minLength} chars`) {
    if (!this.value) return this
    if (this.value.length < minLength) this.message = message

    return this
  }

  max(maxLength: number, message: string = `Value must contain less than ${maxLength} chars`) {
    if (!this.value) return this
    if (this.value.length > maxLength) this.message = message

    return this
  }

  username(message = 'Value contains invalid characters') {
    return this.match(/^[A-Za-z0-9_]+$/, message)
  }

  name(message = 'Value contains invalid characters') {
    return this.match(/^[A-Za-z\s]+$/, message)
  }

  uuid(message = 'Invalid UUID') {
    return this.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, message)
  }

  lowercase(message = 'Value must be lowercase') {
    if (!this.value) return this
    if (this.value !== this.value.toLowerCase()) this.message = message

    return this
  }

  uppercase(message = 'Value must be uppercase') {
    if (!this.value) return this
    if (this.value !== this.value.toUpperCase()) this.message = message

    return this
  }
}

export function string(value?: string) {
  return Validator.fromValue(value)
}

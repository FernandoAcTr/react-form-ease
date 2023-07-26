class Validator {
  private message?: string
  private value?: Date | null

  private constructor() {}

  static fromValue(value?: string | Date | null) {
    const validator = new Validator()
    if (value) validator.value = new Date(value)
    if (value === undefined) validator.value = undefined
    if (value === null) validator.value = null
    return validator
  }

  validate() {
    return this.message
  }

  required(message = 'Required field') {
    if (!this.value) this.message = message
    return this
  }

  isValid(message = 'Invalid date') {
    if (!this.value) return this
    if (isNaN(this.value.getTime())) this.message = message
    return this
  }

  leapYear(message = 'Date must be leap year') {
    if (!this.value) return this
    const year = this.value.getFullYear()
    if (!((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) this.message = message
    return this
  }

  greaterThan(compareDate: Date, message = `Date must be greater than ${compareDate}`) {
    if (!this.value) return this
    if (this.value <= compareDate) this.message = message
    return this
  }

  lessThan(compareDate: Date, message = `Date must be less than ${compareDate}`) {
    if (!this.value) return this
    if (this.value >= compareDate) this.message = message
    return this
  }

  range(startDate: Date, endDate: Date, message = `Date must be between ${startDate} and ${endDate}`) {
    if (!this.value) return this
    if (this.value < startDate || this.value > endDate) this.message = message
    return this
  }
}

export function date(value?: string | Date | null) {
  return Validator.fromValue(value)
}

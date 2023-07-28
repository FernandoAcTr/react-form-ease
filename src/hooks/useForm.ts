import { useState } from 'react'

type Validator<T, F> = (value: T, form: F) => string | undefined
type AsyncValidator<T, F> = (value: T, form: F) => Promise<string | void>

type FormOptions<T> = {
  data: T
  validations?: { [key in keyof Partial<T>]: Validator<T[key], T> }
  asyncValidations?: { [key in keyof Partial<T>]: AsyncValidator<T[key], T> }
}

type Errors<T> = { [key in keyof Partial<T>]: string }

export function useForm<T>(options: FormOptions<T>) {
  const { data, validations, asyncValidations } = options
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<T>(data)
  const [errors, setErrors] = useState<Errors<T>>()

  const updateForm = (newData: Partial<T>) => {
    setFormData({ ...formData, ...newData })
    Object.keys(newData).forEach((key) => setErrors({ ...errors, [key]: undefined } as any))
  }
  const resetForm = () => setFormData(data)

  const validateForm = (): boolean => {
    if (!validations || Object.keys(validations).length == 0) return true

    let isValid = true

    const errors: any = {}
    for (const key of Object.keys(validations)) {
      const validator = (validations as any)[key]
      const errorMessage = validator((formData as any)[key], formData)

      if (errorMessage) {
        isValid = false
        errors[key] = errorMessage
      }
    }
    setErrors(errors)

    return isValid
  }

  const validateFormAsync = async (): Promise<boolean> => {
    if (!asyncValidations || Object.keys(asyncValidations).length == 0) return true
    setIsLoading(true)

    let isValid = true

    const errors: any = {}
    for await (const key of Object.keys(asyncValidations)) {
      const validator = (asyncValidations as any)[key]

      let errorMessage: string | null = null
      try {
        errorMessage = await validator((formData as any)[key], formData)
      } catch (error) {
        errorMessage = `An exception occurred while the validator [${key}] was running`
      }

      if (errorMessage) {
        isValid = false
        errors[key] = errorMessage
      }
    }
    setErrors(errors)

    setIsLoading(false)
    return isValid
  }

  const validateInput = (field: keyof T): boolean => {
    if (!validations || Object.keys(validations).length == 0) return true
    const validator = (validations as any)[field]
    if (!validator) return true

    const errorMessage = validator((formData as any)[field], formData)

    const _errors: any = { ...errors }
    if (errorMessage) _errors[field] = errorMessage
    setErrors(_errors)

    return errorMessage ? false : true
  }

  const validateInputAsync = async (field: keyof T): Promise<boolean> => {
    if (!asyncValidations || Object.keys(asyncValidations).length == 0) return true
    const validator = (asyncValidations as any)[field]
    if (!validator) return true

    let errorMessage: string | null = null
    try {
      errorMessage = await validator((formData as any)[field], formData)
    } catch (error) {
      errorMessage = `An exception occurred while the validator [${field as string}] was running`
    }

    const _errors: any = { ...errors }
    if (errorMessage) _errors[field] = errorMessage
    setErrors(_errors)

    return errorMessage ? false : true
  }

  return {
    formData,
    updateForm,
    isLoading,
    setIsLoading,
    resetForm,
    validateForm,
    validateFormAsync,
    errors,
    validateInput,
    validateInputAsync,
  }
}

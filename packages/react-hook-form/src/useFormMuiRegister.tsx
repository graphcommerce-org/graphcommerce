import { useEventCallback } from '@mui/material'
import {
  FieldValues,
  FieldPath,
  RegisterOptions,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form'

export type UseMuiFormRegister<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: RegisterOptions<TFieldValues, TFieldName>,
) => Omit<UseFormRegisterReturn, 'ref'> & { inputRef: UseFormRegisterReturn['ref'] }

export function useFormMuiRegister<V>({ register }: Pick<UseFormReturn<V>, 'register'>) {
  const muiRegister: UseMuiFormRegister<V> = useEventCallback((name, opts) => {
    const { ref: inputRef, ...fields } = register(name, opts)
    return { ...fields, inputRef }
  })
  return useEventCallback(muiRegister)
}

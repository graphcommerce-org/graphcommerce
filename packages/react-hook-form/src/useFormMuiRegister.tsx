import type {
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

/**
 * @deprecated Please use use TextFieldElement, etc.
 */
export function useFormMuiRegister<V extends FieldValues>({
  register,
}: Pick<UseFormReturn<V>, 'register'>) {
  const muiRegister: UseMuiFormRegister<V> = (name, opts) => {
    const { ref: inputRef, ...fields } = register(name, opts)
    return { ...fields, inputRef }
  }
  return muiRegister
}

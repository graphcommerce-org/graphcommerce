import { Path, useWatch, FieldValues } from '@graphcommerce/react-hook-form'
import PasswordElement, { PasswordElementProps } from './PasswordElement'

export type PasswordRepeatElementProps<T> = PasswordElementProps<T> & {
  passwordFieldName: Path<T>
}
export function PasswordRepeatElement<TFieldValues extends FieldValues>({
  passwordFieldName,
  ...rest
}: PasswordRepeatElementProps<TFieldValues>) {
  const pwValue = useWatch({
    name: passwordFieldName,
    control: rest.control,
  })
  return (
    <PasswordElement
      {...rest}
      validation={{
        validate: (value: string) => value === pwValue || 'Password should match',
      }}
    />
  )
}

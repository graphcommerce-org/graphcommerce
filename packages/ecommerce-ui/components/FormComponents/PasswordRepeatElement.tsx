import { useWatch, FieldValues } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { PasswordElement, PasswordElementProps } from './PasswordElement'

export type PasswordRepeatElementProps<T extends FieldValues> = PasswordElementProps<T> & {
  passwordFieldName: PasswordElementProps<T>['name']
}

export function PasswordRepeatElement<TFieldValues extends FieldValues>({
  passwordFieldName,
  ...rest
}: PasswordRepeatElementProps<TFieldValues>) {
  const pwValue = useWatch({ name: passwordFieldName, control: rest.control })
  return (
    <PasswordElement
      {...rest}
      validation={{
        validate: (value: string) =>
          value === pwValue || i18n._(/* i18n */ "Passwords don't match"),
      }}
    />
  )
}

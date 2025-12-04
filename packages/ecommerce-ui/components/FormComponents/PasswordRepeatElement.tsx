import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useWatch } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import type { PasswordElementProps } from './PasswordElement'
import { PasswordElement } from './PasswordElement'

export type PasswordRepeatElementProps<T extends FieldValues> = PasswordElementProps<T> & {
  passwordFieldName: PasswordElementProps<T>['name']
}

/** @public */
export function PasswordRepeatElement<TFieldValues extends FieldValues>({
  passwordFieldName,
  ...rest
}: PasswordRepeatElementProps<TFieldValues>) {
  const pwValue = useWatch({ name: passwordFieldName, control: rest.control })
  return (
    <PasswordElement
      {...rest}
      rules={{
        validate: (value: string) => value === pwValue || t`Passwords don't match`,
      }}
    />
  )
}

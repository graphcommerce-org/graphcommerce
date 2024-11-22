import type { PasswordElementProps } from '@graphcommerce/ecommerce-ui'
import { PasswordElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { FieldValues } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'

export type ValidatedPasswordElementProps<T extends FieldValues> = PasswordElementProps<T>

export function ValidatedPasswordElement<TFieldValues extends FieldValues>(
  props: PasswordElementProps<TFieldValues>,
): JSX.Element {
  const { ...textFieldProps } = props

  const storeConfig = useQuery(StoreConfigDocument).data?.storeConfig
  const minPasswordLength = Number(storeConfig?.minimum_password_length) ?? 0
  const passwordMinCharacterSets = Number(storeConfig?.required_character_classes_number) ?? 0

  const rules: NonNullable<PasswordElementProps<TFieldValues>['rules']> = {}

  rules.minLength = {
    value: minPasswordLength,
    message: i18n._(/* i18n */ 'Password must have at least {minPasswordLength} characters', {
      minPasswordLength,
    }),
  }

  rules.validate = (value: string) => {
    const pass = value.trim()
    let counter = 0

    if (pass.match(/\d+/)) counter++
    if (pass.match(/[a-z]+/)) counter++
    if (pass.match(/[A-Z]+/)) counter++
    if (pass.match(/[^a-zA-Z0-9]+/)) counter++

    if (counter < passwordMinCharacterSets) {
      return i18n._(
        /* i18n */ 'Minimum of different classes of characters in password is {passwordMinCharacterSets}. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.',
        { passwordMinCharacterSets },
      )
    }

    return true
  }

  return <PasswordElement {...textFieldProps} rules={rules} />
}

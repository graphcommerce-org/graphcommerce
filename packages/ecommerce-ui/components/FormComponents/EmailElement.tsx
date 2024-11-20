import type { FieldValues } from '@graphcommerce/react-hook-form'
import { emailPattern } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import type { TextFieldElementProps } from './TextFieldElement'
import { TextFieldElement } from './TextFieldElement'

export type EmailElementProps<T extends FieldValues> = TextFieldElementProps<T>

export function EmailElement<TFieldValues extends FieldValues>(
  props: EmailElementProps<TFieldValues>,
): JSX.Element {
  const { rules, ...rest } = props
  return (
    <TextFieldElement
      type='email'
      label={<Trans id='Email address' />}
      autoComplete='email'
      rules={{
        pattern: {
          value: emailPattern,
          message: i18n._(/* i18n */ 'Please enter a valid email address'),
        },
        ...rules,
      }}
      {...rest}
    />
  )
}

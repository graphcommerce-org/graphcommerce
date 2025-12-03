import type { FieldValues } from '@graphcommerce/react-hook-form'
import { emailPattern } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import type { TextFieldElementProps } from './TextFieldElement'
import { TextFieldElement } from './TextFieldElement'

export type EmailElementProps<T extends FieldValues> = TextFieldElementProps<T>

/** @public */
export function EmailElement<TFieldValues extends FieldValues>(
  props: EmailElementProps<TFieldValues>,
): React.ReactNode {
  const { rules, ...rest } = props
  return (
    <TextFieldElement
      type='email'
      label={<Trans>Email address</Trans>}
      autoComplete='email'
      rules={{
        pattern: {
          value: emailPattern,
          message: t`Please enter a valid email address`,
        },
        ...rules,
      }}
      {...rest}
    />
  )
}

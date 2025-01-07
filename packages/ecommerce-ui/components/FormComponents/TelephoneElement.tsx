import type { FieldValues } from '@graphcommerce/react-hook-form'
import { phonePattern } from '@graphcommerce/react-hook-form'
import { t, Trans } from '@lingui/macro'
import type { TextFieldElementProps } from './TextFieldElement'
import { TextFieldElement } from './TextFieldElement'

export type TelephoneElementProps<T extends FieldValues> = TextFieldElementProps<T>

/** @public */
export function TelephoneElement<TFieldValues extends FieldValues>(
  props: TelephoneElementProps<TFieldValues>,
): JSX.Element {
  const { rules, ...rest } = props
  return (
    <TextFieldElement
      type='text'
      label={<Trans>Telephone</Trans>}
      autoComplete='tel'
      rules={{
        pattern: { value: phonePattern, message: t`Invalid phone number` },
        ...rules,
      }}
      {...rest}
    />
  )
}

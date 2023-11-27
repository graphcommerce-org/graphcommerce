import { TextFieldElement, TextFieldElementProps } from '@graphcommerce/ecommerce-ui'
import { FormRow } from '@graphcommerce/next-ui'
import { useFormContext, assertFormGqlOperation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'

type EmailFieldProps = Omit<TextFieldElementProps, 'name'> & {
  label?: React.ReactNode
}

export function EmailField({ label }: EmailFieldProps) {
  const methods = useFormContext()
  assertFormGqlOperation(methods)
  const { formState, control, required, error, ...rest } = methods

  return (
    <FormRow>
      <TextFieldElement
        {...rest}
        name='email'
        autoComplete='off'
        label={label ?? <Trans id='Email' />}
        disabled={formState.isSubmitting}
        required={required.email}
        error={formState.isSubmitted && !!formState.errors.email}
      />
    </FormRow>
  )
}

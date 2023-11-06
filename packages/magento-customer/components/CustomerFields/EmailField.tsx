import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { FormRow } from '@graphcommerce/next-ui'
import { useFormContext, assertFormGqlOperation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'

export function EmailField() {
  const methods = useFormContext()
  assertFormGqlOperation(methods)
  const { formState, control } = methods

  return (
    <FormRow>
      <TextFieldElement
        name='email'
        label={<Trans id='Email' />}
        control={control}
        disabled={formState.isSubmitting}
      />
    </FormRow>
  )
}

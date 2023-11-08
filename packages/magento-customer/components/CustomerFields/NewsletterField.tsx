import { assertFormGqlOperation, useFormContext } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { FormControlLabel, Switch } from '@mui/material'

export function NewsletterField() {
  const methods = useFormContext()
  assertFormGqlOperation(methods)
  const { muiRegister, formState, required } = methods
  return (
    <FormControlLabel
      control={<Switch color='primary' />}
      {...muiRegister('isSubscribed', { required: required.isSubscribed })}
      disabled={formState.isSubmitting}
      label={<Trans id='Subscribe to newsletter' />}
    />
  )
}

import { Controller, FormAutoSubmit, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { FormControl, FormControlLabel, FormHelperText, Switch } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import type { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import { UpdateDefaultAddressDocument } from '../AccountAddresses/UpdateDefaultAddress.gql'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'

export type UpdateDefaultAddressFormProps = Pick<
  AccountAddressFragment,
  'id' | 'default_shipping' | 'default_billing'
>

export function UpdateDefaultAddressForm(props: UpdateDefaultAddressFormProps) {
  const { id, default_shipping, default_billing } = props
  const defaultValues = useMemo(
    () => ({
      addressId: id ?? undefined,
      defaultBilling: !!default_billing,
      defaultShipping: !!default_shipping,
    }),
    [default_billing, default_shipping, id],
  )

  const form = useFormGqlMutation(
    UpdateDefaultAddressDocument,
    { mode: 'onChange', defaultValues },
    { errorPolicy: 'all', refetchQueries: ['AccountDashboardAddresses'] },
  )

  const { handleSubmit, control, error, reset, formState } = form

  const submit = handleSubmit(() => {})

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form onSubmit={() => {}} noValidate>
      <FormAutoSubmit control={control} submit={submit} />
      <Controller
        name='defaultShipping'
        control={control}
        render={({ field: { onChange, value, name, ref, onBlur } }) => (
          <FormControl error={!!formState.errors.defaultShipping}>
            <FormControlLabel
              control={<Switch color='primary' />}
              label={<Trans id='Shipping address' />}
              checked={value}
              inputRef={ref}
              onBlur={onBlur}
              name={name}
              onChange={(e) => onChange((e as React.ChangeEvent<HTMLInputElement>).target.checked)}
            />

            {formState.errors.defaultShipping?.message && (
              <FormHelperText>{formState.errors.defaultShipping?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        name='defaultBilling'
        control={control}
        render={({ field: { onChange, value, name, ref, onBlur } }) => (
          <FormControl error={!!formState.errors.defaultBilling}>
            <FormControlLabel
              control={<Switch color='primary' />}
              label={<Trans id='Billing address' />}
              checked={value}
              inputRef={ref}
              onBlur={onBlur}
              name={name}
              onChange={(e) => onChange((e as React.ChangeEvent<HTMLInputElement>).target.checked)}
            />

            {formState.errors.defaultBilling?.message && (
              <FormHelperText>{formState.errors.defaultBilling?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}

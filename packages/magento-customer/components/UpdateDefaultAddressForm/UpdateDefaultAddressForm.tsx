import { FormLayout, UseFormLayoutProps } from '@graphcommerce/next-ui'
import {
  Controller,
  UseFormGqlMutationReturn,
  useFormAutoSubmit,
  useFormGqlMutation,
} from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { FormControl, FormControlLabel, FormHelperText, Switch } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import {
  UpdateDefaultAddressDocument,
  UpdateDefaultAddressMutation,
  UpdateDefaultAddressMutationVariables,
} from '../AccountAddresses/UpdateDefaultAddress.gql'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'

export type UpdateDefaultAddressFormProps = Pick<
  AccountAddressFragment,
  'id' | 'default_shipping' | 'default_billing'
> &
  UseFormLayoutProps<
    UseFormGqlMutationReturn<UpdateDefaultAddressMutation, UpdateDefaultAddressMutationVariables>
  >

export function UpdateDefaultAddressForm(props: UpdateDefaultAddressFormProps) {
  const { id, default_shipping, default_billing, children } = props
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
    { errorPolicy: 'all' },
  )

  const { handleSubmit, control, error, reset, formState } = form

  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form onSubmit={() => {}} noValidate>
      <FormLayout
        form={form}
        original={
          <>
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
                    onChange={(e) =>
                      onChange((e as React.ChangeEvent<HTMLInputElement>).target.checked)
                    }
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
                    onChange={(e) =>
                      onChange((e as React.ChangeEvent<HTMLInputElement>).target.checked)
                    }
                  />

                  {formState.errors.defaultBilling?.message && (
                    <FormHelperText>{formState.errors.defaultBilling?.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </>
        }
      >
        {children}
      </FormLayout>

      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}

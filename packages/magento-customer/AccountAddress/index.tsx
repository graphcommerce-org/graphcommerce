import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Switch,
  Theme,
} from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import { Controller, useFormAutoSubmit, useFormGqlMutation } from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import React, { useEffect, useMemo } from 'react'
import { UpdateDefaultAddressDocument } from '../AccountAddresses/UpdateDefaultAddress.gql'
import AddressMultiLine from '../AddressMultiLine'
import { AccountAddressFragment } from './AccountAddress.gql'

export type AccountAddressProps = AccountAddressFragment & CountryRegionsQuery

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacings.md,
      paddingBottom: theme.spacings.md,
      ...theme.typography.body2,
    },
    address: {
      '& > span': {
        display: 'block',
      },
    },
    switches: {
      paddingTop: theme.spacings.xxs,
    },
    actions: {
      //
    },
  }),
  { name: 'AccountAddress' },
)

export default function AccountAddress(props: AccountAddressProps) {
  const { id, countries, default_shipping, default_billing } = props
  const classes = useStyles()

  const defaultValues = useMemo(
    () => ({
      addressId: id ?? undefined,
      defaultBilling: !!default_billing,
      defaultShipping: !!default_shipping,
    }),
    [default_billing, default_shipping, id],
  )

  const form = useFormGqlMutation(UpdateDefaultAddressDocument, {
    mode: 'onChange',
    defaultValues,
  })

  const { handleSubmit, control, error, reset, formState } = form

  const submit = handleSubmit(() => {
    //
  })
  useFormAutoSubmit({ form, submit })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <div className={classes.root}>
      <div className={classes.address}>
        <AddressMultiLine {...props} countries={countries} />

        <div className={classes.switches}>
          <form onSubmit={() => {}} noValidate>
            <Controller
              name='defaultBilling'
              control={control}
              render={({ field: { onChange, value, name, ref, onBlur } }) => (
                <FormControl error={!!formState.errors.defaultBilling}>
                  <FormControlLabel
                    control={<Switch color='primary' />}
                    label='Billing address'
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
            <Controller
              name='defaultShipping'
              control={control}
              render={({ field: { onChange, value, name, ref, onBlur } }) => (
                <FormControl error={!!formState.errors.defaultShipping}>
                  <FormControlLabel
                    control={<Switch color='primary' />}
                    label='Shipping address'
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
            <ApolloErrorAlert error={error} />
          </form>
        </div>
      </div>
      <FormActions>
        <PageLink href={`/account/addresses/edit?addressId=${id}`} passHref>
          <Button variant='text' color='primary'>
            Edit
          </Button>
        </PageLink>
      </FormActions>
    </div>
  )
}

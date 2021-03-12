import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Link,
  makeStyles,
  Switch,
  Theme,
} from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import { Controller } from '@reachdigital/react-hook-form/useForm'
import useFormAutoSubmit from '@reachdigital/react-hook-form/useFormAutoSubmit'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
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

  const { errors, handleSubmit, control, error, reset } = form

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
              render={({ onChange, value, name, onBlur, ref }) => (
                <FormControl error={!!errors.defaultBilling}>
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

                  {errors.defaultBilling?.message && (
                    <FormHelperText>{errors.defaultBilling?.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name='defaultShipping'
              control={control}
              render={({ onChange, value, name, onBlur, ref }) => (
                <FormControl error={!!errors.defaultShipping}>
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

                  {errors.defaultShipping?.message && (
                    <FormHelperText>{errors.defaultShipping?.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <ApolloErrorAlert error={error} />
          </form>
        </div>
      </div>
      <div className={classes.actions}>
        <Link href={`/account/addresses/edit?addressId=${id}`}>Edit</Link>
      </div>
    </div>
  )
}

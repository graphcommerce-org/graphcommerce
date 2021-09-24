import { useQuery } from '@apollo/client'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Switch,
  SwitchProps,
} from '@material-ui/core'
import { ApolloCustomerErrorAlert, CustomerDocument } from '@graphcommerce/magento-customer'
import { Controller, useFormAutoSubmit, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import React, { useEffect, useMemo } from 'react'
import { UpdateNewsletterSubscriptionDocument } from './UpdateNewsletterSubscription.gql'

const useStyles = makeStyles(() => ({
  labelRoot: {
    marginRight: 0,
  },
}))

export type AccountNewsletterProps = SwitchProps

export default function AccountNewsletter(props: AccountNewsletterProps) {
  const { ...switchProps } = props
  const classes = useStyles(props)

  const { loading, data } = useQuery(CustomerDocument, {
    ssr: false,
  })
  const customer = data?.customer
  const is_subscribed = customer && customer.is_subscribed

  const defaultValues = useMemo(
    // todo: useMemo weg
    () => ({
      isSubscribed: is_subscribed ?? false,
    }),
    [is_subscribed],
  )

  const form = useFormGqlMutation(
    UpdateNewsletterSubscriptionDocument,
    {
      mode: 'onChange',
      defaultValues,
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, control, error, reset, formState } = form

  const submit = handleSubmit(() => {
    //
  })

  useFormAutoSubmit({ form, submit })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  if (loading) return null

  return (
    <form noValidate>
      <Controller
        name='isSubscribed'
        control={control}
        render={({ field: { onChange, value, name, ref, onBlur } }) => (
          <FormControl error={!!formState.errors.isSubscribed}>
            <FormControlLabel
              classes={{ root: classes.labelRoot }}
              label=''
              control={<Switch color='primary' {...switchProps} />}
              checked={value}
              inputRef={ref}
              onBlur={onBlur}
              name={name}
              onChange={(e) => onChange((e as React.ChangeEvent<HTMLInputElement>).target.checked)}
            />

            {formState.errors.isSubscribed?.message && (
              <FormHelperText>{formState.errors.isSubscribed?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}

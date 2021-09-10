import { useQuery } from '@apollo/client'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Switch,
  SwitchProps,
} from '@material-ui/core'
import { ApolloCustomerErrorAlert, CustomerDocument } from '@reachdigital/magento-customer'
import { Controller, useFormAutoSubmit, useFormGqlMutation } from '@reachdigital/react-hook-form'
import React, { useEffect, useMemo } from 'react'
import { UpdateNewsletterSubscriptionDocument } from './UpdateNewsletterSubscription.gql'

const useStyles = makeStyles(() => ({
  labelRoot: {
    marginRight: 0,
  },
}))

export type NewsletterToggleProps = SwitchProps & { hideErrors?: boolean }

export default function NewsletterToggle(props: NewsletterToggleProps) {
  const { hideErrors = false, ...switchProps } = props
  const classes = useStyles(props)

  const { loading, data } = useQuery(CustomerDocument, {
    ssr: false,
  })
  const customer = data?.customer
  const is_subscribed = customer && customer.is_subscribed

  const defaultValues = useMemo(
    () => ({
      isSubscribed: is_subscribed ?? false,
    }),
    [is_subscribed],
  )

  // TODO: use subscribeEmailToNewsletter when customer is not signed in
  // retrieve email from cart..
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

  // TODO: disable button when guest signs in, because there is no unsubscribeGuestEmailToNewsletter
  if (loading) return <Switch disabled color='primary' {...switchProps} />

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
      {!hideErrors && <ApolloCustomerErrorAlert error={error} />}
    </form>
  )
}

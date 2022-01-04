import { useQuery } from '@apollo/client'
import { ApolloCustomerErrorAlert } from '@graphcommerce/magento-customer'
import { Controller, useFormAutoSubmit, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { FormControl, FormControlLabel, FormHelperText, Switch, SwitchProps } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { GetCustomerNewsletterToggleDocument } from './GetCustomerNewsLetterToggle.gql'
import { UpdateNewsletterSubscriptionDocument } from './UpdateNewsletterSubscription.gql'

export type CustomerNewsletterToggleProps = SwitchProps

const useStyles = makeStyles(() => ({
  labelRoot: {
    marginRight: 0,
  },
}))

export default function CustomerNewsletterToggle(props: CustomerNewsletterToggleProps) {
  const { disabled, ...switchProps } = props
  const classes = useStyles(props)

  const { loading, data } = useQuery(GetCustomerNewsletterToggleDocument, { ssr: false })
  const form = useFormGqlMutation(UpdateNewsletterSubscriptionDocument, {
    mode: 'onChange',
    defaultValues: {
      isSubscribed: data?.customer?.is_subscribed ?? false,
    },
  })

  const { handleSubmit, control, formState, error } = form
  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit })

  if (disabled || loading) return <Switch disabled color='primary' {...switchProps} />

  return (
    <form noValidate>
      <Controller
        name='isSubscribed'
        control={control}
        render={({ field: { onChange, value, name: controlName, ref, onBlur } }) => (
          <FormControl error={!!formState.errors.isSubscribed}>
            <FormControlLabel
              classes={{ root: classes.labelRoot }}
              label=''
              control={<Switch color='primary' {...switchProps} />}
              checked={value}
              inputRef={ref}
              onBlur={onBlur}
              name={controlName}
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

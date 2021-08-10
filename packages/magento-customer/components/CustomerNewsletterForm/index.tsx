import { useQuery } from '@apollo/client'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  SwitchProps,
} from '@material-ui/core'
import { Controller, useFormAutoSubmit, useFormGqlMutation } from '@reachdigital/react-hook-form'
import React, { useEffect, useMemo } from 'react'
import { CustomerNewsletterFormDocument } from '../../CustomerNewsletterForm/CustomerNewsletterForm.gql'
import { CustomerDocument } from '../../hooks'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'

type CustomerNewsletterFormProps = SwitchProps

export default function CustomerNewsletterForm(props: CustomerNewsletterFormProps) {
  const { ...switchProps } = props

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

  const form = useFormGqlMutation(
    CustomerNewsletterFormDocument,
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
              labelPlacement='start' // prevent margin right
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

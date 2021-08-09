import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  SwitchProps,
} from '@material-ui/core'
import { Controller, useFormAutoSubmit, useFormGqlMutation } from '@reachdigital/react-hook-form'
import React, { useEffect, useMemo } from 'react'
import { CustomerInfoFragment } from '../../CustomerInfo.gql'
import { CustomerNewsletterFormDocument } from '../../CustomerNewsletterForm/CustomerNewsletterForm.gql'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'

type CustomerNewsletterFormProps = SwitchProps & Pick<CustomerInfoFragment, 'is_subscribed'>

export default function CustomerNewsletterForm(props: CustomerNewsletterFormProps) {
  const { is_subscribed } = props

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
      //  defaultValues,
      onBeforeSubmit: (data) => {
        console.log(data)

        return data
      },
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

  return (
    <form onSubmit={() => {}} noValidate>
      <Controller
        name='isSubscribed'
        control={control}
        render={({ field: { onChange, value, name, ref, onBlur } }) => (
          <FormControl error={!!formState.errors.isSubscribed}>
            <FormControlLabel
              label='isSubscribed'
              control={<Switch color='primary' />}
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

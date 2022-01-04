import { useCartQuery } from '@graphcommerce/magento-cart'
import { ApolloCustomerErrorAlert } from '@graphcommerce/magento-customer'
import { Form } from '@graphcommerce/next-ui'
import { Controller, useFormAutoSubmit, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { FormControl, FormControlLabel, FormHelperText, Switch, SwitchProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { GetCartEmailDocument } from '../SignupNewsletter/GetCartEmail.gql'
import {
  GuestNewsletterToggleDocument,
  GuestNewsletterToggleMutation,
  GuestNewsletterToggleMutationVariables,
} from './GuestNewsletterToggle.gql'

export type GuestNewsletterToggleProps = SwitchProps

const useStyles = makeStyles(() => ({
  labelRoot: {
    marginRight: 0,
  },
}))

export default function GuestNewsletterToggle(props: GuestNewsletterToggleProps) {
  const { ...switchProps } = props
  const classes = useStyles(props)

  const email =
    useCartQuery(GetCartEmailDocument, { allowUrl: true }).data?.cart?.email ?? undefined
  const form = useFormGqlMutation<
    GuestNewsletterToggleMutation,
    GuestNewsletterToggleMutationVariables & { isSubscribed?: boolean }
  >(GuestNewsletterToggleDocument, { mode: 'onChange' })

  const { handleSubmit, control, formState, error, register } = form
  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit })

  if (formState.isSubmitted) return <Switch color='primary' {...switchProps} checked disabled />

  return (
    <Form noValidate>
      <input type='hidden' {...register('email')} value={email} />
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
    </Form>
  )
}

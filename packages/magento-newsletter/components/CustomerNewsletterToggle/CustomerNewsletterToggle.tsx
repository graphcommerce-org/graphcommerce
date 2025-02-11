import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorAlert } from '@graphcommerce/magento-customer'
import { sxx } from '@graphcommerce/next-ui'
import { Controller, FormAutoSubmit, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import type { SwitchProps, SxProps, Theme } from '@mui/material'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText, // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  Switch,
} from '@mui/material'
import React from 'react'
import { GetCustomerNewsletterToggleDocument } from './GetCustomerNewsLetterToggle.gql'
import { UpdateNewsletterSubscriptionDocument } from './UpdateNewsletterSubscription.gql'

export type CustomerNewsletterToggleProps = Omit<SwitchProps, ''> & {
  sx?: SxProps<Theme>
  children?: React.ReactNode
}

export function CustomerNewsletterToggle(props: CustomerNewsletterToggleProps) {
  const { disabled, sx = [], children, ...switchProps } = props

  const { loading, data } = useQuery(GetCustomerNewsletterToggleDocument, { ssr: false })
  const form = useFormGqlMutation(UpdateNewsletterSubscriptionDocument, {
    mode: 'onChange',
    defaultValues: {
      isSubscribed: data?.customer?.is_subscribed ?? false,
    },
  })

  const { handleSubmit, control, formState, error } = form
  const submit = handleSubmit(() => {})

  if (disabled || loading) return <Switch disabled color='primary' {...switchProps} />

  return (
    <Box
      component='form'
      onSubmit={submit}
      noValidate
      sx={sxx({ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }, sx)}
    >
      <FormAutoSubmit control={control} submit={submit} />
      <Controller
        name='isSubscribed'
        control={control}
        render={({ field: { onChange, value, name: controlName, ref, onBlur } }) => (
          <FormControl error={!!formState.errors.isSubscribed}>
            <FormControlLabel
              sx={{ marginRight: 0 }}
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
      <ApolloErrorSnackbar error={error} />
      {children}
    </Box>
  )
}

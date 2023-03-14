import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorAlert } from '@graphcommerce/magento-customer'
import { Controller, useFormAutoSubmit, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'
import { GetCustomerNewsletterToggleDocument } from './GetCustomerNewsLetterToggle.gql'
import { UpdateNewsletterSubscriptionDocument } from './UpdateNewsletterSubscription.gql'

export type CustomerNewsletterToggleProps = SwitchProps & { sx?: SxProps<Theme> }

export function CustomerNewsletterToggle(props: CustomerNewsletterToggleProps) {
  const { disabled, sx = [], ...switchProps } = props

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
    <Box component='form' onSubmit={submit} noValidate sx={sx}>
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

      <ApolloCustomerErrorAlert error={error} />
    </Box>
  )
}

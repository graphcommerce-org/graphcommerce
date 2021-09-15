import { useQuery } from '@apollo/client'
import { SwitchProps } from '@material-ui/core'
import { CustomerDocument } from '@reachdigital/magento-customer'
import { useFormAutoSubmit, useFormGqlMutation } from '@reachdigital/react-hook-form'
import React, { useEffect, useMemo } from 'react'
import NewsletterToggle from '../NewsletterToggle'
import { UpdateNewsletterSubscriptionDocument } from './UpdateNewsletterSubscription.gql'

export type CustomerNewsletterToggleProps = SwitchProps

export default function CustomerNewsletterToggle(props: CustomerNewsletterToggleProps) {
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
    UpdateNewsletterSubscriptionDocument,
    {
      mode: 'onChange',
      defaultValues,
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, reset } = form

  const submit = handleSubmit(() => {})

  useFormAutoSubmit({ form, submit })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <NewsletterToggle name='isSubscribed' loading={loading} {...switchProps} form={form as any} />
  )
}

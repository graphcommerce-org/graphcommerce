import { SwitchProps } from '@material-ui/core'
import { useFormAutoSubmit, useFormGqlMutation } from '@reachdigital/react-hook-form'
import React, { useState } from 'react'
import NewsletterToggle from '../NewsletterToggle'
import { SubscribeEmailToNewsletterDocument } from './subscribeEmailToNewsletter.gql'

export type GuestNewsletterToggleProps = SwitchProps & { email?: string }

export default function GuestNewsletterToggle(props: GuestNewsletterToggleProps) {
  const { email, ...switchProps } = props

  const [disabled, setDisabled] = useState<boolean>(false)

  const form = useFormGqlMutation(
    SubscribeEmailToNewsletterDocument,
    {
      mode: 'onChange',
      defaultValues: {
        email: '',
      },
      onBeforeSubmit: (formData) => ({
        email: formData.email ? email ?? '' : '',
      }),
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit } = form

  const submit = handleSubmit(() => {
    setDisabled(true)
  })

  useFormAutoSubmit({ form, submit })

  return <NewsletterToggle name='email' {...switchProps} form={form as any} disabled={disabled} />
}

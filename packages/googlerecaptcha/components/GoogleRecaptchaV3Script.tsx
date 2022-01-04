import { makeStyles } from '@graphcommerce/next-ui'
import Script from 'next/script'
import React from 'react'

const useStyles = makeStyles({ name: 'IconBlock' })({
  '@global': {
    body: {
      '& .grecaptcha-badge': {
        visibility: 'hidden', // https://developers.google.com/recaptcha/docs/faq
      },
    },
  },
})

export default function GoogleRecaptchaV3Script() {
  const siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY
  useStyles()

  if (process.env.NODE_ENV !== 'production' && !siteKey)
    console.warn(
      '[@graphcommerce/googletagmanager]: NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY not found',
    )

  if (!siteKey) return null

  return (
    <Script
      strategy='lazyOnload'
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
    />
  )
}

import Script from 'next/script'
import React from 'react'

export default function GoogleRecaptchaV3Script() {
  const siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY

  if (!siteKey && process.env.NODE_ENV !== 'development')
    console.warn(
      '[@graphcommerce/googlerecaptcha]',
      'NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY not found',
    )

  return (
    <Script
      id={`google-recaptcha-v3-${siteKey}`}
      strategy='lazyOnload'
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      async
      defer
    />
  )
}

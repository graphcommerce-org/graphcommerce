import { GlobalStyles } from '@mui/material'
import Script from 'next/script'
import { useContext } from 'react'
import { recaptchaContext } from '../context/recaptchaContext'

export function GoogleRecaptchaV3Script() {
  const { siteKey, enabled } = useContext(recaptchaContext)

  if (process.env.NODE_ENV !== 'production' && !siteKey && enabled)
    console.warn(
      '[@graphcommerce/googletagmanager]: NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY not found',
    )

  if (!siteKey || !enabled) return null

  return (
    <>
      <Script
        key='google-recaptcha-v3'
        strategy='lazyOnload'
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      />
      <GlobalStyles styles={{ '.grecaptcha-badge': { visibility: 'hidden' } }} />
    </>
  )
}

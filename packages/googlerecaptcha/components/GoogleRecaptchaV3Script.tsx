import { GlobalStyles } from '@mui/material'
import Script from 'next/script'
import { useContext } from 'react'
import { recaptchaContext } from '../context/recaptchaContext'
import { useGoogleRecaptchaSiteKey } from '../hooks/useGoogleRecaptchaSiteKey'

export function GoogleRecaptchaV3Script() {
  const { enabled } = useContext(recaptchaContext)

  const siteKey = useGoogleRecaptchaSiteKey()
  if (!enabled) return null

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

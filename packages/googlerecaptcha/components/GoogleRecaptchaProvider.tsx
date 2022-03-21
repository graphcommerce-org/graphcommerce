import React, { useMemo, useState } from 'react'
import { RecaptchaContext, recaptchaContext } from '../context/recaptchaContext'
import { GoogleRecaptchaV3Script } from './GoogleRecaptchaV3Script'

export function GoogleRecaptchaProvider(props: { children: React.ReactNode; siteKey?: string }) {
  const { children, siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY } = props
  const [enabled, setEnabled] = useState(false)

  const context: RecaptchaContext = useMemo(
    () => ({ enabled, siteKey, enable: () => setEnabled(true) }),
    [enabled, siteKey],
  )

  return (
    <recaptchaContext.Provider value={context}>
      <GoogleRecaptchaV3Script />
      {children}
    </recaptchaContext.Provider>
  )
}

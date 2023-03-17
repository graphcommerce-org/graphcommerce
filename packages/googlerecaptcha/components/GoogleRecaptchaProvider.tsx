import React, { useMemo, useState } from 'react'
import { RecaptchaContext, recaptchaContext } from '../context/recaptchaContext'
import { GoogleRecaptchaV3Script } from './GoogleRecaptchaV3Script'

export function GoogleRecaptchaProvider(props: { children: React.ReactNode }) {
  const { children } = props

  const [enabled, setEnabled] = useState(false)

  const context: RecaptchaContext = useMemo(
    () => ({ enabled, enable: () => setEnabled(true) }),
    [enabled],
  )

  return (
    <recaptchaContext.Provider value={context}>
      <GoogleRecaptchaV3Script />
      {children}
    </recaptchaContext.Provider>
  )
}

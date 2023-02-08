import { useI18nConfig } from '@graphcommerce/next-ui';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react'
import { RecaptchaContext, recaptchaContext } from '../context/recaptchaContext'
import { GoogleRecaptchaV3Script } from './GoogleRecaptchaV3Script'

export function GoogleRecaptchaProvider(props: { children: React.ReactNode; }) {
  const { children,  } = props
  const locale = useRouter().locale;

  const googleRecaptchaKey = useI18nConfig().googleRecaptchaKey || import.meta.graphCommerce.googleRecaptchaKey;

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

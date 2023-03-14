import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import GlobalStyles from '@mui/material/GlobalStyles'
import Script from 'next/script'
import { useState, useMemo } from 'react'
import { recaptchaContext, RecaptchaContext } from '../context/recaptchaContext'
import { useGoogleRecaptchaSiteKey } from '../hooks/useGoogleRecaptchaSiteKey'
import { recaptchaLink } from '../link/recaptchaLink'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'
export const ifConfig = 'googleRecaptchaKey'

function GrecaptchaGraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...prev } = props

  const [enabled, setEnabled] = useState(false)
  const siteKey = useGoogleRecaptchaSiteKey()

  const context: RecaptchaContext = useMemo(
    () => ({ enabled, enable: () => setEnabled(true) }),
    [enabled],
  )

  return (
    <recaptchaContext.Provider value={context}>
      {enabled && (
        <>
          <Script
            key='@graphcommerce/grecaptcha'
            strategy='lazyOnload'
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          />
          <GlobalStyles styles={{ '.grecaptcha-badge': { visibility: 'hidden' } }} />
        </>
      )}
      <Prev
        {...prev}
        // Add recaptcha headers to the request.
        links={[...links, recaptchaLink]}
      />
    </recaptchaContext.Provider>
  )
}

export const Plugin = GrecaptchaGraphQLProvider

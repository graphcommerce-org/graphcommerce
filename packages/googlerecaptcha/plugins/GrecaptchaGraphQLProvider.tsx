import { useQuery, type GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { GlobalStyles } from '@mui/material'
import Script from 'next/script'
import { useMemo, useState } from 'react'
import type { RecaptchaContext } from '../context/recaptchaContext'
import { recaptchaContext } from '../context/recaptchaContext'
import { RecaptchaV3ConfigDocument } from '../graphql/RecaptchaV3Config.gql'
import { recaptchaLink } from '../link/recaptchaLink'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
}

function ReCaptchaScript() {
  const siteKey = useQuery(RecaptchaV3ConfigDocument).data?.recaptchaV3Config?.website_key

  if (!siteKey) return null
  return (
    <Script
      key='@graphcommerce/grecaptcha'
      strategy='lazyOnload'
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
    />
  )
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], children, ...prev } = props

  const [enabled, setEnabled] = useState(false)

  const context: RecaptchaContext = useMemo(
    () => ({ enabled, enable: () => setEnabled(true) }),
    [enabled],
  )

  return (
    <recaptchaContext.Provider value={context}>
      <Prev
        {...prev}
        // Add recaptcha headers to the request.
        links={[...links, recaptchaLink]}
      >
        {children}
        {enabled && <ReCaptchaScript />}
        {enabled && <GlobalStyles styles={{ '.grecaptcha-badge': { visibility: 'hidden' } }} />}
      </Prev>
    </recaptchaContext.Provider>
  )
}

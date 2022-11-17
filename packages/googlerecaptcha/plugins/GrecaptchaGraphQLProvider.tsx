import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { GlobalStyles } from '@mui/material'
import Script from 'next/script'
import { useState, useMemo } from 'react'
import { recaptchaContext, RecaptchaContext } from '../context/recaptchaContext'
import { recaptchaLink } from '../link/recaptchaLink'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

let warned = false

function GrecaptchaGraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...prev } = props

  const [enabled, setEnabled] = useState(false)
  const context: RecaptchaContext = useMemo(
    () => ({
      enabled,
      siteKey: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY,
      enable: () => setEnabled(true),
    }),
    [enabled],
  )

  if (process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY) {
    return (
      <recaptchaContext.Provider value={context}>
        {enabled && (
          <>
            <Script
              key='@graphcommerce/grecaptcha'
              strategy='lazyOnload'
              src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY}`}
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

  if (process.env.NODE_ENV !== 'production') {
    if (!warned) {
      console.info(
        '[@graphcommerce/googlerecaptcha]: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY not found',
      )
      warned = true
    }
  }

  return <Prev {...props} />
}

export const Plugin = GrecaptchaGraphQLProvider

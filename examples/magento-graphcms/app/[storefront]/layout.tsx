import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { i18n, Messages } from '@lingui/core'
import { nl } from 'make-plural/plurals'
import { StrictMode } from 'react'
import { apolloClient } from '../../lib/graphql/graphqlRsc'
import { configFromProps } from '../locale'
import { RootLayoutClient } from './RootLayoutClient'
import { LayoutProps } from './types'

export function generateStaticParams() {
  return import.meta.graphCommerce.storefront.map((storefront) => ({ params: { storefront } }))
}

export default async function RootLayout(props: LayoutProps) {
  const { children, params } = props

  const config = configFromProps(props)
  const linguiLocale = config?.linguiLocale ?? config.locale.split('-')[0]
  const localisationConfig: { messages: Messages } = await import(
    `../../locales/${linguiLocale}.po`
  )
  const messages = { ...localisationConfig.messages }
  i18n.load(linguiLocale, localisationConfig.messages)
  i18n.loadLocaleData({ nl: { plurals: nl } })
  i18n.activate(linguiLocale)

  const client = apolloClient(config.locale)
  const conf = client.query({ query: StoreConfigDocument })
  const apolloState = await conf.then(() => client.cache.extract())

  return (
    <StrictMode>
      <html lang={params.storefront}>
        <head />
        <RootLayoutClient
          messages={messages}
          locale={config.locale}
          apolloState={JSON.parse(JSON.stringify(apolloState))}
        >
          {children}
        </RootLayoutClient>
      </html>
    </StrictMode>
  )
}

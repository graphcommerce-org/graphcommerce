import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { i18n, Messages } from '@lingui/core'
import * as all from 'make-plural/plurals'
import { apolloClient } from '../../lib/graphql/graphqlRsc'
import { configFromProps } from '../locale'
import { RootLayoutClient } from './RootLayoutClient'
import { LayoutProps } from './types'

// Generate static parameters for the storefront
export const generateStaticParams = () =>
  import.meta.graphCommerce.storefront.map((storefront) => ({ params: { storefront } }))

// Load pluralization rules for a specific locale
function loadPluralRulesForLocale(locale: string) {
  const pluralRules = all[locale]

  if (pluralRules) {
    i18n.loadLocaleData({
      [locale]: { plurals: pluralRules },
    })
  }
}

// Load localization data for the given linguiLocale
async function loadLocaleData(linguiLocale: string) {
  const localisationConfig: { messages: Messages } = await import(
    `../../locales/${linguiLocale}.po`
  )
  i18n.load(linguiLocale, localisationConfig.messages)

  // Load pluralization rules for the current locale
  loadPluralRulesForLocale(linguiLocale)

  i18n.activate(linguiLocale)

  return localisationConfig.messages
}

// Fetch the Apollo state for the given locale
async function getApolloState(locale: string) {
  const client = apolloClient(locale)
  await client.query({ query: StoreConfigDocument })
  return client.cache.extract()
}

// RootLayout component responsible for rendering the page layout
export default async function RootLayout(props: LayoutProps) {
  const config = configFromProps(props)
  const linguiLocale = config?.linguiLocale ?? config.locale.split('-')[0]
  const messages = await loadLocaleData(linguiLocale)
  const apolloState = await getApolloState(config.locale)

  return (
    <html lang={props.params.storefront}>
      <head />
      <RootLayoutClient
        locale={config.locale}
        apolloState={JSON.parse(JSON.stringify(apolloState))}
        messages={messages}
        linguiLocale={linguiLocale}
      >
        {props.children}
      </RootLayoutClient>
    </html>
  )
}

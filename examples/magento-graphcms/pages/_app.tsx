import { ApolloProvider, useQuery } from '@apollo/client'
import { LinguiProvider } from '@graphcommerce/lingui-next'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { App, AppProps, GlobalHead } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { lightTheme, darkTheme } from '../components/Theme/ThemedProvider'
import apolloClient from '../lib/apolloClientBrowser'

export default function ThemedApp(props: AppProps) {
  const { pageProps } = props
  const { locale, asPath } = useRouter()
  const darkMode = useRef(asPath.includes('dark'))

  const client = apolloClient(locale, true, pageProps.apolloState)
  const storeConfig = useQuery(StoreConfigDocument, { client })
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  return (
    <>
      <GlobalHead name={name} />
      <ApolloProvider client={client}>
        <LinguiProvider loader={(l) => import(`../locales/${l}.po`)}>
          <ThemeProvider theme={darkMode.current ? darkTheme : lightTheme}>
            <CssBaseline />
            <App {...props} />
          </ThemeProvider>
        </LinguiProvider>
      </ApolloProvider>
    </>
  )
}

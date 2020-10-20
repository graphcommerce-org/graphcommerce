import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from 'generated/documents'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'

const PageLayoutBase = (props: PropsWithChildren<unknown>) => {
  const { children } = props
  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  // todo: update with https://github.com/shadowwalker/next-pwa#step-3-add-head-meta-example
  return (
    <>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='application-name' content={name} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={name} />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='apple-touch-icon' href='/manifest/icon-512-512.png' />
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='shortcut icon' href='/manifest/favicon.ico' />
      </Head>
      {children}
    </>
  )
}

export default PageLayoutBase

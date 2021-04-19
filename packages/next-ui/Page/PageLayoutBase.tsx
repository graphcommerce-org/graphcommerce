import { useTheme } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'
import PageLoadIndicator from '../PageLoadIndicator'

export type PageLayoutBaseProps = { name: string; children: React.ReactNode }

const PageLayoutBase = (props: { name: string; children: React.ReactNode }) => {
  const { children, name } = props
  const theme = useTheme()

  // todo: update with https://github.com/shadowwalker/next-pwa#step-3-add-head-meta-example
  return (
    <>
      <PageLoadIndicator />
      <Head>
        <meta name='theme-color' content={theme.palette.primary.main} />
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

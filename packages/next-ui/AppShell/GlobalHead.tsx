import { useTheme } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'

export type GlobalHeadProps = { name: string }

const GlobalHead = (props: { name: string }) => {
  const { name } = props
  const theme = useTheme()

  return (
    <Head>
      <meta name='theme-color' content={theme.palette.background.default} key='theme-color' />
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width'
        key='viewport'
      />
      <meta name='application-name' content={name} key='application-name' />
      <meta name='apple-mobile-web-app-capable' content='yes' key='apple-mobile-web-app-capable' />
      <meta
        name='apple-mobile-web-app-status-bar-style'
        content='default'
        key='apple-mobile-web-app-status-bar-style'
      />
      <meta name='apple-mobile-web-app-title' content={name} key='apple-mobile-web-app-title' />
      <meta name='format-detection' content='telephone=no' key='format-detection' />
      <meta name='mobile-web-app-capable' content='yes' key='mobile-web-app-capable' />
      <link rel='apple-touch-icon' href='/manifest/icon-512-512.png' key='apple-touch-icon' />
      <link rel='manifest' href='/manifest.webmanifest' key='manifest' />
      <link rel='shortcut icon' href='/manifest/favicon.ico' key='shortcut icon' />
    </Head>
  )
}

export default GlobalHead

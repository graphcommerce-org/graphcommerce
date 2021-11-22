import { App, AppProps } from '@graphcommerce/next-ui'
import React from 'react'
import ThemedProvider from '../components/Theme/ThemedProvider'

export default function Docs(props: AppProps) {
  return (
    <ThemedProvider>
      <App {...props} />
    </ThemedProvider>
  )
}

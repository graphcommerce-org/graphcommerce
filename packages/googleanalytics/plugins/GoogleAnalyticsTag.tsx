/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable react/no-danger */
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { storefrontConfig } from '@graphcommerce/next-ui/server'
import type { DocumentProps } from 'next/document'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/next-ui/server',
  ifConfig: 'googleAnalyticsId',
}

export function DocumentHeadEnd(props: PluginProps<DocumentProps>) {
  const { Prev, ...rest } = props

  const id =
    storefrontConfig(rest.locale)?.googleAnalyticsId ?? import.meta.graphCommerce.googleAnalyticsId

  return (
    <>
      <script async src='https://www.googletagmanager.com/gtag/js?id=G-E0275MGY12' />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${id}');
`,
        }}
      />
      <Prev {...rest} />
    </>
  )
}

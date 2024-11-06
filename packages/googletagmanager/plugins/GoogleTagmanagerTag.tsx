/* eslint-disable react/no-danger */
/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { storefrontConfig } from '@graphcommerce/next-ui/server'
import type { DocumentProps } from 'next/document'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/next-ui/server',
  ifConfig: 'googleTagmanagerId',
}

export function DocumentBodyStart(props: PluginProps<DocumentProps>) {
  const { Prev, ...rest } = props

  const id =
    storefrontConfig(rest.locale)?.googleTagmanagerId ??
    import.meta.graphCommerce.googleTagmanagerId

  if (!id) return <Prev {...rest} />

  return (
    <>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height='0' width='0' style="display: none; visibility: hidden;"></iframe>`,
        }}
      />
      <Prev {...rest} />
    </>
  )
}

export function DocumentHeadEnd(props: PluginProps<DocumentProps>) {
  const { Prev, ...rest } = props

  const id =
    storefrontConfig(rest.locale)?.googleTagmanagerId ??
    import.meta.graphCommerce.googleTagmanagerId

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${id}');
`,
        }}
      />
      <Prev {...rest} />
    </>
  )
}

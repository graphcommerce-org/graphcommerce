import { useStorefrontConfig } from '@graphcommerce/next-ui'
import Script from 'next/script'

export function GoogleAnalyticsScript() {
  const id = useStorefrontConfig().googleAnalyticsId ?? import.meta.graphCommerce.googleAnalyticsId

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id='gtag' strategy='afterInteractive'>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { 'debug_mode':true });
      `}</Script>
    </>
  )
}

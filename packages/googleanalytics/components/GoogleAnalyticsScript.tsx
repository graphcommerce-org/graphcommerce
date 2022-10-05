import Script from 'next/script'

export function GoogleAnalyticsScript() {
  if (process.env.NODE_ENV !== 'production' && !id)
    console.warn('[@graphcommerce/googletagmanager]: NEXT_PUBLIC_GOOGLE_ANALYTICS not found')

  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) return null

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
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', { 'debug_mode':true });
      `}</Script>
    </>
  )
}

import Script from 'next/script'

export function GoogleAnalyticsScript() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

  if (!id) return null

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

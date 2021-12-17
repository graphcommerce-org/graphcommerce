import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useEffect } from 'react'

export default function GoogleAnalyticsScript() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

  if (process.env.NODE_ENV !== 'production' && !id)
    console.warn('[@graphcommerce/googletagmanager]: NEXT_PUBLIC_GOOGLE_ANALYTICS not found')

  const router = useRouter()

  useEffect(() => {
    const onRouteChangeComplete = (url: string) => globalThis.ga?.('send', '', url)
    router.events.on('routeChangeComplete', onRouteChangeComplete)
    return () => router.events.off('routeChangeComplete', onRouteChangeComplete)
  }, [router.events])

  return (
    <>
      <Script strategy='afterInteractive' src='https://www.google-analytics.com/analytics.js' />
      <Script id='gtag-init' strategy='afterInteractive'>{`
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', 'auto');
      `}</Script>
    </>
  )
}

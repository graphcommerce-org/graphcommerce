import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

export function GoogleTagManagerScript() {
  const id = process.env.NEXT_PUBLIC_GTM_ID

  if (process.env.NODE_ENV !== 'production' && !id)
    console.warn('[@graphcommerce/googletagmanager]: NEXT_PUBLIC_GTM_ID not found')

  const router = useRouter()

  useEffect(() => {
    const onRouteChangeComplete = (url: string) => {
      const dataLayer = globalThis.dataLayer as Record<string, unknown>[]
      dataLayer.push({ event: 'pageview', page: url })
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  if (!id) return null

  return (
    <Script id={`gtm-${id}`} strategy='afterInteractive'>{`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', '${id}');
    `}</Script>
  )
}

import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import { useGoogleTagmanagerId } from '../hooks/useGoogleTagmanagerId'

export function GoogleTagManagerScript() {
  const id = useGoogleTagmanagerId()

  const router = useRouter()

  useEffect(() => {
    const onRouteChangeComplete = (url: string) => {
      const dataLayer = globalThis.dataLayer as Record<string, unknown>[] | undefined
      dataLayer?.push({ event: 'pageview', page: url })
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  if (!id) return null

  return (
    <>
      <Script id={`gtm-${id}`} strategy='afterInteractive'>{`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', '${id}');
    `}</Script>
      <noscript>
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}

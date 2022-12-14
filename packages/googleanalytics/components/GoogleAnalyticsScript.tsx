import { useRouter } from 'next/router'
import Script from 'next/script'

export function GoogleAnalyticsScript() {
  const gaEnv = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
  const { locale } = useRouter()
  let id = ''

  if (!gaEnv) return null

  if (gaEnv.startsWith('{') && locale) {
    const GAConfig = JSON.parse(gaEnv)
    id = GAConfig[locale]
  } else {
    id = gaEnv
  }

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

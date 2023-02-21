import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { GoogleAnalyticsScript } from '../components/GoogleAnalyticsScript'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'
export const ifConfig: IfConfig = 'googleAnalyticsId'

let warned = false

function GaFramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props

  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    return (
      <>
        <GoogleAnalyticsScript />
        <Prev {...rest} />
      </>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!warned) {
      console.info(
        '[@graphcommerce/googleanalytics]: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS not found',
      )
      warned = true
    }
  }

  return <Prev {...rest} />
}

export const Plugin = GaFramerNextPages

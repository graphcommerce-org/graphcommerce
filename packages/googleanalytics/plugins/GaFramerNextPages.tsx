import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { GoogleAnalyticsScript } from '../components/GoogleAnalyticsScript'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'
export const ifConfig: IfConfig = 'googleAnalyticsId'

function GaFramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props

  return (
    <>
      <GoogleAnalyticsScript />
      <Prev {...rest} />
    </>
  )
}

export const Plugin = GaFramerNextPages

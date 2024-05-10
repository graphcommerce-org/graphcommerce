import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { IfConfig, PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { GoogleAnalyticsScript } from '../components/GoogleAnalyticsScript'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/framer-next-pages',
  ifConfig: 'googleAnalyticsId',
}

export function FramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props

  return (
    <>
      <GoogleAnalyticsScript />
      <Prev {...rest} />
    </>
  )
}

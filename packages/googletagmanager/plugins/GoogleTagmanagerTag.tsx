import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { IfConfig, PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { GoogleTagManagerScript } from '../components/GoogleTagManagerScript'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'
export const ifConfig: IfConfig = 'googleTagmanagerId'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/framer-next-pages',
  ifConfig: 'googleTagmanagerId',
}

export function FramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props
  return (
    <>
      <GoogleTagManagerScript />
      <Prev {...rest} />
    </>
  )
}

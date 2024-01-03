import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { GoogleTagManagerScript } from '../components/GoogleTagManagerScript'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'
export const ifConfig: IfConfig = 'googleTagmanagerId'

function GtmFramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props
  return (
    <>
      <GoogleTagManagerScript />
      <Prev {...rest} />
    </>
  )
}

export const Plugin = GtmFramerNextPages

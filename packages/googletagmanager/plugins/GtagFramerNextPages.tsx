import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { PluginProps } from '@graphcommerce/next-config'
import { GoogleTagManagerScript } from '../components/GoogleTagManagerScript'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'

let warned = false

function GtagFramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props

  if (process.env.NEXT_PUBLIC_GTM_ID) {
    return (
      <>
        <GoogleTagManagerScript />
        <Prev {...rest} />
      </>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!warned) {
      console.info('[@graphcommerce/googletagmanager]: process.env.NEXT_PUBLIC_GTM_ID not found')
      warned = true
    }
  }

  return <Prev {...rest} />
}

export const Plugin = GtagFramerNextPages

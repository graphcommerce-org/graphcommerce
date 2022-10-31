/* eslint-disable import/no-mutable-exports */
import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { PluginProps } from '@graphcommerce/next-config'
import { GoogleTagManagerScript } from '../components/GoogleTagManagerScript'

export const component = 'FramerNextPages'
export const exported = '@graphcommerce/framer-next-pages'

let warned = false

function AddGoogleTagmanager(props: PluginProps<PagesProps>) {
  const { Prev } = props

  if (process.env.NEXT_PUBLIC_GTM_ID) {
    return (
      <>
        <GoogleTagManagerScript />
        <Prev {...props} />
      </>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!warned) {
      console.info('[@graphcommerce/googletagmanager]: process.env.NEXT_PUBLIC_GTM_ID not found')
      warned = true
    }
  }

  return <Prev {...props} />
}
export const Plugin = AddGoogleTagmanager

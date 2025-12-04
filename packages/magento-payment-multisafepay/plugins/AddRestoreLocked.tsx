import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { MSPRestoreLocked } from '../components/MSPRestoreLocked/MSPRestoreLocked'

export const config: PluginConfig = {
  module: '@graphcommerce/framer-next-pages',
  type: 'component',
}

export function FramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props
  return (
    <>
      <Prev {...rest} />
      <MSPRestoreLocked />
    </>
  )
}

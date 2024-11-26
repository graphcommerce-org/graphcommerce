import type { PagesProps } from '@graphcommerce/framer-next-pages'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/framer-next-pages',
  // ifConfig: 'ociSettings.enabled',
}

export function FramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props
  // const { asPath } = useRouter()

  console.log('TEST!!')

  return <Prev {...rest} />
}

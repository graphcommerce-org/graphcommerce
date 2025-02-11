import type { ApolloErrorFullPageProps } from '@graphcommerce/ecommerce-ui'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useGoogleRecaptcha } from '../hooks/useGoogleRecaptcha'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/ecommerce-ui',
}

export function ApolloErrorFullPage(props: PluginProps<ApolloErrorFullPageProps>) {
  const { Prev, ...rest } = props
  useGoogleRecaptcha()
  return <Prev {...rest} />
}

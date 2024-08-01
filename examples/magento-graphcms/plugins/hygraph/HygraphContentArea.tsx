import type { ContentAreaProps } from '@graphcommerce/graphql-gc-api'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { gcRowHygraphRenderer } from '../../components/GraphCMS/_config/gcRowHygraphRenderer'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql-gc-api',
}

export const ContentArea = (props: PluginProps<ContentAreaProps>) => {
  const { Prev, ...rest } = props
  return <Prev {...rest} renderer={gcRowHygraphRenderer} />
}

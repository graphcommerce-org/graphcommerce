import type { ContentAreaProps } from '@graphcommerce/graphql-gc-api'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { RowRenderer } from '../../components/GraphCMS'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql-gc-api',
}

export const ContentArea = (props: PluginProps<ContentAreaProps>) => {
  const { Prev, ...rest } = props
  const { gcPage } = rest

  return (
    <>
      <Prev {...rest} />
      {gcPage && <RowRenderer {...gcPage} />}
    </>
  )
}

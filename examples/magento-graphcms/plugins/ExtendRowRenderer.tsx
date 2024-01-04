import { PluginProps } from '@graphcommerce/next-config'
import { PageProps, defaultRenderer } from '@graphcommerce/row-renderer'
import { RowProduct } from '../components/GraphCMS/RowProduct/RowProduct'

export const component = 'RowRenderer'
export const exported = '@graphcommerce/row-renderer/components/RowRenderer'

const extendedDefaultRenderer = {
  RowProduct,
}

function ExtendRowRendererPlugin(props: PluginProps<PageProps>) {
  const { Prev, content, ...rest } = props

  return <Prev content={content} renderer={{ ...defaultRenderer, ...extendedDefaultRenderer }} />
}

export const Plugin = ExtendRowRendererPlugin

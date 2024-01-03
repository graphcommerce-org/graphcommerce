import { PluginProps } from '@graphcommerce/next-config'
import { ContentTypeRenderer, TypeRenderer, defaultRenderer } from '@graphcommerce/next-ui'
import { RowProduct, RowProductProps } from '../components/GraphCMS'

export const component = 'RowRenderer'
export const exported = '@graphcommerce/next-ui'

type ExtendedRows = RowProductProps

type ExtendedContentTypeRenderer = TypeRenderer<Array<ExtendedRows>[0]>

type Props = { content: Array<ExtendedRows> } & {
  renderer?: Partial<ContentTypeRenderer>
}

const extendedDefaultRenderer: Partial<ExtendedContentTypeRenderer> = {
  ...defaultRenderer,
  RowProduct,
}

function ExtendRowRendererPlugin(
  props: PluginProps<Props & { renderer?: Partial<ExtendedContentTypeRenderer> }>,
) {
  const { Prev, content } = props

  return <Prev content={content} renderer={extendedDefaultRenderer} />
}

export const Plugin = ExtendRowRendererPlugin

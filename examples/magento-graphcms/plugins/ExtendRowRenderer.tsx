import { PluginProps } from '@graphcommerce/next-config'
import {
  AllRows,
  ContentTypeRenderer,
  PageProps,
  TypeRenderer,
  defaultRenderer,
} from '@graphcommerce/next-ui'
import { RowProduct, RowProductProps } from '../components/GraphCMS'

export const component = 'RowRenderer'
export const exported = '@graphcommerce/next-ui'

type ExtendedContentTypeRenderer = TypeRenderer<Array<AllRows | RowProductProps>[0]>

type Props = PageProps & {
  renderer?: Partial<ContentTypeRenderer> & Partial<ExtendedContentTypeRenderer>
}

const extendedDefaultRenderer: Partial<ExtendedContentTypeRenderer> = {
  ...defaultRenderer,
  RowProduct,
}

function ExtendRowRendererPlugin(props: PluginProps<Props>) {
  const { Prev, content, renderer } = props

  console.log('ExtendRowRendererPlugin', Prev)

  const mergedRenderer = { ...extendedDefaultRenderer, ...renderer } as ContentTypeRenderer

  return <Prev content={content} renderer={mergedRenderer} />
}

export const Plugin = ExtendRowRendererPlugin

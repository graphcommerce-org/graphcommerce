import { PageProps, defaultRenderer } from '@graphcommerce/graphcms-ui'
import { PluginProps } from '@graphcommerce/next-config'

export const component = 'RowRenderer'
export const exported = '@graphcommerce/graphcms-ui/components/RowRenderer'

const extendedRenderer: { [key: string]: (props) => React.ReactElement } = {
  // CustomRow,
}

function ExtendRowRendererPlugin(props: PluginProps<PageProps>) {
  const { Prev, renderer, ...rest } = props

  const mergedRenderer = {
    ...renderer,
    ...extendedRenderer,
  }

  return <Prev {...rest} renderer={mergedRenderer} />
}

export const Plugin = ExtendRowRendererPlugin

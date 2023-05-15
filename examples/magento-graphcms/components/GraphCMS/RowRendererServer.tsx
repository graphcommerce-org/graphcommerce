import { GetHygraphPageReturn } from '@graphcommerce/graphcms-ui/server'
import { RowRenderer, RowRendererProps } from './RowRenderer'

type RowRendererServerProps = Omit<RowRendererProps, 'content'> & GetHygraphPageReturn

export async function RowRendererServer(props: RowRendererServerProps) {
  const { page, ...rest } = props
  return <RowRenderer content={(await page)?.content} {...rest} />
}

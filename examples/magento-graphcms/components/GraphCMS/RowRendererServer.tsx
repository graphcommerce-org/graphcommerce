import { HygraphPageFragment } from '@graphcommerce/graphcms-ui'
import { RowRenderer, RowRendererProps } from './RowRenderer'

type RowRendererServerProps = Omit<RowRendererProps, 'content'> & HygraphPageFragment

export async function RowRendererServer(props: RowRendererServerProps) {
  const { page, ...rest } = props
  const content = (await page)?.content
  return content && <RowRenderer content={content} {...rest} />
}

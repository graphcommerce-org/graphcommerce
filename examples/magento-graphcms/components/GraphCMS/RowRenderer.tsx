import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { RowBlogContent } from '../Blog'
import { PageContentQueryFragment } from './PageContentQueryFragment.gql'
import { RowButtonLinkList } from './RowButtonLinkList/RowButtonLinkList'
import { RowColumnOne } from './RowColumnOne/RowColumnOne'
import { RowColumnThree } from './RowColumnThree/RowColumnThree'
import { RowColumnTwo } from './RowColumnTwo/RowColumnTwo'
import { RowContentLinks } from './RowContentLinks/RowContentLinks'
import { RowHeroBanner } from './RowHeroBanner/RowHeroBanner'
import { RowLinks } from './RowLinks/RowLinks'
import { RowProduct } from './RowProduct/RowProduct'
import { RowQuote } from './RowQuote/RowQuote'
import { RowRendererFragment } from './RowRenderer.gql'
import { RowServiceOptions } from './RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from './RowSpecialBanner/RowSpecialBanner'

type ContentTypeRenderer = TypeRenderer<PageContentQueryFragment['pages'][0]['content'][0]>

const defaultRenderer: Partial<ContentTypeRenderer> = {
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
  RowHeroBanner,
  RowSpecialBanner,
  RowQuote,
  RowBlogContent,
  RowButtonLinkList,
  RowServiceOptions,
  RowContentLinks,
  RowProduct,
  RowLinks,
}

export type PageProps = RowRendererFragment & {
  renderer?: Partial<ContentTypeRenderer>
}

export function RowRenderer(props: PageProps) {
  const { content, renderer } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as ContentTypeRenderer

  return (
    <>
      {content?.map((item) => (
        <RenderType key={item.id} renderer={mergedRenderer} {...item} />
      ))}
    </>
  )
}

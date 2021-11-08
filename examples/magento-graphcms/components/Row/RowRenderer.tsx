import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import RowBlogContent from '../Blog/RowBlogContent'
import { PageContentQueryFragment } from '../GraphQL/PageContentQueryFragment.graphql'
import { RowRendererFragment } from './RowRenderer.graphql'
import {
  RowButtonLinkList,
  RowColumnOne,
  RowColumnThree,
  RowColumnTwo,
  RowContentLinks,
  RowHeroBanner,
  RowQuote,
  RowServiceOptions,
  RowSpecialBanner,
} from '.'

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
}

export type PageProps = RowRendererFragment & {
  renderer?: Partial<ContentTypeRenderer>
}

export default function RowRenderer(props: PageProps) {
  const { content, renderer } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as ContentTypeRenderer

  return (
    <>
      {content?.map((item) => (
        <RenderType renderer={mergedRenderer} key={item.id} {...item} />
      ))}
    </>
  )
}

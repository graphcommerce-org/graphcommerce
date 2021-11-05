import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import RowBlogContent from '../Blog/RowBlogContent'
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
} from '../Row'
import { PageContentQueryFragment } from './PageContentQueryFragment.gql'

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

export type PageProps = Partial<PageContentQueryFragment['pages'][0]> & {
  renderer?: Partial<ContentTypeRenderer>
}

export default function PageContent(props: PageProps) {
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

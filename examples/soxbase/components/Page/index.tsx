import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import RowBlogContent from '../Blog/RowBlogContent'
import RowButtonLinkList from '../RowButtonLinkList'
import RowColumnOne from '../RowColumnOne'
import RowColumnThree from '../RowColumnThree'
import RowColumnTwo from '../RowColumnTwo'
import RowHeroBanner from '../RowHeroBanner'
import RowProductBackstory from '../RowProductBackstory'
import RowProductGrid from '../RowProductGrid'
import RowQuote from '../RowQuote'
import RowServiceOptions from '../RowServiceOptions'
import RowSpecialBanner from '../RowSpecialBanner'
import RowSwipeableGrid from '../RowSwipeableGrid'
import RowContentLinks from '../RowContentLinks'
import { PageFragment } from './Page.gql'

type ContentTypeRenderer = TypeRenderer<PageFragment['content'][0]>

const defaultRenderer: Partial<ContentTypeRenderer> = {
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
  RowHeroBanner,
  RowProductGrid,
  RowSpecialBanner,
  RowQuote,
  RowSwipeableGrid,
  RowProductBackstory,
  RowBlogContent,
  RowButtonLinkList,
  RowServiceOptions,
  RowContentLinks,
}

export type PageProps = PageFragment & { renderer?: Partial<ContentTypeRenderer> }

export default function Page({ content, renderer }: PageProps) {
  const mergedRenderer = { ...defaultRenderer, ...renderer }

  return (
    <>
      {content.map((item) => (
        <RenderType renderer={mergedRenderer as ContentTypeRenderer} key={item.id} {...item} />
      ))}
    </>
  )
}

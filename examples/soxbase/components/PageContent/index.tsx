import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import RowBlogContent from '../Blog/RowBlogContent'
import RowButtonLinkList from '../RowButtonLinkList'
import RowColumnOne from '../RowColumnOne'
import RowColumnThree from '../RowColumnThree'
import RowColumnTwo from '../RowColumnTwo'
import RowContentLinks from '../RowContentLinks'
import RowHeroBanner from '../RowHeroBanner'
import RowProductBackstory from '../RowProductBackstory'
import RowProductGrid from '../RowProductGrid'
import RowQuote from '../RowQuote'
import RowServiceOptions from '../RowServiceOptions'
import RowSpecialBanner from '../RowSpecialBanner'
import RowSwipeableGrid from '../RowSwipeableGrid'
import { PageContentQueryFragment } from './PageContentQueryFragment.gql'

type ContentTypeRenderer = TypeRenderer<PageContentQueryFragment['pages'][0]['content'][0]>

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

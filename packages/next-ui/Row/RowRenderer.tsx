import { RenderType, TypeRenderer } from '../RenderType'
import { RowBlogContent, RowBlogContentProps } from './BlogContent'
import { RowButtonLinkList, RowButtonLinkListProps } from './ButtonLinkList'
import { RowColumnOne, RowColumnOneProps } from './ColumnOne'
import { RowColumnThree, RowColumnThreeProps } from './ColumnThree'
import { RowColumnTwo, RowColumnTwoProps } from './ColumnTwo'
import { RowContentLinks, RowContentLinksProps } from './ContentLinks'
import { RowHeroBanner, RowHeroBannerProps } from './HeroBanner'
import { RowLinks, RowLinksProps } from './Links'
import { RowQuote, RowQuoteProps } from './Quote'
import { RowServiceOptions, RowServiceOptionsProps } from './ServiceOptions'
import { RowSpecialBanner, RowSpecialBannerProps } from './SpecialBanner'

export type AllRows =
  | RowColumnOneProps
  | RowColumnTwoProps
  | RowColumnThreeProps
  | RowHeroBannerProps
  | RowSpecialBannerProps
  | RowQuoteProps
  | RowBlogContentProps
  | RowButtonLinkListProps
  | RowServiceOptionsProps
  | RowContentLinksProps
  | RowLinksProps

type ContentTypeRenderer = TypeRenderer<Array<AllRows>[0]>

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
  RowLinks,
}

export type PageProps = { content: Array<AllRows> } & {
  renderer?: Partial<ContentTypeRenderer>
}

export function RowRenderer(props: PageProps) {
  const { content, renderer } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as ContentTypeRenderer

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{content?.map((item) => <RenderType key={item.id} renderer={mergedRenderer} {...item} />)}</>
  )
}

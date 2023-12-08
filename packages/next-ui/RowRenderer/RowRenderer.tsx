import { RenderType, TypeRenderer } from '../RenderType'
import { RowBlogContent, RowBlogContentProps } from './RowBlogContent'
import { RowButtonLinkList, RowButtonLinkListProps } from './RowButtonLinkList'
import { RowColumnOne, RowColumnOneProps } from './RowColumnOne'
import { RowColumnThree, RowColumnThreeProps } from './RowColumnThree'
import { RowColumnTwo, RowColumnTwoProps } from './RowColumnTwo'
import { RowContentLinks, RowContentLinksProps } from './RowContentLinks'
import { RowHeroBanner, RowHeroBannerProps } from './RowHeroBanner'
import { RowLinks, RowLinksProps } from './RowLinks'
import { RowProduct, RowProductProps } from './RowProduct'
import { RowQuote, RowQuoteProps } from './RowQuote'
import { RowServiceOptions, RowServiceOptionsProps } from './RowServiceOptions'
import { RowSpecialBanner, RowSpecialBannerProps } from './RowSpecialBanner'

type AllRows = Array<
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
  | RowProductProps
  | RowLinksProps
>

type ContentTypeRenderer = TypeRenderer<AllRows[0]>

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

export type PageProps = { content: AllRows } & {
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

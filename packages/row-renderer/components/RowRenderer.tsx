import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { RowBlogContent, RowBlogContentProps } from './RowBlogContent'
import { RowButtonLinkList, RowButtonLinkListProps } from './RowButtonLinkList'
import { RowColumnOne, RowColumnOneProps } from './RowColumnOne'
import { RowColumnThree, RowColumnThreeProps } from './RowColumnThree'
import { RowColumnTwo, RowColumnTwoProps } from './RowColumnTwo'
import { RowContentLinks, RowContentLinksProps } from './RowContentLinks'
import { RowHeroBanner, RowHeroBannerProps } from './RowHeroBanner'
import { RowLinks, RowLinksProps } from './RowLinks'
import { RowQuote, RowQuoteProps } from './RowQuote'
import { RowServiceOptions, RowServiceOptionsProps } from './RowServiceOptions'
import { RowSpecialBanner, RowSpecialBannerProps } from './RowSpecialBanner'

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

export type ContentTypeRenderer = TypeRenderer<Array<AllRows>[0]>

export const defaultRenderer: Partial<ContentTypeRenderer> = {
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

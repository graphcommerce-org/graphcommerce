import {
  RenderType,
  TypeRenderer,
  RowColumnOne,
  RowColumnOneProps,
  RowLinks,
  RowLinksProps,
  RowQuote,
  RowQuoteProps,
  RowColumnTwo,
  RowColumnTwoProps,
  RowColumnThree,
  RowColumnThreeProps,
  RowBlogContent,
  RowBlogContentProps,
  RowButtonLinkList,
  RowButtonLinkListProps,
  RowContentLinks,
  RowContentLinksProps,
} from '@graphcommerce/next-ui'
import { RowHeroBanner, RowHeroBannerProps } from './RowHeroBanner'
import { RowProduct, RowProductProps } from './RowProduct'
import { RowServiceOptions, RowServiceOptionsProps } from './RowServiceOptions'
import { RowSpecialBanner, RowSpecialBannerProps } from './RowSpecialBanner'

export type AllRows = Array<
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { RowBlogContent } from './RowBlogContent/RowBlogContent'
import { RowButtonLinkList } from './RowButtonLinkList/RowButtonLinkList'
import { RowColumnOne } from './RowColumnOne/RowColumnOne'
import { RowColumnThree } from './RowColumnThree/RowColumnThree'
import { RowColumnTwo } from './RowColumnTwo/RowColumnTwo'
import { RowContentLinks } from './RowContentLinks/RowContentLinks'
import { RowHeroBanner } from './RowHeroBanner/RowHeroBanner'
import { RowLinks } from './RowLinks/RowLinks'
import { RowProduct } from './RowProduct/RowProduct'
import { RowQuote } from './RowQuote/RowQuote'
import { RowServiceOptions } from './RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from './RowSpecialBanner/RowSpecialBanner'
import { RowColumnTwoProps } from './RowColumnTwo/input'
import { RowColumnOneProps } from './RowColumnOne/input'
import { RowBlogContentProps } from './RowBlogContent/input'
import { RowButtonLinkListProps } from './RowButtonLinkList/input'
import { RowColumnThreeProps } from './RowColumnThree/input'
import { RowContentLinksProps } from './RowContentLinks/input'
import { RowHeroBannerProps } from './RowHeroBanner/input'
import { RowProductProps } from './RowProduct/input'
import { RowQuoteProps } from './RowQuote/input'
import { RowServiceOptionsProps } from './RowServiceOptions/input'
import { RowSpecialBannerProps } from './RowSpecialBanner/input'
import { RowLinksProps } from './RowLinks/input'

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

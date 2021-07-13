import { RenderType, TypeRenderer } from '@reachdigital/next-ui'
import RowColumnOne from '../RowColumnOne'
import RowColumnThree from '../RowColumnThree'
import RowColumnTwo from '../RowColumnTwo'
import RowContentLinks from '../RowContentLinks'
import RowProductFeature from '../RowProductFeature'
import RowProductFeatureBoxed from '../RowProductFeatureBoxed'
import RowProductRelated from '../RowProductRelated'
import RowProductReviews from '../RowProductReviews'
import RowProductSpecs from '../RowProductSpecs'
import RowProductUpsells from '../RowProductUpsells'
import RowQuote from '../RowQuote'
import RowSpecialBanner from '../RowSpecialBanner'
import { ProductpagesContentQueryFragment } from './ProductpagesContentQueryFragment.gql'

type ContentTypeRenderer = TypeRenderer<
  ProductpagesContentQueryFragment['productpages'][0]['content'][0]
>

const defaultRenderer: Partial<ContentTypeRenderer> = {
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
  RowSpecialBanner,
  RowContentLinks,
  RowProductFeature,
  RowProductFeatureBoxed,
  RowProductReviews,
  RowProductUpsells,
  RowProductSpecs,
  RowProductRelated,
  RowQuote,
}

export type ProductProps = ProductpagesContentQueryFragment['productpages'][0] & {
  renderer?: Partial<ContentTypeRenderer>
}

export default function ProductpagesContent(props: ProductProps) {
  const { content, renderer } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as ContentTypeRenderer

  return (
    <>
      {content.map((item) => (
        <RenderType renderer={mergedRenderer} key={item.id} {...item} />
      ))}
    </>
  )
}

import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
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

import { ProductContentFragment } from './ProductContent.gql'

type ContentTypeRenderer = TypeRenderer<ProductContentFragment['content'][0]>

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

export type ProductProps = ProductContentFragment & { renderer?: Partial<ContentTypeRenderer> }

export default function Product({ content, renderer }: ProductProps) {
  const mergedRenderer = { ...defaultRenderer, ...renderer }

  return (
    <>
      {content &&
        content.map((item) => (
          <RenderType renderer={mergedRenderer as ContentTypeRenderer} key={item.id} {...item} />
        ))}
    </>
  )
}

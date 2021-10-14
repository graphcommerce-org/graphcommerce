// import { RenderType, TypeRenderer } from '@graphcommerce/next-ui'
// import RowColumnOne from '../Row/RowColumnOne'
// import RowColumnThree from '../Row/RowColumnThree'
// import RowColumnTwo from '../Row/RowColumnTwo'
// import RowContentLinks from '../Row/RowContentLinks'
// import RowProductFeature from '../Row/RowProductFeature'
// import RowProductFeatureBoxed from '../Row/RowProductFeatureBoxed'
// import RowProductRelated from '../Row/RowProductRelated'
// import RowProductReviews from '../Row/RowProductReviews'
// import RowProductSpecs from '../Row/RowProductSpecs'
// import RowProductUpsells from '../Row/RowProductUpsells'
// import RowQuote from '../Row/RowQuote'
// import RowSpecialBanner from '../Row/RowSpecialBanner'
// import { ProductpagesContentQueryFragment } from './ProductpagesContentQueryFragment.gql'

// type ContentTypeRenderer = TypeRenderer<
//   ProductpagesContentQueryFragment['productpages'][0]['content'][0]
// >

// const defaultRenderer: Partial<ContentTypeRenderer> = {
//   RowColumnOne,
//   RowColumnTwo,
//   RowColumnThree,
//   RowSpecialBanner,
//   RowContentLinks,
//   RowProductFeature,
//   RowProductFeatureBoxed,
//   RowProductReviews,
//   RowProductUpsells,
//   RowProductSpecs,
//   RowProductRelated,
//   RowQuote,
// }

// export type ProductProps = ProductpagesContentQueryFragment['productpages'][0] & {
//   renderer?: Partial<ContentTypeRenderer>
// }

/*
 Renders 'Row Product' model data from GraphCMS as a component based on the 'variant' field
*/
export default function RowProductRenderer(props: any) {
  // const { content, renderer } = props
  // const mergedRenderer = { ...defaultRenderer, ...renderer } as ContentTypeRenderer

  return (
    <>
      RowProductRenderer
      {/* {content.map((item) => (
        <RenderType renderer={mergedRenderer} key={item.id} {...item} />
      ))} */}
    </>
  )
}

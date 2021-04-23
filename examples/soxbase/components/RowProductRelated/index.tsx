import { RelatedProductsFragment } from '@reachdigital/magento-product-types/RelatedProducts.gql'
import RenderType from '@reachdigital/next-ui/RenderType'
import ProductRelated from '@reachdigital/next-ui/Row/ProductRelated'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import renderers from '../ProductListItems/renderers'
import { RowProductRelatedFragment } from './RowProductRelated.gql'

type RowProductRelatedProps = RowProductRelatedFragment & RelatedProductsFragment

function RelatedProducts(props: RowProductRelatedProps & UseStyles<any>) {
  const { related_products, classes } = props

  return (
    <>
      {related_products?.map((item) =>
        item ? (
          <RenderType
            key={item.id ?? ''}
            renderer={renderers}
            {...item}
            classes={{ item: classes?.item }}
          />
        ) : null,
      )}
    </>
  )
}

export default function RowProductRelated(props: RowProductRelatedProps) {
  const { title, related_products } = props

  if (!related_products || related_products.length === 0) return null

  return (
    <ProductRelated
      title={title}
      RelatedProducts={(itemClasses) => <RelatedProducts {...itemClasses} {...props} />}
    />
  )
}

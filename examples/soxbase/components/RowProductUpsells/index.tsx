import { UpsellProductsFragment } from '@reachdigital/magento-product-types/UpsellProducts.gql'
import RenderType from '@reachdigital/next-ui/RenderType'
import ProductUpsells from '@reachdigital/next-ui/Row/ProductUpsells'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import renderers from '../ProductListItems/renderers'
import { RowProductUpsellsFragment } from './RowProductUpsells.gql'

type RowProductUpsellsProps = RowProductUpsellsFragment & UpsellProductsFragment

function UpsellProducts(props: RowProductUpsellsProps & UseStyles<any>) {
  const { upsell_products, classes } = props

  return (
    <>
      {upsell_products?.map((item) =>
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

export default function RowProductUpsells(props: RowProductUpsellsProps) {
  const { title, upsell_products } = props

  if (!upsell_products || upsell_products.length === 0) return null

  return (
    <ProductUpsells
      title={title}
      ProductUpsells={(itemClasses) => <UpsellProducts {...itemClasses} {...props} />}
    />
  )
}

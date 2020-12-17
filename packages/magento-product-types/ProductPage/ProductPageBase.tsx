import { Theme, makeStyles } from '@material-ui/core'
import { Maybe } from '@reachdigital/magento-graphql'
import { ProductListItemProps } from '@reachdigital/magento-product/ProductListItem'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import { ProductPageRendererFragment } from './ProductPageRenderer.gql'

const useProductPageStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
  }),
  { name: 'ProductList' },
)

export type ProductPageBaseProps = {
  item: Maybe<ProductPageRendererFragment>
  renderers: TypeRenderer<ProductPageRendererFragment>
} & UseStyles<typeof useProductPageStyles> &
  React.HTMLAttributes<HTMLDivElement>

export default function ProductPageBase(props: ProductPageBaseProps) {
  const { item, renderers } = props
  if (!item) return null
  return (
    <div>
      <RenderType key={item?.id ?? ''} renderer={renderers} {...item} />
    </div>
  )
}

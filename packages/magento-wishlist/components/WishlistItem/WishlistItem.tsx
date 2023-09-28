import { InputMaybe } from '@graphcommerce/graphql-mesh'
import { SxProps, Theme } from '@mui/material'
import { WishListItem } from '../../hooks'
import { ProductAddToCart } from './ProductAddToCart'
import { WishlistItemBase } from './WishlistItemBase'

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemProps = WishListItem & {
  sx?: SxProps<Theme>
  selectedOptions?: InputMaybe<string[]> | undefined
  children?: React.ReactNode
} & OptionalProductWishlistParent

export function WishlistItem(props: WishlistItemProps) {
  const { product, selectedOptions } = props

  return (
    <WishlistItemBase {...props}>
      <ProductAddToCart
        variables={{ sku: product?.sku ?? '', quantity: 1, selectedOptions }}
        name={product?.name ?? ''}
        price={product?.price_range.minimum_price.final_price ?? {}}
      />
    </WishlistItemBase>
  )
}

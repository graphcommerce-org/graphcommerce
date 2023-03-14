import { InputMaybe } from '@graphcommerce/graphql-mesh'
import { SxProps, Theme } from '@mui/material/styles'
import { ProductAddToCart } from './ProductAddToCart'
import { WishlistItemBase } from './WishlistItemBase'
import { WishlistItemProductFragment } from './WishlistItemProduct.gql'

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemProps = WishlistItemProductFragment & {
  sx?: SxProps<Theme>
  selectedOptions?: InputMaybe<string[]> | undefined
  children?: React.ReactNode
} & OptionalProductWishlistParent

export function WishlistItem(props: WishlistItemProps) {
  const { sku, name, price_range, selectedOptions } = props

  return (
    <WishlistItemBase {...props}>
      <ProductAddToCart
        variables={{ sku: sku ?? '', quantity: 1, selectedOptions }}
        name={name ?? ''}
        price={price_range.minimum_price.final_price}
      />
    </WishlistItemBase>
  )
}

import { Image } from '@graphcommerce/image'
import { Money } from '@graphcommerce/magento-store'
import { ActionCard, ActionCardProps, responsiveVal } from '@graphcommerce/next-ui'
import { CartItemFragment } from '../../Api/CartItem.gql'
import { RemoveItemFromCartFab } from '../../RemoveItemFromCart/RemoveItemFromCartFab'
import { UpdateItemQuantity } from '../../UpdateItemQuantity/UpdateItemQuantity'

export type ActionCartItemProps = Omit<
  ActionCardProps,
  'value' | 'image' | 'price' | 'title' | 'action'
>

export const productImageSizes = {
  small: responsiveVal(50, 60),
  medium: responsiveVal(60, 80),
  large: responsiveVal(80, 100),
}

export function ActionCartItem(props: CartItemFragment & ActionCartItemProps) {
  const { uid, quantity, prices, product, sx = [], details, size = 'medium', ...cardProps } = props

  return (
    <ActionCard
      {...cardProps}
      value={uid}
      size={size}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
      image={
        product.thumbnail?.url && (
          <Image
            src={product.thumbnail?.url}
            width={50}
            height={50}
            sx={{
              width: productImageSizes[size],
              height: productImageSizes[size],
              display: 'block',
              borderRadius: 1,
            }}
            sizes={productImageSizes[size]}
          />
        )
      }
      price={<Money {...prices?.row_total_including_tax} />}
      title={product.name}
      details={
        <>
          {details}
          <UpdateItemQuantity uid={uid} quantity={quantity} />
        </>
      }
      action={
        <RemoveItemFromCartFab uid={uid} quantity={quantity} prices={prices} product={product} />
      }
    />
  )
}

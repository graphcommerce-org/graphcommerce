import { Image } from '@graphcommerce/image'
import { Money } from '@graphcommerce/magento-store'
import { ActionCard, ActionCardProps, responsiveVal } from '@graphcommerce/next-ui'
import { CartItemFragment } from '../../Api/CartItem.gql'
import { RemoveItemFromCartFab } from '../../RemoveItemFromCart/RemoveItemFromCartFab'
import { UpdateItemQuantity } from '../../UpdateItemQuantity/UpdateItemQuantity'

export type ActionCartItemProps = Omit<
  ActionCardProps,
  'value' | 'image' | 'price' | 'title' | 'action'
> & {
  readonly?: boolean
}

export const swatchSizes = {
  small: responsiveVal(50, 60),
  medium: responsiveVal(60, 80),
  large: responsiveVal(80, 100),
}

export function ActionCartItem(props: CartItemFragment & ActionCartItemProps) {
  const {
    uid,
    quantity,
    prices,
    product: { name, thumbnail },
    sx = [],
    details,
    readonly = false,
    size = 'medium',
    ...cardProps
  } = props

  const iconsizze = swatchSizes[size]

  return (
    <ActionCard
      {...cardProps}
      value={uid}
      size={size}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
      image={
        thumbnail?.url && (
          <Image
            layout='fill'
            src={thumbnail?.url}
            sx={{ width: iconsizze, height: iconsizze, display: 'block', borderRadius: 1 }}
            sizes={iconsizze}
          />
        )
      }
      price={<Money {...prices?.row_total_including_tax} />}
      title={name}
      details={
        <>
          {details}
          {!readonly && <UpdateItemQuantity uid={uid} quantity={quantity} />}
        </>
      }
      action={<RemoveItemFromCartFab uid={uid} />}
    />
  )
}

import { Image } from '@graphcommerce/image'
import { Money } from '@graphcommerce/magento-store'
import { ActionCard, ActionCardProps, responsiveVal, useIconSvgSize } from '@graphcommerce/next-ui'
import { CartItemFragment } from '../Api/CartItem.gql'
import { RemoveItemFromCartFab } from '../RemoveItemFromCart/RemoveItemFromCartFab'
import { UpdateItemQuantity } from '../UpdateItemQuantity/UpdateItemQuantity'

type ActionCartItemProps = CartItemFragment & Pick<ActionCardProps, 'sx'>

export function ActionCartItem(props: ActionCartItemProps) {
  const {
    uid,
    quantity,
    prices,
    product: { name, thumbnail },
    sx = [],
  } = props

  const size = responsiveVal(60, 80)

  return (
    <ActionCard
      {...props}
      value={uid}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
      image={
        thumbnail?.url && (
          <Image
            layout='fill'
            src={thumbnail?.url}
            sx={{ width: size, height: size, display: 'block' }}
            sizes={size}
          />
        )
      }
      price={<Money {...prices?.price} />}
      title={name}
      details={<UpdateItemQuantity uid={uid} quantity={quantity} />}
      action={<RemoveItemFromCartFab uid={uid} />}
    />
  )
}

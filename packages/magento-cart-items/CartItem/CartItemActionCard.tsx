import { Image } from '@graphcommerce/image'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardProps,
  responsiveVal,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Box, Link } from '@mui/material'
import { CartItemFragment } from '../Api/CartItem.gql'
import { RemoveItemFromCartFab } from '../RemoveItemFromCart/RemoveItemFromCartFab'
import { UpdateItemQuantity } from '../UpdateItemQuantity/UpdateItemQuantity'
import { SelectedCustomizableOptions } from '../components/SelectedCustomizableOptions'

export type CartItemActionCardProps = { cartItem: CartItemFragment } & Omit<
  ActionCardProps,
  'value' | 'image' | 'price' | 'title' | 'action'
>

export const productImageSizes = {
  small: responsiveVal(50, 60),
  medium: responsiveVal(60, 80),
  large: responsiveVal(80, 100),
}

export function CartItemActionCard(props: CartItemActionCardProps) {
  const { cartItem, sx = [], size = 'large', ...rest } = props

  const {
    uid,
    quantity,
    prices,
    errors,
    product: { name, thumbnail, url_key },
  } = cartItem

  return (
    <ActionCard
      value={uid}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
      image={
        thumbnail?.url && (
          <Image
            layout='fill'
            src={thumbnail?.url}
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
      title={
        url_key ? (
          <Link
            href={url_key}
            variant='body1'
            underline='hover'
            sx={(theme) => ({
              typgrapht: 'subtitle1',
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.text.primary,
              textDecoration: 'none',
              flexWrap: 'nowrap',
              maxWidth: 'max-content',
              '&:not(.withOptions)': {
                alignSelf: 'flex-end',
              },
            })}
          >
            {name}
          </Link>
        ) : (
          name
        )
      }
      secondaryAction={
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
            gap: theme.spacings.xxs,
          })}
        >
          <UpdateItemQuantity uid={uid} quantity={quantity} sx={{ my: 1 }} />
          <Box>
            {' x '}
            <Money {...prices?.price_including_tax} />
          </Box>
        </Box>
      }
      action={<RemoveItemFromCartFab uid={uid} quantity={quantity} />}
      size={size}
      after={filterNonNullableKeys(errors).map((error) => (
        <Box sx={{ color: 'error.main', typography: 'caption' }} key={error.message}>
          {error.message}
        </Box>
      ))}
      {...rest}
    />
  )
}

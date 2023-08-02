import { Image } from '@graphcommerce/image'
import { useDisplayInclTax } from '@graphcommerce/magento-cart/hooks'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardProps,
  responsiveVal,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Box, Link } from '@mui/material'
import { CartItemFragment } from '../../Api/CartItem.gql'
import { RemoveItemFromCart } from '../RemoveItemFromCart/RemoveItemFromCart'
import { UpdateItemQuantity } from '../UpdateItemQuantity/UpdateItemQuantity'

export type CartItemActionCardProps = { cartItem: CartItemFragment } & Omit<
  ActionCardProps,
  'value' | 'image' | 'price' | 'title' | 'action'
>

export const productImageSizes = {
  small: responsiveVal(60, 80),
  medium: responsiveVal(60, 80),
  large: responsiveVal(100, 120),
}

const typographySizes = {
  small: 'body2',
  medium: 'body1',
  large: 'subtitle1',
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

  const inclTaxes = useDisplayInclTax()

  return (
    <ActionCard
      value={uid}
      sx={[
        (theme) => ({
          '&.ActionCard-root': {
            px: 0,
            py: theme.spacings.xs,
          },
          '& .MuiBox-root': {
            justifyContent: 'space-between',
            alignItems: 'stretch',
          },
          '&.sizeSmall': {
            px: 0,
          },
          '& .ActionCard-image': {
            alignSelf: 'flex-start',
            transform: 'translateY(10px)',
          },
          '& .ActionCard-secondaryAction': {
            typography: typographySizes[size],
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
            mt: 1,
            gap: '10px',
            justifyContent: 'start',
          },
          '& .ActionCard-price': {
            typography: typographySizes[size],
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
      price={
        inclTaxes ? (
          <Money
            value={prices?.row_total_including_tax?.value ?? 0}
            currency={prices?.price.currency}
          />
        ) : (
          <Money {...prices?.row_total} />
        )
      }
      title={
        url_key ? (
          <Link
            href={url_key}
            underline='hover'
            sx={{
              color: 'inherit',
              flexWrap: 'nowrap',
              maxWidth: 'max-content',
            }}
          >
            {name}
          </Link>
        ) : (
          name
        )
      }
      secondaryAction={
        <>
          <UpdateItemQuantity uid={uid} quantity={quantity} />
          {' ⨉ '}
          {inclTaxes ? (
            <Money
              value={(prices?.row_total_including_tax?.value ?? 0) / quantity}
              currency={prices?.price.currency}
            />
          ) : (
            <Money {...prices?.price} />
          )}
        </>
      }
      action={<RemoveItemFromCart uid={uid} quantity={quantity} buttonProps={{ size }} />}
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

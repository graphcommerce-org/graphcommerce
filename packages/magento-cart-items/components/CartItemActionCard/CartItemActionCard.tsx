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

export type CartItemActionCardProps = { cartItem: CartItemFragment; readOnly?: boolean } & Omit<
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
  const { cartItem, sx = [], size = 'large', readOnly = false, ...rest } = props
  const { uid, quantity, prices, errors, product } = cartItem
  const { name, thumbnail, url_key } = product

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
          '& .ActionCard-end': {
            justifyContent: readOnly ? 'center' : 'space-between',
          },
          '& .ActionCard-action': {
            pr: readOnly ? 0 : theme.spacings.xs,
          },
          '& .ActionCard-image': {
            alignSelf: 'flex-start',
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
            pr: readOnly ? 0 : theme.spacings.xs,
            mb: { xs: 0.5, sm: 0 },
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
          {readOnly ? quantity : <UpdateItemQuantity uid={uid} quantity={quantity} />}
          {' ｘ '}

          <Money
            value={
              inclTaxes
                ? (prices?.row_total_including_tax?.value ?? 0) / quantity
                : prices?.price.value
            }
            currency={prices?.price.currency}
          />
        </>
      }
      price={<Money {...(inclTaxes ? prices?.row_total_including_tax : prices?.row_total)} />}
      action={
        !readOnly && (
          <RemoveItemFromCart
            uid={uid}
            quantity={quantity}
            product={product}
            buttonProps={{ size }}
          />
        )
      }
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

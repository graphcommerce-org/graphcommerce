import { Image } from '@graphcommerce/image'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCardProps,
  responsiveVal,
  ActionCard,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { CartItemFragment } from '@graphcommerce/magento-cart-items/Api/CartItem.gql'
import { Box, Link } from '@mui/material'
import { useDisplayInclTax } from '../../hooks'

export type CartSummaryItemActionCardProps = { cartItem: CartItemFragment } & Omit<
  ActionCardProps,
  'value' | 'image' | 'price' | 'title' | 'action'
>

export const productImageSizes = {
  small: responsiveVal(60, 80),
  medium: responsiveVal(60, 80),
  large: responsiveVal(80, 100),
}

export function CartSummaryItemActionCard(props: CartSummaryItemActionCardProps) {
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
        {
          '& .ActionCard-image': {
            alignSelf: 'flex-start',
            transform: 'translateY(10px)',
          },
          '&.sizeSmall': {
            px: 0,
          },
        },
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
        <Box
          sx={{
            transform: 'translateY(-6px)',
          }}
        >
          {inclTaxes ? (
            <Money
              value={prices?.row_total_including_tax?.value ?? 0}
              currency={prices?.price.currency}
            />
          ) : (
            <Money {...prices?.row_total} />
          )}
        </Box>
      }
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
            mt: 1,
            gap: theme.spacings.xxs,
          })}
        >
          <Box>
            {`${quantity} ⨉ `}
            {inclTaxes ? (
              <Money
                value={(prices?.row_total_including_tax?.value ?? 0) / quantity}
                currency={prices?.price.currency}
              />
            ) : (
              <Money {...prices?.price} />
            )}
          </Box>
        </Box>
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

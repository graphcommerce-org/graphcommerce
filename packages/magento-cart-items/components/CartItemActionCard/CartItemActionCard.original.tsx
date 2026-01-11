import { Image } from '@graphcommerce/image'
import { useDisplayInclTax } from '@graphcommerce/magento-cart/hooks'
import { productPath } from '@graphcommerce/magento-product'
import { Money, PriceModifiersList, type PriceModifier } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import {
  ActionCard,
  actionCardImageSizes,
  filterNonNullableKeys,
  sxx,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Box, Button, Link } from '@mui/material'
import type { CartItemFragment } from '../../Api/CartItem.gql'
import { RemoveItemFromCart } from '../RemoveItemFromCart/RemoveItemFromCart'
import { UpdateItemQuantity } from '../UpdateItemQuantity/UpdateItemQuantity'

export type CartItemActionCardProps = {
  cartItem: CartItemFragment
  readOnly?: boolean
  priceModifiers?: PriceModifier[]
} & Omit<ActionCardProps, 'value' | 'image' | 'title'>

export function CartItemActionCard(props: CartItemActionCardProps) {
  const {
    cartItem,
    sx = [],
    size = 'responsive',
    readOnly = false,
    priceModifiers,
    ...rest
  } = props
  const { uid, quantity, prices, errors, product } = cartItem

  const inclTaxes = useDisplayInclTax()

  let price: number | null | undefined

  if (inclTaxes) {
    if (prices?.price_including_tax) {
      price = prices.price_including_tax.value
    } else {
      const rowTotalIncludingTax = prices?.row_total_including_tax?.value ?? 0
      price = rowTotalIncludingTax / quantity
    }
  } else {
    price = prices?.price.value
  }

  const hasOptions = !(
    (cartItem.__typename === 'SimpleCartItem' || cartItem.__typename === 'VirtualCartItem') &&
    cartItem.customizable_options.length === 0
  )

  return (
    <ActionCard
      value={uid}
      sx={sxx(
        (theme) => ({
          '&.ActionCard-root': {
            px: 0,
            py: theme.spacings.xs,
          },
          '& .ActionCard-rootInner': {
            justifyContent: 'space-between',
            alignItems: 'stretch',
          },
          '&.sizeSmall': {
            px: 0,
          },
          '&.sizeResponsive': {
            [theme.breakpoints.down('md')]: { px: 0 },
          },
          '& .ActionCard-end': {
            justifyContent: 'space-between',
          },
          '& .ActionCard-image': {
            alignSelf: 'flex-start',
          },
          '& .ActionCard-secondaryAction': {
            display: 'grid',
            rowGap: theme.spacings.xs,
            justifyItems: 'start',
          },
          '& .ActionCard-price': {
            mb: { xs: 0.5, sm: 0 },
          },
        }),
        readOnly
          ? {
              '& .ActionCard-action': {
                pr: 0,
              },
            }
          : (theme) => ({
              '& .ActionCard-action': {
                pr: theme.spacings.xs,
              },
            }),
        readOnly
          ? {
              '& .ActionCard-price': {
                pr: 0,
              },
            }
          : (theme) => ({
              '& .ActionCard-price': {
                pr: theme.spacings.xs,
              },
            }),
        sx,
      )}
      image={
        product.thumbnail?.url ? (
          <Image
            layout='fill'
            src={product.thumbnail.url}
            sx={{
              width: actionCardImageSizes[size],
              height: actionCardImageSizes[size],
              display: 'block',
              borderRadius: 1,
              objectFit: 'contain',
            }}
            sizes={actionCardImageSizes[size]}
          />
        ) : (
          <Box sx={{ width: actionCardImageSizes[size], height: actionCardImageSizes[size] }} />
        )
      }
      title={
        product.url_key ? (
          <Link
            href={productPath(product.url_key)}
            underline='hover'
            sx={{
              color: 'inherit',
              flexWrap: 'nowrap',
              maxWidth: 'max-content',
            }}
          >
            {product.name}
          </Link>
        ) : (
          product.name
        )
      }
      size={size}
      {...rest}
      price={
        <>
          <Money {...(inclTaxes ? prices?.row_total_including_tax : prices?.row_total)} />
          {rest.price}
        </>
      }
      secondaryAction={
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mt: 1,
              gap: '10px',
              justifyContent: 'start',
            }}
          >
            {readOnly ? quantity : <UpdateItemQuantity uid={uid} quantity={quantity} />}
            {' ⨉ '}
            <Money value={price} currency={prices?.price.currency} />
          </Box>
          {hasOptions && !readOnly && (
            <Button
              variant='inline'
              color='secondary'
              href={`/checkout/item/${product.url_key}?cartItemId=${uid}`}
            >
              <Trans>Edit options</Trans>
            </Button>
          )}

          {rest.secondaryAction}

          {filterNonNullableKeys(errors).map((error) => (
            <Box sx={{ color: 'error.main', typography: 'body2' }} key={error.message}>
              {error.message}
            </Box>
          ))}
        </>
      }
      details={
        <>
          {priceModifiers && priceModifiers.length > 0 && (
            <PriceModifiersList
              label={<Trans>Base price</Trans>}
              modifiers={[...priceModifiers]}
              total={prices?.price_including_tax?.value ?? 0}
              currency={prices?.price.currency}
            />
          )}
          {rest.details}
        </>
      }
      action={
        <>
          {!readOnly && (
            <RemoveItemFromCart
              {...cartItem}
              buttonProps={{ size: size === 'responsive' ? 'large' : size }}
            />
          )}
          {rest.action}
        </>
      }
    />
  )
}

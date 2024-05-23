import { Image } from '@graphcommerce/image'
import { useDisplayInclTax } from '@graphcommerce/magento-cart/hooks'
import { ProductLinkProps } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardProps,
  filterNonNullableKeys,
  actionCardImageSizes,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button, Link } from '@mui/material'
import { CartItemFragment } from '../../Api/CartItem.gql'
import { RemoveItemFromCart } from '../RemoveItemFromCart/RemoveItemFromCart'
import { UpdateItemQuantity } from '../UpdateItemQuantity/UpdateItemQuantity'

export type CartItemActionCardProps = { cartItem: CartItemFragment; readOnly?: boolean } & Omit<
  ActionCardProps,
  'value' | 'image' | 'price' | 'title' | 'action'
>

export function productEditLink(link: ProductLinkProps) {
  return `/checkout/item/${link.url_key}`
}

export function CartItemActionCard(props: CartItemActionCardProps) {
  const { cartItem, sx = [], size = 'responsive', readOnly = false, ...rest } = props
  const { uid, quantity, prices, errors, product } = cartItem
  const { name, thumbnail, url_key } = product

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
      sx={[
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
            justifyContent: readOnly ? 'center' : 'space-between',
          },
          '& .ActionCard-action': {
            pr: readOnly ? 0 : theme.spacings.xs,
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
              width: actionCardImageSizes[size],
              height: actionCardImageSizes[size],
              display: 'block',
              borderRadius: 1,
              objectFit: 'contain',
            }}
            sizes={actionCardImageSizes[size]}
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
          {hasOptions && (
            <Button
              variant='inline'
              color='secondary'
              href={`${productEditLink(product)}?cartItemId=${uid}`}
            >
              <Trans id='Edit options' />
            </Button>
          )}
        </>
      }
      price={<Money {...(inclTaxes ? prices?.row_total_including_tax : prices?.row_total)} />}
      action={
        !readOnly && (
          <RemoveItemFromCart
            {...cartItem}
            buttonProps={{ size: size === 'responsive' ? 'large' : size }}
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
      details={<>{rest.details}</>}
    />
  )
}

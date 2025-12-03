import { Image } from '@graphcommerce/image'
import { Money, PriceModifiersList, type PriceModifier } from '@graphcommerce/magento-store'
import { ActionCard, actionCardImageSizes, type ActionCardProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Box } from '@mui/material'
import type { ShipmentItemFragment } from './ShipmentItem.gql'

export type ShipmentItemProps = Omit<ActionCardProps, 'value' | 'image' | 'title'> & {
  item: ShipmentItemFragment
  priceModifiers?: PriceModifier[]
}

export function ShipmentItem(props: ShipmentItemProps) {
  const { item, priceModifiers, size = 'responsive', ...rest } = props
  const { product_name, product_sku, quantity_shipped, product_sale_price, id, order_item } = item

  return (
    <ActionCard
      {...rest}
      value={id}
      sx={(theme) => ({
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
        '& .ActionCard-action': {
          pr: 0,
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
          pr: 0,
          mb: { xs: 0.5, sm: 0 },
        },
      })}
      size={size}
      image={
        order_item?.product?.thumbnail?.url && (
          <Image
            layout='fill'
            src={order_item.product.thumbnail.url}
            alt={order_item.product.thumbnail?.label ?? ''}
            sx={{
              width: actionCardImageSizes[size],
              height: actionCardImageSizes[size],
              display: 'block',
              borderRadius: 1,
              objectFit: 'contain',
              backgroundColor: 'background.image',
            }}
            sizes={actionCardImageSizes[size]}
          />
        )
      }
      title={product_name}
      price={
        <Money
          currency={product_sale_price.currency}
          value={(product_sale_price.value ?? 0) * (quantity_shipped ?? 1)}
        />
      }
      action={<>&nbsp;</>}
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
            {quantity_shipped}
            {' ⨉ '}
            <Money {...product_sale_price} />
          </Box>

          {rest.secondaryAction}
        </>
      }
      details={
        <>
          {priceModifiers && priceModifiers.length > 0 && (
            <PriceModifiersList
              label={<Trans>Base price</Trans>}
              modifiers={[...priceModifiers]}
              total={product_sale_price.value ?? 0}
              currency={product_sale_price.currency}
            />
          )}
          {rest.details}
        </>
      }
    />
  )
}

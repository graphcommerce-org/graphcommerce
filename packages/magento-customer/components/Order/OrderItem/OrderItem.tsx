import { Image } from '@graphcommerce/image'
import { Money, PriceModifiersTable, type PriceModifier } from '@graphcommerce/magento-store'
import {
  ActionCard,
  actionCardImageSizes,
  filterNonNullableKeys,
  type ActionCardProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import type { OrderItemFragment } from './OrderItem.gql'

export type OrderItemProps = Omit<ActionCardProps, 'value' | 'image' | 'title'> & {
  item: OrderItemFragment
  priceModifiers?: PriceModifier[]
}

export function OrderItem(props: OrderItemProps) {
  const { item, priceModifiers: incomingPriceModifiers, size = 'responsive', ...rest } = props
  const {
    selected_options,
    entered_options,
    product_sale_price,
    quantity_ordered,
    product_name,
    product,
    id,
  } = item

  const priceModifiers: PriceModifier[] = [
    ...(incomingPriceModifiers ?? []),
    ...filterNonNullableKeys(selected_options).map((option) => ({
      key: option.label,
      label: option.label,
      items: [{ key: option.value, label: option.value }],
    })),
    ...filterNonNullableKeys(entered_options).map((option) => ({
      key: option.label,
      label: option.label,
      items: [{ key: option.value, label: option.value }],
    })),
  ]

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
        product?.thumbnail?.url && (
          <Image
            layout='fill'
            src={product.thumbnail.url}
            alt={product.thumbnail?.label ?? ''}
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
          value={(product_sale_price.value ?? 0) * (quantity_ordered ?? 1)}
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
            {quantity_ordered}
            {' ⨉ '}
            <Money {...product_sale_price} />
          </Box>

          {rest.secondaryAction}
        </>
      }
      details={
        <>
          {priceModifiers && priceModifiers.length > 0 && (
            <PriceModifiersTable
              label={<Trans id='Base Price'>Base price</Trans>}
              modifiers={priceModifiers}
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

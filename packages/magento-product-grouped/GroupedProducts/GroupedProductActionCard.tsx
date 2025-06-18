import { Image } from '@graphcommerce/image'
import type { AddToCartItemSelector } from '@graphcommerce/magento-product'
import {
  AddProductsToCartQuantity,
  ProductListPrice,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, actionCardImageSizes, responsiveVal } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import type { GroupedProductFragment } from '../GroupedProduct.gql'

type GroupedProductItem = NonNullable<
  NonNullable<GroupedProductFragment['items']>[number]
>['product']

export type GroupedProductActionCardProps = GroupedProductItem &
  Omit<ActionCardProps, 'value' | 'image' | 'price' | 'title' | 'action'> &
  AddToCartItemSelector

const typographySizes = {
  small: 'body2',
  medium: 'body1',
  large: 'subtitle1',
}

export function GroupedProductActionCard(props: GroupedProductActionCardProps) {
  const {
    uid,
    name,
    small_image,
    price_range,
    url_key,
    sx = [],
    size = 'large',
    index = 0,
    sku,
    url_rewrites,
    ...rest
  } = props

  const { control, register } = useFormAddProductsToCart()
  if (!sku) return null
  const hasUrl = (url_rewrites ?? []).length > 0
  return (
    <>
      <input type='hidden' {...register(`cartItems.${index}.sku`)} value={sku} />
      <input type='hidden' {...register(`cartItems.${index}.keep_sku`, { value: true })} />
      <ActionCard
        variant='default'
        value={uid}
        sx={[
          (theme) => ({
            '&.ActionCard-root': {
              px: 0,
              py: theme.spacings.xs,
            },
            '& .ActionCard-title': {
              width: '100%',
            },
            '& .ActionCard-rootInner': {
              justifyContent: 'space-between',
              alignItems: 'stretch',
            },
            '&.sizeSmall': {
              px: 0,
            },
            '& .ActionCard-end': {
              justifyContent: 'space-between',
            },
            '& .ActionCard-action': {
              pr: theme.spacings.xs,
            },
            '& .ActionCard-image': {
              alignSelf: 'flex-start',
            },
            '& .ActionCard-secondaryAction': {
              typography: typographySizes[size],
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              gap: '10px',
              justifyContent: 'start',
            },
            '& .ActionCard-price': {
              typography: typographySizes[size],
              pr: theme.spacings.xs,
              mb: { xs: 0.5, sm: 0 },
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        image={
          small_image?.url && (
            <Image
              layout='fill'
              src={small_image?.url}
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
          url_key && hasUrl ? (
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
          <AddProductsToCartQuantity
            size='small'
            defaultValue={1}
            index={index}
            onMouseDown={(e) => e.stopPropagation()}
          />
        }
        price={<ProductListPrice {...price_range.minimum_price} />}
        {...rest}
      />
    </>
  )
}

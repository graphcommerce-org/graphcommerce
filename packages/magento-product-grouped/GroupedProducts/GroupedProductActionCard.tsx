import { Image } from '@graphcommerce/image'
import type { AddToCartItemSelector } from '@graphcommerce/magento-product'
import {
  AddProductsToCartQuantity,
  ProductPagePrice,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, actionCardImageSizes } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import type { GroupedProductItemFragment } from '../graphql/fragments/GroupedProductItem.gql'

export type GroupedProductActionCardProps = {
  item: GroupedProductItemFragment
} & AddToCartItemSelector &
  Omit<ActionCardProps, 'value' | 'image' | 'price' | 'title' | 'action'>

const typographySizes = {
  small: 'body2',
  medium: 'body1',
  large: 'subtitle1',
}

export function GroupedProductActionCard(props: GroupedProductActionCardProps) {
  const { item, sx = [], size = 'large', index = 0, ...rest } = props
  const { product } = item
  const { control, register } = useFormAddProductsToCart()

  if (!product?.sku) return null

  const { uid, name, small_image, url_key, sku, url_rewrites } = product
  const hasUrl = (url_rewrites ?? []).length > 0
  const qty = item.qty ?? 0

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
            index={index}
            defaultValue={qty}
            onMouseDown={(e) => e.stopPropagation()}
            inputProps={{ min: 0 }}
          />
        }
        price={
          <ProductPagePrice
            index={index}
            product={product}
            defaultValue={qty ?? 0}
            variant='total'
          />
        }
        {...rest}
      />
    </>
  )
}

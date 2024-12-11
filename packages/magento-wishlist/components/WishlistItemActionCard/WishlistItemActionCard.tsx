import { Image } from '@graphcommerce/image'
import { AddProductsToCartForm, useProductLink } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import type { InputMaybe } from '@graphcommerce/next-config'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, actionCardImageSizes, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme, ButtonProps } from '@mui/material'
import { Button, Link } from '@mui/material'
import type { ReactNode } from 'react'
import { useRemoveProductsFromWishlist } from '../../hooks'
import type { WishlistItemFragment } from '../../queries/WishlistItem.gql'
import { AddWishlistItemToCart } from '../WishlistItem/AddWishlistItemToCart'

export type WishlistItemActionCardProps = {
  item: WishlistItemFragment
  sx?: SxProps<Theme>
  selectedOptions?: InputMaybe<string[]> | undefined
  isConfigurableUncompleted?: boolean
  secondaryAction?: ReactNode
  actionButtonProps?: ButtonProps
} & OwnerState &
  Omit<ActionCardProps, 'value' | 'image' | 'price' | 'title' | 'action'>
type OwnerState = { withOptions?: boolean }
const compName = 'WishlistItemActionCard'
const parts = [
  'item',
  'picture',
  'badge',
  'productLink',
  'image',
  'itemName',
  'itemPrice',
  'discountPrice',
  'root',
] as const
const { classes } = extendableComponent<OwnerState, typeof compName, typeof parts>(compName, parts)

const typographySizes = {
  small: 'body2',
  medium: 'body1',
  large: 'subtitle1',
}

export function WishlistItemActionCard(props: WishlistItemActionCardProps) {
  const {
    sx = [],
    size = 'responsive',
    item,
    selectedOptions,
    secondaryAction,
    variant = 'default',
    actionButtonProps,
    ...rest
  } = props
  const { id, product } = item

  const productLink = useProductLink({
    url_key: product?.url_key,
    __typename: product?.__typename ?? 'SimpleProduct',
  })
  const remove = useRemoveProductsFromWishlist()
  if (!id) return null

  return (
    <AddProductsToCartForm key={id}>
      <ActionCard
        variant={variant}
        value={id}
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
            '&.sizeResponsive': {
              [theme.breakpoints.down('md')]: {
                px: 0,
              },
            },
            '& .ActionCard-action': {
              alignSelf: 'flex-end',
            },
            '& .ActionCard-image': {
              alignSelf: 'flex-start',
            },
            '& .ActionCard-secondaryAction': {
              typography:
                size === 'responsive'
                  ? {
                      xs: typographySizes.small,
                      md: typographySizes.medium,
                      lg: typographySizes.large,
                    }
                  : typographySizes[size],
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mt: 1,
              gap: '10px',
              justifyContent: 'start',
            },
            '& .ActionCard-price': {
              typography:
                size === 'responsive'
                  ? {
                      xs: typographySizes.small,
                      md: typographySizes.medium,
                      lg: typographySizes.large,
                    }
                  : typographySizes[size],
              mb: { xs: 0.5, sm: 0 },
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        image={
          product?.small_image?.url && (
            <Image
              className={classes.image}
              layout='fill'
              src={product?.small_image?.url}
              sx={{
                objectFit: 'contain',
                width: actionCardImageSizes[size],
                height: actionCardImageSizes[size],
                display: 'block',
                borderRadius: 1,
              }}
              sizes={actionCardImageSizes[size]}
            />
          )
        }
        title={
          productLink ? (
            <Link
              href={`${productLink}?wishlistItemId=${id}`}
              className={classes.itemName}
              underline='hover'
              sx={{
                color: 'inherit',
                flexWrap: 'nowrap',
                maxWidth: 'max-content',
              }}
            >
              {product?.name}
            </Link>
          ) : (
            product?.name
          )
        }
        secondaryAction={
          secondaryAction ||
          ((product?.__typename === 'SimpleProduct' ||
            product?.__typename === 'VirtualProduct') && (
            <AddWishlistItemToCart product={product} selectedOptions={[]} />
          ))
        }
        price={<Money {...product?.price_range.minimum_price.final_price} />}
        action={
          <Button
            variant='inline'
            color='secondary'
            size='medium'
            type='button'
            onClick={() => remove([id])}
            {...actionButtonProps}
          >
            <Trans id='Remove' />
          </Button>
        }
        size={size}
        {...rest}
      />
    </AddProductsToCartForm>
  )
}

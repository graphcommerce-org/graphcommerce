import { useMutation, useApolloClient } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { AddProductsToCartForm, useProductLink } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import { InputMaybe } from '@graphcommerce/next-config'
import {
  responsiveVal,
  extendableComponent,
  ActionCard,
  ActionCardProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button, Link, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'
import { WishListItem } from '../../hooks'
import { GuestWishlistDocument } from '../../queries/GuestWishlist.gql'
import { RemoveProductFromWishlistDocument } from '../../queries/RemoveProductFromWishlist.gql'
import { AddWishlistItemToCart } from '../WishlistItem/AddWishlistItemToCart'

export type WishlistItemActionCardProps = WishListItem & {
  sx?: SxProps<Theme>
  selectedOptions?: InputMaybe<string[]> | undefined
  isConfigurableUncompleted?: boolean
  secondaryAction?: ReactNode
} & OwnerState &
  Omit<ActionCardProps, 'value' | 'image' | 'price' | 'title' | 'action'>
type OwnerState = { withOptions?: boolean }
const compName = 'WishlistItemActionCard' as const
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

export function WishlistItemActionCard(props: WishlistItemActionCardProps) {
  const {
    sx = [],
    id: wishlistItemId,
    size = 'large',
    product,
    selectedOptions,
    secondaryAction,
    variant = 'default',
    ...rest
  } = props
  const productLink = useProductLink({
    url_key: product?.url_key,
    __typename: product?.__typename ?? 'SimpleProduct',
  })
  const { cache } = useApolloClient()

  const { loggedIn } = useCustomerSession()

  const oldItems = cache.readQuery({ query: GuestWishlistDocument })?.customer?.wishlists?.[0]
    ?.items_v2?.items

  const filteredItems = oldItems?.filter((oldItem) => oldItem?.id !== wishlistItemId)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  return (
    wishlistItemId && (
      <AddProductsToCartForm key={wishlistItemId}>
        <ActionCard
          variant={variant}
          value={wishlistItemId}
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
              '& .ActionCard-action': {
                alignSelf: 'flex-end',
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
            productLink ? (
              <Link
                href={productLink}
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
              product?.__typename === 'VirtualProduct') &&
              product?.sku &&
              product?.name && <AddWishlistItemToCart product={product} selectedOptions={[]} />)
          }
          price={<Money {...product?.price_range.minimum_price.final_price} />}
          action={
            <Button
              variant='inline'
              color='secondary'
              size='medium'
              type='submit'
              onClick={
                loggedIn
                  ? () => removeWishlistItem({ variables: { wishlistItemId } })
                  : () =>
                      cache.writeQuery({
                        query: GuestWishlistDocument,
                        data: {
                          customer: {
                            wishlists: [
                              {
                                items_v2: {
                                  items: filteredItems || [],
                                },
                              },
                            ],
                          },
                        },
                        broadcast: true,
                      })
              }
            >
              <Trans id='Remove' />
            </Button>
          }
          size={size}
          {...rest}
        />
      </AddProductsToCartForm>
    )
  )
}

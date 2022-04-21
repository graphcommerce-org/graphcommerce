/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useApolloClient } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useConfigurableContext } from '@graphcommerce/magento-product-configurable'
import {
  AddProductToWishlistDocument,
  RemoveProductFromWishlistDocument,
  GetIsInWishlistsDocument,
  GuestWishlistDocument,
  useWishlistEnabled,
} from '@graphcommerce/magento-wishlist'
import { IconSvg, iconHeart, extendableComponent } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { SxProps, Theme, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { ProductWishlistChipFragment } from './ProductWishlistChip.gql'

type ProductWishlistSettings = {
  variant?: 'default' | 'shadow'
}

const hideForGuest = process.env.NEXT_PUBLIC_WISHLIST_HIDE_FOR_GUEST === '1'
const ignoreProductWishlistStatus =
  process.env.NEXT_PUBLIC_WISHLIST_IGNORE_PRODUCT_WISHLIST_STATUS === '1'

export type ProductWishlistChipProps = ProductWishlistChipFragment &
  ProductWishlistSettings & { sx?: SxProps<Theme> }

const name = 'ProductWishlistChip' as const
const parts = ['root', 'iconHeart', 'iconHeartActive', 'wishlistButton'] as const
const { classes } = extendableComponent(name, parts)

export function ProductWishlistChip(props: ProductWishlistChipProps) {
  const { variant, sku, __typename: productType, sx = [] } = props

  const [inWishlist, setInWishlist] = useState(false)
  const [displayWishlist, setDisplayWishlist] = useState(true)

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const { cache } = useApolloClient()

  const isWishlistEnabled = useWishlistEnabled()

  if (!isWishlistEnabled) {
    return null
  }

  const heart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.iconHeart}
      sx={(theme) => ({ color: theme.palette.primary.main })}
    />
  )

  const activeHeart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.iconHeartActive}
      sx={(theme) => ({ color: theme.palette.primary.main, fill: 'currentcolor' })}
    />
  )

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    skip: !isLoggedIn,
  })

  const { data: guestWishlistData, loading: loadingGuestWishlistData } = useQuery(
    GuestWishlistDocument,
    {
      ssr: false,
      skip: isLoggedIn === true,
    },
  )

  useEffect(() => {
    // Do not display wishlist UI to guests when configured as customer only
    if (hideForGuest && !isLoggedIn) {
      setDisplayWishlist(false)
      return
    }

    if (!sku) {
      return
    }

    // Mark as active when product is available in either customer or guest wishlist
    if (isLoggedIn && !loading) {
      const inWishlistTest =
        GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items.map(
          (item) => item?.product?.sku,
        ) || []
      setInWishlist(inWishlistTest.includes(sku))
    } else if (!isLoggedIn) {
      const inWishlistTest = guestWishlistData?.guestWishlist?.items.map((item) => item?.sku) || []
      setInWishlist(inWishlistTest.includes(sku))
    }
  }, [isLoggedIn, sku, loading, GetCustomerWishlistData, guestWishlistData])

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  let context
  if (productType === 'ConfigurableProduct' && sku) {
    context = useConfigurableContext(sku)
  }

  const handleClick = (e) => {
    e.preventDefault()

    if (!sku) {
      return
    }

    let selectedOptions: string[] = []
    if (productType === 'ConfigurableProduct') {
      selectedOptions = (Object as any).values(context.selection)
    }

    if (isLoggedIn) {
      if (inWishlist && !ignoreProductWishlistStatus) {
        const wishlistItemsInSession =
          GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items || []

        const item = wishlistItemsInSession.find((element) => element?.product?.sku == sku)

        if (item?.id) {
          removeWishlistItem({ variables: { wishlistItemId: item.id } })
        }
      } else {
        addWishlistItem({
          variables: { input: { sku, quantity: 1, selected_options: selectedOptions } },
        })
      }
    } else if (inWishlist) {
      cache.modify({
        id: cache.identify({ __typename: 'GuestWishlist' }),
        fields: {
          items(existingItems = []) {
            const items = existingItems.filter((item) => item.sku !== sku)
            return items
          },
        },
      })
    } else {
      /** Merging of wishlist items is done by policy, see typePolicies.ts */
      cache.writeQuery({
        query: GuestWishlistDocument,
        data: {
          guestWishlist: {
            __typename: 'GuestWishlist',
            items: [
              {
                __typename: 'GuestWishlistItem',
                sku,
                quantity: 1,
                selected_options: selectedOptions,
              },
            ],
          },
        },
        broadcast: true,
      })
    }
  }

  const button = (
    <IconButton
      key={sku}
      onClick={handleClick}
      size='small'
      className={classes.wishlistButton}
      sx={[
        (theme) => ({
          padding: theme.spacings.xxs,
          boxShadow: variant === 'shadow' ? theme.shadows[6] : 'none',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      title={inWishlist ? t`Remove from wishlist` : t`Add to wishlist`}
      aria-label={inWishlist ? t`Remove from wishlist` : t`Add to wishlist`}
    >
      {inWishlist ? activeHeart : heart}
    </IconButton>
  )

  return !hideForGuest || isLoggedIn ? button : null
}

ProductWishlistChip.defaultProps = {
  variant: 'default',
}

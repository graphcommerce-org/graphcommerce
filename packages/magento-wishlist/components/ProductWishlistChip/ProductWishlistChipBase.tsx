/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useApolloClient } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
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

const hideForGuest = process.env.NEXT_PUBLIC_WISHLIST_HIDE_FOR_GUEST === '1'
const ignoreProductWishlistStatus =
  process.env.NEXT_PUBLIC_WISHLIST_IGNORE_PRODUCT_WISHLIST_STATUS === '1'

export type ProductWishlistChipProps = ProductWishlistChipFragment & { sx?: SxProps<Theme> } & {
  selectedOptions?: string[]
}

const name = 'ProductWishlistChipBase' as const
const parts = ['root', 'wishlistIcon', 'wishlistIconActive', 'wishlistButton'] as const
const { classes } = extendableComponent(name, parts)

export function ProductWishlistChipBase(props: ProductWishlistChipProps) {
  const { sku, selectedOptions = [], sx = [] } = props

  const [inWishlist, setInWishlist] = useState(false)

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
      className={classes.wishlistIcon}
      sx={(theme) => ({ color: theme.palette.primary.main })}
    />
  )

  const activeHeart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.wishlistIconActive}
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

  const handleClick = (e) => {
    e.preventDefault()

    if (!sku) {
      return
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

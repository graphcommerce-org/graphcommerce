import { useMutation, useApolloClient } from '@graphcommerce/graphql'
import {
  useCustomerQuery,
  useCustomerSession,
  useGuestQuery,
} from '@graphcommerce/magento-customer'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import {
  IconSvg,
  iconHeart,
  extendableComponent,
  MessageSnackbar,
  Button,
  iconChevronRight,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { SxProps, Theme, IconButton, Box, IconButtonProps } from '@mui/material'
import { useState, useEffect } from 'react'
import { useWishlistEnabled } from '../../hooks'
import { AddProductToWishlistDocument } from '../../queries/AddProductToWishlist.gql'
import { GetIsInWishlistsDocument } from '../../queries/GetIsInWishlists.gql'
import { GuestWishlistDocument } from '../../queries/GuestWishlist.gql'
import { RemoveProductFromWishlistDocument } from '../../queries/RemoveProductFromWishlist.gql'
import { WishlistSummaryFragment } from '../../queries/WishlistSummaryFragment.gql'
import { ProductWishlistChipFragment } from './ProductWishlistChip.gql'

const hideForGuest = import.meta.graphCommerce.wishlistHideForGuests
const ignoreProductWishlistStatus = import.meta.graphCommerce.wishlistIgnoreProductWishlistStatus

export type ProductWishlistChipProps = ProductWishlistChipFragment & {
  sx?: SxProps<Theme>
  buttonProps?: IconButtonProps
  /** @deprecated */
  showFeedbackMessage?: boolean
}

export type WishListItemType = NonNullable<
  NonNullable<NonNullable<WishlistSummaryFragment['items_v2']>['items']>[0]
>['product']

const compName = 'ProductWishlistChipBase' as const
const parts = ['root', 'wishlistIcon', 'wishlistIconActive', 'wishlistButton'] as const
const { classes } = extendableComponent(compName, parts)

export function ProductWishlistChipBase(props: ProductWishlistChipProps) {
  const { name, sku, url_key, showFeedbackMessage, buttonProps, sx = [] } = props

  if (process.env.NODE_ENV === 'development') {
    if (typeof showFeedbackMessage !== 'undefined') {
      console.warn(
        'The `showFeedbackMessage` prop is deprecated and will be removed in a future release. Please use wishlistShowFeedbackMessage config instead.',
      )
    }
  }

  const addToCartForm = useFormAddProductsToCart(true)

  const [inWishlist, setInWishlist] = useState(false)
  const [displayMessageBar, setDisplayMessageBar] = useState(false)

  const { loggedIn } = useCustomerSession()
  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  const { data: GetCustomerWishlistData, loading } = useCustomerQuery(GetIsInWishlistsDocument)

  const { data: guestWishlistData } = useGuestQuery(GuestWishlistDocument)

  const { cache } = useApolloClient()

  const isWishlistEnabled = useWishlistEnabled()

  const heart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.wishlistIcon}
      sx={(theme) => ({
        color:
          theme.palette.mode === 'light'
            ? theme.palette.text.secondary
            : theme.palette.primary.main,
      })}
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

  useEffect(() => {
    // Do not display wishlist UI to guests when configured as customer only
    if (hideForGuest && !loggedIn) {
      return
    }

    if (!url_key || !sku) {
      return
    }

    // Mark as active when product is available in either customer or guest wishlist
    if (loggedIn && !loading) {
      const inWishlistTest =
        GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items.map(
          (item) => item?.product?.url_key,
        ) || []
      setInWishlist(inWishlistTest.includes(url_key))
    } else if (!loggedIn) {
      const inWishlistTest =
        guestWishlistData?.guestWishlist?.items.map((item) => item?.url_key) || []
      setInWishlist(inWishlistTest.includes(url_key))
    }
  }, [loggedIn, url_key, loading, GetCustomerWishlistData, guestWishlistData, sku])

  const preventAnimationBubble = (
    e: React.TouchEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation()
    if (e.type === 'mousedown') {
      e.preventDefault()
    }
  }

  const preventLinkOnClose: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    const selectedOptions = addToCartForm?.getValues().cartItems?.[0]?.selected_options ?? []
    const selected_options = Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]

    if (!url_key || !sku) {
      return
    }

    if (loggedIn) {
      if (inWishlist && !ignoreProductWishlistStatus) {
        const wishlistItemsInSession =
          GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items || []

        const item = wishlistItemsInSession.find((element) => element?.product?.url_key === url_key)

        if (item?.id) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          removeWishlistItem({ variables: { wishlistItemId: item.id } })
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        addWishlistItem({ variables: { input: [{ sku, quantity: 1, selected_options }] } })
        setDisplayMessageBar(true)
      }
    } else if (inWishlist) {
      cache.modify({
        id: cache.identify({ __typename: 'GuestWishlist' }),
        fields: {
          items(existingItems: WishListItemType[] = []) {
            const items = existingItems.filter((item) => item?.url_key !== url_key)
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
                url_key,
                quantity: 1,
                selected_options,
              },
            ],
          },
        },
        broadcast: true,
      })
      setDisplayMessageBar(true)
    }
  }

  if (!isWishlistEnabled || (hideForGuest && !loggedIn)) return null

  return (
    <Box>
      <IconButton
        key={url_key}
        onClick={handleClick}
        onMouseDown={preventAnimationBubble}
        onTouchStart={preventAnimationBubble}
        size='small'
        className={classes.wishlistButton}
        {...buttonProps}
        sx={[
          (theme) => ({
            padding: theme.spacings.xxs,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        title={
          inWishlist
            ? i18n._(/* i18n */ 'Remove from wishlist')
            : i18n._(/* i18n */ 'Add to wishlist')
        }
        aria-label={
          inWishlist
            ? i18n._(/* i18n */ 'Remove from wishlist')
            : i18n._(/* i18n */ 'Add to wishlist')
        }
      >
        {inWishlist ? activeHeart : heart}
      </IconButton>

      {import.meta.graphCommerce.wishlistShowFeedbackMessage && (
        <MessageSnackbar
          open={displayMessageBar}
          onClose={() => setDisplayMessageBar(false)}
          onClick={preventLinkOnClose}
          onMouseDown={preventLinkOnClose}
          autoHide
          variant='pill'
          action={
            <Button
              href='/wishlist'
              id='view-wishlist-button'
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
            >
              <Trans id='View wishlist' />
            </Button>
          }
        >
          <Trans
            id='<0>{name}</0> has been added to your wishlist!'
            components={{ 0: <strong /> }}
            values={{ name }}
          />
        </MessageSnackbar>
      )}
    </Box>
  )
}

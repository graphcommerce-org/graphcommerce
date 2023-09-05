import { useMutation, useApolloClient, useQuery } from '@graphcommerce/graphql'
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

  const guestWl = useQuery(GuestWishlistDocument, { ssr: false, skip: loggedIn })

  const heart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.wishlistIcon}
      sx={(theme) => ({
        color:
          theme.palette.mode === 'light'
            ? theme.palette.text.secondary
            : theme.palette.background.paper,
        '.SidebarGallery-root &': {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.text.secondary
              : theme.palette.primary.contrastText,
        },
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
    const selectedOptions = addToCartForm?.getValues().cartItems?.[0]?.selected_options ?? []
    const selected_options = Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]

    // Do not display wishlist UI to guests when configured as customer only
    if (hideForGuest && !loggedIn) {
      return
    }

    if (!url_key || !sku) {
      return
    }
    // Mark as active when product is available in either customer or guest wishlist
    if (loggedIn && !loading) {
      // const inWishlistTest =
      //   GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items.map(
      //     (item) => item?.product?.url_key,
      //   ) || []
      // const skuList = GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items.map(
      //   (itemSku) => itemSku?.product?.sku,
      // )
      // const inWishlistTest2 =
      //   GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items.map((item) => {
      //     if (item?.__typename === 'ConfigurableWishlistItem') {
      //       return item?.configurable_options
      //     }
      //     return null
      //   }) || []

      const wishlistItems = GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items

      const check2 =
        selected_options?.[0] === undefined
          ? !!wishlistItems?.find(
              (e) =>
                e?.product?.url_key === url_key &&
                e.__typename === 'ConfigurableWishlistItem' &&
                e.configurable_options?.length === 0,
            )
          : wishlistItems?.some(
              (wishlistItemOptions) =>
                selected_options.every(
                  (option) =>
                    wishlistItemOptions?.__typename === 'ConfigurableWishlistItem' &&
                    wishlistItemOptions?.configurable_options?.some(
                      (wishlistOption) =>
                        wishlistOption?.configurable_product_option_value_uid === option &&
                        sku === wishlistItemOptions.product?.sku,
                    ),
                ) && wishlistItemOptions?.product?.url_key === url_key,
            )

      // const check =
      //   selectedWishlistOptions?.[0] === undefined
      //     ? !!inWishlistTest.find((e, i) => e === url_key && inWishlistTest2?.[i]?.length === 0)
      //     : inWishlistTest2.some((wishlistItemOptions, i) =>
      //         selectedWishlistOptions.every(
      //           (option) =>
      //             wishlistItemOptions?.some(
      //               (wishlistOption) =>
      //                 wishlistOption?.configurable_product_option_value_uid === option &&
      //                 skuList?.[i] === sku,
      //             ),
      //           // wishlistItem.find((itemOption) => {})configurable_product_option_value_uid
      //         ),
      //       )
      setInWishlist(!!check2)
    } else if (!loggedIn) {
      const inWishlistTest =
        guestWishlistData?.guestWishlist?.items.map((item) => item?.url_key) || []
      const inWishlistTest2 =
        guestWl.data?.guestWishlist?.items.map((item) => item.selected_options || null) || []

      const skuList = guestWishlistData?.guestWishlist?.items.map((itemSku) => itemSku?.sku)

      const guestWishlist = guestWishlistData?.guestWishlist?.items

      const check2 =
        selected_options?.[0] === undefined
          ? !!guestWishlist?.find((e) => e?.url_key === url_key && e.selected_options?.length === 0)
          : guestWishlist?.some(
              (wishlistItemOptions) =>
                selected_options.every((option) =>
                  wishlistItemOptions?.selected_options?.some(
                    (wishlistOption) =>
                      wishlistOption === option && sku === wishlistItemOptions?.sku,
                  ),
                ) && wishlistItemOptions?.url_key === url_key,
            )

      const check =
        selected_options?.[0] === undefined
          ? !!inWishlistTest.find((e, i) => e === url_key && inWishlistTest2?.[i]?.length === 0)
          : inWishlistTest2?.some((wishlistItemOptions, i) =>
              selected_options.every(
                (option) =>
                  wishlistItemOptions?.some(
                    (wishlistOption) => wishlistOption === option && skuList?.[i] === sku,
                  ),
                // wishlistItem.find((itemOption) => {})configurable_product_option_value_uid
              ),
            )
      setInWishlist(!!check2)
    }
  }, [
    loggedIn,
    url_key,
    loading,
    GetCustomerWishlistData,
    guestWishlistData,
    sku,
    addToCartForm,
    guestWl.data?.guestWishlist?.items,
  ])

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

        const item = wishlistItemsInSession.find((element) => {
          if (element?.__typename === 'ConfigurableWishlistItem') {
            if (
              element.configurable_options?.[0]?.configurable_product_option_value_uid === undefined
            ) {
              return element?.product?.url_key === url_key
            }
            return element.configurable_options.every((config_option) =>
              selected_options.find(
                (select_option) =>
                  select_option === config_option?.configurable_product_option_value_uid,
              ),
            )
          }
          return element?.product?.url_key === url_key
        })

        if (item?.id) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          removeWishlistItem({ variables: { wishlistItemId: item.id } })
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        addWishlistItem({
          variables: {
            input: [
              {
                sku,
                quantity: 1,
                selected_options: selected_options?.[0] === undefined ? [] : selected_options,
              },
            ],
          },
        })
        setDisplayMessageBar(true)
      }
    } else if (inWishlist) {
      cache.modify({
        id: cache.identify({ __typename: 'GuestWishlist' }),
        fields: {
          items(existingItems: WishListItemType[] = []) {
            const items = existingItems.filter(
              (item) =>
                item?.url_key !== url_key ||
                (item?.url_key === url_key &&
                  item?.selected_options.every((opt) =>
                    selected_options.find((select_option) => select_option !== opt),
                  )),
            )
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
                selected_options: selected_options?.[0] === undefined ? [] : selected_options,
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

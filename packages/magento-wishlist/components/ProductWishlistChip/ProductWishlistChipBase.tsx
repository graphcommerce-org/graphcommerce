import { useMutation, useApolloClient } from '@graphcommerce/graphql'
import { GuestWishlist, GuestWishlistItem } from '@graphcommerce/graphql-mesh'
import {
  useCustomerQuery,
  useCustomerSession,
  useGuestQuery,
} from '@graphcommerce/magento-customer'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { ProductListItemConfigurableFragment } from '@graphcommerce/magento-product-configurable'
import { InputMaybe, Maybe } from '@graphcommerce/next-config'
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
  configurable_options?: Maybe<ProductListItemConfigurableFragment['configurable_options']>
}

export type WishListItemType = NonNullable<
  NonNullable<NonNullable<WishlistSummaryFragment['items_v2']>['items']>[0]
>['product'] & { selected_options: InputMaybe<string>[] }

const compName = 'ProductWishlistChipBase' as const
const parts = ['root', 'wishlistIcon', 'wishlistIconActive', 'wishlistButton'] as const
const { classes } = extendableComponent(compName, parts)

export function ProductWishlistChipBase(props: ProductWishlistChipProps) {
  const {
    name,
    sku,
    url_key,
    showFeedbackMessage,
    buttonProps,
    sx = [],
    configurable_options,
  } = props

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

    const notFullyConfigured =
      configurable_options?.length !==
      selected_options.filter((option) => option !== undefined).length

    // Do not display wishlist UI to guests when configured as customer only
    if (hideForGuest && !loggedIn) {
      return
    }

    if (!url_key || !sku) {
      return
    }
    // Mark as active when product is available in either customer or guest wishlist
    if (loggedIn && !loading) {
      const wishlistItems = GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items

      const isInWishlist =
        // If there are no options selected search for the product which matches the url and if
        // it is a configurable product check if it has no configurable options.
        selected_options?.[0] === undefined
          ? wishlistItems?.some(
              (e) =>
                e?.product?.url_key === url_key &&
                e.__typename === 'ConfigurableWishlistItem' &&
                e.configurable_options?.length === 0,
            )
          : // If it is a configurable product check if all selected options match the configurable options of the product
            // Check if the sku of the product matches the sku of the wishlistItem and check if the product url key matches the url key
            wishlistItems?.some((wishlistItem) =>
              notFullyConfigured
                ? wishlistItem?.product?.sku === sku
                : selected_options.every(
                    (option) =>
                      wishlistItem?.__typename === 'ConfigurableWishlistItem' &&
                      wishlistItem?.configurable_options?.some(
                        (wishlistOption) =>
                          // If an option is undefined this means the item is a wishlistItem but not all options were selected prior.
                          wishlistOption?.configurable_product_option_value_uid === option &&
                          sku === wishlistItem.product?.sku,
                      ),
                  ) && wishlistItem?.product?.url_key === url_key,
            )

      setInWishlist(!!isInWishlist)
    } else if (!loggedIn) {
      const guestWishlist = guestWishlistData?.guestWishlist?.items

      const isInWishlist =
        // If there are no options selected search for the product which matches the url and if
        // it is a configurable product check if it has no configurable options.
        notFullyConfigured
          ? guestWishlist?.some((e) => e?.url_key === url_key && e.selected_options?.length === 0)
          : // If it is a configurable product check if all selected options match the configurable options of the product
            // Check if the sku of the product matches the sku of the wishlistItem and check if the product url key matches the url key
            guestWishlist?.some(
              (wishlistItem) =>
                selected_options.every(
                  (selected_option) =>
                    wishlistItem?.selected_options?.some(
                      (wishlistOption) =>
                        wishlistOption === selected_option && sku === wishlistItem?.sku,
                    ),
                ) && wishlistItem?.url_key === url_key,
            )

      setInWishlist(!!isInWishlist)
    }
  }, [
    loggedIn,
    url_key,
    loading,
    GetCustomerWishlistData,
    guestWishlistData,
    sku,
    addToCartForm,
    configurable_options,
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

    const notFullyConfigured =
      configurable_options?.length !==
      selected_options.filter((option) => option !== undefined).length

    // Assuming selected_options and configurable_options are arrays
    const selectedOptionsLabels = selected_options.map(
      (option) =>
        // Use flatMap to flatten the resulting arrays and remove undefined values
        configurable_options
          ?.map(
            (confOption) =>
              confOption?.values?.find((values) => values?.uid === option)?.store_label,
          )
          .filter((label) => label !== undefined) as InputMaybe<string>[],
    )

    // Flatten the selectedOptionsLabels array
    const flattenedLabels = selectedOptionsLabels.flat()

    // Now, flattenedLabels contains the selected option labels without undefined values.
    const selected_options_labels = Array.isArray(flattenedLabels)
      ? flattenedLabels
      : [flattenedLabels]

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
                selected_options: notFullyConfigured ? [] : selected_options,
              },
            ],
          },
        })
        setDisplayMessageBar(true)
      }
    } else if (inWishlist) {
      cache.modify<GuestWishlist>({
        id: cache.identify({ __typename: 'GuestWishlist' }),
        fields: {
          items(existingItems) {
            // Remove item from wishlist if url key and selected options match that of the wishlistItem.
            const guestWishlistItems = existingItems as GuestWishlistItem[]
            return guestWishlistItems.filter((item) =>
              notFullyConfigured
                ? item.sku !== sku
                : item?.url_key !== url_key ||
                  (item?.url_key === url_key &&
                    item?.selected_options?.some((opt) =>
                      selected_options.find((select_option) => select_option !== opt),
                    )),
            )
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
                selected_options: notFullyConfigured ? [] : selected_options,
                selected_options_labels: notFullyConfigured ? [] : selected_options_labels,
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

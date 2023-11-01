import { useMutation, useApolloClient } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { ProductListItemFragment, useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { ProductListItemConfigurableFragment } from '@graphcommerce/magento-product-configurable'
import { Maybe } from '@graphcommerce/next-config'
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
import { useState } from 'react'
import { useWishlistEnabled, useWishlistItems } from '../../hooks'
import { AddProductToWishlistDocument } from '../../queries/AddProductToWishlist.gql'
import { GuestWishlistDocument } from '../../queries/GuestWishlist.gql'
import { RemoveProductFromWishlistDocument } from '../../queries/RemoveProductFromWishlist.gql'
import { WishlistItemFragment } from '../WishlistItem/WishlistItem.gql'
import { ProductWishlistChipFragment } from './ProductWishlistChip.gql'

const hideForGuest = import.meta.graphCommerce.wishlistHideForGuests
const ignoreProductWishlistStatus = import.meta.graphCommerce.wishlistIgnoreProductWishlistStatus

export type ProductWishlistChipProps = ProductWishlistChipFragment & {
  sx?: SxProps<Theme>
  buttonProps?: IconButtonProps
  /** @deprecated */
  showFeedbackMessage?: boolean
  configurable_options?: Maybe<ProductListItemConfigurableFragment['configurable_options']>
  product: ProductListItemFragment
}
export type WishlistTypeName = WishlistItemFragment['__typename']

const compName = 'ProductWishlistChipBase' as const
const parts = ['root', 'wishlistIcon', 'wishlistIconActive', 'wishlistButton'] as const
const { classes } = extendableComponent(compName, parts)

export function ProductWishlistChipBase(props: ProductWishlistChipProps) {
  const { showFeedbackMessage, buttonProps, sx = [], product } = props

  const { sku, url_key, name, __typename } = product

  if (process.env.NODE_ENV === 'development') {
    if (typeof showFeedbackMessage !== 'undefined') {
      console.warn(
        'The `showFeedbackMessage` prop is deprecated and will be removed in a future release. Please use wishlistShowFeedbackMessage config instead.',
      )
    }
  }

  const addToCartForm = useFormAddProductsToCart(true)

  const [displayMessageBar, setDisplayMessageBar] = useState(false)

  const { loggedIn } = useCustomerSession()
  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  const wishlist = useWishlistItems()

  const { cache } = useApolloClient()

  const isWishlistEnabled = useWishlistEnabled()

  let type: WishlistTypeName = 'ConfigurableWishlistItem'
  switch (__typename) {
    case 'BundleProduct':
      type = 'BundleWishlistItem'
      break
    case 'DownloadableProduct':
      type = 'DownloadableWishlistItem'
      break
    case 'GroupedProduct':
      type = 'GroupedProductWishlistItem'
      break
    case 'SimpleProduct':
      type = 'SimpleWishlistItem'
      break
    case 'VirtualProduct':
      type = 'VirtualWishlistItem'
      break
  }

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

  const selectedOptions = addToCartForm?.getValues().cartItems?.[0]?.selected_options ?? []
  const selected_options = Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]

  const notFullyConfigured =
    __typename === 'ConfigurableProduct' &&
    product.configurable_options?.length !==
      selected_options.filter((option) => option !== undefined).length

  const wishlistItems = wishlist.data

  function inWishlistWithoutSelectedOptions() {
    /**
     * If there are no options selected search for the product which matches the url and if
     * it is a configurable product check if it has no configurable options.
     */
    return wishlistItems?.some(
      (item) =>
        item?.product?.url_key === url_key &&
        (item?.__typename === 'ConfigurableWishlistItem'
          ? item.configurable_options?.length === 0
          : true),
    )
  }

  function inWishlistWithSelectedOptions() {
    /**
     * If it is a configurable product check if all selected options match the configurable options of the product
     * Check if the sku of the product matches the sku of the wishlistItem and check if the product url key matches the url key
     */
    return wishlistItems?.some((wishlistItem) =>
      notFullyConfigured
        ? wishlistItem?.product?.sku === sku
        : selected_options.every(
            (option) =>
              wishlistItem?.__typename === 'ConfigurableWishlistItem' &&
              wishlistItem?.configurable_options?.some(
                (wishlistOption) =>
                  // If an option is undefined this means the item is a wishlistItem but not all options were selected prior.
                  wishlistOption?.configurable_product_option_value_uid === option &&
                  wishlistItem.product?.sku === sku,
              ),
          ),
    )
  }
  // Mark as active when product is available in either customer or guest wishlist
  const isInWishlist =
    selected_options?.[0] === undefined
      ? inWishlistWithoutSelectedOptions()
      : inWishlistWithSelectedOptions()

  const conf_options = selectedOptions.map((selected_option) => {
    if (__typename !== 'ConfigurableProduct') return null

    const configurable_option = product.configurable_options?.find(
      (confOption) => confOption?.values?.find((values) => values?.uid === selected_option),
    )

    const value = configurable_option?.values?.find((values) => values?.uid === selected_option)
    return {
      configurable_product_option_uid: configurable_option?.uid || '',
      configurable_product_option_value_uid: value?.uid || '',
      option_label: configurable_option?.label || '',
      value_label: value?.store_label || '',
    }
  })

  const guestWishlistItem = {
    __typename: type,
    configurable_options: conf_options.every(
      (option) => option?.configurable_product_option_value_uid !== '',
    )
      ? conf_options
      : [],
    id: `${sku}${conf_options.map((i) => i?.configurable_product_option_value_uid).toString()}`,
    product,
  }
  const oldItems = cache.readQuery({ query: GuestWishlistDocument })?.customer?.wishlists?.[0]
    ?.items_v2?.items
  const filteredItems = oldItems?.filter((oldItem) => oldItem?.id !== guestWishlistItem.id)

  const handleWishlistWhenAuthenticated = () => {
    if (isInWishlist && !ignoreProductWishlistStatus) {
      const wishlistItemsInSession = wishlist.data

      const item = wishlistItemsInSession?.find((element) => {
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
        removeWishlistItem({ variables: { wishlistItemId: item.id } }).catch((err) =>
          console.log(err),
        )
      }
    } else {
      addWishlistItem({
        variables: {
          input: [
            {
              sku: sku || '',
              quantity: 1,
              selected_options: notFullyConfigured ? [] : selected_options,
            },
          ],
        },
      }).catch((err) => console.log(err))
      setDisplayMessageBar(true)
    }
  }

  const handleWishlistWhenNotAuthenticated = () => {
    if (isInWishlist) {
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
    } else {
      /** Merging of wishlist items is done by policy, see typePolicies.ts */
      const newItems = oldItems?.concat(guestWishlistItem)
      cache.writeQuery({
        query: GuestWishlistDocument,
        data: {
          customer: {
            wishlists: [
              {
                items_v2: {
                  items: newItems || [guestWishlistItem],
                },
              },
            ],
          },
        },
        broadcast: true,
      })
      setDisplayMessageBar(true)
    }
  }

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

    if (!url_key || !sku) {
      return
    }

    if (loggedIn) {
      handleWishlistWhenAuthenticated()
    } else {
      handleWishlistWhenNotAuthenticated()
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
          isInWishlist
            ? i18n._(/* i18n */ 'Remove from wishlist')
            : i18n._(/* i18n */ 'Add to wishlist')
        }
        aria-label={
          isInWishlist
            ? i18n._(/* i18n */ 'Remove from wishlist')
            : i18n._(/* i18n */ 'Add to wishlist')
        }
      >
        {isInWishlist ? activeHeart : heart}
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

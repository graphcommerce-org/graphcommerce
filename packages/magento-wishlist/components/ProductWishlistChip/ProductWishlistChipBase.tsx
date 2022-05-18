import { useQuery, useMutation, useApolloClient } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
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
import { SxProps, Theme, IconButton, Box } from '@mui/material'
import PageLink from 'next/link'
import { useState, useEffect } from 'react'
import { useWishlistEnabled } from '../../hooks'
import { AddProductToWishlistDocument } from '../../queries/AddProductToWishlist.gql'
import { GetIsInWishlistsDocument } from '../../queries/GetIsInWishlists.gql'
import { GuestWishlistDocument } from '../../queries/GuestWishlist.gql'
import { RemoveProductFromWishlistDocument } from '../../queries/RemoveProductFromWishlist.gql'
import { ProductWishlistChipFragment } from './ProductWishlistChip.gql'

const hideForGuest = process.env.NEXT_PUBLIC_WISHLIST_HIDE_FOR_GUEST === '1'
const ignoreProductWishlistStatus =
  process.env.NEXT_PUBLIC_WISHLIST_IGNORE_PRODUCT_WISHLIST_STATUS === '1'

export type ProductWishlistChipProps = ProductWishlistChipFragment & { sx?: SxProps<Theme> } & {
  selectedOptions?: string[]
  showFeedbackMessage?: boolean
}

const compName = 'ProductWishlistChipBase' as const
const parts = ['root', 'wishlistIcon', 'wishlistIconActive', 'wishlistButton'] as const
const { classes } = extendableComponent(compName, parts)

export function ProductWishlistChipBase(props: ProductWishlistChipProps) {
  const { name, sku, showFeedbackMessage, selectedOptions = [], sx = [] } = props

  const [inWishlist, setInWishlist] = useState(false)
  const [displayMessageBar, setDisplayMessageBar] = useState(false)

  const { data: token } = useQuery(CustomerTokenDocument)
  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)
  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    skip: !isLoggedIn,
  })

  const { data: guestWishlistData } = useQuery(GuestWishlistDocument, {
    ssr: false,
    skip: isLoggedIn === true,
  })

  const { cache } = useApolloClient()

  const isWishlistEnabled = useWishlistEnabled()

  const heart = (
    <IconSvg
      src={iconHeart}
      size='medium'
      className={classes.wishlistIcon}
      // sx={(theme) => ({ color: theme.palette.primary.main })}
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

  const preventAnimationBubble: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    if (!sku) {
      return
    }

    if (isLoggedIn) {
      if (inWishlist && !ignoreProductWishlistStatus) {
        const wishlistItemsInSession =
          GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items || []

        const item = wishlistItemsInSession.find((element) => element?.product?.sku === sku)

        if (item?.id) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          removeWishlistItem({ variables: { wishlistItemId: item.id } })
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        addWishlistItem({
          variables: { input: { sku, quantity: 1, selected_options: selectedOptions } },
        })
        setDisplayMessageBar(true)
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
      setDisplayMessageBar(true)
    }
  }

  const output = (
    <Box>
      <IconButton
        key={sku}
        onClick={handleClick}
        onMouseDown={preventAnimationBubble}
        size='small'
        className={classes.wishlistButton}
        sx={[
          (theme) => ({
            padding: theme.spacings.xxs,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        title={
          inWishlist
            ? i18n._(/* i18n */ `Remove from wishlist`)
            : i18n._(/* i18n */ `Add to wishlist`)
        }
        aria-label={
          inWishlist
            ? i18n._(/* i18n */ `Remove from wishlist`)
            : i18n._(/* i18n */ `Add to wishlist`)
        }
      >
        {inWishlist ? activeHeart : heart}
      </IconButton>

      <MessageSnackbar
        open={showFeedbackMessage && displayMessageBar}
        variant='pill'
        action={
          <PageLink href='/wishlist' passHref>
            <Button
              id='view-wishlist-button'
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
            >
              <Trans id='View wishlist' />
            </Button>
          </PageLink>
        }
      >
        <Trans
          id='<0>{name}</0> has been added to your wishlist!'
          components={{ 0: <strong /> }}
          values={{ name }}
        />
      </MessageSnackbar>
    </Box>
  )

  return !hideForGuest || isLoggedIn ? output : null
}

ProductWishlistChipBase.defaultProps = {
  showFeedbackMessage: false,
}

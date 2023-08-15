import { useApolloClient, useMutation } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
import { useDisplayInclTax } from '@graphcommerce/magento-cart/hooks'
import { useCustomerSession, useCustomerQuery } from '@graphcommerce/magento-customer'
import { useProductLink } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardProps,
  responsiveVal,
  filterNonNullableKeys,
  extendableComponent,
  IconSvg,
  iconEllypsis,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, IconButton, Link, Menu, MenuItem, SxProps, Theme } from '@mui/material'
import { useState } from 'react'
import { GetIsInWishlistsDocument } from '../../queries/GetIsInWishlists.gql'
import { RemoveProductFromWishlistDocument } from '../../queries/RemoveProductFromWishlist.gql'
import { WishlistItemProductFragment } from '../WishlistItem/WishlistItemProduct.gql'
import { ProductAddToCart } from '../WishlistItem/ProductAddToCart'
import { InputMaybe } from '@graphcommerce/graphql-mesh'

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemActionCardProps = WishlistItemProductFragment & {
  sx?: SxProps<Theme>
  selectedOptions?: InputMaybe<string[]> | undefined
  children?: React.ReactNode
} & OwnerState &
  OptionalProductWishlistParent &
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
    sku,
    name,
    url_key,
    price_range,
    small_image,
    __typename: productType,
    thumbnail,
    children,
    sx = [],
    wishlistItemId,
    size = 'large',
    selectedOptions,
    ...rest
  } = props

  const productLink = useProductLink({ url_key, __typename: productType })
  const { cache } = useApolloClient()

  const { loggedIn } = useCustomerSession()

  const { data: GetCustomerWishlistData } = useCustomerQuery(GetIsInWishlistsDocument)

  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = <T extends HTMLElement>(event: React.MouseEvent<T>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = <T extends HTMLElement>(event: React.MouseEvent<T>) => {
    const t = event.target as T
    if (t.id === 'remove') {
      if (loggedIn) {
        let itemIdToDelete = wishlistItemId

        /** When no internal ID is provided, fetch it by sku */
        if (!itemIdToDelete) {
          const wishlistItemsInSession =
            GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items || []

          const item = wishlistItemsInSession.find(
            (element) => element?.product?.url_key === url_key,
          )
          if (item?.id) {
            itemIdToDelete = item.id
          }
        }

        if (itemIdToDelete) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          removeWishlistItem({ variables: { wishlistItemId: itemIdToDelete } })
        }
      } else {
        cache.modify({
          id: cache.identify({ __typename: 'GuestWishlist' }),
          fields: {
            items(existingItems = []) {
              const items = existingItems.filter((guestItem) => guestItem.sku !== sku)
              return items
            },
          },
        })
      }
    }
    setAnchorEl(null)
  }

  return (
    <ActionCard
      value={wishlistItemId || ''}
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
            pr: theme.spacings.xs,
          },
          '& .ActionCard-image': {
            alignSelf: 'flex-start',
            transform: 'translateY(10px)',
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
            pr: theme.spacings.xs,
            mb: { xs: 0.5, sm: 0 },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      image={
        small_image?.url && (
          <Image
            className={classes.image}
            layout='fill'
            src={small_image?.url}
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
            {name}
          </Link>
        ) : (
          name
        )
      }
      secondaryAction={
        <ProductAddToCart
          variables={{ sku: sku ?? '', quantity: 1, selectedOptions }}
          name={name ?? ''}
          price={price_range.minimum_price.final_price}
        />
      }
      price={<Money {...price_range.minimum_price.final_price} />}
      action={
        <>
          <IconButton
            aria-label='more'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            sx={() => ({
              gridArea: 'iconMenu',
              alignSelf: 'flex-start',
              padding: '0',
              marginLeft: 'auto',
              borderRadius: '0',
            })}
          >
            <IconSvg
              src={iconEllypsis}
              size='medium'
              sx={(theme) => ({
                fill: theme.palette.text.primary,
              })}
            />
          </IconButton>
          <Menu
            id='long-menu'
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 65,
                justifyContent: 'center',
              },
            }}
          >
            <MenuItem key='remove' id='remove' onClick={handleClose}>
              <Trans id='Remove Product' />
            </MenuItem>
          </Menu>
        </>
      }
      size={size}
      {...rest}
    />
  )
}

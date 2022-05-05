/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useApolloClient } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
import { useDisplayInclTax } from '@graphcommerce/magento-cart'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useProductLink } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import { responsiveVal, extendableComponent, iconEllypsis, IconSvg } from '@graphcommerce/next-ui'
import { Trans, t } from '@graphcommerce/lingui-next'
import { Badge, Box, Link, SxProps, Theme, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PageLink from 'next/link'
import { useState, PropsWithChildren } from 'react'
import { GetIsInWishlistsDocument } from '../../queries/GetIsInWishlists.gql'
import { RemoveProductFromWishlistDocument } from '../../queries/RemoveProductFromWishlist.gql'
import { WishlistItemProductFragment } from './WishlistItemProduct.gql'

const rowImageSize = responsiveVal(70, 125)

type OptionalProductWishlistParent = {
  wishlistItemId?: string
}

export type WishlistItemBaseProps = PropsWithChildren<WishlistItemProductFragment> & {
  sx?: SxProps<Theme>
} & OwnerState &
  OptionalProductWishlistParent

type OwnerState = { withOptions?: boolean }
const compName = 'WishlistItemBase' as const
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

export function WishlistItemBase(props: WishlistItemBaseProps) {
  const {
    sku,
    name,
    url_key,
    price_range,
    small_image,
    __typename: productType,
    children,
    sx = [],
    wishlistItemId,
  } = props

  const productLink = useProductLink({ url_key, __typename: productType })
  const inclTaxes = useDisplayInclTax()
  const { cache } = useApolloClient()

  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  const { data: GetCustomerWishlistData, loading } = useQuery(GetIsInWishlistsDocument, {
    skip: !isLoggedIn,
  })

  const [removeWishlistItem] = useMutation(RemoveProductFromWishlistDocument)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    if (event.target.id === 'remove') {
      if (isLoggedIn) {
        let itemIdToDelete = wishlistItemId

        /** When no internal ID is provided, fetch it by sku */
        if (!itemIdToDelete) {
          const wishlistItemsInSession =
            GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items || []

          const item = wishlistItemsInSession.find((element) => element?.product?.sku === sku)
          if (item?.id) {
            itemIdToDelete = item.id
          }
        }

        if (itemIdToDelete) {
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
    <Box
      className={classes.item}
      sx={[
        (theme) => ({
          position: 'relative',
          display: 'grid',
          gridTemplate: `
            "picture itemName itemName iconMenu"
            "picture itemOptions itemOptions"
            "picture itemQuantity itemQuantity itemPrice"
            "itemCartButton itemCartButton itemCartButton itemCartButton"`,
          gridTemplateColumns: `${rowImageSize} 1fr minmax(120px, 1fr) 1fr`,
          columnGap: theme.spacings.sm,
          alignItems: 'baseline',
          typography: 'body1',
          paddingBottom: theme.spacings.xl,
          paddingTop: theme.spacings.sm,
          [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacings.md,
            gridTemplate: `
              "picture itemName itemName itemName iconMenu"
              "picture itemQuantity itemOptions itemPrice itemPrice"
              "itemCartButton itemCartButton itemCartButton itemCartButton itemCartButton"`,
            gridTemplateColumns: `${rowImageSize} 4fr 1fr minmax(120px, 1fr) minmax(120px, 1fr)`,
          },
          borderBottom: `1px solid ${theme.palette.divider}`,

          '&:not(.withOptions)': {
            display: 'grid',
            gridTemplate: `
            "picture itemName itemName iconMenu"
            "picture itemQuantity itemPrice itemPrice"
            "itemCartButton itemCartButton itemCartButton itemCartButton"`,
            alignItems: 'center',
            paddingBottom: theme.spacings.xl,
            gridTemplateColumns: `${rowImageSize} 1fr minmax(120px, 1fr) 1fr`,
            [theme.breakpoints.up('sm')]: {
              paddingBottom: theme.spacings.md,
              gridTemplate: `
              "picture itemName itemName itemName iconMenu"
              "picture itemQuantity itemQuantity itemQuantity itemPrice"
              "itemCartButton itemCartButton itemCartButton itemCartButton itemCartButton"
            `,
              gridTemplateColumns: `${rowImageSize} 4fr 1fr minmax(120px, 1fr) minmax(120px, 1fr)`,
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Badge
        color='default'
        component='div'
        className={classes.picture}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={(theme) => ({
          gridArea: 'picture',
          width: rowImageSize,
          height: rowImageSize,
          padding: responsiveVal(5, 10),
          alignSelf: 'flex-start',
        })}
      >
        <PageLink href={productLink} passHref>
          <Box
            component='a'
            className={classes.productLink}
            sx={{ display: 'block', width: '100%', overflow: 'hidden' }}
          >
            {small_image?.url && (
              <Image
                src={small_image.url ?? ''}
                layout='fill'
                alt={small_image.label ?? name ?? ''}
                sizes={responsiveVal(70, 125)}
                className={classes.image}
                sx={(theme) => ({
                  gridColumn: 1,
                  backgroundColor: theme.palette.background.image,
                  objectFit: 'cover',
                  display: 'block',
                  width: '110% !important',
                  height: '110% !important',
                  marginLeft: '-5%',
                  marginTop: '-5%',
                })}
              />
            )}
          </Box>
        </PageLink>
      </Badge>

      <PageLink href={productLink} passHref>
        <Link
          variant='body1'
          className={classes.itemName}
          underline='hover'
          sx={(theme) => ({
            typgrapht: 'subtitle1',
            fontWeight: theme.typography.fontWeightBold,
            gridArea: 'itemName',
            color: theme.palette.text.primary,
            textDecoration: 'none',
            flexWrap: 'nowrap',
            maxWidth: 'max-content',
            '&:not(.withOptions)': {
              alignSelf: 'flex-start',
            },
          })}
        >
          {name}
        </Link>
      </PageLink>

      <Typography
        component='div'
        variant='body1'
        className={classes.root}
        sx={[
          (theme) => ({ gridArea: 'itemPrice', marginLeft: 'auto' }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {price_range.minimum_price.regular_price.value !==
          price_range.minimum_price.final_price.value && (
          <Box
            component='span'
            sx={{
              textDecoration: 'line-through',
              color: 'text.disabled',
              marginRight: '8px',
            }}
            className={classes.discountPrice}
          >
            <Money {...price_range.minimum_price.regular_price} />
          </Box>
        )}
        <Money {...price_range.minimum_price.final_price} />
      </Typography>

      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        sx={(theme) => ({
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
          <Trans>Remove Product</Trans>
        </MenuItem>
      </Menu>

      {children}
    </Box>
  )
}

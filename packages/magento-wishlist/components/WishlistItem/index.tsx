import { Image } from '@graphcommerce/image'
import { useDisplayInclTax } from '@graphcommerce/magento-cart'
import { useProductLink } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import { responsiveVal, extendableComponent } from '@graphcommerce/next-ui'
import { Badge, Box, Link, SxProps, Theme, Typography } from '@mui/material'
import PageLink from 'next/link'
import { WishlistItemFragment } from './ProductWishlistItem.gql'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { iconChevronDown, IconSvg } from '@graphcommerce/next-ui'

import { useState } from 'react'

const rowImageSize = responsiveVal(70, 125)

export type WishlistItemProps = {
  item: WishlistItemFragment
  sx?: SxProps<Theme>
}

type OwnerState = { withOptions?: boolean }
const compName = 'WishlistItem' as const
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

export default function WishlistItem(props: WishlistItemProps) {
  const { item, sx = [] } = props
  const productLink = useProductLink(item)
  const inclTaxes = useDisplayInclTax()

  const options = ['Remove']

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      className={classes.item}
      sx={[
        (theme) => ({
          display: 'grid',
          gridTemplate: `
            "picture itemName itemName itemName IconMenu"
            "picture itemName itemName itemName itemPrice"`,
          gridTemplateColumns: `${rowImageSize} 1fr minmax(120px, 1fr) 1fr`,
          columnGap: theme.spacings.sm,
          alignItems: 'baseline',
          typography: 'body1',
          paddingBottom: theme.spacings.md,
          paddingTop: theme.spacings.md,
          [theme.breakpoints.up('sm')]: {
            gridTemplate: `
              "picture itemName itemName itemName IconMenu"
              "picture itemName itemName itemName itemPrice"`,
            gridTemplateColumns: `${rowImageSize} 4fr 1fr minmax(120px, 1fr) minmax(75px, 1fr)`,
            paddingBottom: theme.spacings.lg,
          },
          borderBottom: `1px solid ${theme.palette.divider}`,

          '&:not(.withOptions)': {
            display: 'grid',
            gridTemplate: `
            "picture itemName itemName IconMenu"
            "picture itemName itemName itemPrice"`,
            alignItems: 'center',
            gridTemplateColumns: `${rowImageSize} 1fr minmax(120px, 1fr) 1fr`,
            [theme.breakpoints.up('sm')]: {
              gridTemplate: `
              "picture itemName itemName itemName IconMenu"
              "picture itemName itemName itemName itemPrice"
            `,
              gridTemplateColumns: `${rowImageSize} 4fr 1fr minmax(120px, 1fr) minmax(75px, 1fr)`,
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
          border: `1px solid ${theme.palette.divider}`,
          alignSelf: 'center',
        })}
      >
        <PageLink href={productLink} passHref>
          <Box
            component='a'
            className={classes.productLink}
            sx={{ display: 'block', width: '100%', overflow: 'hidden' }}
          >
            {item?.small_image?.url && (
              <Image
                src={item.small_image.url ?? ''}
                layout='fill'
                alt={item.small_image.label ?? item.name ?? ''}
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
          {item.name}
        </Link>
      </PageLink>

      <Typography component='div' variant='body1' className={classes.root} sx={sx}>
        {item.price_range.minimum_price.regular_price.value !==
          item.price_range.minimum_price.final_price.value && (
          <Box
            component='span'
            sx={{
              textDecoration: 'line-through',
              color: 'text.disabled',
              marginRight: '8px',
            }}
            className={classes.discountPrice}
          >
            <Money {...item.price_range.minimum_price.regular_price} />
          </Box>
        )}
        <Money {...item.price_range.minimum_price.final_price} />
      </Typography>

      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        sx={(theme) => ({
          gridArea: 'IconMenu',
          width: '40px',
          alignSelf: 'flex-start',
        })}
      >
        <IconSvg src={iconChevronDown} size='medium' />
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
            maxHeight: 40 * 4.5,
            width: '15ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

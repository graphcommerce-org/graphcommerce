import { ProductListItemFragment } from '@graphcommerce/magento-product'
import {
  IconSvg,
  iconHeart,
  extendableComponent,
  MessageSnackbar,
  iconChevronRight,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { SxProps, Theme, IconButton, Box, IconButtonProps, Button } from '@mui/material'
import React from 'react'
import { useWishlistEnabled, useAddProductToWishlistAction } from '../../hooks'

export type ProductWishlistChipProps = ProductListItemFragment & {
  sx?: SxProps<Theme>
  buttonProps?: IconButtonProps
}

const compName = 'ProductWishlistChipBase' as const
const parts = ['root', 'wishlistIcon', 'wishlistIconActive', 'wishlistButton'] as const
const { classes } = extendableComponent(compName, parts)

export const ProductWishlistIconButton = React.memo<ProductWishlistChipProps>((props) => {
  const { buttonProps, sx = [], ...product } = props
  const enabled = useWishlistEnabled()
  const { current, onClick, cancelBubble, showSuccess, hideShowSuccess } =
    useAddProductToWishlistAction({ product, index: 0 })

  if (!enabled) return null

  return (
    <Box>
      <IconButton
        onClick={onClick}
        onMouseDown={cancelBubble}
        onTouchStart={cancelBubble}
        size='small'
        className={classes.wishlistButton}
        {...buttonProps}
        sx={[(theme) => ({ padding: theme.spacings.xxs }), ...(Array.isArray(sx) ? sx : [sx])]}
        title={
          current ? i18n._(/* i18n */ 'Remove from wishlist') : i18n._(/* i18n */ 'Add to wishlist')
        }
        aria-label={
          current ? i18n._(/* i18n */ 'Remove from wishlist') : i18n._(/* i18n */ 'Add to wishlist')
        }
      >
        {current ? (
          <IconSvg
            src={iconHeart}
            size='medium'
            className={classes.wishlistIconActive}
            sx={(theme) => ({ color: theme.palette.primary.main, fill: 'currentcolor' })}
          />
        ) : (
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
                // todo
                color:
                  theme.palette.mode === 'light'
                    ? theme.palette.text.secondary
                    : theme.palette.primary.contrastText,
              },
            })}
          />
        )}
      </IconButton>

      {import.meta.graphCommerce.wishlistShowFeedbackMessage && (
        <MessageSnackbar
          open={showSuccess}
          onClose={hideShowSuccess}
          onMouseDown={cancelBubble}
          onTouchStart={cancelBubble}
          autoHide
          variant='pill'
          severity='success'
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
            values={{ name: product.name }}
          />
        </MessageSnackbar>
      )}
    </Box>
  )
})

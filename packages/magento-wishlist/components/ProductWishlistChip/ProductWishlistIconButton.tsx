import type { ProductListItemFragment } from '@graphcommerce/magento-product'
import type { IconSvgProps } from '@graphcommerce/next-ui'
import {
  extendableComponent,
  iconChevronRight,
  iconHeart,
  IconSvg,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import type { IconButtonProps, SxProps, Theme } from '@mui/material'
import { Box, Button, IconButton } from '@mui/material'
import React from 'react'
import { useAddProductToWishlistAction, useWishlistEnabled } from '../../hooks'

export type ProductWishlistChipProps = ProductListItemFragment & {
  sx?: SxProps<Theme>
  buttonProps?: IconButtonProps
  iconSvgProps?: Partial<IconSvgProps>
}

const compName = 'ProductWishlistChipBase'
const parts = ['root', 'wishlistIcon', 'wishlistIconActive', 'wishlistButton'] as const
const { classes } = extendableComponent(compName, parts)

export const ProductWishlistIconButton = React.memo<ProductWishlistChipProps>((props) => {
  const { buttonProps, iconSvgProps, sx = [], ...product } = props
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
            {...iconSvgProps}
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
            {...iconSvgProps}
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

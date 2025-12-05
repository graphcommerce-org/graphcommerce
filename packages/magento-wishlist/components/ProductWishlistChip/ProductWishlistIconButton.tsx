import type { ProductListItemFragment } from '@graphcommerce/magento-product'
import { wishlistShowFeedbackMessage } from '@graphcommerce/next-config/config'
import type { IconSvgProps } from '@graphcommerce/next-ui'
import {
  extendableComponent,
  iconChevronRight,
  iconHeart,
  IconSvg,
  MessageSnackbar,
  sxx,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
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
        sx={sxx((theme) => ({ padding: theme.spacings.xxs }), sx)}
        title={current ? t`Remove from wishlist` : t`Add to wishlist`}
        aria-label={current ? t`Remove from wishlist` : t`Add to wishlist`}
      >
        {current ? (
          <IconSvg
            src={iconHeart}
            size='medium'
            className={classes.wishlistIconActive}
            sx={(theme) => ({ color: theme.vars.palette.primary.main, fill: 'currentcolor' })}
            {...iconSvgProps}
          />
        ) : (
          <IconSvg
            src={iconHeart}
            size='medium'
            className={classes.wishlistIcon}
            sx={(theme) => ({
              color: theme.vars.palette.background.paper,
              '.SidebarGallery-root &': {
                // todo
                color: theme.vars.palette.primary.contrastText,
                ...theme.applyStyles('light', {
                  color: theme.vars.palette.text.secondary,
                }),
              },
              ...theme.applyStyles('light', {
                color: theme.vars.palette.text.secondary,
              }),
            })}
            {...iconSvgProps}
          />
        )}
      </IconButton>
      {wishlistShowFeedbackMessage && (
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
              <Trans>View wishlist</Trans>
            </Button>
          }
        >
          <Trans>
            <strong>{product.name}</strong> has been added to your wishlist!
          </Trans>
        </MessageSnackbar>
      )}
    </Box>
  )
})

import { breakpointVal, NextLink } from '@graphcommerce/next-ui'
import type { BoxProps, ButtonBaseProps, SxProps, Theme } from '@mui/material'
import { Box, ButtonBase } from '@mui/material'
import React from 'react'

export type ProductListItemLinkProps = ButtonBaseProps<typeof NextLink>
export type ProductListItemLinkOrDivProps = ProductListItemLinkProps | BoxProps

function isLink(props: ProductListItemLinkOrDivProps): props is ProductListItemLinkProps {
  return 'href' in props
}

export const ProductListItemLinkOrDiv = React.forwardRef<
  HTMLDivElement | HTMLAnchorElement,
  ProductListItemLinkOrDivProps
>((props, ref) => {
  const { sx = [] } = props

  const sxProps: SxProps<Theme> = [
    (theme) => ({
      display: 'block',
      position: 'relative',
      height: '100%',
      ...breakpointVal(
        'borderRadius',
        theme.shape.borderRadius * 2,
        theme.shape.borderRadius * 3,
        theme.breakpoints.values,
      ),
    }),
    ...(Array.isArray(sx) ? sx : [sx]),
  ]

  return isLink(props) ? (
    <ButtonBase ref={ref} component={NextLink} {...props} sx={sxProps} focusRipple />
  ) : (
    <Box ref={ref} component='div' {...props} sx={sxProps} />
  )
})

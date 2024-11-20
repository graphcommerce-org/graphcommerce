import { NextLink, breakpointVal } from '@graphcommerce/next-ui'
import type { BoxProps, ButtonBaseProps, SxProps, Theme } from '@mui/material'
import { Box, ButtonBase } from '@mui/material'

type ProductListItemLinkProps = ButtonBaseProps<typeof NextLink>
type ProductListItemLinkOrDivProps = ProductListItemLinkProps | BoxProps

function isLink(props: ProductListItemLinkOrDivProps): props is ProductListItemLinkProps {
  return 'href' in props
}

export function ProductListItemLinkOrDiv(props: ProductListItemLinkOrDivProps) {
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
    <ButtonBase component={NextLink} {...props} sx={sxProps} />
  ) : (
    <Box {...props} sx={sxProps} />
  )
}

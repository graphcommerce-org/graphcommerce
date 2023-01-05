import { extendableComponent, breakpointVal } from '@graphcommerce/next-ui'
import { ButtonBase, SxProps, Theme, useEventCallback } from '@mui/material'
import PageLink, { LinkProps } from 'next/link'

export type ProductListItemLinkProps<T extends Record<string, unknown> = Record<string, unknown>> =
  {
    item: T
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>, item: T) => void
    sx?: SxProps<Theme>
    children: React.ReactNode
  } & Pick<LinkProps, 'href'>

const { classes } = extendableComponent('ProductListItem', ['root'] as const)

export function ProductListItemLink<T extends Record<string, unknown> = Record<string, unknown>>(
  props: ProductListItemLinkProps<T>,
) {
  const { onClick, item, href, sx = [], children } = props

  const handleClick = useEventCallback((e: React.MouseEvent<HTMLAnchorElement>) =>
    onClick?.(e, item),
  )

  return (
    <ButtonBase
      href={href.toString()}
      sx={[
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
      ]}
      className={classes.root}
      onClick={onClick ? handleClick : undefined}
    >
      {children}
    </ButtonBase>
  )
}

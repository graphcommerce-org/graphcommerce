'use client'

import { sxx } from '@graphcommerce/next-ui'
import type { LinkProps } from '@mui/material'
import { Box, Link } from '@mui/material'
import { usePathname } from 'next/navigation'
import { extendableComponent } from '../Styles/extendableComponent'

const { classes, selectors } = extendableComponent('DesktopNavItem', ['root', 'line'] as const)

export type DesktopNavItemLinkProps = LinkProps<'a'> & {
  active?: boolean
}
export type DesktopNavItemButtonProps = LinkProps<'div'> & {
  onClick: LinkProps<'button'>['onClick']
  active?: boolean
}

function isLinkProps(
  props: DesktopNavItemLinkProps | DesktopNavItemButtonProps,
): props is DesktopNavItemLinkProps {
  return 'href' in props
}

export function DesktopNavItem(props: DesktopNavItemLinkProps | DesktopNavItemButtonProps) {
  const pathname = usePathname()

  if (!isLinkProps(props)) {
    const { onClick, children, sx = [], active, ...linkProps } = props

    return (
      <Link
        className={classes.root}
        component='div'
        variant='h6'
        color='text.primary'
        underline='none'
        {...linkProps}
        onClick={onClick}
        sx={sxx({ whiteSpace: 'nowrap', paddingTop: '6px', cursor: 'pointer' }, sx)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{children}</Box>
      </Link>
    )
  }

  const { href, children, sx = [], active, ...linkProps } = props
  const activeValue =
    typeof active === 'undefined' ? pathname?.startsWith((href ?? '').toString()) : active

  return (
    <Link
      href={href}
      className={classes.root}
      variant='h6'
      color='text.primary'
      underline='none'
      {...linkProps}
      sx={sxx({ whiteSpace: 'nowrap', paddingTop: '6px' }, sx)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{children}</Box>
      <Box
        component='span'
        className={classes.line}
        sx={sxx(
          (theme) => ({
            maxWidth: 40,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            height: 2,
            background: theme.vars.palette.primary.main,
            margin: '0 auto',
            marginTop: '6px',
          }),
          activeValue
            ? {
                opacity: 1,
              }
            : {
                opacity: 0,
              },
        )}
      />
    </Link>
  )
}
DesktopNavItem.selectors = selectors

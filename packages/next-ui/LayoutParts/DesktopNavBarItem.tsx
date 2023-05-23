import { Box, Link, LinkProps } from '@mui/material'
import { useRouter } from 'next/compat/router'
import { extendableComponent } from '../Styles/extendableComponent'

const { classes, selectors } = extendableComponent('DesktopNavItem', ['root', 'line'] as const)

export type DesktopNavItemLinkProps = LinkProps<'a'>
export type DesktopNavItemButtonProps = LinkProps<'div'> & {
  onClick: LinkProps<'button'>['onClick']
}

function isLinkProps(
  props: DesktopNavItemLinkProps | DesktopNavItemButtonProps,
): props is DesktopNavItemLinkProps {
  return 'href' in props
}

export function DesktopNavItem(props: DesktopNavItemLinkProps | DesktopNavItemButtonProps) {
  const router = useRouter()

  if (!isLinkProps(props)) {
    const { onClick, children, sx = [], ...linkProps } = props

    return (
      <Link
        className={classes.root}
        component='div'
        variant='h6'
        color='text.primary'
        underline='none'
        {...linkProps}
        onClick={onClick}
        sx={[
          { whiteSpace: 'nowrap', paddingTop: '6px', cursor: 'pointer' },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{children}</Box>
      </Link>
    )
  }

  const { href, children, sx = [], ...linkProps } = props

  const active = router?.asPath.startsWith((href ?? '').toString())

  return (
    <Link
      href={href}
      className={classes.root}
      variant='h6'
      color='text.primary'
      underline='none'
      {...linkProps}
      sx={[{ whiteSpace: 'nowrap', paddingTop: '6px' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{children}</Box>
      <Box
        component='span'
        className={classes.line}
        sx={{
          maxWidth: 40,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          height: 2,
          background: (theme) => theme.palette.primary.main,
          margin: '0 auto',
          marginTop: '6px',
          opacity: active ? 1 : 0,
        }}
      />
    </Link>
  )
}
DesktopNavItem.selectors = selectors

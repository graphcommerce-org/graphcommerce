import {
  Divider,
  Fab,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
  Menu,
  styled,
} from '@mui/material'
import { m } from 'framer-motion'
import PageLink, { LinkProps as PageLinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { extendableComponent } from '../Styles/extendableComponent'
import { responsiveVal } from '../Styles/responsiveVal'
import { SvgIcon } from '../SvgIcon/SvgIcon'
import { iconMenu, iconClose } from '../icons'
import { useFabAnimation } from './useFabAnimation'

export type MenuFabItemProps = Omit<ListItemProps<'div'>, 'href' | 'button'> &
  Pick<PageLinkProps, 'href'>

export function MenuFabItem(props: MenuFabItemProps) {
  const { href, children, sx, ...listItemProps } = props
  const hrefString = href.toString()
  const { asPath } = useRouter()
  const active = hrefString === '/' ? asPath === hrefString : asPath.startsWith(hrefString)

  return (
    <PageLink key={href.toString()} href={href} passHref>
      <ListItem button dense selected={active} {...listItemProps}>
        <ListItemText sx={{ typography: 'h4' }} disableTypography>
          {children}
        </ListItemText>
      </ListItem>
    </PageLink>
  )
}

const MotionDiv = styled(m.div)({})

export type MenuFabProps = {
  children?: React.ReactNode
  secondary?: React.ReactNode
  search?: React.ReactNode
  menuIcon?: React.ReactNode
  closeIcon?: React.ReactNode
}

const { componentName, classes, selectors } = extendableComponent('MenuFab', [
  'fab',
  'shadow',
  'menu',
] as const)

export function MenuFab(props: MenuFabProps) {
  const { children, secondary, search, menuIcon, closeIcon } = props
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const { opacity, scale, shadowOpacity } = useFabAnimation()

  useEffect(() => {
    const clear = () => setOpenEl(null)
    router.events.on('routeChangeStart', clear)
    return () => router.events.off('routeChangeStart', clear)
  }, [router])

  return (
    <MotionDiv
      sx={(theme) => ({
        position: 'fixed',
        zIndex: 99,
        top: { xs: 'unset', md: `calc(${theme.appShell.headerHeightMd} / 2 - 28px)` },
        left: { xs: 20, md: theme.page.horizontal },
        bottom: { xs: 20, md: 'unset' },
        [theme.breakpoints.down('md')]: {
          opacity: '1 !important',
          transform: 'none !important',
        },
      })}
      style={{ scale, opacity }}
      className={componentName}
    >
      <Fab
        color='inherit'
        aria-label='Open Menu'
        size='medium'
        onClick={(event) => setOpenEl(event.currentTarget)}
        sx={(theme) => ({
          boxShadow: 'none',
          '&:hover, &:focus': {
            boxShadow: 'none',
            background: theme.palette.text.primary,
          },
          background: theme.palette.text.primary,
          width: responsiveVal(42, 56),
          height: responsiveVal(42, 56),
          pointerEvents: 'all',
          color: theme.palette.background.paper,
        })}
        className={classes.fab}
      >
        {closeIcon ?? (
          <SvgIcon src={iconClose} size='medium' sx={{ display: openEl ? 'block' : 'none' }} />
        )}
        {menuIcon ?? (
          <SvgIcon src={iconMenu} size='medium' sx={{ display: openEl ? 'none' : 'block' }} />
        )}
      </Fab>
      <MotionDiv
        sx={(theme) => ({
          pointerEvents: 'none',
          borderRadius: '99em',
          position: 'absolute',
          height: '100%',
          width: '100%',
          boxShadow: theme.shadows[6],
          top: 0,
          [theme.breakpoints.down('md')]: { opacity: '1 !important' },
        })}
        className={classes.shadow}
        style={{ opacity: shadowOpacity }}
      />

      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        disableScrollLock
        transitionDuration={{ appear: 175, enter: 175, exit: 175 }}
        PaperProps={{
          sx: (theme) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            minWidth: responsiveVal(200, 280),
            marginTop: 12,
            [theme.breakpoints.down('md')]: {
              marginTop: `calc((${responsiveVal(42, 56)} + 12px) * -1)`,
            },
          }),
        }}
        className={classes.menu}
      >
        {search && (
          <List>
            <ListItem dense>{search}</ListItem>
          </List>
        )}
        <List>{children}</List>
        <Divider variant='middle' />
        <List component='div'>{secondary}</List>
      </Menu>
    </MotionDiv>
  )
}
MenuFab.selectors = selectors

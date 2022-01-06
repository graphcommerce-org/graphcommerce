import { Divider, Fab, List, ListItem, ListItemText, Menu } from '@mui/material'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { UseStyles } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'
import { makeStyles, typography, useMergedClasses } from '../Styles/tssReact'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconMenu, iconClose } from '../icons'
import { MenuProps } from './Menu'
import { useFabAnimation } from './useFabAnimation'

const useStyles = makeStyles({ name: 'Menu' })((theme) => ({
  menuWrapper: {
    position: 'fixed',
    zIndex: 99,
    left: theme.page.horizontal,
    [theme.breakpoints.down('md')]: {
      top: 'unset',
      left: 20,
      bottom: 20,
      transform: 'none !important',
      opacity: '1 !important',
    },
    [theme.breakpoints.up('md')]: {
      top: `calc(${theme.appShell.headerHeightMd} / 2 - 28px)`,
    },
  },
  menuFab: {
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
  },
  shadow: {
    pointerEvents: 'none',
    borderRadius: '99em',
    position: 'absolute',
    height: '100%',
    width: '100%',
    boxShadow: theme.shadows[6],
    top: 0,
    [theme.breakpoints.down('md')]: {
      opacity: '1 !important',
    },
  },
  menu: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    minWidth: responsiveVal(200, 280),
    marginTop: 12,
    [theme.breakpoints.down('md')]: {
      marginTop: `calc((${responsiveVal(42, 56)} + 12px) * -1)`,
    },
  },
  menuItemText: {
    ...typography(theme, 'h4'),
    lineHeight: 1.1,
  },
  menuItem: {},
}))

export type MenuFabProps = MenuProps &
  UseStyles<typeof useStyles> & {
    children?: React.ReactNode
    search?: React.ReactNode
    menuIcon?: React.ReactNode
    closeIcon?: React.ReactNode
  }

export default function MenuFab(props: MenuFabProps) {
  const { menu, children, search, menuIcon, closeIcon } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const { opacity, scale, shadowOpacity } = useFabAnimation()

  useEffect(() => {
    const clear = () => setOpenEl(null)
    router.events.on('routeChangeStart', clear)
    return () => router.events.off('routeChangeStart', clear)
  }, [router])

  return (
    <m.div className={classes.menuWrapper} style={{ scale, opacity }}>
      <Fab
        color='inherit'
        aria-label='Open Menu'
        size='medium'
        onClick={(event) => setOpenEl(event.currentTarget)}
        className={classes.menuFab}
      >
        {closeIcon ?? (
          <SvgImageSimple src={iconClose} inverted style={{ display: openEl ? 'block' : 'none' }} />
        )}
        {menuIcon ?? (
          <SvgImageSimple src={iconMenu} inverted style={{ display: openEl ? 'none' : 'block' }} />
        )}
      </Fab>
      <m.div className={classes.shadow} style={{ opacity: shadowOpacity }} />

      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        classes={{ paper: classes.menu }}
        disableScrollLock
        transitionDuration={{ appear: 175, enter: 175, exit: 175 }}
      >
        {search && (
          <List>
            <ListItem dense>{search}</ListItem>
          </List>
        )}
        <List>
          <PageLink href='/' passHref>
            <ListItem
              button
              dense
              selected={router.asPath === '/'}
              classes={{ root: classes.menuItem }}
            >
              <ListItemText classes={{ primary: classes.menuItemText }}>Home</ListItemText>
            </ListItem>
          </PageLink>

          {menu.map(({ href, children: itemChildren, ...linkProps }) => (
            <PageLink key={href.toString()} href={href} {...linkProps} passHref>
              <ListItem
                button
                dense
                selected={router.asPath.startsWith(href.toString())}
                classes={{ root: classes.menuItem }}
              >
                <ListItemText classes={{ primary: classes.menuItemText }}>
                  {itemChildren}
                </ListItemText>
              </ListItem>
            </PageLink>
          ))}
        </List>
        <Divider variant='middle' />
        <List component='div'>{children}</List>
      </Menu>
    </m.div>
  )
}

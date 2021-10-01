import { Divider, Fab, List, ListItem, ListItemText, Menu, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { m } from 'framer-motion'
import PageLink from 'next/link'
import { Router, useRouter } from 'next/router'
import React from 'react'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconMenu } from '../icons'
import { MenuProps } from './Menu'
import useFabAnimation from './useFabAnimation'

const useStyles = makeStyles(
  (theme: Theme) => ({
    menuWrapper: {
      position: 'fixed',
      zIndex: 99,
      left: theme.page.horizontal,
      top: `calc(${theme.spacings.xxs} - 5px)`,
      [theme.breakpoints.down('lg')]: {
        top: 'unset',
        left: 20,
        bottom: 20,
        transform: 'none !important',
        opacity: '1 !important',
      },
    },
    menuFab: {
      background: theme.palette.text.primary,
      boxShadow: theme.shadows[2],
      width: responsiveVal(42, 56),
      height: responsiveVal(42, 56),
      pointerEvents: 'all',
      '&:hover, &:focus': {
        background: theme.palette.text.primary,
      },
    },
    menu: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      minWidth: responsiveVal(200, 280),
    },
    menuItemText: {
      fontSize: '1.5em',
      fontWeight: 500,
      letterSpacing: '-0.0375em',
      lineHeight: 1,
    },
    menuItem: {},
  }),
  { name: 'Menu' },
)

export type MenuFabProps = MenuProps &
  UseStyles<typeof useStyles> & { children?: React.ReactNode; search?: React.ReactNode }

export default function MenuFab(props: MenuFabProps) {
  const { menu, children, search } = props
  const classes = useStyles(props)
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const { filter, opacity, scale } = useFabAnimation()

  Router.events.on('routeChangeStart', () => setOpenEl(null))

  return (
    <m.div className={classes.menuWrapper} style={{ opacity, scale, filter }}>
      <Fab
        color='primary'
        aria-label='Open Menu'
        size='medium'
        onClick={(event) => setOpenEl(event.currentTarget)}
        className={classes.menuFab}
      >
        <SvgImageSimple src={iconMenu} inverted alt='menu' loading='eager' />
      </Fab>

      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        classes={{ paper: classes.menu }}
        disableScrollLock
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

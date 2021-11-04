import {
  Divider,
  Fab,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  Theme,
} from '@material-ui/core'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { useEffect } from 'react'
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
      [theme.breakpoints.down('sm')]: {
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
      '& svg': {
        stroke: theme.palette.background.default,
      },
    },
    menu: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      minWidth: responsiveVal(200, 280),
    },
    menuItemText: {
      ...theme.typography.h3,
      fontWeight: 550,
      lineHeight: 1,
      // fontSize: '1.6em',
      // fontWeight: 550,
      // letterSpacing: '-0.0375em',
      // lineHeight: 1,
    },
    menuItem: {},
  }),
  { name: 'Menu' },
)

export type MenuFabProps = MenuProps &
  UseStyles<typeof useStyles> & {
    children?: React.ReactNode
    search?: React.ReactNode
    menuIcon?: React.ReactNode
  }

export default function MenuFab(props: MenuFabProps) {
  const { menu, children, search, menuIcon } = props
  const classes = useStyles(props)
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const { filter, opacity, scale } = useFabAnimation()

  useEffect(() => {
    const clear = () => setOpenEl(null)
    router.events.on('routeChangeStart', clear)
    return () => router.events.off('routeChangeStart', clear)
  }, [router])

  return (
    <m.div className={classes.menuWrapper} style={{ opacity, scale, filter }}>
      <Fab
        color='primary'
        aria-label='Open Menu'
        size='medium'
        onClick={(event) => setOpenEl(event.currentTarget)}
        className={classes.menuFab}
      >
        {menuIcon ?? <SvgImageSimple src={iconMenu} inverted />}
      </Fab>

      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        classes={{ paper: classes.menu }}
        disableScrollLock
        transitionDuration={{
          appear: 175,
          enter: 175,
          exit: 175,
        }}
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

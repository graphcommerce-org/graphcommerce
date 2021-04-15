import {
  Theme,
  makeStyles,
  Fab,
  ListItem,
  ListItemText,
  Menu,
  List,
  Divider,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { m } from 'framer-motion'
import { Router, useRouter } from 'next/router'
import React from 'react'
import PageLink from '../PageTransition/PageLink'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'
import { MenuProps } from './Menu'
import useFabAnimation from './useFabAnimation'

const useStyles = makeStyles(
  (theme: Theme) => ({
    menuWrapper: {
      position: 'fixed',
      zIndex: 11,
      left: theme.page.horizontal,
      [theme.breakpoints.down('sm')]: {
        bottom: theme.page.vertical,
        transform: 'none !important',
        opacity: '1 !important',
      },
      [theme.breakpoints.up('md')]: {
        top: theme.page.vertical,
      },
    },
    menuFab: {
      background: theme.palette.text.primary,
      boxShadow: theme.shadows[2],
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
  const { filter, opacity, translateY } = useFabAnimation()

  Router.events.on('routeChangeStart', () => setOpenEl(null))

  return (
    <m.div className={classes.menuWrapper} style={{ opacity, translateY, filter }}>
      <Fab
        color='primary'
        aria-label='Open Menu'
        size='medium'
        onClick={(event) => setOpenEl(event.currentTarget)}
        className={classes.menuFab}
      >
        <MenuIcon htmlColor='#fff' fontSize='small' />
      </Fab>

      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        classes={{ paper: classes.menu }}
      >
        {search && (
          <List>
            <ListItem dense>{search}</ListItem>
          </List>
        )}
        <List>
          <PageLink href='/'>
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
            <PageLink key={href.toString()} href={href} {...linkProps}>
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
        <List>{children}</List>
      </Menu>
    </m.div>
  )
}

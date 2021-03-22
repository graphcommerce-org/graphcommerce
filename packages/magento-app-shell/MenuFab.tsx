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
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { Router, useRouter } from 'next/router'
import React from 'react'
import { MenuQueryFragment } from './MenuQueryFragment.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
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

export type MenuFabProps = MenuQueryFragment &
  UseStyles<typeof useStyles> & { children?: React.ReactNode; search?: React.ReactNode }

export default function MenuFab(props: MenuFabProps) {
  const { menu, children, search } = props
  const classes = useStyles(props)
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  Router.events.on('routeChangeStart', () => setOpenEl(null))

  return (
    <>
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

          {menu?.items?.map((cat) => {
            if (!cat?.url_path || !cat.include_in_menu) return null
            return (
              <PageLink key={cat.url_path} href={`/${cat.url_path}`}>
                <ListItem
                  button
                  dense
                  selected={router.asPath.startsWith(`/${cat.url_path}`)}
                  classes={{ root: classes.menuItem }}
                >
                  <ListItemText classes={{ primary: classes.menuItemText }}>
                    {cat.name}
                  </ListItemText>
                </ListItem>
              </PageLink>
            )
          })}
        </List>
        <Divider variant='middle' />
        <List>{children}</List>
      </Menu>
    </>
  )
}

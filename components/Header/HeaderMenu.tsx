import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import { Router } from 'next/router'
import {
  Theme,
  Divider,
  ListSubheader,
  makeStyles,
  Fab,
  ListItem,
  ListItemText,
  Menu as MaterialMenu,
} from '@material-ui/core'
import Link from 'components/Link'
import { vpCalc } from 'components/Theme'

type TreePage = GQLHeaderFragment['menuPages'][0]['localizations'][0] & {
  children: TreePage[]
  parent?: TreePage
  isRoot: boolean
}

const extractRoots = (menuPages: GQLHeaderFragment['menuPages']) => {
  const treePages: TreePage[] = menuPages
    .filter((p) => p.localizations.length > 0)
    .map((p) => ({ ...p.localizations[0], children: [], isRoot: p.url === '/' }))

  treePages.forEach((p) => {
    const parentUrl = p.url.split('/').slice(0, -1).join('/')
    const parent = treePages.find((pp) => pp.url === parentUrl)
    p.parent = parent
    if (parent) parent.children.push(p)
  })
  const roots = treePages.filter((p) => !p.parent || p.parent.isRoot)
  return roots
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    menuOpen: {
      // position: 'fixed',
      // left: vpCalc(18, 60),
      // top: vpCalc(18, 60),
      // zIndex: zIndex.appBar,
    },
    menu: {
      backgroundColor: theme.palette.tertiary.main,
      color: theme.palette.tertiary.contrastText,
      minWidth: vpCalc(200, 280),
    },
    menuClose: {
      marginLeft: 16,
      marginTop: 8,
      marginBottom: 16,
    },
    menuLink: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
    menuItemText: {
      ...theme.typography.h3,
      lineHeight: 1,
    },
    menuItem: {
      '&:hover': {
        backgroundColor: theme.palette.tertiary.light,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.tertiary.light,
      },
      '&.Mui-selected:hover': {
        backgroundColor: theme.palette.tertiary.light,
      },
    },

    menuItemTextSmall: {
      fontWeight: 600,
    },
    menuSubheader: {
      paddingTop: 16,
      ...theme.typography.body2,
    },
  }),
  { name: 'Menu' },
)

type HeaderMenuProps = Pick<GQLHeaderFragment, 'menuPages'> &
  Pick<GQLPageMetaFragment, 'url' | 'localizations'>

const HeaderMenu: React.FC<HeaderMenuProps> = ({ menuPages, url, localizations }) => {
  const classes = useStyles()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const roots = extractRoots(menuPages)
  Router.events.on('routeChangeStart', () => setOpenEl(null))

  return (
    <>
      <Fab
        color='primary'
        aria-label='Open Menu'
        size='medium'
        onClick={(event) => setOpenEl(event.currentTarget)}
        className={classes.menuOpen}
      >
        <MenuIcon htmlColor='#fff' fontSize='small' />
      </Fab>

      <MaterialMenu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        keepMounted
        getContentAnchorEl={null} // https://github.com/mui-org/material-ui/issues/7961#issuecomment-326116559
        // todo(paales) positioning isn't correct on mobile at it reserves space on the sides, should probably measure the position
        anchorOrigin={{ horizontal: -16, vertical: -16 }}
        variant='menu'
        classes={{ paper: classes.menu }}
      >
        <Fab
          color='primary'
          aria-label='add'
          size='medium'
          onClick={() => setOpenEl(null)}
          classes={{ root: classes.menuClose }}
        >
          <CloseIcon htmlColor='#fff' fontSize='small' />
        </Fab>
        {roots.map((root) => (
          <Link
            key={root.id}
            href={root.url}
            metaRobots={root.metaRobots}
            color='inherit'
            className={classes.menuLink}
          >
            <ListItem button selected={url === root.url} classes={{ root: classes.menuItem }}>
              <ListItemText classes={{ primary: classes.menuItemText }}>{root.title}</ListItemText>
            </ListItem>
          </Link>
        ))}
        {localizations.length > 0 && <Divider variant='middle' light />}
        {localizations.length > 0 && (
          <ListSubheader color='inherit' disableSticky classes={{ root: classes.menuSubheader }}>
            Switch to
          </ListSubheader>
        )}
        {localizations.map((localization) => (
          <Link
            key={localization.url}
            href={localization.url}
            metaRobots={localization.metaRobots}
            color='inherit'
            className={classes.menuLink}
          >
            <ListItem button classes={{ root: classes.menuItem }}>
              <ListItemText classes={{ primary: classes.menuItemTextSmall }}>
                {localization.locale === 'en' && 'English'}
                {localization.locale === 'nl' && 'Nederlands'}
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </MaterialMenu>
    </>
  )
}

export default HeaderMenu

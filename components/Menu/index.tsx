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
import Link from '../Link'
import { vpCalc } from '../Theme'

type TreePage = GQLMenuFragment['pages'][0]['localizations'][0] & {
  children: TreePage[]
  parent?: TreePage
  isRoot: boolean
}

const extractRoots = (mainMenu: GQLMenuFragment) => {
  const treePages: TreePage[] = mainMenu.pages
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

const useStyles = makeStyles((theme: Theme) => ({
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
    fontWeight: 600,
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
}))

const Menu: React.FC<{
  menu: GQLMenuFragment
  page: GQLPageMetaFragment
}> = ({ menu: mainMenu, page }) => {
  const classes = useStyles()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const roots = extractRoots(mainMenu)
  Router.events.on('routeChangeComplete', () => setOpenEl(null))

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
            metaRobots={root.metaRobots!}
            color='inherit'
            className={classes.menuLink}
          >
            <ListItem button selected={page.url === root.url} classes={{ root: classes.menuItem }}>
              <ListItemText classes={{ primary: classes.menuItemText }}>{root.title}</ListItemText>
            </ListItem>
          </Link>
        ))}
        <Divider variant='middle' light />
        <ListSubheader color='inherit' disableSticky classes={{ root: classes.menuSubheader }}>
          Switch to
        </ListSubheader>
        {page.localizations.map((localization) => (
          <Link
            key={localization.url}
            href={localization.url}
            metaRobots={localization.metaRobots!}
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

export default Menu

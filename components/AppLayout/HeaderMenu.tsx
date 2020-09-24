import { Theme, makeStyles, Fab, ListItem, ListItemText, Menu } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import CategoryLink from 'components/Category/CategoryLink'
import { vpCalc } from 'components/Theme'
import { Router } from 'next/router'
import React from 'react'
import { SetOptional } from 'type-fest'

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

export type HeaderMenuProps = GQLHeaderMenuQuery & GQLResolveUrlQuery

export default function HeaderMenuFab({ menu, urlResolver }: HeaderMenuProps) {
  const classes = useStyles()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

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

      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
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
        {menu?.[0]?.children?.map((cat) => {
          if (!cat || !cat.id || !cat.url_path) return null
          return (
            <CategoryLink
              key={cat.id}
              url={cat.url_path}
              filters={{}}
              sort={{}}
              color='inherit'
              underline='none'
              className={classes.menuLink}
            >
              <ListItem
                button
                selected={
                  !!urlResolver && cat.id === urlResolver.id && urlResolver.type === 'CATEGORY'
                }
                classes={{ root: classes.menuItem }}
              >
                <ListItemText classes={{ primary: classes.menuItemText }}>{cat.name}</ListItemText>
              </ListItem>
            </CategoryLink>
          )
        })}
      </Menu>
    </>
  )
}

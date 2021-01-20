import { Theme, makeStyles, Fab, ListItem, ListItemText, Menu, FabProps } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { Router } from 'next/router'
import React from 'react'
import { PageLayoutQuery } from './PageLayout.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    menuOpen: {
      background: theme.palette.primary.contrastText,
      boxShadow: theme.shadows[2],
      '&:hover, &:focus': {
        background: theme.palette.primary.contrastText,
      },
    },
    menu: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.contrastText,
      minWidth: responsiveVal(200, 280),
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
        backgroundColor: theme.palette.grey[200],
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.grey[300],
      },
      '&.Mui-selected:hover': {
        backgroundColor: theme.palette.grey[300],
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

export type MenuFabProps = PageLayoutQuery &
  ResolveUrlQuery &
  Omit<FabProps, 'children' | 'onClick' | 'aria-label'>

export default function MenuFab(props: MenuFabProps) {
  const { menu, urlResolver, ...fabProps } = props
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
        {...fabProps}
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
        {menu?.items?.[0]?.children?.map((cat) => {
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

import {
  Divider,
  Fab,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
  ListItemButton,
  Menu,
  styled,
  Box,
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

const MotionDiv = styled(m.div)({})

export type MenuFabProps = {
  children?: React.ReactNode
  secondary?: React.ReactNode
  search?: React.ReactNode
  menuIcon?: React.ReactNode
  closeIcon?: React.ReactNode
}

const { classes, selectors } = extendableComponent('MenuFab', [
  'root',
  'fab',
  'shadow',
  'menu',
] as const)

const fabIconSize = responsiveVal(42, 56) // @todo generalize this

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
    <Box sx={{ width: fabIconSize, height: fabIconSize }}>
      <MotionDiv
        className={classes.root}
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            opacity: '1 !important',
            transform: 'none !important',
          },
        })}
        style={{ scale, opacity }}
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
            width: fabIconSize,
            height: fabIconSize,
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
              marginTop: '12px',
              [theme.breakpoints.down('md')]: {
                marginTop: `calc((${fabIconSize} + 12px) * -1)`,
              },
            }),
          }}
          className={classes.menu}
          MenuListProps={{ dense: true }}
        >
          {search && <ListItem dense>{search}</ListItem>}
          {children}
          <Divider variant='middle' sx={{ my: '6px' }} />
          {secondary}
        </Menu>
      </MotionDiv>
    </Box>
  )
}
MenuFab.selectors = selectors

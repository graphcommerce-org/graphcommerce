import { Divider, Fab, ListItem, Menu, styled, Box, SxProps, Theme } from '@mui/material'
import { m } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles/extendableComponent'
import { responsiveVal } from '../Styles/responsiveVal'
import { useFabSize } from '../Theme'
import { iconMenu, iconClose } from '../icons'
import { useFabAnimation } from './useFabAnimation'

const MotionDiv = styled(m.div)({})

export type MenuFabProps = {
  children?: React.ReactNode
  secondary?: React.ReactNode
  search?: React.ReactNode
  menuIcon?: React.ReactNode
  closeIcon?: React.ReactNode
  sx?: SxProps<Theme>
}

const { classes, selectors } = extendableComponent('MenuFab', [
  'wrapper',
  'fab',
  'shadow',
  'menu',
] as const)

export function MenuFab(props: MenuFabProps) {
  const { children, secondary, search, menuIcon, closeIcon, sx = [] } = props
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const { opacity, scale, shadowOpacity } = useFabAnimation()

  useEffect(() => {
    const clear = () => setOpenEl(null)
    router.events.on('routeChangeStart', clear)
    return () => router.events.off('routeChangeStart', clear)
  }, [router])
  const fabIconSize = useFabSize('responsive')

  return (
    <Box sx={[{ width: fabIconSize, height: fabIconSize }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <MotionDiv
        className={classes.wrapper}
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
          onClick={(event) => setOpenEl(event.currentTarget)}
          size='responsive'
          sx={(theme) => ({
            boxShadow: 'none',
            '&:hover, &:focus': {
              boxShadow: 'none',
              background: theme.palette.text.primary,
            },
            background: theme.palette.text.primary,
            pointerEvents: 'all',
            color: theme.palette.background.paper,
          })}
          className={classes.fab}
        >
          {closeIcon ?? (
            <IconSvg src={iconClose} size='large' sx={{ display: openEl ? 'block' : 'none' }} />
          )}
          {menuIcon ?? (
            <IconSvg src={iconMenu} size='large' sx={{ display: openEl ? 'none' : 'block' }} />
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
          disablePortal
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
          {[
            search ? (
              <ListItem key='search' dense sx={{ mb: '6px' }}>
                {search}
              </ListItem>
            ) : null,
            ...React.Children.toArray(children),
            <Divider key='divider' variant='middle' sx={{ my: '6px' }} />,
            ...React.Children.toArray(secondary),
          ]}
        </Menu>
      </MotionDiv>
    </Box>
  )
}
MenuFab.selectors = selectors

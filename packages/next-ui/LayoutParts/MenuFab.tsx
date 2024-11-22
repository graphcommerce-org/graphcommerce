import { useMotionValueValue } from '@graphcommerce/framer-utils'
import type { SxProps, Theme, FabProps, MenuProps as MenuPropsType } from '@mui/material'
import { Divider, Fab, ListItem, Menu, styled, Box } from '@mui/material'
import { m } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { IconSvg } from '../IconSvg'
import { useScrollY } from '../Layout/hooks/useScrollY'
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
  MenuProps?: MenuPropsType
} & Pick<FabProps, 'color' | 'size' | 'variant'>

const name = 'MenuFab'
const parts = ['wrapper', 'fab', 'shadow', 'menu'] as const
type OwnerState = {
  scrolled: boolean
}

const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function MenuFab(props: MenuFabProps) {
  const {
    children,
    secondary,
    search,
    menuIcon,
    closeIcon,
    sx = [],
    MenuProps,
    ...fabProps
  } = props
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const { opacity, scale, shadowOpacity } = useFabAnimation()
  const scrollY = useScrollY()
  const scrolled = useMotionValueValue(scrollY, (y) => y > 10)

  useEffect(() => {
    const clear = () => setOpenEl(null)
    router.events.on('routeChangeStart', clear)
    return () => router.events.off('routeChangeStart', clear)
  }, [router.events])

  const fabIconSize = useFabSize('responsive')

  const classes = withState({ scrolled })

  return (
    <Box
      sx={[
        { position: 'relative', width: fabIconSize, height: fabIconSize },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
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
          // todo: replace color='inverted' and remove styles here when Fab color is extendable
          // https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Fab/Fab.js#L193-L202
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
          {...fabProps}
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
              backgroundImage: 'unset',
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
          {...MenuProps}
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

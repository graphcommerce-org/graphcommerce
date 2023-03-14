import { useMotionValueValue } from '@graphcommerce/framer-utils'
import Box from '@mui/material/Box'
import Fab, { FabProps } from '@mui/material/Fab'
import { styled, SxProps, Theme } from '@mui/material/styles'
import { m } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { IconSvg } from '../../IconSvg'
import { useScrollY } from '../../Layout/hooks/useScrollY'
import { useFabAnimation } from '../../LayoutParts/useFabAnimation'
import { extendableComponent } from '../../Styles/extendableComponent'
import { useFabSize } from '../../Theme'
import { iconMenu, iconClose } from '../../icons'

const MotionDiv = styled(m.div)({})

export type NavigationFabProps = {
  menuIcon?: React.ReactNode
  closeIcon?: React.ReactNode
  sx?: SxProps<Theme>
} & Pick<FabProps, 'color' | 'size' | 'variant' | 'onClick'>

const name = 'MenuFab'
const parts = ['wrapper', 'fab', 'shadow', 'menu'] as const
type OwnerState = {
  scrolled: boolean
}

const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function NavigationFab(props: NavigationFabProps) {
  const { menuIcon, closeIcon, sx = [], ...fabProps } = props
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  const { opacity, shadowOpacity } = useFabAnimation()
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
        style={{ opacity }}
      >
        <Fab
          color='inherit'
          aria-label='Open Menu'
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
      </MotionDiv>
    </Box>
  )
}

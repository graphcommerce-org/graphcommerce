import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Fab, styled, Box, SxProps, Theme, FabProps } from '@mui/material'
import { m } from 'framer-motion'
import React from 'react'
import { IconSvg } from '../IconSvg'
import { useScrollY } from '../Layout/hooks/useScrollY'
import { extendableComponent } from '../Styles/extendableComponent'
import { useFabSize } from '../Theme'
import { iconMenu } from '../icons'
import { useFabAnimation } from './useFabAnimation'

const MotionDiv = styled(m.div)({})

export type MenuFabProps = {
  menuIcon?: React.ReactNode
  sx?: SxProps<Theme>
} & Pick<FabProps, 'color' | 'size' | 'variant' | 'onClick'>

const name = 'MenuFab'
const parts = ['wrapper', 'fab', 'shadow', 'menu'] as const
type OwnerState = {
  scrolled: boolean
}

const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function MenuFab(props: MenuFabProps) {
  const { menuIcon, sx = [], ...fabProps } = props

  const { opacity, scale, shadowOpacity } = useFabAnimation()
  const scrollY = useScrollY()
  const scrolled = useMotionValueValue(scrollY, (y) => y > 10)

  const fabIconSize = useFabSize('responsive')
  const classes = withState({ scrolled })

  return (
    <Box
      sx={[
        { position: 'relative', width: fabIconSize, height: fabIconSize },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      component='nav'
      role='navigation'
      aria-label='Main'
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
          {menuIcon ?? <IconSvg src={iconMenu} size='large' />}
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

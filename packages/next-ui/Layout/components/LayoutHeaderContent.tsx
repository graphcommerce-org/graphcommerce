import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Box, styled, SxProps, Theme } from '@mui/material'
import { LayoutProps, m } from 'framer-motion'
import React, { useRef } from 'react'
import { extendableComponent } from '../../Styles'
import { useScrollY } from '../hooks/useScrollY'
import { FloatingProps } from './LayoutHeadertypes'

const MotionDiv = styled(m.div)({})

export type LayoutHeaderContentProps = FloatingProps & {
  children?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  divider?: React.ReactNode
  switchPoint?: number
  forceScrolled?: boolean
  sx?: SxProps<Theme>
  sxBg?: SxProps<Theme>
  layout?: LayoutProps['layout']
  size?: 'small' | 'responsive'
  bgColor?: 'paper' | 'default'
} & Pick<LayoutProps, 'layout' | 'layoutDependency'>

type OwnerState = {
  floatingSm: boolean
  floatingMd: boolean
  scrolled: boolean
  forcedScrolled: boolean
  divider: boolean
  size: 'small' | 'responsive'
  bgColor?: 'paper' | 'default'
}

const name = 'LayoutHeaderContent' as const
const parts = ['bg', 'content', 'left', 'center', 'right', 'divider'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function LayoutHeaderContent(props: LayoutHeaderContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  const {
    left,
    children,
    right,
    divider,
    floatingMd = false,
    floatingSm = false,
    switchPoint = 50,
    forceScrolled = false,
    sx = [],
    sxBg = [],
    layout,
    layoutDependency,
    size = 'responsive',
    bgColor = 'paper',
  } = props

  const scroll = useScrollY()
  const scrolled = useMotionValueValue(scroll, (y) => y >= switchPoint)

  const forcedScrolled = forceScrolled

  const classes = withState({
    floatingSm,
    floatingMd,
    scrolled: !forceScrolled,
    forcedScrolled,
    divider: !!divider,
    size,
    bgColor,
  })

  return (
    <>
      <Box
        className={classes.bg}
        sx={[
          (theme) => ({
            position: 'absolute',
            left: 0,
            width: '100%',
            backgroundColor: theme.palette.background[bgColor],
            boxShadow: theme.shadows[1],

            height: theme.appShell.headerHeightSm,
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.appBarHeightMd,
            },
            '&.sizeSmall': {
              height: theme.appShell.headerHeightSm,
            },
            borderTopLeftRadius: switchPoint <= 0 ? theme.shape.borderRadius * 3 : 0,
            borderTopRightRadius: switchPoint <= 0 ? theme.shape.borderRadius * 3 : 0,

            '&.floatingSm': {
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            },
            '&.floatingMd': {
              [theme.breakpoints.up('md')]: {
                display: 'none',
              },
            },

            opacity: 0,
            transition: `opacity 150ms`,
            '&.scrolled:not(.forcedScrolled)': {
              opacity: 1,
            },

            '&.forceScrolled': {
              opacity: 1,
            },

            '&.divider': {
              boxShadow: 'unset',
            },
          }),
          ...(Array.isArray(sxBg) ? sxBg : [sxBg]),
        ]}
      />
      <Box
        className={classes.content}
        ref={ref}
        sx={[
          (theme) => ({
            position: 'absolute',
            left: 0,
            width: '100%',
            display: 'grid',
            gridTemplateAreas: `"left center right"`,
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: theme.page.horizontal,

            height: theme.appShell.headerHeightSm,
            px: theme.page.horizontal,
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.appBarHeightMd,
            },
            '&.sizeSmall': {
              height: theme.appShell.headerHeightSm,
              px: 2,
              [theme.breakpoints.up('md')]: {
                px: 2,
              },
            },

            '&.floatingSm': {
              [theme.breakpoints.down('md')]: {
                px: theme.page.horizontal,
                background: 'none',
                pointerEvents: 'none',
              },
            },
            '&.floatingMd': {
              [theme.breakpoints.up('md')]: {
                px: theme.page.horizontal,
                background: 'none',
                pointerEvents: 'none',
              },
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {left && (
          <Box
            className={classes.left}
            sx={(theme) => ({
              '& > *': { pointerEvents: 'all' },
              display: 'grid',
              gridAutoFlow: 'column',
              gap: theme.spacings.sm,
              gridArea: 'left',
              justifyContent: 'start',
            })}
          >
            <MotionDiv layout={layout} layoutDependency={layoutDependency} sx={{ display: 'grid' }}>
              {left}
            </MotionDiv>
          </Box>
        )}
        <Box
          className={classes.center}
          sx={(theme) => ({
            display: 'grid',
            gridAutoFlow: 'column',
            gap: theme.spacings.sm,
            gridArea: 'center',
            justifyContent: 'start',
            overflow: 'hidden',
            justifySelf: 'center',

            transition: `opacity 150ms`,
            opacity: 0,
            '&.scrolled:not(.forcedScrolled)': {
              opacity: 1,
              '& > *': { pointerEvents: 'all' },
            },

            '&.forceScrolled': {
              opacity: 1,
              '& > *': { pointerEvents: 'all' },
            },

            '&.floatingSm': {
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            },

            '&.floatingMd': {
              [theme.breakpoints.up('md')]: {
                display: 'none',
              },
            },
          })}
        >
          <MotionDiv sx={{ minWidth: 0 }} layout={layout} layoutDependency={layoutDependency}>
            {children}
          </MotionDiv>
        </Box>
        <Box
          className={classes.right}
          sx={(theme) => ({
            '& > *': {
              pointerEvents: 'all',
              width: 'min-content',
            },
            display: 'grid',
            gridAutoFlow: 'column',
            gap: theme.spacings.sm,
            gridArea: 'right',
            justifyContent: 'end',
          })}
        >
          <MotionDiv layout={layout} layoutDependency={layoutDependency}>
            {right}
          </MotionDiv>
        </Box>
        {divider && (
          <Box
            className={classes.divider}
            sx={(theme) => ({
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,

              '&.floatingSm': {
                [theme.breakpoints.down('md')]: {
                  display: 'none',
                },
              },
              '&.floatingMd': {
                [theme.breakpoints.up('md')]: {
                  display: 'none',
                },
              },
            })}
          >
            {divider}
          </Box>
        )}
      </Box>
    </>
  )
}

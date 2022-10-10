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
  sx?: SxProps<Theme>
  sxBg?: SxProps<Theme>
  layout?: LayoutProps['layout']
}

type OwnerState = { floatingSm: boolean; floatingMd: boolean; scrolled: boolean; divider: boolean }
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
    sx = [],
    sxBg = [],
    layout,
  } = props

  const scroll = useScrollY()
  const scrolled = useMotionValueValue(scroll, (y) => y >= switchPoint)

  const classes = withState({
    floatingSm,
    floatingMd,
    scrolled,
    divider: !!divider,
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
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],

            height: theme.appShell.headerHeightSm,
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.appBarHeightMd,
            },
            borderTopLeftRadius: theme.shape.borderRadius * 3,
            borderTopRightRadius: theme.shape.borderRadius * 3,

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
            '&.scrolled': {
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
            // columnGap: theme.spacings.xs,

            height: theme.appShell.headerHeightSm,
            padding: `0 ${theme.page.horizontal}`,

            [theme.breakpoints.up('md')]: {
              height: theme.appShell.appBarHeightMd,
            },

            '&.floatingSm': {
              [theme.breakpoints.down('md')]: {
                padding: `0 ${theme.page.horizontal}`,
                background: 'none',
                pointerEvents: 'none',
              },
            },
            '&.floatingMd': {
              [theme.breakpoints.up('md')]: {
                padding: `0 ${theme.page.horizontal}`,
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
            <MotionDiv layout={layout} sx={{ display: 'grid' }}>
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
            '&.scrolled': {
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
          <MotionDiv layout={layout}>{children}</MotionDiv>
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
          <MotionDiv layout={layout}>{right}</MotionDiv>
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

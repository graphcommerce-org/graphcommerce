import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { LayoutHeaderBack, useShowBack } from './LayoutHeaderBack'
import { LayoutHeaderClose, useShowClose } from './LayoutHeaderClose'
import { LayoutHeaderContent, LayoutHeaderContentProps } from './LayoutHeaderContent'
import { FloatingProps } from './LayoutHeadertypes'

export type LayoutHeaderProps = FloatingProps &
  Omit<LayoutHeaderContentProps, 'left' | 'right'> & {
    /**
     * Button to display on the left side of the title
     *
     * - Assumes it can float on desktop
     * - Assumes it can not float on mobile
     */
    primary?: React.ReactNode
    /**
     * Button to display on the right side of the title
     *
     * - Assumes it can float on desktop
     * - Assumes it can not float on mobile
     */
    secondary?: React.ReactNode

    noAlign?: boolean

    sx?: SxProps<Theme>
  }

type ComponentStyleProps = {
  noAlign: boolean
  divider: boolean
  children: boolean
  floatingSm: boolean
  floatingMd: boolean
  size: 'small' | 'responsive'
}

const { selectors, withState } = extendableComponent<ComponentStyleProps, 'LayoutHeader'>(
  'LayoutHeader',
  ['root'] as const,
)

export function LayoutHeader(props: LayoutHeaderProps) {
  const {
    children,
    divider,
    primary,
    secondary,
    noAlign = false,
    switchPoint,
    size = 'responsive',
    sx = [],
    bgColor,
  } = props
  const showBack = useShowBack()
  const showClose = useShowClose()

  const floatFallback = !children
  let { floatingSm = false, floatingMd = floatFallback } = props

  if (divider) floatingMd = false

  // When the primary or secondary is set, the header can't float on mobile even if the prop is passed.
  if (divider || primary || secondary) floatingSm = false

  const close = showClose && <LayoutHeaderClose />
  const back = showBack && <LayoutHeaderBack breakpoint={floatingSm ? 'xs' : undefined} />

  let left = secondary
  let right = primary

  if (back && !secondary) left = back

  if (!right) right = close
  else if (!left) left = close

  if (!left && !right && !children) return null

  const classes = withState({
    floatingSm,
    floatingMd,
    noAlign,
    children: !!children,
    divider: !!divider,
    size,
  })

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          zIndex: children ? theme.zIndex.appBar : theme.zIndex.appBar - 2,
          position: 'sticky',
          pointerEvents: 'none',

          [theme.breakpoints.down('md')]: {
            top: 0,
            marginTop: `calc(${theme.appShell.headerHeightSm} * -1)`,
            height: theme.appShell.headerHeightSm,
            '&.noAlign': {
              position: 'sticky',
              left: 0,
              right: 0,
              top: 0,
              marginTop: 0,
              height: theme.appShell.headerHeightSm,
              marginBottom: `calc(${theme.appShell.headerHeightSm} * -1)`,
            },
            '&.divider': {
              marginBottom: 0,
            },
          },

          [theme.breakpoints.up('md')]: {
            top: 0,
            height: theme.appShell.appBarHeightMd,
            marginTop: `calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5)`,
            marginBottom: `calc(${theme.appShell.appBarHeightMd} * -1 - calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5))`,
            '&.floatingMd': {
              top: `calc(${theme.appShell.headerHeightMd} + calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5))`,
            },
            '&.noAlign': {
              position: 'sticky',
              left: 0,
              right: 0,
              top: 0,
              marginTop: 0,
              height: theme.appShell.appBarHeightMd,
              marginBottom: `calc(${theme.appShell.appBarHeightMd} * -1)`,
              '&.sizeSmall': {
                height: theme.appShell.headerHeightSm,
              },
            },
            '&.divider': {
              marginBottom: 0,
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <LayoutHeaderContent
        size={size}
        left={left}
        right={right}
        divider={divider}
        floatingMd={floatingMd}
        floatingSm={floatingSm}
        switchPoint={switchPoint}
        bgColor={bgColor}
      >
        {children}
      </LayoutHeaderContent>
    </Box>
  )
}
LayoutHeader.selectors = selectors

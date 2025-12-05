import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import React, { useRef } from 'react'
import type { BackProps } from '../../Layout/components/LayoutHeaderBack'
import { LayoutHeaderBack, useShowBack } from '../../Layout/components/LayoutHeaderBack'
import { LayoutHeaderClose, useShowClose } from '../../Layout/components/LayoutHeaderClose'
import { extendableComponent } from '../../Styles'
import { sxx } from '../../utils/sxx'

export type LayoutOverlayHeader2Props = Pick<BackProps, 'disableBackNavigation'> & {
  /** Main content to display in the center */
  children: React.ReactNode

  disableChildrenPadding?: boolean

  /** Button to display on the left side of the title */
  primary?: React.ReactNode

  /** Button to display on the right side of the title */
  secondary?: React.ReactNode

  /** Hide the back button */
  hideBackButton?: boolean

  /** Justify alignment for center content */
  justify?: 'start' | 'center' | 'end'

  /** Custom styles for the root element */
  sx?: SxProps<Theme>

  closeLocation?: 'left' | 'right'

  size?: 'small' | 'responsive'
}

const name = 'LayoutOverlayHeader2'
const parts = ['root', 'bg', 'content', 'left', 'center', 'right'] as const

type State = {
  left: boolean
  right: boolean
  childrenPadding: boolean
  size: 'small' | 'responsive'
}

const { withState } = extendableComponent<State, typeof name, typeof parts>(name, parts)

export const LayoutOverlayHeader2 = React.memo<LayoutOverlayHeader2Props>((props) => {
  const ref = useRef<HTMLDivElement>(null)

  const {
    children,
    hideBackButton = false,
    primary,
    secondary,
    justify = 'center',
    closeLocation = 'right',
    sx = [],
    disableBackNavigation,
    disableChildrenPadding = false,
    size = 'responsive',
  } = props

  const showBack = useShowBack() && !hideBackButton
  const showClose = useShowClose()

  const close = showClose && <LayoutHeaderClose size={size === 'small' ? 'small' : 'responsive'} />
  const back = showBack && <LayoutHeaderBack disableBackNavigation={disableBackNavigation} />

  let left = secondary
  let right = primary

  if (back && !secondary) left = back

  // Handle close button positioning based on closeLocation
  if (close && closeLocation === 'left' && !left) left = close
  if (close && closeLocation === 'right' && !right) right = close
  if (close && closeLocation === 'right' && !left && right) left = close
  if (!left && !right && !children) return null

  const classes = withState({
    left: !!left,
    right: !!right,
    childrenPadding: !disableChildrenPadding,
    size,
  })

  return (
    <Box
      className={classes.root}
      sx={sxx(
        (theme) => ({
          zIndex: children ? theme.zIndex.appBar : theme.zIndex.appBar - 2,
          position: 'sticky',
          left: 0,
          right: 0,
          top: 0,
          marginTop: 0,
          // Special positioning for bottom overlays
          [theme.breakpoints.down('md')]: {
            height: theme.appShell.headerHeightSm,
            '.variantSmBottom.sizeSmFull &, .variantSmBottom.sizeSmMinimal &': {
              top: `calc(${theme.appShell.headerHeightSm} * 0.5 * -1)`,
            },
          },
          [theme.breakpoints.up('md')]: {
            height: theme.appShell.appBarHeightMd,
            '.variantMdBottom.sizeMdFull &, .variantMdBottom.sizeMdMinimal &': {
              top: `calc(${theme.appShell.appBarHeightMd} * 0.5 * -1)`,
            },
            '&.sizeSmall': {
              height: theme.appShell.headerHeightSm,
            },
          },
        }),
        sx,
      )}
    >
      <Box
        className={classes.content}
        ref={ref}
        sx={sxx((theme) => ({
          position: 'absolute',
          inset: 0,
          width: '100%',
          display: 'grid',
          alignItems: 'center',
          gap: theme.spacings.xs,
          height: theme.appShell.headerHeightSm,
          [theme.breakpoints.up('md')]: {
            height: theme.appShell.appBarHeightMd,
            '&.sizeSmall': {
              height: theme.appShell.headerHeightSm,
            },
          },
          // Default: center only
          gridTemplateAreas: '"center"',
          gridTemplateColumns: '1fr',
          // Left only
          '&.left:not(.right)': {
            gridTemplateAreas: '"left center"',
            gridTemplateColumns: justify === 'center' ? '1fr max-content' : 'auto 1fr',
          },
          // Right only
          '&.right:not(.left)': {
            gridTemplateAreas: '"center right"',
            gridTemplateColumns: justify === 'center' ? 'max-content 1fr' : '1fr auto',
          },
          // Both left and right
          '&.left.right': {
            gridTemplateAreas: '"left center right"',
            gridTemplateColumns: justify === 'center' ? '1fr max-content 1fr' : 'auto 1fr auto',
          },
        }))}
      >
        {left && (
          <Box
            className={classes.left}
            sx={(theme) => ({
              pl: theme.spacings.sm,
              display: 'grid',
              gridAutoFlow: 'column',
              gap: theme.spacings.sm,
              gridArea: 'left',
              justifyContent: 'start',
            })}
          >
            {left}
          </Box>
        )}

        <Box
          className={classes.center}
          sx={(theme) => ({
            display: 'grid',
            gridAutoFlow: 'column',
            gap: theme.spacings.sm,
            gridArea: 'center',
            overflow: 'hidden',
            height: '100%',
            '&.childrenPadding:not(.right)': { pr: theme.spacings.sm },
            '&.childrenPadding:not(.left)': { pl: theme.spacings.sm },
          })}
        >
          {children}
        </Box>

        {right && (
          <Box
            className={classes.right}
            sx={(theme) => ({
              '& > *': { width: 'min-content' },
              display: 'grid',
              gridAutoFlow: 'column',
              gap: theme.spacings.sm,
              gridArea: 'right',
              justifyContent: 'end',
              pr: theme.spacings.sm,
            })}
          >
            {right}
          </Box>
        )}
      </Box>
    </Box>
  )
})

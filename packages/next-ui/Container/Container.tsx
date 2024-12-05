import { Box, useTheme } from '@mui/material'
import type { ContainerProps } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import type { LiteralUnion } from 'type-fest'
import { extendableComponent } from '../Styles/extendableComponent'
import type { ContainerSizingVariant } from '../Theme/useContainerSizing'
import { useContainerSizing } from '../Theme/useContainerSizing'

type OwnerProps = {
  /** Can be a breakpoint, 'full' or a actual value */
  maxWidth?: LiteralUnion<ContainerProps['maxWidth'] | 'full', string>
  sizing?: ContainerSizingVariant
  breakoutRight?: boolean
  breakoutLeft?: boolean
}

export type ContainerSizingProps = Omit<ContainerProps, 'maxWidth'> & OwnerProps

const name = 'MuiContainer'
const slots = ['root'] as const
const { withState } = extendableComponent<OwnerProps, typeof name, typeof slots>(
  'MuiContainer',
  slots,
)

/**
 * Calculate the padding and margin for a container.
 *
 * - The padding is a positive value to add to an element on the left and right.
 * - The margin is a negative value to offset the padding of a container. Used to break out of a
 *   container.
 */
export function useContainerSpacing(props: ContainerSizingProps) {
  const { disableGutters, maxWidth, sizing = 'content' } = props

  const theme = useTheme()
  const containerSizing = useContainerSizing(sizing)

  const gutter = disableGutters ? '0px' : `${theme.page.horizontal}`

  let size = containerSizing.value
  if (maxWidth && theme.breakpoints.values[maxWidth])
    size = `${theme.breakpoints.values[maxWidth]}px`
  else if (maxWidth) size = maxWidth

  const padding = gutter
  const margin = `calc(${gutter} * -1)`

  if (size === '100%' || maxWidth === 'full') return { padding, breakout: margin }

  return {
    padding: `max(${gutter}, ((100% - ${size}) / 2 + ${gutter}))`,
    breakout: `calc(max(${gutter}, ((100dvw - ${size}) / 2 + ${gutter})) * -1)`,
  }
}

/**
 * A better Container component that supports:
 *
 * - Setting the background color as it is using a calculated padding instead of a margin: '0 auto'
 * - Breaking out of the container to the left or right
 */
export const Container = React.forwardRef(
  (props: ContainerSizingProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      sx,
      breakoutRight = false,
      breakoutLeft = false,
      maxWidth = 'lg',
      disableGutters,
      sizing = 'content',
      className,
      ...rest
    } = props
    const classes = withState({ breakoutLeft, breakoutRight, maxWidth, sizing })
    const { padding } = useContainerSpacing(props)

    return (
      <Box
        {...rest}
        ref={ref}
        className={clsx(className, classes.root)}
        sx={[
          {
            pl: !breakoutLeft ? padding : undefined,
            pr: !breakoutRight ? padding : undefined,
            '&.breakoutLeft': { pl: 'unset' },
            '&.breakoutRight': { pr: 'unset' },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    )
  },
)

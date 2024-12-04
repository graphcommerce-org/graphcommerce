import { Box } from '@mui/material'
import type { ContainerProps } from '@mui/material'
import type { ContainerSizingVariant } from '../Theme/useContainerSizing'
import { useContainerSizing } from '../Theme/useContainerSizing'

export type ContainerSizingProps = ContainerProps & {
  variant?: ContainerSizingVariant
  breakoutRight?: boolean
  breakoutLeft?: boolean
}

/**
 * A better container component that supports:
 *
 * - Setting the background color as it is using a calculated padding instead of a margin: '0 auto'
 * - Breaking out of the container to the left or right
 */
export function Container(props: ContainerSizingProps) {
  const {
    sx,
    breakoutRight,
    breakoutLeft,
    maxWidth = 'lg',
    disableGutters,
    variant = 'content',
    ...rest
  } = props
  const containerSizing = useContainerSizing(variant)

  return (
    <Box
      {...rest}
      sx={[
        (theme) => {
          const value = maxWidth
            ? `${theme.breakpoints.values[maxWidth]}px`
            : `${containerSizing.value}`
          const gutters = disableGutters ? '0px' : theme.page.horizontal
          const spacing = `max(0px, calc((100% - ${value}) / 2 + ${gutters}))`
          return {
            pl: !breakoutLeft ? spacing : undefined,
            pr: !breakoutRight ? spacing : undefined,
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}

type TwoColumnContainerProps = ContainerSizingProps & {
  left?: React.ReactNode
  right?: React.ReactNode
}

export function TwoColumnContainer(props: TwoColumnContainerProps) {
  return <Container {...props} />
}

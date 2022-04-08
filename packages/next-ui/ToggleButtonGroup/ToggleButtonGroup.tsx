import { Box, ToggleButtonGroupProps as ToggleButtonGroupPropsBase } from '@mui/material'
import React from 'react'
import { isFragment } from 'react-is'
import { extendableComponent } from '../Styles'

function isValueSelected(value: string, candidate: string | string[]) {
  if (candidate === undefined || value === undefined) return false
  if (Array.isArray(candidate)) return candidate.indexOf(value) >= 0
  return value === candidate
}

type OwnerState = Pick<ToggleButtonGroupPropsBase, 'orientation' | 'size'>

const name = 'ToggleButtonGroup' as const
const parts = ['root', 'button'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export type ToggleButtonGroupProps = ToggleButtonGroupPropsBase & {
  required?: boolean
  layout?: {
    gridType: 'grid' | 'masonry'
    columns?: number | 'auto-fill'
  }
}

const ToggleButtonGroup = React.forwardRef<HTMLDivElement, ToggleButtonGroupProps>((props, ref) => {
  const {
    children,
    className,
    exclusive = false,
    required = false,
    onChange,
    orientation = 'horizontal',
    value,
    size = 'large',
    sx = [],
    layout,
    ...other
  } = props

  const classes = withState({ orientation, size })

  const handleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, buttonValue: unknown) => {
    if (!onChange) return

    const index = Boolean(value) && (value.indexOf(buttonValue) as number)
    let newValue: string[]

    if (value && index && index >= 0) {
      newValue = value.slice()
      newValue.splice(index, 1)
    } else {
      newValue = value ? [...value, buttonValue] : [buttonValue]
    }
    onChange(event, newValue)
  }

  const handleExclusiveChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    buttonValue: unknown,
  ) => {
    if (!onChange || value === buttonValue) return
    if (required) onChange(event, buttonValue)
    else onChange(event, value === buttonValue ? null : buttonValue)
  }

  return (
    <Box
      role='group'
      className={`${classes.root} ${className ?? ''}`}
      sx={[
        (theme) => {
          const columns = layout?.columns ?? 2
          switch (layout?.gridType) {
            case 'masonry': {
              return {
                display: 'grid',
                // rowGap: theme.spacings.xxs,
                // columnGap: theme.spacings.xs,
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `masonry`,
                rowGap: theme.spacings.xxs,
                columnGap: theme.spacings.xs,
                '&.orientationVertical': {
                  gridAutoFlow: 'column',
                },
                '&.sizeSmall.orientationHorizontal': {
                  gridTemplateColumns: `repeat(${columns}, minmax(60px, 1fr))`,
                },
                '&.sizeMedium.orientationHorizontal': {
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                },
                '&.sizeLarge.orientationHorizontal': {
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                },
              }
            }
            default:
              return {
                display: 'grid',
                rowGap: theme.spacings.xxs,
                columnGap: theme.spacings.xs,
                '&.orientationVertical': {
                  gridAutoFlow: 'column',
                },
                '&.sizeSmall.orientationHorizontal': {
                  gridTemplateColumns: `repeat(${columns}, minmax(60px, 1fr))`,
                },
                '&.sizeMedium.orientationHorizontal': {
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                },
                '&.sizeLarge.orientationHorizontal': {
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                },
              }
          }
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      ref={ref}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "@graphcommerce/next-ui: The ToggleButtonGroup component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            )
          }
        }

        return React.cloneElement(child, {
          className: `${classes.button} ${child.props.className ?? ''}`,
          onChange: exclusive ? handleExclusiveChange : handleChange,
          selected:
            child.props.selected === undefined
              ? isValueSelected(child.props.value as string, value as string | string[])
              : child.props.selected,
        })
      })}
    </Box>
  )
})

export { ToggleButtonGroup }

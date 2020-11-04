import { makeStyles, Theme } from '@material-ui/core'
import { capitalize } from '@material-ui/core/utils'
import { ToggleButtonGroup as MuiToggleButtonGroup, ToggleButtonGroupProps } from '@material-ui/lab'
import clsx from 'clsx'
import React, { PropsWithoutRef } from 'react'
import { isFragment } from 'react-is'

function isValueSelected(value: string, candidate: string | string[]) {
  if (candidate === undefined || value === undefined) return false
  if (Array.isArray(candidate)) return candidate.indexOf(value) >= 0
  return value === candidate
}

export const useStyles = makeStyles(
  (theme: Theme) => ({
    /* Styles applied to the root element. */
    root: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
      gap: `calc(${theme.spacings.xxs} * 2)`,
    },
    vertical: {
      gridAutoFlow: 'column',
    },
    grouped: {},
    groupedHorizontal: {},
    groupedVertical: {},
  }),
  { name: 'ToggleButtonGroup' },
)

const ToggleButtonGroup = React.forwardRef<HTMLDivElement, PropsWithoutRef<ToggleButtonGroupProps>>(
  function ToggleButtonGroup(props, ref) {
    const classes = useStyles(props)
    const {
      children,
      className,
      exclusive = false,
      onChange,
      orientation = 'horizontal',
      size = 'medium',
      value,
      ...other
    } = props

    const handleChange = (event, buttonValue) => {
      if (!onChange) return

      const index = value && value.indexOf(buttonValue)
      let newValue: string[]

      if (value && index >= 0) {
        newValue = value.slice()
        newValue.splice(index, 1)
      } else {
        newValue = value ? value.concat(buttonValue) : [buttonValue]
      }
      onChange(event, newValue)
    }

    const handleExclusiveChange = (event, buttonValue) => {
      if (!onChange) return
      onChange(event, value === buttonValue ? null : buttonValue)
    }

    return (
      <div
        role='group'
        className={clsx(
          classes.root,
          { [classes.vertical]: orientation === 'vertical' },
          className,
        )}
        ref={ref}
        {...other}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null

          if (process.env.NODE_ENV !== 'production') {
            if (isFragment(child)) {
              console.error(
                [
                  "@reachdigital/next-ui: The ToggleButtonGroup component doesn't accept a Fragment as a child.",
                  'Consider providing an array instead.',
                ].join('\n'),
              )
            }
          }

          return React.cloneElement(child, {
            className: clsx(
              classes.grouped,
              classes[`grouped${capitalize(orientation)}`],
              child.props.className,
            ),
            onChange: exclusive ? handleExclusiveChange : handleChange,
            selected:
              child.props.selected === undefined
                ? isValueSelected(child.props.value, value)
                : child.props.selected,
            size: child.props.size || size,
          })
        })}
      </div>
    )
  },
)

export default ToggleButtonGroup

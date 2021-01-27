// @inheritedComponent ButtonBase

import { capitalize, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import Button, { ButtonProps } from '../Button'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    /* Styles applied to the root element. */
    root: {
      borderWidth: 2,
      '&$disabled': {
        borderWidth: 2,
      },
      '&:hover': {},

      '&$selected': {
        border: `2px solid ${theme.palette.secondary.main}`,
      },
    },
    disabled: {},
    selected: {},
    /* Styles applied to the `label` wrapper element. */
    label: {},
    sizeSmall: {},
    sizeLarge: {
      padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
    },
  }),
  { name: 'ToggleButton' },
)

export type ToggleButtonProps = ButtonProps & {
  selected?: boolean
  onClick?: (e: React.MouseEvent, v: any) => void
  onChange?: (e: React.MouseEvent, v: any) => void
}

const ToggleButton = React.forwardRef<any, ToggleButtonProps>((props, ref) => {
  const { root, ...classes } = useStyles(props)
  const {
    children,
    className,
    disabled = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    value,
    ...other
  } = props

  const handleClick = (event) => {
    if (onClick) {
      onClick(event, value)
      if (event.isDefaultPrevented()) return
    }
    if (onChange) onChange(event, value)
  }

  return (
    <Button
      className={clsx(
        root,
        {
          [classes.disabled]: disabled,
          [classes.selected]: selected,
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
        },
        className,
      )}
      // classes={classes}
      variant='outlined'
      disabled={disabled}
      ref={ref}
      onClick={handleClick}
      onChange={onChange}
      value={value}
      aria-pressed={selected}
      size={size}
      {...other}
    >
      {children}
    </Button>
  )
})

export default ToggleButton

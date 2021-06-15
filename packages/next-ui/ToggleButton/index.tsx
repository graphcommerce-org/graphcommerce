// @inheritedComponent ButtonBase

import { capitalize, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import Button, { ButtonProps } from '../Button'
import { UseStyles } from '../Styles'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    /* Styles applied to the root element. */
    root: {
      borderWidth: 2,
      '&$disabled': {
        borderWidth: 2,
      },
      '&:hover': {},
      '&$selected': {},
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
} & UseStyles<typeof useStyles>

const ToggleButton = React.forwardRef<any, ToggleButtonProps>((props, ref) => {
  const { root, selected: selectedClass, ...classes } = useStyles(props)
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
          [selectedClass]: selected,
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
        },
        className,
      )}
      variant='outlined'
      disabled={disabled}
      ref={ref}
      onClick={handleClick}
      onChange={onChange}
      value={value}
      aria-pressed={selected}
      size={size}
      {...other}
      classes={classes}
    >
      {children}
    </Button>
  )
})

export default ToggleButton

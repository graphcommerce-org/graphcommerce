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
      border: '2px solid transparent',
      backgroundColor: theme.palette.background.default,
      borderRadius: 4,
      // boxShadow: theme.shadows['1'],
      boxShadow: `0px 0px 2px ${theme.palette.grey[400]}`,
      '&$disabled': {
        borderWidth: 2,
      },
      '&:hover': {},
      '&$selected': {},
    },
    disabled: {},
    selected: ({ color = 'default' }: ButtonProps) => ({
      border: `2px solid ${theme.palette[color]?.main ?? theme.palette.primary.main}`,
      boxShadow: `unset`,
    }),
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
  const { root, selected: selectedClass, sizeLarge, sizeSmall, ...classes } = useStyles(props)
  const {
    children,
    className,
    disabled = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    value,
    color,
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
          [sizeLarge]: size === 'large',
          [sizeSmall]: size === 'small',
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
      // classes={classes}
    >
      {children}
    </Button>
  )
})

export default ToggleButton

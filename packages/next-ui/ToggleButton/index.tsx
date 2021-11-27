// @inheritedComponent ButtonBase

import { capitalize, lighten, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { FormEvent } from 'react'
import { responsiveVal } from '..'
import Button, { ButtonProps } from '../Button'
import { UseStyles } from '../Styles'

type StyleProps = { selected?: boolean; color?: ButtonProps['color'] }

export const useStyles = makeStyles(
  (theme: Theme) => ({
    /* Styles applied to the root element. */
    root: {
      borderRadius: responsiveVal(8, 12),
      border: `1px solid ${theme.palette.divider}`,
      '&$disabled': {
        borderWidth: 2,
      },
      '&:hover': {},
      '&$selected': {},
    },
    disabled: {},
    selected: ({ color = 'default' }: StyleProps) => ({
      border: `1px solid ${theme.palette[color]?.main ?? theme.palette.primary.main}`,
      boxShadow: `inset 0 0 0 1px ${theme.palette[color]?.main ?? theme.palette.primary.main}`,
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

export type ToggleButtonProps = Omit<ButtonProps, 'onClick' | 'onChange'> & {
  selected?: boolean
  onClick?: (e: FormEvent<HTMLButtonElement>, v: any) => void
  onChange?: (e: FormEvent<HTMLButtonElement>, v: any) => void
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

  const handleChange = (event: FormEvent<HTMLButtonElement>) => onChange?.(event, value)

  const handleClick = (event: FormEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event, value)
      if (event.isDefaultPrevented()) return
    }
    handleChange(event)
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
      onChange={handleChange}
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

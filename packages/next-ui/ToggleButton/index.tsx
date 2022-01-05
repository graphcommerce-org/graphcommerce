import { Theme } from '@mui/material'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'
import clsx from 'clsx'
import React, { FormEvent } from 'react'
import Button, { ButtonProps } from '../Button'
import { UseStyles } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'

type StyleProps = { selected?: boolean; color?: ButtonProps['color'] }

export const useStyles = makeStyles<StyleProps>({ name: 'ToggleButton' })(
  (theme: Theme, { color = 'default' }) => ({
    /* Styles applied to the root element. */
    root: {
      borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
      border: `1px solid ${theme.palette.divider}`,
      '&$disabled': {
        borderWidth: 2,
      },
      '&:hover': {},
      '&$selected': {},
    },
    disabled: {},
    selected: {
      border: `1px solid ${theme.palette[color]?.main ?? theme.palette.primary.main}`,
      boxShadow: `inset 0 0 0 1px ${theme.palette[color]?.main ?? theme.palette.primary.main}`,
    },
    /* Styles applied to the `label` wrapper element. */
    label: {},
    sizeSmall: {},
    sizeLarge: {
      padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
    },
  }),
)

export type ToggleButtonProps = Omit<ButtonProps, 'onClick' | 'onChange'> & {
  selected?: boolean
  onClick?: (e: FormEvent<HTMLButtonElement>, v: any) => void
  onChange?: (e: FormEvent<HTMLButtonElement>, v: any) => void
} & UseStyles<typeof useStyles>

const ToggleButton = React.forwardRef<any, ToggleButtonProps>((props, ref) => {
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
  let { classes } = useStyles({ color, selected })
  classes = useMergedClasses(classes, props.classes)

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
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.selected]: selected,
          [classes.sizeLarge]: size === 'large',
          [classes.sizeSmall]: size === 'small',
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

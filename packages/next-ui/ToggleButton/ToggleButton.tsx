/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ButtonProps } from '@mui/material'
import { Button, alpha } from '@mui/material'
import type { FormEvent } from 'react'
import React from 'react'
import { extendableComponent } from '../Styles'
import { breakpointVal } from '../Styles/breakpointVal'

export type ToggleButtonProps = Omit<ButtonProps, 'onClick' | 'onChange'> & {
  selected?: boolean
  onClick?: (e: FormEvent<HTMLButtonElement>, v: any) => void
  onChange?: (e: FormEvent<HTMLButtonElement>, v: any) => void
}

type OwnerState = Pick<ButtonProps, 'size' | 'disabled'> & { selected?: boolean }

const compName = 'ToggleButton'
const parts = ['root', 'button', 'helperText'] as const
const { withState } = extendableComponent<OwnerState, typeof compName, typeof parts>(
  compName,
  parts,
)

export const ToggleButton = React.forwardRef<any, ToggleButtonProps>((props, ref) => {
  const {
    children,
    className,
    disabled = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    value,
    color = 'default',
    sx = [],
    ...other
  } = props
  const classes = withState({ size, selected, disabled })

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
      className={`${classes.root} ${className ?? ''}`}
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
      sx={[
        (theme) => ({
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',

          '&.disabled': {
            borderWidth: 2,
          },

          '&.selected': {
            border: `1px solid ${theme.palette[color]?.main ?? theme.palette.primary.main}`,
            boxShadow: `inset 0 0 0 1px ${
              theme.palette[color]?.main ?? theme.palette.primary.main
            },0 0 0 4px ${alpha(
              theme.palette.primary.main,
              theme.palette.action.hoverOpacity,
            )} !important`,
          },
          ':not(&.sizeSmall)': {
            ...breakpointVal(
              'borderRadius',
              theme.shape.borderRadius * 2,
              theme.shape.borderRadius * 3,
              theme.breakpoints.values,
            ),
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
          },
          '&.sizeSmall': {
            ...breakpointVal(
              'borderRadius',
              theme.shape.borderRadius * 1,
              theme.shape.borderRadius * 1.5,
              theme.breakpoints.values,
            ),
            padding: '8px 12px',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Button>
  )
})

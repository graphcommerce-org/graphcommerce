import { Button, ButtonProps } from '@mui/material'
import React, { FormEvent } from 'react'
import { extendableComponent } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'

export type ToggleButtonProps = Omit<ButtonProps, 'onClick' | 'onChange'> & {
  selected?: boolean
  onClick?: (e: FormEvent<HTMLButtonElement>, v: any) => void
  onChange?: (e: FormEvent<HTMLButtonElement>, v: any) => void
}

type OwnerState = Pick<ButtonProps, 'size' | 'disabled'> & { selected?: boolean }

const compName = 'ToggleButton' as const
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
          borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
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
            }`,
          },
          ':not(&.sizeSmall)': {
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
          },
          '&.sizeSmall': {
            aspectRatio: `4/3`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Button>
  )
})

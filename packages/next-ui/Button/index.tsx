import {
  Button as MuiButton,
  ButtonBaseProps,
  ButtonClassKey as MuiButtonClassKey,
  Theme,
  makeStyles,
} from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'

type Size = 'normal' | 'large'
type Variant = 'contained' | 'pill' | 'outlined' | 'text'
type Text = 'normal' | 'bold'

export type ButtonProps = {
  loading?: boolean
  variant?: Variant
  size?: Size
  text?: Text
  children: React.ReactNode
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    pill: {
      borderRadius: 40 / 2,
    },
    pillPrimary: {
      //
    },
    pillSecondary: {
      //
    },
    pillSizeLarge: {
      borderRadius: 59 / 2,
    },
    pillSizeSmall: {
      borderRadius: 33 / 2,
    },
    pillNoElevation: {
      /* disableElevation does not stop adding box shadow on active... ?! */
      '&:active': {
        boxShadow: 'none',
      },
    },
    textBold: {
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
  { name: 'MuiPillButton' },
)

export default React.forwardRef<ButtonProps, any>((props, ref) => {
  const {
    variant = 'contained',
    size = 'normal',
    color = 'default',
    text = 'normal',
    loading,
    className,
    children,
    disabled,
    ...buttonProps
  } = props

  const classes = useStyles(props)

  return (
    <MuiButton
      {...buttonProps}
      color={color}
      variant={variant === 'pill' ? 'contained' : variant}
      size={size}
      ref={ref}
      disabled={loading || disabled}
      className={clsx(
        {
          [classes.pill]: variant === 'pill',
          [classes.pillPrimary]: variant === 'pill' && color === 'primary',
          [classes.pillSecondary]: variant === 'pill' && color === 'secondary',
          [classes.pillSizeLarge]: variant === 'pill' && size === 'large',
          [classes.pillSizeSmall]: variant === 'pill' && size === 'small',
          [classes.pillNoElevation]: buttonProps.disableElevation,
          [classes.textBold]: text === 'bold',
        },
        className,
      )}
    >
      {loading ? <>Loading</> : children}
    </MuiButton>
  )
})

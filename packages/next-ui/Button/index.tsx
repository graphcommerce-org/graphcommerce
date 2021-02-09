import { Button as MuiButton, ButtonClassKey as MuiButtonClassKey, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'

type BaseButtonProps = Omit<Parameters<typeof MuiButton>['0'], 'variant' | 'classes'> & {
  variant?: 'text' | 'outlined' | 'contained' | 'pill'
}

type ButtonClassKey =
  | 'pill'
  | 'pillPrimary'
  | 'pillSecondary'
  | 'pillSizeLarge'
  | 'pillSizeSmall'
  | 'pillNoElevation'

type ClassKeys = ButtonClassKey | MuiButtonClassKey

export type ButtonProps = BaseButtonProps & {
  classes?: { [index in ClassKeys]?: string }
  loading?: boolean
}

const useStyles = makeStyles<
  Theme,
  BaseButtonProps & { classes?: { [index in ButtonClassKey]?: string } },
  ButtonClassKey
>(
  (theme: Theme) => ({
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
  }),
  { name: 'MuiPillButton' },
)

export default React.forwardRef<any, ButtonProps>((props, ref) => {
  const { classes = {}, ...baseProps } = props
  const { variant, color, size, className, children, loading, disabled, ...buttonProps } = baseProps
  const {
    pill,
    pillPrimary,
    pillSecondary,
    pillSizeLarge,
    pillSizeSmall,
    ...buttonClasses
  } = classes

  const pillClasses = useStyles({
    ...baseProps,
    classes: { pill, pillPrimary, pillSecondary, pillSizeLarge, pillSizeSmall },
  })

  return (
    <MuiButton
      {...buttonProps}
      classes={buttonClasses}
      color={color}
      variant={variant === 'pill' ? 'contained' : variant}
      size={size}
      ref={ref}
      disabled={loading || disabled}
      className={clsx(
        {
          [pillClasses.pill]: variant === 'pill',
          [pillClasses.pillPrimary]: variant === 'pill' && color === 'primary',
          [pillClasses.pillSecondary]: variant === 'pill' && color === 'secondary',
          [pillClasses.pillSizeLarge]: variant === 'pill' && size === 'large',
          [pillClasses.pillSizeSmall]: variant === 'pill' && size === 'small',
          [pillClasses.pillNoElevation]: buttonProps.disableElevation,
        },
        className,
      )}
    >
      {loading ? <>Loading</> : children}
    </MuiButton>
  )
})

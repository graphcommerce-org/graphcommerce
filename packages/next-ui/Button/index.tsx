import { Button as MuiButton, ButtonClassKey as MuiButtonClassKey, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'

export type BaseButtonProps = Omit<Parameters<typeof MuiButton>['0'], 'variant' | 'classes'> & {
  variant: 'text' | 'outlined' | 'contained' | 'pill'
}

type ButtonClassKey = 'pill' | 'pillPrimary' | 'pillSecondary' | 'pillSizeLarge' | 'pillSizeSmall'

type ClassKeys = ButtonClassKey | MuiButtonClassKey

type ButtonProps = BaseButtonProps & {
  classes?: { [index in ClassKeys]?: string }
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
      [theme.breakpoints.down('sm')]: {
        background: 'transparent',
        color: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.primary.contrastText,
        },
      },
    },
    pillSecondary: {
      [theme.breakpoints.down('sm')]: {
        background: 'transparent',
        color: theme.palette.secondary.main,
        '&:hover': {
          color: theme.palette.secondary.contrastText,
        },
      },
    },
    pillSizeLarge: {
      borderRadius: 59 / 2,
    },
    pillSizeSmall: {
      borderRadius: 33 / 2,
    },
  }),
  { name: 'MuiPillButton' },
)

export default function Button(props: ButtonProps) {
  const { classes = {}, ...baseProps } = props
  const { variant, color, size, className, ...buttonProps } = baseProps
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
      className={clsx(
        {
          [pillClasses.pill]: variant === 'pill',
          [pillClasses.pillPrimary]: variant === 'pill' && color === 'primary',
          [pillClasses.pillSecondary]: variant === 'pill' && color === 'secondary',
          [pillClasses.pillSizeLarge]: variant === 'pill' && size === 'large',
          [pillClasses.pillSizeSmall]: variant === 'pill' && size === 'small',
        },
        className,
      )}
    />
  )
}

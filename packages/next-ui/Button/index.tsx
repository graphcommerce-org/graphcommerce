import { Button as MuiButton, ButtonClassKey as MuiButtonClassKey } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

type BaseButtonProps = Omit<Parameters<typeof MuiButton>['0'], 'variant' | 'classes'> & {
  variant?: 'text' | 'outlined' | 'contained' | 'pill' | 'pill-link'
}

type ButtonClassKey =
  | 'pill'
  | 'pillLink'
  | 'pillPrimary'
  | 'pillSecondary'
  | 'pillSizeLarge'
  | 'pillSizeSmall'
  | 'pillNoElevation'
  | 'withStartIcon'
  | 'startIconText'
  | 'loading'

type ClassKeys = ButtonClassKey | MuiButtonClassKey

export type ButtonProps = BaseButtonProps & {
  classes?: { [index in ClassKeys]?: string }
  loading?: boolean
  text?: Text
}

const useStyles = makeStyles({ name: 'MuiPillButton' })((theme) => ({
  root: {},
  label: {},
  disabled: {},
  withStartIcon: {
    [theme.breakpoints.down('lg')]: {
      height: 40,
      width: 40,
      textAlign: 'center',
      minWidth: 'unset',
      borderRadius: 99,
      '& > span > .MuiButton-startIcon': {
        margin: 'unset',
      },
    },
  },
  pill: {
    borderRadius: '99em',
  },
  pillLink: {
    [theme.breakpoints.up('md')]: {
      // manually match MuiButton and containedPrimary styles
      textTransform: 'none',
      ...theme.typography.body2,
      fontWeight: 400,
      borderRadius: '99em',
      boxShadow: theme.shadows[6],
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      '&:hover': {
        background: theme.palette.background.paper,
      },
    },
  },
  pillPrimary: {
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
  },
  pillSecondary: {
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
  },
  pillSizeLarge: {},
  pillSizeSmall: {},
  pillNoElevation: {
    /* disableElevation does not stop adding box shadow on active... ?! */
    '&:active': {
      boxShadow: 'none',
    },
  },
  startIconText: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'unset',
    },
  },
  loading: {
    '& svg': {
      stroke: theme.palette.text.disabled,
    },
  },
}))

export default React.forwardRef<any, ButtonProps>((props, ref) => {
  const { classes = {}, ...baseProps } = props
  const { variant, color, size, className, children, loading, disabled, text, ...buttonProps } =
    baseProps
  const {
    pill,
    pillPrimary,
    pillSecondary,
    pillSizeLarge,
    pillSizeSmall,
    pillLink,
    ...buttonClasses
  } = classes

  const pillClasses = useMergedClasses(useStyles().classes, props.classes)

  const variantMap = {
    pill: 'contained',
    'pill-link': 'text',
  }

  const withIcon = typeof buttonProps.startIcon !== 'undefined'
  const content = <>{loading ? <>Loading</> : children}</>

  return (
    <MuiButton
      {...buttonProps}
      classes={buttonClasses}
      color={color}
      variant={variantMap[variant ?? ''] ?? variant}
      size={size}
      ref={ref}
      disabled={loading || disabled}
      className={clsx(
        {
          [pillClasses.pill]: variant?.startsWith('pill'),
          [pillClasses.pillLink]: variant === 'pill-link',
          [pillClasses.pillPrimary]: variant?.startsWith('pill') && color === 'primary',
          [pillClasses.pillSecondary]: variant?.startsWith('pill') && color === 'secondary',
          [pillClasses.pillSizeLarge]: variant?.startsWith('pill') && size === 'large',
          [pillClasses.pillSizeSmall]: variant?.startsWith('pill') && size === 'small',
          [pillClasses.pillNoElevation]: buttonProps.disableElevation,
          [pillClasses.loading]: loading,
          [pillClasses.withStartIcon]: withIcon,
        },
        className,
      )}
    >
      {withIcon && <span className={pillClasses.startIconText}>{content}</span>}
      {!withIcon && content}
    </MuiButton>
  )
})

import {
  Button as MuiButton,
  ButtonClassKey as MuiButtonClassKey,
  Theme,
  makeStyles,
} from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'

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
  | 'textBold'
  | 'withStartIcon'
  | 'startIconText'
  | 'loading'

type ClassKeys = ButtonClassKey | MuiButtonClassKey
type Text = 'normal' | 'bold'

export type ButtonProps = BaseButtonProps & {
  classes?: { [index in ClassKeys]?: string }
  loading?: boolean
  text?: Text
}

const useStyles = makeStyles<
  Theme,
  BaseButtonProps & { classes?: { [index in ButtonClassKey]?: string } },
  ButtonClassKey
>(
  (theme: Theme) => ({
    root: {},
    label: {},
    disabled: {},
    withStartIcon: {
      [theme.breakpoints.down('sm')]: {
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
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: theme.shadows[6],
        borderRadius: 25,
        padding: '6px 16px',

        '&:hover': {
          background: theme.palette.secondary.dark,
        },
      },
    },
    pillPrimary: {
      //
    },
    pillSecondary: {
      //
    },
    pillSizeLarge: {
      //
    },
    pillSizeSmall: {
      //
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
  }),
  { name: 'MuiPillButton' },
)

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
    textBold,
    ...buttonClasses
  } = classes

  const pillClasses = useStyles({
    ...baseProps,
    classes: {
      pill,
      pillPrimary,
      pillSecondary,
      pillSizeLarge,
      pillSizeSmall,
      pillLink,
      textBold,
      ...buttonClasses,
    },
  })

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
          [pillClasses.pill]: variant === 'pill',
          [pillClasses.pillPrimary]: variant === 'pill' && color === 'primary',
          [pillClasses.pillSecondary]: variant === 'pill' && color === 'secondary',
          [pillClasses.pillSizeLarge]: variant === 'pill' && size === 'large',
          [pillClasses.pillSizeSmall]: variant === 'pill' && size === 'small',
          [pillClasses.pillNoElevation]: buttonProps.disableElevation,
          [pillClasses.pillLink]: variant === 'pill-link',
          [pillClasses.textBold]: text === 'bold',
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

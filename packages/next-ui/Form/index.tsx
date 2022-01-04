import { darken, lighten, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      alignItems: 'center',
      padding: `${theme.spacings.xxs} 0`,
    },
    secondary: {
      background: theme.palette.secondary.light,
    },
    default: {
      background:
        theme.palette.mode === 'light'
          ? darken(theme.palette.background.default, 0.03)
          : lighten(theme.palette.background.default, 0.1),
    },
    contained: {
      padding: `${theme.spacings.xxs} ${theme.spacings.sm}`,
      // paddingTop: theme.spacings.md,
      overflow: 'hidden',
      borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
    },
  }),
  { name: 'Form' },
)

export type BaseFormProps = {
  contained?: boolean
  background?: 'secondary' | 'default'
  children: React.ReactNode
} & UseStyles<typeof useStyles>

export type FormFormProps = BaseFormProps & JSX.IntrinsicElements['form']

export const Form = React.forwardRef<HTMLFormElement, FormFormProps>((props, ref) => {
  const classes = useStyles(props)
  const { contained, background, ...formProps } = props

  return (
    <form ref={ref} {...formProps} className={clsx(classes.root, contained && classes.contained)} />
  )
})

export type DivFormProps = BaseFormProps & JSX.IntrinsicElements['div']

export const FormDiv = React.forwardRef<HTMLDivElement, DivFormProps>((props, ref) => {
  const classes = useStyles(props)
  const { contained, background = 'default', classes: _classes, ...formProps } = props

  return (
    <div
      ref={ref}
      {...formProps}
      className={clsx(
        classes.root,
        contained && classes.contained,
        contained && classes[background],
      )}
    />
  )
})

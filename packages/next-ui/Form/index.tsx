import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      alignItems: 'center',
      padding: `${theme.spacings.xxs} 0`,
    },
    contained: {
      background: '#f7f7f7',
      padding: `${theme.spacings.xxs} calc(${theme.spacings.xxs} * 2)`,
      overflow: 'hidden',
      borderRadius: 6,
    },
  }),
  { name: 'Form' },
)

type BaseFormProps = {
  contained?: boolean
  children: React.ReactNode
} & UseStyles<typeof useStyles>

type DivFormProps = BaseFormProps & JSX.IntrinsicElements['form'] & { component?: 'form' }

type FormFormProps = BaseFormProps & JSX.IntrinsicElements['div'] & { component: 'div' }

export default function Form(props: DivFormProps | FormFormProps) {
  const { contained, children, component = 'form' } = props
  const classes = useStyles(props)

  if (component === 'div') {
    return (
      <div
        {...(props as JSX.IntrinsicElements['div'])}
        className={clsx(classes.root, contained && classes.contained)}
      >
        {children}
      </div>
    )
  }

  return (
    <form
      {...(props as JSX.IntrinsicElements['form'])}
      className={clsx(classes.root, contained && classes.contained)}
    >
      {children}
    </form>
  )
}

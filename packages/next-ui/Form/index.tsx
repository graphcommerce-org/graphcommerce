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

export type BaseFormProps = {
  contained?: boolean
  children: React.ReactNode
} & UseStyles<typeof useStyles>

export type FormFormProps = BaseFormProps & JSX.IntrinsicElements['form'] & { component?: 'form' }

export type DivFormProps = BaseFormProps & JSX.IntrinsicElements['div'] & { component: 'div' }

function isDivComponent(props: FormFormProps | DivFormProps): props is DivFormProps {
  return props.component === 'div'
}

export default function Form(props: FormFormProps | DivFormProps) {
  const classes = useStyles(props)

  if (isDivComponent(props)) {
    const { contained, ...divProps } = props
    return <div {...divProps} className={clsx(classes.root, contained && classes.contained)} />
  }

  const { contained, ...formProps } = props
  return <form {...formProps} className={clsx(classes.root, contained && classes.contained)} />
}

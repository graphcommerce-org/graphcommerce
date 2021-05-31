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

type FormFormProps = BaseFormProps & JSX.IntrinsicElements['form'] & { component?: 'form' }

type DivFormProps = BaseFormProps & JSX.IntrinsicElements['div'] & { component: 'div' }

function isDivComponent(props: FormFormProps | DivFormProps): props is DivFormProps {
  return props.component === 'div'
}

export default function Form(props: FormFormProps | DivFormProps) {
  const { contained } = props
  const classes = useStyles(props)
  const className = clsx(classes.root, contained && classes.contained)

  return isDivComponent(props) ? (
    <div {...props} className={className} />
  ) : (
    <form {...props} className={className} />
  )
}

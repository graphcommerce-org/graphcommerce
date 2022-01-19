import { ContainerProps } from '@mui/material'
import { Row } from '..'
import { makeStyles } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'ColumnOneBoxed' })((theme) => ({
  boxed: {
    padding: theme.spacings.lg,
    boxShadow: theme.shadows[24],
    '& h1, & h2, & h3': {
      marginTop: 0,
    },
  },
}))

export function ColumnOneBoxed(props: ContainerProps) {
  const { children } = props
  const { classes } = useStyles()

  return (
    <Row {...props}>
      <div className={classes.boxed}>{children}</div>
    </Row>
  )
}

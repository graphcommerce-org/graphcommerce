import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
  }),
  { name: 'MessageSnackbar' },
)

export type MessageSnackbarProps = {
  children?: React.ReactNode
}

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const classes = useStyles(props)

  const { children } = props

  return <div className={classes.root}>{children}</div>
}

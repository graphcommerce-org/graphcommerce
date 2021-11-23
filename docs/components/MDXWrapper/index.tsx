import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '& h1': {
        marginTop: 0,
      },
      '& *': {
        wordBreak: 'break-word',
      },
      '& img': {
        maxWidth: '100%',
        height: 'auto',
      },
      '& pre': {
        background: theme.palette.background.image,
        display: 'inline-block',
        padding: 20,
      },
    },
  }),
  {
    name: 'MDXWrapper',
  },
)

export default function MDXWrapper({ children }) {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

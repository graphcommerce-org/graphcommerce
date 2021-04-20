import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      boxShadow: '0 5px 4px 0 rgb(3 3 3 / 3%)',
      height: 16,
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.md,
    },
  }),
  { name: 'SearchDivider' },
)

type SearchDividerProps = UseStyles<typeof useStyles>

export default function SearchDivider(props: SearchDividerProps) {
  const classes = useStyles(props)

  return <div className={classes.root} />
}

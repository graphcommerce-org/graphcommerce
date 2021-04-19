import { makeStyles, TextField, Theme } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { UseStyles } from '@reachdigital/next-ui/Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      '& fieldset': {
        border: `2px solid rgba(0,0,0,0.1)`,
      },
    },
    inputRoot: {
      ...theme.typography.body2,
    },
  }),
  { name: 'SearchButton' },
)

type SearchButtonProps = UseStyles<typeof useStyles>

export default function SearchButton(props: SearchButtonProps) {
  const classes = useStyles(props)
  return (
    // <PageLink href='/search' passHref>
    <TextField
      variant='outlined'
      size='small'
      classes={{ root: classes.root }}
      InputProps={{
        endAdornment: <SearchIcon fontSize='small' />,
        classes: { root: classes.inputRoot },
      }}
      placeholder=''
    />
    // </PageLink>
  )
}

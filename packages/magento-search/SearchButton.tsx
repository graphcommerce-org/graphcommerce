import { makeStyles, TextField, Theme } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 130,
      },
      '& fieldset': {
        border: `2px solid ${theme.palette.action.disabledBackground}`,
      },
    },
    inputRoot: {
      ...theme.typography.body2,
    },
  }),
  { name: 'SearchButton' },
)

export default function SearchButton() {
  const classes = useStyles()
  return (
    // <PageLink href='/search'>
    <TextField
      variant='outlined'
      size='small'
      classes={{ root: classes.root }}
      InputProps={{
        endAdornment: <SearchIcon fontSize='small' />,
        classes: { root: classes.inputRoot },
      }}
      placeholder='Search'
    />
    // </PageLink>
  )
}

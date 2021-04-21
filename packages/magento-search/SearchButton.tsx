import { makeStyles, TextField, Theme } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'

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

export type SearchButtonProps = UseStyles<typeof useStyles> & { onClick?: () => void }

export default function SearchButton(props: SearchButtonProps) {
  const { onClick } = props
  const classes = useStyles()

  return (
    <TextField
      variant='outlined'
      size='small'
      classes={{ root: classes.root }}
      InputProps={{
        endAdornment: <SearchIcon fontSize='small' />,
        classes: { root: classes.inputRoot },
      }}
      placeholder=''
      onClick={onClick}
    />
  )
}

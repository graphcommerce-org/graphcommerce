import { makeStyles, TextField, Theme } from '@material-ui/core'
import { UseStyles, SvgImage, iconSearch } from '@reachdigital/next-ui'
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

export type SearchButtonProps = UseStyles<typeof useStyles> & { onClick: () => void }

export default function SearchButton(props: SearchButtonProps) {
  const { onClick } = props
  const classes = useStyles(props)

  return (
    <TextField
      variant='outlined'
      size='small'
      classes={{ root: classes.root }}
      InputProps={{
        readOnly: true,
        endAdornment: <SvgImage src={iconSearch} alt='Search' size='small' />,
        classes: { root: classes.inputRoot },
      }}
      placeholder=''
      onClick={onClick}
    />
  )
}

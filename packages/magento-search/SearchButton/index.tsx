import { UseStyles, SvgImage, iconSearch, SvgImageSimple } from '@graphcommerce/next-ui'
import { makeStyles, TextField, TextFieldProps, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      '& fieldset': {
        border: `1px solid rgba(0,0,0,0.1)`,
      },
    },
    inputRoot: {
      ...theme.typography.body2,
    },
  }),
  { name: 'SearchButton' },
)

export type SearchButtonProps = UseStyles<typeof useStyles> & TextFieldProps

export default function SearchButton(props: SearchButtonProps) {
  const { InputProps, ...textFieldProps } = props
  const classes = useStyles(props)

  return (
    <TextField
      variant='outlined'
      size='small'
      classes={{ root: classes.root }}
      InputProps={{
        readOnly: true,
        endAdornment: <SvgImageSimple src={iconSearch} alt='Search' size='small' />,
        classes: { root: classes.inputRoot },
        ...InputProps,
      }}
      {...textFieldProps}
    />
  )
}

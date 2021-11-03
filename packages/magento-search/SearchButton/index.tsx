import { iconSearch, responsiveVal, SvgImageSimple, UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, TextField, TextFieldProps, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginRight: theme.spacings.xxs,
      width: responsiveVal(64, 172),
      '& fieldset': {
        border: `1px solid ${theme.palette.divider}`,
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
      aria-labelledby='search'
      variant='outlined'
      size='small'
      classes={{ root: classes.root }}
      InputProps={{
        readOnly: true,
        endAdornment: <SvgImageSimple id='search' src={iconSearch} size='medium' />,
        classes: { root: classes.inputRoot },
        ...InputProps,
      }}
      {...textFieldProps}
    />
  )
}

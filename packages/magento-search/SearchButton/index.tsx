import { iconSearch, responsiveVal, SvgImageSimple, UseStyles } from '@graphcommerce/next-ui'
import { TextField, TextFieldProps, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginRight: theme.spacings.xxs,
      width: responsiveVal(64, 172),
      '& fieldset': {
        border: `1px solid ${theme.palette.divider}`,
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginRight: 0,
      },
    },
    inputRoot: {},
    fullWidth: {
      width: '100%',
      marginRight: 0,
    },
  }),
  { name: 'SearchButton' },
)

export type SearchButtonProps = UseStyles<typeof useStyles> & TextFieldProps

export default function SearchButton(props: SearchButtonProps) {
  const { InputProps, label = 'Search...', fullWidth = false, ...textFieldProps } = props
  const classes = useStyles(props)

  return (
    <TextField
      variant='outlined'
      size='small'
      className={clsx(classes.root, fullWidth && classes.fullWidth)}
      label={label}
      id='search-input'
      InputLabelProps={{ shrink: false }}
      InputProps={{
        readOnly: true,
        endAdornment: <SvgImageSimple src={iconSearch} size='medium' />,
        classes: { root: classes.inputRoot },
        ...InputProps,
      }}
      {...textFieldProps}
    />
  )
}

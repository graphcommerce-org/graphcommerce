import { makeStyles, MenuItem, Select, SelectProps, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginRight: theme.spacings.xs,
    },
    label: {
      fontSize: theme.typography.fontSize,
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontWeight: 500,
      color: theme.palette.text.disabled,
    },
    select: {
      padding: `${theme.spacings.xxs} ${theme.spacings.xxs}`,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 8,
      minWidth: 120,
      '&:before': {
        borderBottom: 'none',
      },
      '&:hover, &:active, &:focus': {
        '&:before': {
          borderBottom: 'none',
        },
        background: theme.palette.grey['100'],
      },
    },
  }),
  { name: 'CartItemOptionDropdown' },
)

export type CartItemOptionDropdownProps = {
  label: string
} & Pick<SelectProps, 'onChange'>

export default function CartItemOptionDropdown(props: CartItemOptionDropdownProps) {
  const { onChange, label } = props
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <div className={classes.label}>{label}</div>
        <Select value={1} onChange={onChange} className={classes.select}>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
      </div>
    </>
  )
}

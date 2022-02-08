import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, MenuItem, Select, SelectProps, SxProps, Theme } from '@mui/material'

export type CartItemOptionDropdownProps = {
  label: string
  sx?: SxProps<Theme>
} & Pick<SelectProps, 'onChange'>

const compName = 'CartItem' as const
const parts = ['root', 'label', 'select'] as const
const { classes } = extendableComponent(compName, parts)

export default function CartItemOptionDropdown(props: CartItemOptionDropdownProps) {
  const { onChange, label, sx = [] } = props

  return (
    <Box
      className={classes.root}
      sx={[(theme) => ({ marginRight: theme.spacings.xs }), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        className={classes.label}
        sx={(theme) => ({
          letterSpacing: 1,
          textTransform: 'uppercase',
          fontWeight: 500,
          color: theme.palette.text.disabled,
        })}
      >
        {label}
      </Box>
      <Select
        value={1}
        onChange={onChange}
        className={classes.select}
        sx={(theme) => ({
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
        })}
      >
        <MenuItem value={1}>One</MenuItem>
        <MenuItem value={2}>Two</MenuItem>
        <MenuItem value={3}>Three</MenuItem>
      </Select>
    </Box>
  )
}

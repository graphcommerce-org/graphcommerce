import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { ConfigurableCartItemFragment } from './ConfigurableCartItem.gql'

type CartItemOptionsListProps = ConfigurableCartItemFragment & {
  sx?: SxProps<Theme>
}

const name = 'ColorSwatchData' as const
const slots = ['root', 'option'] as const
const { classes } = extendableComponent(name, slots)

export default function OptionsList(props: CartItemOptionsListProps) {
  const { configurable_options, sx = [] } = props

  return (
    <Box
      className={classes.root}
      sx={[
        {
          gridArea: 'itemOptions',
          cursor: 'default',
          marginLeft: 0,
          paddingBottom: 4,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {configurable_options &&
        configurable_options.map((option) => (
          <Box
            key={option?.configurable_product_option_uid}
            className={classes.option}
            sx={(theme) => ({
              color: 'text.secondary',
              textDecoration: 'underline',
              marginRight: theme.spacings.xs,
              display: 'inline',
            })}
          >
            {option?.value_label}
          </Box>
        ))}
    </Box>
  )
}

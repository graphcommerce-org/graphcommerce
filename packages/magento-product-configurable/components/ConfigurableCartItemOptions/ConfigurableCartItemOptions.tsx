import { SelectedCustomizableOptions } from '@graphcommerce/magento-cart-items'
import { Box } from '@mui/material'
import { ConfigurableCartItemFragment } from '../../ConfigurableCartItem/ConfigurableCartItem.gql'

type ConfigurableActionCartItemProps = ConfigurableCartItemFragment

export function ConfigurableCartItemOptions(props: ConfigurableActionCartItemProps) {
  const { configurable_customizable, configurable_options } = props
  return (
    <>
      {configurable_options?.map((option) => (
        <Box key={option?.configurable_product_option_uid}>{option?.value_label}</Box>
      ))}
      <Box
        sx={(theme) => ({
          display: 'flex',
          gap: theme.spacings.xxs,
          [theme.breakpoints.down('sm')]: {
            '& .MuiTypography-root': {
              fontSize: '12px',
            },
          },
        })}
      >
        <SelectedCustomizableOptions customizable_options={configurable_customizable} />
      </Box>
    </>
  )
}

import { Money } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { SelectedCustomizableOptionFragment } from './SelectedCustomizableOption.gql'

type ConfigurableActionCartItemProps = {
  customizable_options?: (SelectedCustomizableOptionFragment | null | undefined)[] | null
}

export function SelectedCustomizableOptions(props: ConfigurableActionCartItemProps) {
  const { customizable_options } = props

  const options = filterNonNullableKeys(customizable_options, [])

  if (!options.length) return null

  return (
    <>
      {options.map((option) => (
        <Box>
          <Box key={option.customizable_option_uid} sx={{ color: 'text.primary' }}>
            {option.label}
          </Box>
          {option.values.filter(nonNullable).map((value) => (
            <Box
              key={option.customizable_option_uid}
              sx={(theme) => ({
                display: 'flex',
                gap: theme.spacings.xxs,
                flexDirection: 'row',
              })}
            >
              {value.label && (
                <span key={`${value.customizable_option_value_uid}_${value.label}`}>
                  {value.label}
                </span>
              )}
              {value.price.type !== 'PERCENT' && value.price.value > 0 && (
                <Box
                  sx={(theme) => ({ position: 'absolute', right: theme.spacings.xs })}
                  key={`${value.customizable_option_value_uid}_${value.price.value}`}
                >
                  <Money value={value.price.value} />
                </Box>
              )}
              {!value.label && value.value && value.value}
            </Box>
          ))}
        </Box>
      ))}
    </>
  )
}

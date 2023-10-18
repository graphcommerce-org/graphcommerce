import { Money } from '@graphcommerce/magento-store'
import { IconSvg, filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import * as InfoIcon from '@graphcommerce/next-ui/icons/info.svg'
import { Box, Tooltip, Typography } from '@mui/material'
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
              <span key={`${value.customizable_option_value_uid}_${value.label}`}>
                {value.label}
              </span>
              <span key={`${value.customizable_option_value_uid}_${value.price.value}`}>
                {value.price.value > 0 && <Money value={value.price.value} />}
              </span>
              {!value.label && value.value && (
                <Tooltip title={value.value} sx={{ alignSelf: 'center' }}>
                  <IconSvg src={InfoIcon} size='medium' />
                </Tooltip>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </>
  )
}

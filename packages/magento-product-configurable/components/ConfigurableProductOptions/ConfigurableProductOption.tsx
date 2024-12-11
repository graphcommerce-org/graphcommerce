import type { ActionCardItemBase } from '@graphcommerce/ecommerce-ui'
import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import type { AddProductsToCartFields } from '@graphcommerce/magento-product/components'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product/components'
import { SectionHeader, filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import type { UseConfigurableOptionsSelection } from '../../hooks'
import { useConfigurableOptionsForSelection } from '../../hooks'
import type {
  ConfigurableOptionValue,
  ConfigurableOptionValueFragment,
} from '../ConfigurableOptionValue'

export type ConfigurableProductOptionProps = NonNullable<
  NonNullable<ConfigurableOptionsFragment['configurable_options']>[number]
> & {
  index: number
  optionIndex: number
  optionStartLabels?: Record<string, React.ReactNode>
  optionEndLabels?: Record<string, React.ReactNode>
  sx?: SxProps<Theme>
  attribute_code: string
  render: typeof ConfigurableOptionValue
} & UseConfigurableOptionsSelection

export function ConfigurableProductOption(props: ConfigurableProductOptionProps) {
  const {
    values,
    label,
    index,
    optionIndex,
    optionStartLabels,
    optionEndLabels,
    sx,
    attribute_code,
    url_key,
    render,
    ...other
  } = props
  const fieldName = `cartItems.${index}.selected_options.${optionIndex}` as const

  const { control } = useFormAddProductsToCart()

  const selectedOption = useWatch({ control, name: fieldName })

  const selectedOptions = (useWatch({ control, name: `cartItems.${index}.selected_options` }) ?? [])
    .filter(nonNullable)
    .filter(Boolean)
    // This list is sorted by the the order in which the options are displayed.
    // By slicing were only taking the previous options in consideration and not the options below the current option.
    // .slice(0, optionIndex)
    .filter((o) => o !== selectedOption)

  const { configured } = useConfigurableOptionsForSelection({ url_key, selectedOptions })

  const available =
    configured?.configurable_product_options_selection?.options_available_for_selection?.find(
      (o) => o?.attribute_code === attribute_code,
    )?.option_value_uids

  const items = filterNonNullableKeys(values, ['uid']).map((ov) => ({
    value: ov.uid,
    ...ov,
    disabled: !(!available || available.includes(ov.uid)),
  }))

  if (!values) return null

  return (
    <Box key={fieldName} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <SectionHeader
        labelLeft={optionStartLabels?.[attribute_code ?? ''] ?? label}
        labelRight={optionEndLabels?.[attribute_code ?? '']}
        sx={{ mt: 0 }}
      />

      <ActionCardListForm<
        ActionCardItemBase & ConfigurableOptionValueFragment,
        AddProductsToCartFields
      >
        layout='grid'
        {...other}
        name={fieldName}
        control={control}
        required
        items={items}
        render={render}
        rules={{
          required: i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label }),
        }}
      />
    </Box>
  )
}

import { ActionCardItemBase, ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import {
  AddProductsToCartFields,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product/components'
import { filterNonNullableKeys, nonNullable, SectionHeader } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Box, SxProps, Theme } from '@mui/material'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsForSelection, UseConfigurableOptionsSelection } from '../../hooks'
import {
  ConfigurableOptionValue,
  ConfigurableOptionValueFragment,
} from '../ConfigurableOptionValue'
import { ConfigurableProductOptionDropdown } from './ConfigurableProductOptionDropdown'

type ConfigurableOption = NonNullable<
  NonNullable<ConfigurableOptionsFragment['configurable_options']>[number]
>

type UseConfigurableProductOptionValuesProps = {
  index: number
  optionIndex: number
  attribute_code: string
} & UseConfigurableOptionsSelection &
  ConfigurableOption

export type ConfigurableProductOptionProps = {
  optionEndLabels?: Record<string, React.ReactNode>
  sx?: SxProps<Theme>
  render: typeof ConfigurableOptionValue
} & UseConfigurableProductOptionValuesProps

export function useConfigurableProductOptionValues(props: UseConfigurableProductOptionValuesProps) {
  const { index, optionIndex, url_key, attribute_code, values } = props
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

  return { items, control, fieldName }
}

export function ConfigurableProductOption(props: ConfigurableProductOptionProps) {
  const {
    values,
    label,
    index,
    optionIndex,
    optionEndLabels,
    sx,
    attribute_code,
    url_key,
    render,
    ...other
  } = props
  const { items, fieldName, control } = useConfigurableProductOptionValues(props)

  if (items.length === 0) return null

  return (
    <Box key={fieldName} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <SectionHeader
        labelLeft={label}
        labelRight={optionEndLabels?.[attribute_code ?? '']}
        sx={{ mt: 0 }}
      />

      {!values?.[0]?.swatch_data ? (
        <ConfigurableProductOptionDropdown items={items} fieldName={fieldName} control={control} />
      ) : (
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
      )}
    </Box>
  )
}

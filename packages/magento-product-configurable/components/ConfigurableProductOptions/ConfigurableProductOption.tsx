import {
  useFormAddProductsToCart,
  AddProductsToCartFields,
} from '@graphcommerce/magento-product/components'
import {
  nonNullable,
  filterNonNullableKeys,
  SectionHeader,
  ActionCardListForm,
  ActionCardItemBase,
} from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Box, SxProps, Theme } from '@mui/material'
import { ConfigurableOptionsSelectionFragment } from '../../graphql'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { UseConfigurableOptionsSelection, useConfigurableOptionsForSelection } from '../../hooks'
import {
  ConfigurableOptionValue,
  ConfigurableOptionValueFragment,
} from '../ConfigurableOptionValue'

export type AvailableOptionsProps = NonNullable<
  ConfigurableOptionsSelectionFragment['configurable_product_options_selection']
>['options_available_for_selection']

type Props = NonNullable<
  NonNullable<ConfigurableOptionsFragment['configurable_options']>[number]
> & {
  index: number
  optionIndex: number
  optionEndLabels?: Record<string, React.ReactNode>
  availableOptions?: AvailableOptionsProps
  sx?: SxProps<Theme>
  attribute_code: string
  render: typeof ConfigurableOptionValue
} & UseConfigurableOptionsSelection

export function ConfigurableProductOption(props: Props) {
  const {
    values,
    label,
    index,
    optionIndex,
    optionEndLabels,
    availableOptions,
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

  const availableConfigurableProductOptions = availableOptions?.find(
    (o) => o?.attribute_code === attribute_code,
  )?.option_value_uids

  const items = filterNonNullableKeys(values, ['uid']).map((ov) => {
    console.log(
      'NEW: ',
      ov.store_label,
      !available,
      available?.includes(ov.uid),
      availableConfigurableProductOptions?.includes(ov.uid),
    )

    return {
      value: ov.uid,
      ...ov,
      // disabled: !(!available || available.includes(ov.uid)) || !availableConfigurableProductOptions?.includes(ov.uid),
      disabled: !availableConfigurableProductOptions?.includes(ov.uid),
    }
  })

  if (!values) return null

  return (
    <Box key={fieldName} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <SectionHeader
        labelLeft={label}
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

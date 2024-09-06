import { useController } from '@graphcommerce/ecommerce-ui'
import { i18n } from '@lingui/core'
import { type Autocomplete, TextField } from '@mui/material'
import dynamic from 'next/dynamic'
import { type useConfigurableProductOptionValues } from './ConfigurableProductOption'

const AutocompleteDynamic = dynamic(() => import('@mui/material/Autocomplete'), {
  ssr: false,
  loading: () => <TextField disabled fullWidth />,
}) as typeof Autocomplete

export function ConfigurableProductOptionDropdown(
  props: ReturnType<typeof useConfigurableProductOptionValues>,
) {
  const { items, control, fieldName } = props

  const {
    field: { value, onChange, ...field },
    fieldState: { invalid, error },
  } = useController({
    control,
    name: fieldName,
    rules: { required: i18n._(/* i18n */ 'This field is required') },
  })

  return (
    <AutocompleteDynamic
      {...field}
      autoComplete={false}
      renderInput={(params) => (
        <TextField
          {...params}
          error={invalid}
          helperText={invalid && error?.message}
          label={i18n._(/* i18n */ 'Select')}
        />
      )}
      options={items}
      getOptionLabel={(o) => o.store_label ?? ''}
      value={items.find((optionValue) => value === optionValue.uid) || null}
      onChange={(_, optionValue) => onChange(optionValue?.uid ?? null)}
      aria-placeholder='Select'
    />
  )
}

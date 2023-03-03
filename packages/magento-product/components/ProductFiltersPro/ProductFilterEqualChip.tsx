import { useWatch } from '@graphcommerce/ecommerce-ui'
import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import {
  ChipOverlayOrPopper,
  ActionCardListForm,
  ActionCard,
  filterNonNullableKeys,
  IconSvg,
  iconCirle,
} from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useMemo } from 'react'
import { isFilterTypeEqual } from '../ProductListItems/filterTypes'
import { useProductFiltersPro } from './ProductFiltersPro'
import { FilterProps } from './ProductFiltersProAggregations'

export function ProductFilterEqualChip(props: FilterProps) {
  const { attribute_code, label, options } = props
  const { form, submit, params } = useProductFiltersPro()
  const { control } = form
  const attrCode = attribute_code as keyof ProductAttributeFilterInput

  // We are casting the name, because filters can have other types than equal which dont have the in property
  const name = `filters.${attrCode}.in` as 'filters.category_id.in'
  const canReset = useWatch({ control, name })
  const param = params.filters?.[attrCode]

  if (param && !isFilterTypeEqual(param)) throw new Error('Invalid filter type')

  const active = Boolean(param?.in?.length)
  const selectedLabel =
    filterNonNullableKeys(options)
      .filter((option) => param?.in?.includes(option.value))
      .map((option) => option && option.label) ?? []

  const items = useMemo(
    () =>
      filterNonNullableKeys(options, ['count', 'label']).map((option) => ({
        ...option,
        title: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <div>{option.label}</div>
            <Box sx={{ typography: 'caption', color: 'text.disabled' }}>({option.count})</Box>
          </Box>
        ),
        image: attrCode?.toLowerCase().includes('color') && (
          <IconSvg
            src={iconCirle}
            sx={{ color: `${option?.label}`, fill: 'currentcolor' }}
            size='large'
          />
        ),
      })),
    [attrCode, options],
  )

  return (
    <ChipOverlayOrPopper
      label={label}
      chipProps={{ variant: 'outlined' }}
      overlayProps={{ sizeSm: 'minimal', sizeMd: 'minimal' }}
      onApply={submit}
      onReset={
        canReset
          ? () => {
              form.resetField(name, { defaultValue: null })
              return submit()
            }
          : undefined
      }
      onClose={submit}
      selectedLabel={selectedLabel}
      selected={active}
    >
      {() => (
        <ActionCardListForm
          render={ActionCard}
          name={name}
          control={control}
          multiple
          layout='list'
          variant='default'
          size='medium'
          items={items}
        />
      )}
    </ChipOverlayOrPopper>
  )
}

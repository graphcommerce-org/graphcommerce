import { ActionCardListForm, useWatch } from '@graphcommerce/ecommerce-ui'
import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import {
  ActionCard,
  ChipOverlayOrPopper,
  IconSvg,
  filterNonNullableKeys,
  iconCirle,
} from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useMemo } from 'react'
import { isFilterTypeEqual } from '../ProductListItems/filterTypes'
import { useProductFiltersPro } from './ProductFiltersPro'
import type { FilterProps } from './ProductFiltersProAggregations'

export function ProductFilterEqualChip(props: FilterProps) {
  const { aggregation } = props
  const { attribute_code, label, options } = aggregation

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
      filterNonNullableKeys(options, ['label'])
        .filter((item) => item.count !== 0)
        .map((option) => ({
          ...option,
          title: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div>{option.label}</div>
              {option.count !== null && (
                <Box sx={{ typography: 'caption', color: 'text.disabled' }}>({option.count})</Box>
              )}
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
    items.length !== 0 && (
      <ChipOverlayOrPopper
        label={label}
        chipProps={{ variant: 'outlined' }}
        overlayProps={{ sizeSm: 'minimal', sizeMd: 'minimal' }}
        onApply={submit}
        onReset={
          canReset
            ? () => {
                form.setValue(name, null)
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
  )
}

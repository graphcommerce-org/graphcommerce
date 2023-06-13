import { useWatch } from '@graphcommerce/ecommerce-ui'
import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import {
  ActionCardListForm,
  ActionCard,
  filterNonNullableKeys,
  IconSvg,
  iconCirle,
} from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import { isFilterTypeEqual } from '../ProductListItems/filterTypes'
import { ProductFilterAccordion } from './ProductFilterAccordion'
import { useProductFiltersPro } from './ProductFiltersPro'
import { FilterProps } from './ProductFiltersProAggregations'

export function ProductFilterEqualSection(props: FilterProps) {
  const { aggregation } = props
  const { attribute_code, label, options } = aggregation

  const { form, submit, params } = useProductFiltersPro()
  const { control } = form
  const attrCode = attribute_code as keyof ProductAttributeFilterInput

  // We are casting the name, because filters can have other types than equal which dont have the in property
  const name = `filters.${attrCode}.in` as 'filters.category_id.in'
  const currentFilter = useWatch({ control, name })
  const param = params.filters?.[attrCode]

  if (param && !isFilterTypeEqual(param)) throw new Error('Invalid filter type')

  const items = useMemo(
    () =>
      filterNonNullableKeys(options, ['label']).map((option) => ({
        ...option,
        title: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ marginRight: 1 }}>{option.label}</Typography>
            {option.count !== null && (
              <Typography variant='caption' color='text.disabled'>
                ({option.count})
              </Typography>
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
    <ProductFilterAccordion
      summary={label}
      details={
        <ActionCardListForm
          sx={{ mb: 2 }}
          render={ActionCard}
          name={name}
          control={control}
          multiple
          layout='list'
          variant='default'
          size='medium'
          items={items}
        />
      }
      onClear={() => {
        form.resetField(name, { defaultValue: null })
      }}
      renderButton={currentFilter && currentFilter.length > 0}
    />
  )
}

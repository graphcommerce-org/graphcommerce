import { useWatch } from '@graphcommerce/ecommerce-ui'
import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import {
  ActionCardListForm,
  ActionCard,
  filterNonNullableKeys,
  IconSvg,
  iconCirle,
  SectionHeader,
  Button,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useMemo } from 'react'
import { isFilterTypeEqual } from '../ProductListItems/filterTypes'
import { useProductFiltersPro } from './ProductFiltersPro'
import { FilterProps } from './ProductFiltersProAggregations'

export function ProductFilterEqualSection(props: FilterProps) {
  const { attribute_code, label, options } = props
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
      filterNonNullableKeys(options, ['count', 'label']).map((option) => ({
        ...option,
        title: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ marginRight: 1 }}>{option.label}</Typography>
            <Typography variant='caption' color='text.disabled'>
              ({option.count})
            </Typography>
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
    <Box sx={{ my: 2 }}>
      <SectionHeader
        labelLeft={label}
        sx={{ mt: 0 }}
        labelRight={
          currentFilter && currentFilter.length > 0 ? (
            <Button
              variant='inline'
              color='primary'
              onClick={() => {
                form.resetField(name, { defaultValue: null })
              }}
            >
              <Trans id='Clear' />
            </Button>
          ) : undefined
        }
      />

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
    </Box>
  )
}

import { Controller } from '@graphcommerce/ecommerce-ui'
import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { SectionHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { isFilterTypeRange } from '../ProductListItems/filterTypes'
import { getMinMaxFromOptions, PriceSlider } from './PriceSlider'
import { useProductFiltersPro } from './ProductFiltersPro'
import { FilterProps } from './ProductFiltersProAggregations'

export function ProductFilterRangeSection(props: FilterProps) {
  const { attribute_code, label, options } = props

  const { form, params } = useProductFiltersPro()
  const { control } = form
  const attrCode = attribute_code as keyof ProductAttributeFilterInput
  const name = `filters.${attrCode}` as const

  const param = params.filters?.[attrCode]
  if (param && !isFilterTypeRange(param)) throw new Error('Invalid filter type')

  const [min, max] = getMinMaxFromOptions(options)

  if (!options) return null

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        if (value && !isFilterTypeRange(value)) throw new Error('Invalid filter type')

        const from = value?.from ? Number(value?.from) : min
        const to = value?.to ? Number(value?.to) : max

        return (
          <Box sx={{ my: 2 }}>
            <SectionHeader
              labelLeft={label}
              sx={{ mt: 0 }}
              labelRight={
                from !== min || to !== max ? (
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
            <PriceSlider options={options} value={value} onChange={onChange} />
          </Box>
        )
      }}
    />
  )
}

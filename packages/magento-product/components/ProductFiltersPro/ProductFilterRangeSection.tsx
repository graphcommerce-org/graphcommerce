import { Controller } from '@graphcommerce/ecommerce-ui'
import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { SectionHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button } from '@mui/material'
import { isFilterTypeRange } from '../ProductListItems/filterTypes'
import { getMinMaxFromOptions, PriceSlider } from './PriceSlider'
import { ProductFilterAccordion } from './ProductFilterAccordion'
import { useProductFiltersPro } from './ProductFiltersPro'
import { FilterProps } from './ProductFiltersProAggregations'

export function ProductFilterRangeSection(props: FilterProps) {
  const { aggregation } = props
  const { attribute_code, label, options } = aggregation

  const { form, params } = useProductFiltersPro()
  const { control } = form
  const attrCode = attribute_code as keyof ProductAttributeFilterInput
  const name = `filters.${attrCode}` as const

  const param = params.filters?.[attrCode]
  if (param && !isFilterTypeRange(param)) throw new Error('Invalid filter type')

  const [min, max] = getMinMaxFromOptions(options)

  if (!options) return null

  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      })}
    >
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          if (value && !isFilterTypeRange(value)) throw new Error('Invalid filter type')

          const from = value?.from ? Number(value?.from) : min
          const to = value?.to ? Number(value?.to) : max

          return (
            <ProductFilterAccordion
              summary={
                <Box sx={{ my: 2 }}>
                  <SectionHeader
                    labelLeft={label}
                    sx={{ mt: 0 }}
                    labelRight={
                      from !== min || to !== max ? (
                        <Button
                          variant='inline'
                          color='primary'
                          onClick={(e) => {
                            e.stopPropagation()
                            form.resetField(name, { defaultValue: null })
                          }}
                        >
                          <Trans id='Clear' />
                        </Button>
                      ) : undefined
                    }
                  />
                </Box>
              }
              details={<PriceSlider options={options} value={value} onChange={onChange} />}
            />
          )
        }}
      />
    </Box>
  )
}

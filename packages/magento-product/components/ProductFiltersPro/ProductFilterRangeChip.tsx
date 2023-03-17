import { Controller } from '@graphcommerce/ecommerce-ui'
import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import { ChipOverlayOrPopper, extendableComponent } from '@graphcommerce/next-ui'
import { isFilterTypeRange } from '../ProductListItems/filterTypes'
import { getMinMaxFromOptions, PriceSlider } from './PriceSlider'
import { useProductFiltersPro } from './ProductFiltersPro'
import { FilterProps } from './ProductFiltersProAggregations'

const { classes } = extendableComponent('FilterRangeType', ['root', 'container', 'slider'] as const)

export function ProductFilterRangeChip(props: FilterProps) {
  const { attribute_code, label, options } = props
  const { form, submit, params } = useProductFiltersPro()
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
          <ChipOverlayOrPopper
            label={label}
            chipProps={{ variant: 'outlined', className: classes.root }}
            overlayProps={{ sizeSm: 'minimal', sizeMd: 'minimal' }}
            onReset={
              from !== min || to !== max
                ? () => {
                    form.resetField(name, { defaultValue: null })
                    return submit()
                  }
                : undefined
            }
            onApply={submit}
            onClose={submit}
            selected={param ? Number(param.from) !== min || Number(param.to) !== max : false}
            selectedLabel={
              <>
                <Money value={Number(param?.from)} round /> —{' '}
                <Money value={Number(param?.to)} round />
              </>
            }
          >
            {() => <PriceSlider options={options} value={value} onChange={onChange} />}
          </ChipOverlayOrPopper>
        )
      }}
    />
  )
}

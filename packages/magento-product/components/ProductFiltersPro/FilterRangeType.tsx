import { Controller } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import type { CurrencyEnum, FilterRangeTypeInput } from '@graphcommerce/graphql-mesh'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import { ChipPanel, extendableComponent, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Mark } from '@mui/base'
import { Box, Slider } from '@mui/material'
import { FilterFormValues, useFilterForm } from './ProductFiltersPro'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import { useFilterActions } from './useFilterActions'

type FilterRangeTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[number]
>

const { classes } = extendableComponent('FilterRangeType', ['root', 'container', 'slider'] as const)

export function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, ...chipMenuProps } = props
  const currency = useQuery(StoreConfigDocument).data?.storeConfig?.base_currency_code

  const { form } = useFilterForm()
  const { control, getValues } = form
  const { emptyFilters, applyFilters } = useFilterActions({ attribute_code })
  const values = filterNonNullableKeys(options, ['label'])
    ?.map((v) => v?.value.split('_').map((mv) => Number(mv)))
    .flat(1)

  if (options === (null || undefined)) return null

  const name = `filters.${attribute_code}` as keyof FilterFormValues
  const initialFrom = values[0]
  const initialTo = values[values.length - 1]
  const currentValue = getValues(name) as FilterRangeTypeInput
  const selected = currentValue
    ? Number(currentValue.from) !== initialFrom || Number(currentValue.to) !== initialTo
    : false

  const handleReset = () => emptyFilters([initialFrom, initialTo])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const typedValue = value as FilterRangeTypeInput | undefined
        const from = Number(typedValue?.from ?? initialFrom)
        const to = Number(typedValue?.to ?? initialTo)

        const fromElement = <Money currency={currency as CurrencyEnum} value={from} />
        const toElement = <Money currency={currency as CurrencyEnum} value={to} />
        const hasValue =
          typedValue?.from !== undefined && Number(typedValue?.from) >= 0 && typedValue?.to
        const l = hasValue ? (
          <>
            {fromElement} - {toElement}
          </>
        ) : (
          label
        )

        return (
          <ChipPanel
            {...chipMenuProps}
            chipProps={{ variant: 'outlined', label, className: classes.root }}
            panelProps={{
              onReset: handleReset,
              onApply: applyFilters,
            }}
            selectedLabel={l}
            selected={selected}
          >
            <Box
              sx={(theme) => ({
                padding: `${theme.spacings.xxs} ${theme.spacings.xxs} !important`,
                width: '100%',
              })}
              className={classes.container}
            >
              <Box>
                <Money round value={from} />
                -
                <Money round value={to} />
                <Slider
                  min={values[0]}
                  max={values[values.length - 1]}
                  aria-labelledby='range-slider'
                  value={[from, to]}
                  onChange={(_e, newValue) => {
                    onChange({ from: newValue[0], to: newValue[1] })
                  }}
                  valueLabelDisplay='off'
                  className={classes.slider}
                  step={null}
                  marks={values.map((value) => ({ value, label: '' }))}
                />
              </Box>
            </Box>
          </ChipPanel>
        )
      }}
    />
  )
}

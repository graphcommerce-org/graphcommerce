import { Controller, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import type { FilterRangeTypeInput, ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import { ChipMenu, ChipMenuProps, extendableComponent } from '@graphcommerce/next-ui'
import { Mark } from '@mui/base/SliderUnstyled/useSlider.types'
import { Box, Slider } from '@mui/material'
import { useState } from 'react'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

type FilterRangeTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected' | 'openEl' | 'setOpenEl'> & {
    filterForm: UseFormReturn<ProductAttributeFilterInput>
  }

const { classes } = extendableComponent('FilterRangeType', ['root', 'container', 'slider'] as const)

export function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, filterForm, ...chipProps } = props
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const values = options?.map((v) => v?.value.split('_').map((mv) => Number(mv))).flat(1)

  if (options === (null || undefined)) return null

  return (
    <Controller
      control={filterForm.control}
      name={`${attribute_code}` as keyof ProductAttributeFilterInput}
      defaultValue={{
        from: `${values?.[0] ?? 0}`,
        to: `${values ? values?.[values.length - 1] : 0}`,
      }}
      render={({ field: { onChange, value } }) => {
        const typedValue = value as FilterRangeTypeInput
        return (
          <ChipMenu
            {...chipProps}
            variant='outlined'
            label={label}
            filterCount={2}
            selected={!!openEl}
            openEl={openEl}
            setOpenEl={setOpenEl}
            // onDelete={currentLabel ? resetFilter : undefined}
            className={classes.root}
          >
            <Box
              sx={(theme) => ({
                padding: `${theme.spacings.xxs} ${theme.spacings.xxs} !important`,
                width: '100%',
              })}
              className={classes.container}
            >
              <Box>
                <Money round value={Number(typedValue?.from)} />
                {typedValue?.to ? ' — ' : false}
                <Money round value={Number(typedValue?.to)} />

                <Slider
                  min={values ? values[0] : 0}
                  max={values ? values[values.length - 1] : 0}
                  aria-labelledby='range-slider'
                  value={[Number(typedValue?.from) ?? 0, Number(typedValue?.to) ?? 0]}
                  onChange={(_e, newValue) => {
                    onChange({ from: newValue[0], to: newValue[1] })
                  }}
                  valueLabelDisplay='off'
                  className={classes.slider}
                  step={null}
                  marks={values?.map((v) => ({ value: v, label: '' })) as Mark[]}
                />
              </Box>
            </Box>
          </ChipMenu>
        )
      }}
    />
  )
}

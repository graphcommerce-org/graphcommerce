import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import type { FilterRangeTypeInput, ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import { ChipMenu, ChipMenuProps, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Slider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

type FilterRangeTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected' | 'openEl' | 'setOpenEl'> & {
    filterForm: UseFormReturn<ProductAttributeFilterInput, any>
  }

const { classes } = extendableComponent('FilterRangeType', ['root', 'container', 'slider'] as const)

export function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, filterForm, ...chipProps } = props
  const { setValue, watch } = filterForm
  const { params } = useProductListParamsContext()

  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)

  const values = options?.map((v) => v?.value.split('_').map((mv) => Number(mv))).flat(1)

  const value: { from: number; to: number } | undefined = {
    from: Number(values?.[0]),
    to: Number(values?.[values.length - 1]),
  }

  const priceFilterUrl = cloneDeep(params)
  delete priceFilterUrl.currentPage
  priceFilterUrl.filters[attribute_code] = {
    from: String(value?.from),
    to: String(value?.to),
  } as FilterRangeTypeInput

  return (
    <ChipMenu
      variant='outlined'
      label={label}
      selectedLabel={label}
      selected={!!openEl}
      {...chipProps}
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
        <>
          <Money round value={Number(value?.from)} />
          {value?.to ? ' — ' : false}
          <Money round value={Number(value?.to)} />
        </>
        <Slider
          min={values ? values[0] : 0}
          max={values ? values[values.length - 1] : 0}
          size='large'
          aria-labelledby='range-slider'
          value={value ? [value?.from, value?.to] : [0, 0]}
          onChange={(e, newValue) => {
            setValue(`${attribute_code}` as unknown as any, {
              from: newValue?.[0] ?? 0,
              to: newValue?.[1] ?? 0,
            })
            setOpenEl(openEl)
          }}
          valueLabelDisplay='off'
          className={classes.slider}
          step={null}
          marks={values?.map((v) => ({ value: v, label: v })) as any}
        />
      </Box>
    </ChipMenu>
  )
}

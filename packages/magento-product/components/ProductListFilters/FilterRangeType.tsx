import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import type {
  FilterRangeTypeInput,
  FilterTypeInput,
  ProductAttributeFilterInput,
} from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCardItemRenderProps,
  ActionCardListForm,
  ChipMenu,
  ChipMenuProps,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Slider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListParams } from '../ProductListItems/filterTypes'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

type Filter = NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>

type FilterRangeTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected' | 'openEl' | 'setOpenEl'> & {
    filterForm: UseFormReturn<ProductAttributeFilterInput, any>
  }

const { classes } = extendableComponent('FilterRangeType', ['root', 'container', 'slider'] as const)

export function FilterRangeActionCard(
  props: ActionCardItemRenderProps<{
    option: NonNullable<Filter['options']>[0]
    attribute_code: string
    params: ProductListParams
    min: number
    max: number
    currentFilter?: FilterRangeTypeInput

    onChangeCommitted?: (
      event: Event | React.SyntheticEvent<Element, Event>,
      value: number | number[],
    ) => void
    onChange?: (event: Event, value: number | number[], activeThumb: number) => void
  }>,
) {
  const { value, min, max, params, onReset, onChangeCommitted, onChange } = props

  console.log({ props })

  return (
    <Box
      sx={(theme) => ({
        padding: `${theme.spacings.xxs} ${theme.spacings.xxs} !important`,
        width: '100%',
      })}
      className={classes.container}
    >
      <Slider
        min={min}
        max={max}
        size='large'
        aria-labelledby='range-slider'
        value={Number(value) ?? 0}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        valueLabelDisplay='off'
        className={classes.slider}
      />
    </Box>
  )
}

export function FilterRangeType(props: FilterRangeTypeProps) {
  const { attribute_code, label, options, filterForm, ...chipProps } = props
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)

  const { params } = useProductListParamsContext()
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  const priceFilterUrl = cloneDeep(params)

  const marks: { [index: number]: { value: number; label?: React.ReactNode } } = {}
  const paramValues = params.filters[attribute_code]

  const { control, reset, setValue, watch } = filterForm
  const [min, maxish] = options
    ?.map((option) => {
      let val = option?.value.replace('*_', '0_') ?? ''
      val = val.replace('_*', '_0')
      const [minVal, maxVal] = val.split('_').map((value) => Number(value))

      marks[minVal] = { value: minVal, label: minVal }
      marks[maxVal] = { value: maxVal, label: maxVal }
      return [minVal, maxVal]
    })
    .reduce(([prevMin, prevMax], [curMin, curMax]) => [
      Math.min(prevMin, curMin),
      Math.max(curMax, prevMax),
    ]) ?? [0, 0]

  const max = (maxish / (options?.length ?? 2 - 1)) * (options?.length ?? 1)
  marks[max] = { value: max, label: max }

  useEffect(() => {
    if (!paramValues) {
      setValue(attribute_code as keyof ProductAttributeFilterInput, {
        from: `${min}`,
        to: `${max}`,
      })
    }
  }, [attribute_code, max, min, paramValues, setValue])

  const resetFilter = () => {
    const linkParams = cloneDeep(params)

    delete linkParams.currentPage
    delete linkParams.filters[attribute_code]

    setValue(attribute_code as keyof ProductAttributeFilterInput, {
      from: `${min}`,
      to: `${max}`,
    })
    replaceRoute(linkParams)
  }

  const currentFilter = params.filters[attribute_code] as FilterRangeTypeInput | undefined

  let currentLabel: React.ReactNode | undefined

  if (currentFilter) {
    const from = Number(currentFilter?.from ?? 0)
    const to = Number(currentFilter?.to ?? 0)

    if (from === min && to !== max)
      currentLabel = (
        <Trans
          id='Below <0/>'
          components={{ 0: <Money round value={Number(currentFilter?.to)} /> }}
        />
      )

    if (from !== min && to === max)
      currentLabel = (
        <Trans
          id='Above <0/>'
          components={{ 0: <Money round value={Number(currentFilter?.from)} /> }}
        />
      )

    if (from !== min && to !== max)
      currentLabel = (
        <>
          <Money round value={Number(currentFilter?.from)} />
          {' — '}
          <Money round value={Number(currentFilter.to)} />
        </>
      )
  }

  const current = watch(`${attribute_code}` as keyof ProductAttributeFilterInput)

  return (
    <ChipMenu
      variant='outlined'
      label={label}
      selectedLabel={currentLabel}
      selected={!!currentLabel}
      openEl={openEl}
      setOpenEl={setOpenEl}
      {...chipProps}
      onDelete={currentLabel ? resetFilter : undefined}
      className={classes.root}
      labelRight={
        <>
          <Money round value={current?.[0]} />
          {current?.[0] ? ' — ' : false}
          <Money round value={current?.[1]} />
        </>
      }
    >
      <ActionCardListForm
        name={`${attribute_code}`}
        control={control}
        layout='stack'
        items={options}
        render={FilterRangeActionCard}
      />
    </ChipMenu>
  )
}

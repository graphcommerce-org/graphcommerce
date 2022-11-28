import { cloneDeep } from '@graphcommerce/graphql'
import type { FilterEqualTypeInput } from '@graphcommerce/graphql-mesh'
import {
  ChipMenu,
  ChipMenuProps,
  extendableComponent,
  ActionCardListForm,
  ActionCardItemRenderProps,
  ActionCard,
} from '@graphcommerce/next-ui'
import { Box, Checkbox, Typography } from '@mui/material'
import { useState } from 'react'
import type { SetRequired } from 'type-fest'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListParams } from '../ProductListItems/filterTypes'
import { useFilterForm } from './FilterFormContext'
import { ProductListFiltersFragment } from './ProductListFilters.gql'
import { useFilterActions } from './helpers/filterActions'

type OwnerState = {
  isColor: boolean
  isActive: boolean
}
const componentName = 'FilterEqual' as const
const parts = [
  'listItem',
  'listItemInnerContainer',
  'checkbox',
  'linkContainer',
  'button',
  'resetButton',
  'filterAmount',
  'filterLabel',
  'isColor',
  'isActive',
] as const

const { selectors, withState } = extendableComponent<
  OwnerState,
  typeof componentName,
  typeof parts
>(componentName, parts)

export type FilterIn = SetRequired<Omit<FilterEqualTypeInput, 'eq'>, 'in'>

type Filter = NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>

type FilterEqualTypeProps = Filter & Omit<ChipMenuProps, 'selected' | 'openEl' | 'setOpenEl'>
function FilterEqualActionCard(
  props: ActionCardItemRenderProps<{
    option: NonNullable<Filter['options']>[0]
    attribute_code: string
    params: ProductListParams
    currentFilter?: FilterEqualTypeInput
  }>,
) {
  const { option, attribute_code, params, currentFilter, onReset, ...cardProps } = props
  if (!option?.value) return null
  const labelId = `filter-equal-${attribute_code}-${option?.value}`
  const filters = cloneDeep(params.filters)
  const isColor = !!attribute_code?.toLowerCase().includes('color')
  const isActive = Boolean(isColor && currentFilter?.in?.includes(option?.value) && isColor)

  const cls = withState({ isColor, isActive })
  if (currentFilter?.in?.includes(option.value)) {
    filters[attribute_code] = {
      ...currentFilter,
      in: currentFilter?.in?.filter((v) => v !== option.value),
    }
  } else {
    filters[attribute_code] = {
      ...currentFilter,
      in: [...(currentFilter?.in ?? []), option.value],
    }
  }

  return (
    <ActionCard
      {...cardProps}
      size='small'
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', paddingY: !isColor ? 1 : 0 }}>
          <Typography className={cls.filterLabel} sx={{ marginRight: 1 }}>
            {option.label}
          </Typography>
          <Typography className={cls.filterAmount} variant='caption' color='text.disabled'>
            ({option.count})
          </Typography>
        </Box>
      }
      image={
        isColor ? (
          <Checkbox
            // edge='end'
            checked={currentFilter?.in?.includes(option?.value ?? '')}
            tabIndex={-1}
            size='medium'
            color='primary'
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            className={cls.checkbox}
            sx={
              isColor && {
                padding: 1,
                border: 1,
                borderColor: 'divider',
                '& > *': {
                  opacity: 0,
                },
              }
            }
            style={
              isColor
                ? {
                    background: `${option?.label}`,
                    color: `${option?.label}`,
                  }
                : undefined
            }
          />
        ) : undefined
      }
    />
  )
}

export function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, __typename, ...chipProps } = props
  const {
    form: { control },
  } = useFilterForm()

  const { params } = useProductListParamsContext()
  const { emptyFilters, applyFilters } = useFilterActions({
    attribute_code,
  })
  const currentFilter: FilterEqualTypeInput = cloneDeep(params.filters[attribute_code]) ?? {
    in: [],
  }

  const currentLabels =
    options
      ?.filter((option) => option && currentFilter.in?.includes(option.value))
      .map((option) => option && option.label) ?? []

  return (
    <ChipMenu
      {...chipProps}
      variant='outlined'
      onReset={() => emptyFilters()}
      label={label}
      selectedLabel={currentLabels[0]}
      selected={currentLabels.length > 0}
      filterValue={currentLabels.length > 1 ? currentLabels.length - 1 : undefined}
      className={componentName}
      onApply={applyFilters}
    >
      <ActionCardListForm
        name={`${attribute_code}.in`}
        control={control}
        multiple
        layout='list'
        variant='default'
        items={
          options?.map((option) => ({
            option,
            attribute_code,
            params,
            currentFilter,
            value: option?.value ?? '',
          })) ?? []
        }
        render={FilterEqualActionCard}
      />
    </ChipMenu>
  )
}

FilterEqualType.selectors = selectors

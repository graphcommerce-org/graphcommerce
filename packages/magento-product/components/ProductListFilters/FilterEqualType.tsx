import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import type { FilterEqualTypeInput, ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
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

const { classes, selectors, withState } = extendableComponent<
  OwnerState,
  typeof componentName,
  typeof parts
>(componentName, parts)

export type FilterIn = SetRequired<Omit<FilterEqualTypeInput, 'eq'>, 'in'>

type Filter = NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>

type FilterEqualTypeProps = Filter &
  Omit<ChipMenuProps, 'selected' | 'openEl' | 'setOpenEl'> & {
    filterForm: UseFormReturn<ProductAttributeFilterInput>
  }

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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography className={cls.filterLabel} sx={{ marginRight: 1 }}>
            {option.label}
          </Typography>
          <Typography className={cls.filterAmount} variant='caption' color='text.disabled'>
            ({option.count})
          </Typography>
        </Box>
      }
      price={
        isColor ? (
          <Checkbox
            edge='start'
            checked={currentFilter?.in?.includes(option?.value ?? '')}
            tabIndex={-1}
            size='medium'
            color='primary'
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            className={cls.checkbox}
            sx={[
              isColor && {
                padding: 1,
                border: 1,
                borderColor: 'divider',
                '& > *': {
                  opacity: 0,
                },
              },
              isActive &&
                ((theme) => ({
                  border: `1px solid ${theme.palette.primary.main}`,
                  boxShadow: `inset 0 0 0 4px ${theme.palette.background.paper}`,
                })),
            ]}
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
  const { attribute_code, count, label, options, __typename, filterForm, ...chipProps } = props
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const { params } = useProductListParamsContext()
  const { control } = filterForm
  const { emptyFilters, resetFilters } = useFilterActions({
    params,
    attribute_code,
    form: filterForm,
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
      variant='outlined'
      {...chipProps}
      openEl={openEl}
      setOpenEl={setOpenEl}
      onReset={() => emptyFilters()}
      onDelete={resetFilters}
      label={label}
      selected={currentLabels.length > 0}
      selectedLabel={currentLabels.length > 0 ? currentLabels.join(', ') : undefined}
      className={componentName}
    >
      <ActionCardListForm
        name={`${attribute_code}.in`}
        control={control}
        multiple
        layout='list'
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

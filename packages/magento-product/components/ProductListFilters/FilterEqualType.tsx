import { useForm } from '@graphcommerce/ecommerce-ui'
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
import type { SetRequired } from 'type-fest'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

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

type FilterEqualTypeProps = Filter & Omit<ChipMenuProps, 'selected'>

function Item(
  props: ActionCardItemRenderProps<{
    option: NonNullable<Filter['options']>[0]
    attribute_code: string
    params: any
    currentFilter: any
    anyFilterActive: boolean
  }>,
) {
  const { option, attribute_code, params, currentFilter, anyFilterActive, onReset, value } = props
  if (!option?.value) return null
  const labelId = `filter-equal-${attribute_code}-${option?.value}`
  const filters = cloneDeep(params.filters)
  const isColor = !!attribute_code?.toLowerCase().includes('color')
  const isActive = Boolean(isColor && currentFilter.in?.includes(option?.value) && isColor)

  const cls = withState({ isColor, isActive })
  if (currentFilter.in?.includes(option.value)) {
    filters[attribute_code] = {
      ...currentFilter,
      in: currentFilter.in?.filter((v) => v !== option.value),
    }
  } else {
    filters[attribute_code] = {
      ...currentFilter,
      in: [...(currentFilter?.in ?? []), option.value],
    }
  }

  return (
    <ActionCard
      {...props}
      size='small'
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginRight: 1 }}>{option.label}</Typography>
          <Typography variant='caption'>({option.count})</Typography>
        </Box>
      }
      price={
        <Checkbox
          edge='start'
          checked={currentFilter.in?.includes(option?.value ?? '')}
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
      }
    />
  )
}

export function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, __typename, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const replaceRoute = useProductListLinkReplace({ scroll: false })
  const form = useForm<{ options: string[] }>({ defaultValues: { options: [] } })
  const { control, reset } = form
  const currentFilter: FilterEqualTypeInput = cloneDeep(params.filters[attribute_code]) ?? {
    in: [],
  }

  const anyFilterActive = Object.keys(params?.filters ?? {}).length >= 1

  const currentLabels =
    options
      ?.filter((option) => option && currentFilter.in?.includes(option.value))
      .map((option) => option && option.label) ?? []

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    delete linkParams.filters[attribute_code]
    delete linkParams.currentPage

    replaceRoute(linkParams)
  }

  return (
    <ChipMenu
      variant='outlined'
      {...chipProps}
      onDelete={() => reset()}
      label={label}
      selected={currentLabels.length > 0}
      selectedLabel={currentLabels.length > 0 ? currentLabels.join(', ') : undefined}
      className={componentName}
    >
      <ActionCardListForm
        name='FilterEqualType'
        control={control}
        multiple
        layout='grid'
        items={
          options?.map((option) => ({
            option,
            attribute_code,
            params,
            currentFilter,
            anyFilterActive,
            value: option?.value ?? '',
          })) ?? []
        }
        render={Item}
      />
    </ChipMenu>
  )
}

FilterEqualType.selectors = selectors

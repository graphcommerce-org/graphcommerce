import { Chip, ChipProps, makeStyles, Theme } from '@material-ui/core'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import React from 'react'
import { ProductListFiltersFragment } from '../ProductListFilters.gql'
import { FilterIn } from './FilterEqualType'

export type FilterCheckboxTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipProps, 'selected'>

const useFilterCheckboxStyles = makeStyles(
  (theme: Theme) => ({
    link: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  }),
  { name: 'FilterCheckbox' },
)

export default function FilterCheckboxType(props: FilterCheckboxTypeProps) {
  const classes = useFilterCheckboxStyles(props)
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const currentFilter = params.filters[attribute_code]

  if (!options?.[0]) return null
  const option = options?.[1]?.value === '1' ? options[1] : options[0]
  const isActive = currentFilter?.in?.includes(option.value)

  const filter = isActive ? {} : ({ in: [option.value] } as FilterIn)
  return (
    <CategoryLink
      {...params}
      filters={{ ...params.filters, [attribute_code]: filter }}
      currentPage={undefined}
      className={classes.link}
    >
      <Chip
        variant='outlined'
        color={isActive ? 'primary' : 'default'}
        onDelete={isActive ? () => {} : undefined}
        label={label}
        clickable
        {...chipProps}
      />
    </CategoryLink>
  )
}

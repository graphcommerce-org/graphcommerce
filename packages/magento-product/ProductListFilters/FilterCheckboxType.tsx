import { Chip, ChipProps, makeStyles } from '@material-ui/core'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import React from 'react'
import { FilterIn } from './FilterEqualType'

export type FilterCheckboxTypeProps = NonNullable<
  NonNullable<GQLProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipProps, 'selected'>

const useStyles = makeStyles({ link: { '&:hover': { textDecoration: 'none' } } })

export default function FilterCheckboxType(props: FilterCheckboxTypeProps) {
  const classes = useStyles(props)
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const currentFilter = params.filters[attribute_code]

  if (!options?.[0]) return null
  const option = options[0]
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

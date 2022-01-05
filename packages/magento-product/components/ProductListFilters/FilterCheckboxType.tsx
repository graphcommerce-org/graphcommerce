import { cloneDeep } from '@apollo/client/utilities'
import {
  useChipMenuStyles,
  iconCancelAlt,
  SvgImageSimple,
  useMergedClasses,
  UseStyles,
} from '@graphcommerce/next-ui'
import { Chip, ChipProps } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import ProductListLink from '../ProductListLink/ProductListLink'
import { FilterIn } from './FilterEqualType'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

export type FilterCheckboxTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipProps, 'selected'> &
  UseStyles<typeof useChipMenuStyles>

export default function FilterCheckboxType(props: FilterCheckboxTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const classes = useMergedClasses(useChipMenuStyles().classes, props.classes)
  const currentFilter = params.filters[attribute_code]
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  if (!options?.[0]) return null

  const option = options?.[1]?.value === '1' ? options[1] : options[0]
  const isActive = currentFilter?.in?.includes(option.value)

  const filter = isActive ? {} : ({ in: [option.value] } as FilterIn)

  return (
    <ProductListLink
      {...params}
      filters={{ ...params.filters, [attribute_code]: filter }}
      currentPage={undefined}
      noLink
      link={{ scroll: false, replace: true }}
    >
      <Chip
        variant='outlined'
        color={isActive ? undefined : 'default'}
        onDelete={
          isActive
            ? () => {
                const linkParams = cloneDeep(params)

                delete linkParams.currentPage
                delete linkParams.filters[attribute_code]

                replaceRoute(linkParams)
              }
            : undefined
        }
        deleteIcon={isActive ? <SvgImageSimple src={iconCancelAlt} size='small' /> : undefined}
        label={label}
        clickable
        {...chipProps}
        className={clsx(classes.chip, isActive && classes.chipSelected, chipProps.className)}
      />
    </ProductListLink>
  )
}

import { cloneDeep } from '@apollo/client/utilities'
import { Chip, ChipProps } from '@material-ui/core'
import { useChipMenuStyles, SvgImage, iconCloseCircle } from '@reachdigital/next-ui'
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
  Omit<ChipProps, 'selected'>

export default function FilterCheckboxType(props: FilterCheckboxTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const classes = useChipMenuStyles(props)
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
        deleteIcon={
          isActive ? (
            <SvgImage src={iconCloseCircle} alt='remove' size='small' loading='eager' />
          ) : undefined
        }
        label={label}
        clickable
        {...chipProps}
        className={clsx(classes.chip, isActive && classes.chipSelected, chipProps.className)}
      />
    </ProductListLink>
  )
}

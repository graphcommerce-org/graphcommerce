import React from 'react'
import Router from 'next/router'
import CategoryLink, { createRoute } from 'components/CategoryLink'
import { ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core'
import { ProductListParams } from 'components/ProductList'
import { SetRequired } from 'type-fest'
import cloneDeep from 'clone-deep'
import ChipMenu, { ChipMenuProps } from '../ChipMenu'

type FilterEqualTypeProps = GQLProductListFiltersFragment['aggregations'][0] &
  Omit<ChipMenuProps, 'selected'> & {
    params: ProductListParams
  }

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, params, ...filterMenuProps } = props
  const currentFilter = params.filters[attribute_code] as GQLFilterEqualTypeInput
  const currentLabel = options.find((option) => currentFilter?.in?.includes(option.value))?.label

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    delete linkParams.filters[attribute_code]
    delete linkParams.currentPage
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/[...url]', createRoute(linkParams))
  }

  return (
    <ChipMenu
      key={attribute_code}
      {...filterMenuProps}
      label={label}
      selected={!!currentLabel}
      selectedLabel={currentLabel}
      onDelete={currentLabel ? removeFilter : undefined}
    >
      {options.map((option) => {
        const linkParams = cloneDeep(params)
        delete linkParams.currentPage

        type FilterIn = SetRequired<Omit<GQLFilterEqualTypeInput, 'eq'>, 'in'>

        if (!linkParams.filters[attribute_code]?.in) linkParams.filters[attribute_code] = { in: [] }
        const filter: FilterIn = linkParams.filters[attribute_code]

        if (currentFilter?.in?.includes(option.value)) {
          filter.in = filter.in.filter((val) => val !== String(option.value))
        } else {
          filter.in.push(option.value)
        }

        const labelId = `filter-equal-${attribute_code}-${option.value}`

        return (
          <ListItem
            button
            key={option.value}
            dense
            component={(chipProps) => (
              <CategoryLink {...chipProps} {...linkParams} color='inherit' underline='none' />
            )}
          >
            <ListItemIcon style={{ minWidth: 40 }}>
              <Checkbox
                edge='start'
                checked={currentFilter?.in?.includes(option.value)}
                tabIndex={-1}
                size='small'
                color='primary'
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText primary={option.label} />
          </ListItem>
        )
      })}
    </ChipMenu>
  )
}

import React from 'react'
import CategoryLink, { useCategoryPushRoute } from 'components/CategoryLink'
import { ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core'
import { SetRequired } from 'type-fest'
import cloneDeep from 'clone-deep'
import { useProductListParamsContext } from 'components/CategoryPage/CategoryPageContext'
import ChipMenu, { ChipMenuProps } from '../ChipMenu'

type FilterEqualTypeProps = GQLProductListFiltersFragment['aggregations'][0] &
  Omit<ChipMenuProps, 'selected'>

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, ...filterMenuProps } = props
  const { params } = useProductListParamsContext()
  const currentFilter = params.filters[attribute_code] as GQLFilterEqualTypeInput
  const currentLabel = options.find((option) => currentFilter?.in?.includes(option.value))?.label
  const pushRoute = useCategoryPushRoute()

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    delete linkParams.filters[attribute_code]
    delete linkParams.currentPage
    pushRoute(linkParams)
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

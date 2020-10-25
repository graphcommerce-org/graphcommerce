import { cloneDeep } from '@apollo/client/utilities'
import { ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core'
import CategoryLink, { useCategoryPushRoute } from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import React from 'react'
import { SetRequired } from 'type-fest'
import ChipMenu, { ChipMenuProps } from '../../next-ui/ChipMenu'

export type FilterIn = SetRequired<Omit<GQLFilterEqualTypeInput, 'eq'>, 'in'>

type FilterEqualTypeProps = NonNullable<
  NonNullable<GQLProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected'>

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const currentFilter = params.filters[attribute_code]

  const activeLabels =
    options
      ?.filter((option) => option && currentFilter?.in?.includes(option.value))
      .map((option) => option && option.label) ?? []

  const pushRoute = useCategoryPushRoute()

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    delete linkParams.filters[attribute_code]
    delete linkParams.currentPage
    pushRoute(linkParams)
  }

  return (
    <ChipMenu
      variant='outlined'
      {...chipProps}
      label={label}
      selected={activeLabels.length > 0}
      selectedLabel={activeLabels.length > 0 ? activeLabels.join(', ') : undefined}
      onDelete={activeLabels.length > 0 ? removeFilter : undefined}
    >
      {options?.map((option) => {
        const linkParams = cloneDeep(params)
        delete linkParams.currentPage

        if (!linkParams.filters[attribute_code]?.in) linkParams.filters[attribute_code] = { in: [] }
        const filter: FilterIn = linkParams.filters[attribute_code]

        if (currentFilter?.in?.includes(option?.value ?? '')) {
          filter.in = filter?.in?.filter((val) => val !== (option?.value ?? '')) ?? []
        } else {
          filter.in = [...(filter.in ?? []), option?.value ?? ''].sort()
        }

        const labelId = `filter-equal-${attribute_code}-${option?.value}`

        return (
          <ListItem
            button
            key={option?.value}
            dense
            component={(categoryLinkProps) => (
              <CategoryLink
                {...categoryLinkProps}
                {...linkParams}
                color='inherit'
                underline='none'
              />
            )}
          >
            <ListItemIcon
              style={{
                minWidth: 40,
              }}
            >
              <Checkbox
                edge='start'
                checked={currentFilter?.in?.includes(option?.value ?? '')}
                tabIndex={-1}
                size='small'
                color='primary'
                disableRipple
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </ListItemIcon>
            <ListItemText primary={option?.label} />
          </ListItem>
        )
      })}
    </ChipMenu>
  )
}

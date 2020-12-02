import { cloneDeep } from '@apollo/client/utilities'
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  makeStyles,
  Theme,
} from '@material-ui/core'
import CategoryLink, { useCategoryPushRoute } from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import { FilterEqualTypeInput } from '@reachdigital/magento-graphql'
import clsx from 'clsx'
import React from 'react'
import { SetRequired } from 'type-fest'
import ChipMenu, { ChipMenuProps } from '../../next-ui/ChipMenu'
import { ProductListFiltersFragment } from '../ProductListFilters.gql'

export type FilterIn = SetRequired<Omit<FilterEqualTypeInput, 'eq'>, 'in'>

type FilterEqualTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected'>

const useFilterEqualStyles = makeStyles(
  (theme: Theme) => ({
    link: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginLeft: -5,
      marginRight: 24,
      '& .MuiListItemText-root': {
        display: 'block',
        width: '80%',
        maxWidth: '80%',
        minWidth: '80%',
        '& span': {
          wordWrap: 'break-word',
        },
        [theme.breakpoints.down('sm')]: {
          maxWidth: '100%',
        },
      },
    },
    checkbox: {
      padding: 0,
      margin: ' 0 0 0 8px',
    },
    linkContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      // gridTemplateRows: 'repeat(4, minmax(0, 1fr))',
      // gridAutoFlow: 'row',
      width: '100%',
      minWidth: 0,
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
    },
  }),
  { name: 'FilterEqual' },
)

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const currentFilter = params.filters[attribute_code]
  const classes = useFilterEqualStyles()

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
      <div className={classes.linkContainer}>
        {options?.map((option) => {
          const linkParams = cloneDeep(params)
          delete linkParams.currentPage

          if (!linkParams.filters[attribute_code]?.in)
            linkParams.filters[attribute_code] = { in: [] }
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
                  className={clsx(categoryLinkProps.className, classes.link)}
                />
              )}
            >
              <ListItemText primary={option?.label} />

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
                className={classes.checkbox}
              />
            </ListItem>
          )
        })}
      </div>
    </ChipMenu>
  )
}

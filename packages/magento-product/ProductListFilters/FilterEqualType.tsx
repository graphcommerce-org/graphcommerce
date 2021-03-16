import { cloneDeep } from '@apollo/client/utilities'
import {
  ListItem,
  ListItemText,
  Checkbox,
  makeStyles,
  Theme,
  ListItemSecondaryAction,
} from '@material-ui/core'
import CategoryLink, { useCategoryPushRoute } from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import { FilterEqualTypeInput } from '@reachdigital/magento-graphql'
import Button from '@reachdigital/next-ui/Button'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React, { useState } from 'react'
import { SetRequired } from 'type-fest'
import ChipMenu, { ChipMenuProps } from '../../next-ui/ChipMenu'
import { ProductListParams } from '../ProductListItems/filterTypes'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

export type FilterIn = SetRequired<Omit<FilterEqualTypeInput, 'eq'>, 'in'>

type FilterEqualTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected'>

const useFilterEqualStyles = makeStyles(
  (theme: Theme) => ({
    listItem: {
      padding: `${theme.spacings.xxs} ${theme.spacings.xxs} 0`,
      display: 'block',
      '&:not(:nth-last-of-type(-n+2)) > div': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    listItemInnerContainer: {
      width: '100%',
      paddingTop: responsiveVal(0, 3),
      paddingBottom: theme.spacings.xxs,
      '& > div': {
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
          maxWidth: '72%',
        },
      },
      '& > div > span': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
    checkbox: {
      padding: 0,
      margin: '3px 0 0 8px',
      float: 'right',
    },
    linkContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      columnGap: responsiveVal(2, 16),
      minWidth: 0,
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
    },
    button: {
      float: 'right',
      marginTop: theme.spacings.xxs,
      marginRight: theme.spacings.xxs,
      textDecoration: 'none',
    },
    resetButton: {
      background: theme.palette.grey['100'],
      marginRight: theme.spacings.xxs,
    },
    filterAmount: {
      color: theme.palette.grey[500],
      marginLeft: 4,
      fontSize: theme.typography.pxToRem(11),
      display: 'inline',
    },
    filterLabel: {
      display: 'inline',
    },
  }),
  { name: 'FilterEqual' },
)

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params, setParams } = useProductListParamsContext()
  const classes = useFilterEqualStyles()
  const pushRoute = useCategoryPushRoute()

  const currentFilter =
    cloneDeep(params.filters[attribute_code]) ?? ({ in: [] } as FilterEqualTypeInput)
  const [selectedFilter, setSelectedFilter] = useState(currentFilter)

  const currentLabels =
    options
      ?.filter((option) => option && currentFilter.in?.includes(option.value))
      .map((option) => option && option.label) ?? []

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    delete linkParams.filters[attribute_code]
    delete linkParams.currentPage
    pushRoute(linkParams)
  }

  const resetFilter = () => {
    const linkParams = cloneDeep(params)

    delete linkParams.currentPage
    delete linkParams.filters[attribute_code]

    setSelectedFilter({ in: [] })
    params.filters[attribute_code] = { in: [] }

    pushRoute(linkParams)
  }

  const applyFilter = () => {
    pushRoute({
      ...params,
      filters: { ...params.filters, [attribute_code]: selectedFilter },
    })
  }

  let selectedLabel = currentLabels.length > 0 ? currentLabels.join(', ') : undefined
  selectedLabel =
    currentLabels.length > 1 ? `${currentLabels[0]} +${currentLabels.length - 1}` : selectedLabel

  return (
    <ChipMenu
      variant='outlined'
      {...chipProps}
      label={label}
      selected={currentLabels.length > 0}
      selectedLabel={selectedLabel}
      onDelete={currentLabels.length > 0 ? removeFilter : undefined}
    >
      <div className={classes.linkContainer}>
        {options?.map((option) => {
          const labelId = `filter-equal-${attribute_code}-${option?.value}`
          let filter = currentFilter
          if (filter?.in?.includes(option?.value ?? '')) {
            filter = { ...currentFilter, in: currentFilter?.in?.filter((v) => v !== option?.value) }
          } else {
            filter = { ...currentFilter, in: [...(currentFilter.in ?? []), option?.value ?? ''] }
          }
          const newParams: ProductListParams = {
            ...params,
            filters: { ...params.filters, [attribute_code]: filter },
          }
          delete newParams.currentPage

          return (
            <CategoryLink key={option?.value} {...newParams} noLink>
              <ListItem
                button
                component='a'
                dense
                className={classes.listItem}
                onClick={() => {
                  setParams(newParams)
                }}
              >
                <div className={classes.listItemInnerContainer}>
                  <ListItemText
                    primary={option?.label}
                    classes={{ primary: classes.filterLabel, secondary: classes.filterAmount }}
                    secondary={`(${option?.count})`}
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge='start'
                      checked={currentFilter.in?.includes(option?.value ?? '')}
                      tabIndex={-1}
                      size='small'
                      color='primary'
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      className={classes.checkbox}
                    />
                  </ListItemSecondaryAction>
                </div>
              </ListItem>
            </CategoryLink>
          )
        })}
      </div>

      <Button
        onClick={resetFilter}
        size='small'
        variant='pill'
        disableElevation
        className={clsx(classes.button, classes.resetButton)}
      >
        Reset
      </Button>
    </ChipMenu>
  )
}

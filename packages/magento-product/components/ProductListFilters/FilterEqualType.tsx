import { cloneDeep } from '@apollo/client/utilities'
import { FilterEqualTypeInput } from '@graphcommerce/graphql'
import { ChipMenu, ChipMenuProps, responsiveVal } from '@graphcommerce/next-ui'
import {
  Checkbox,
  lighten,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { SetRequired } from 'type-fest'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import ProductListLink from '../ProductListLink/ProductListLink'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

export type FilterIn = SetRequired<Omit<FilterEqualTypeInput, 'eq'>, 'in'>

type FilterEqualTypeProps = NonNullable<
  NonNullable<ProductListFiltersFragment['aggregations']>[0]
> &
  Omit<ChipMenuProps, 'selected'>

const useFilterEqualStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    listItem: {
      padding: `0 ${theme.spacings.xxs} 0`,
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
    },
    checkbox: {
      padding: 0,
      margin: '-10px 0 0 0',
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
      // background: theme.palette.grey['100'],
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
      overflow: 'hidden',
      whiteSpace: 'break-spaces',
    },
    isColor: {
      border: `1px solid ${theme.palette.divider}`,
      '& > *': {
        opacity: 0,
      },
    },
    isActive: {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `inset 0 0 0 4px ${theme.palette.background.paper}`,
    },
  }),
  { name: 'FilterEqual' },
)

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const classes = useFilterEqualStyles()
  const replaceRoute = useProductListLinkReplace({ scroll: false })

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
      label={label}
      selected={currentLabels.length > 0}
      selectedLabel={currentLabels.length > 0 ? currentLabels.join(', ') : undefined}
      onDelete={currentLabels.length > 0 ? removeFilter : undefined}
      className={classes.root}
    >
      <div className={classes.linkContainer}>
        {options?.map((option) => {
          if (!option?.value) return null
          const labelId = `filter-equal-${attribute_code}-${option?.value}`
          const filters = cloneDeep(params.filters)
          let isColor = false

          if (label?.toLowerCase().includes('color')) {
            isColor = true
          }

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
            <ProductListLink
              {...params}
              filters={filters}
              currentPage={undefined}
              key={option?.value}
              color='inherit'
              link={{ replace: anyFilterActive }}
            >
              <ListItem dense className={classes.listItem}>
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
                      size='medium'
                      color='primary'
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      className={clsx(
                        classes.checkbox,
                        isColor && classes.isColor,
                        currentFilter.in?.includes(option?.value) && isColor
                          ? classes.isActive
                          : false,
                      )}
                      style={
                        isColor
                          ? { background: `${option?.label}`, color: `${option?.label}` }
                          : undefined
                      }
                    />
                  </ListItemSecondaryAction>
                </div>
              </ListItem>
            </ProductListLink>
          )
        })}
      </div>
    </ChipMenu>
  )
}

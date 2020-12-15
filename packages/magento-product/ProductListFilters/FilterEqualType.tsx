import { cloneDeep } from '@apollo/client/utilities'
import {
  ListItem,
  ListItemText,
  Checkbox,
  makeStyles,
  Theme,
  ListItemProps,
  Button,
} from '@material-ui/core'
import CategoryLink, { useCategoryPushRoute } from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import { FilterEqualTypeInput, ProductAttributeFilterInput } from '@reachdigital/magento-graphql'
import clsx from 'clsx'
import React, { useState } from 'react'
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
    listItem: {
      paddingTop: theme.spacings.xxs,
      paddingBottom: theme.spacings.xxs,
      paddingLeft: 0,
      '&:not(:nth-last-of-type(-n+2))': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    checkboxContainer: {
      width: '100%',
      maxWidth: '100%',
      minWidth: '100%',
      display: 'block',
      '& > div': {
        display: 'inline-block',
        wordWrap: 'break-word',
      },
      '& span': {
        wordWrap: 'break-word',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },
    checkbox: {
      padding: 0,
      margin: ' 0 0 0 8px',
      float: 'right',
    },
    linkContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      width: '100%',
      columnGap: 24,
      minWidth: 0,
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
    },
    button: {
      borderRadius: 40,
      float: 'right',
      marginLeft: 8,
      marginTop: 8,
    },
    resetButton: {
      background: '#F4F4F4',
      marginTop: 8,
    },
  }),
  { name: 'FilterEqual' },
)

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const classes = useFilterEqualStyles()
  const pushRoute = useCategoryPushRoute()
  const currentFilter = params.filters[attribute_code]

  if (!currentFilter?.in) {
    params.filters[attribute_code] = { in: [] }
  }

  const [selectedFilters, setSelectedFilters] = useState<{
    in: string[]
  }>(currentFilter)

  const activeLabels =
    options
      ?.filter((option) => option && currentFilter?.in?.includes(option.value))
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

    params.filters[attribute_code] = { in: [] }
    setSelectedFilters({ in: [] })

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
      onClose={() => {
        params.filters[attribute_code] = { in: [] }
        setSelectedFilters({ in: [] })
      }}
    >
      <div className={classes.linkContainer}>
        {options?.map((option) => {
          const labelId = `filter-equal-${attribute_code}-${option?.value}`

          return (
            <ListItem
              button
              key={option?.value}
              dense
              className={classes.listItem}
              component={React.forwardRef<HTMLDivElement, ListItemProps<'div'>>(
                (categoryLinkProps, ref) => (
                  <div
                    ref={ref}
                    {...categoryLinkProps}
                    className={clsx(categoryLinkProps.className, classes.checkboxContainer)}
                  />
                ),
              )}
              onClick={() => {
                if (currentFilter?.in?.includes(option?.value ?? '')) {
                  const i = currentFilter?.in?.indexOf(option?.value ?? '')
                  currentFilter?.in?.splice(i, 1)
                } else {
                  currentFilter?.in?.push(option?.value ?? '')
                }

                setSelectedFilters({ ...currentFilter })
              }}
            >
              <ListItemText primary={option?.label} />

              <Checkbox
                edge='start'
                checked={
                  selectedFilters?.in?.includes(option?.value ?? '') ||
                  currentFilter?.in?.includes(option?.value ?? '')
                }
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

      <CategoryLink {...params}>
        <Button
          variant='contained'
          size='small'
          color='primary'
          disableElevation
          className={classes.button}
        >
          Apply
        </Button>
      </CategoryLink>

      <Button
        onClick={resetFilter}
        size='small'
        className={clsx(classes.button, classes.resetButton)}
      >
        Reset
      </Button>
    </ChipMenu>
  )
}

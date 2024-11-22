import { cloneDeep } from '@graphcommerce/graphql'
import type { FilterEqualTypeInput } from '@graphcommerce/graphql-mesh'
import type { ChipMenuProps } from '@graphcommerce/next-ui'
import { ChipMenu, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import {
  Box, // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  Checkbox,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  listItemTextClasses,
} from '@mui/material'
import type { SetRequired } from 'type-fest'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListLink } from '../ProductListLink/ProductListLink'
import type { ProductListFiltersFragment } from './ProductListFilters.gql'

type OwnerState = {
  isColor: boolean
  isActive: boolean
}
const componentName = 'FilterEqual'
const parts = [
  'listItem',
  'listItemInnerContainer',
  'checkbox',
  'linkContainer',
  'button',
  'resetButton',
  'filterAmount',
  'filterLabel',
  'isColor',
  'isActive',
] as const

const { classes, selectors, withState } = extendableComponent<
  OwnerState,
  typeof componentName,
  typeof parts
>(componentName, parts)

export type FilterIn = SetRequired<Omit<FilterEqualTypeInput, 'eq'>, 'in'>

type Filter = NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>

type FilterEqualTypeProps = Filter & Omit<ChipMenuProps, 'selected'>

export function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, __typename, ...chipProps } = props
  const { params } = useProductListParamsContext()
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

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
      className={componentName}
    >
      <Box
        className={classes.linkContainer}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(2, 1fr)' },
          columnGap: responsiveVal(2, 16),
          minWidth: 0,
        }}
      >
        {options?.map((option) => {
          if (!option?.value) return null
          const labelId = `filter-equal-${attribute_code}-${option?.value}`
          const filters = cloneDeep(params.filters)
          const isColor = !!attribute_code?.toLowerCase().includes('color')
          const isActive = Boolean(isColor && currentFilter.in?.includes(option?.value) && isColor)

          const cls = withState({ isColor, isActive })
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
              link={{ replace: anyFilterActive, prefetch: false }}
            >
              <ListItem
                dense
                className={cls.listItem}
                sx={(theme) => ({
                  padding: `0 ${theme.spacings.xxs} 0`,
                  display: 'block',
                  '&:not(:nth-last-of-type(-n+2)) > div': {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  },
                })}
              >
                <Box
                  className={cls.listItemInnerContainer}
                  sx={(theme) => ({
                    width: '100%',
                    paddingTop: responsiveVal(0, 3),
                    paddingBottom: theme.spacings.xxs,
                    '& > div': {
                      display: 'inline-block',
                      [theme.breakpoints.down('md')]: {
                        maxWidth: '72%',
                      },
                    },
                  })}
                >
                  <ListItemText
                    primary={option?.label}
                    secondary={`(${option?.count})`}
                    sx={(theme) => ({
                      [`& .${listItemTextClasses.primary}`]: {
                        display: 'inline',
                        overflow: 'hidden',
                        whiteSpace: 'break-spaces',
                      },
                      [`& .${listItemTextClasses.secondary}`]: {
                        color: theme.palette.grey[500],
                        marginLeft: '4px',
                        fontSize: theme.typography.pxToRem(11),
                        display: 'inline',
                      },
                    })}
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
                      className={cls.checkbox}
                      sx={[
                        {
                          padding: 0,
                          margin: '-10px 0 0 0',
                          float: 'right',
                        },
                        isColor && {
                          border: 1,
                          borderColor: 'divider',
                          '& > *': {
                            opacity: 0,
                          },
                        },
                        isActive &&
                          ((theme) => ({
                            border: `1px solid ${theme.palette.primary.main}`,
                            boxShadow: `inset 0 0 0 4px ${theme.palette.background.paper}`,
                          })),
                      ]}
                      style={
                        isColor
                          ? { background: `${option?.label}`, color: `${option?.label}` }
                          : undefined
                      }
                    />
                  </ListItemSecondaryAction>
                </Box>
              </ListItem>
            </ProductListLink>
          )
        })}
      </Box>
    </ChipMenu>
  )
}

FilterEqualType.selectors = selectors

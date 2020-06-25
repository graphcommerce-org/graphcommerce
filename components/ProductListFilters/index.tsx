import React from 'react'
import { Chip, List } from '@material-ui/core'
import { ProductListParams, FilterTypeMap } from '../ProductList'
import { ProductListLink } from '../ProductListLink'

type ProductFiltersProps = GQLProductListFiltersFragment & {
  params: ProductListParams
  filterTypeMap: FilterTypeMap
}

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, params, filterTypeMap } = props

  return (
    <List subheader={<li />}>
      {aggregations.map((aggregation) => {
        if (aggregation.attribute_code === 'category_id') return null
        return (
          <li key={aggregation.attribute_code}>
            {aggregation.label}
            <ul>
              {aggregation.options.map((option) => {
                const [from, to] = option.value.split('_')

                const linkParams = { ...params, filters: { ...params.filters } }
                delete linkParams.currentPage
                const currentFilter = params.filters[aggregation.attribute_code] ?? {}

                switch (filterTypeMap[aggregation.attribute_code]) {
                  case 'FilterEqualTypeInput':
                    if ((currentFilter as GQLFilterEqualTypeInput).eq === option.value) {
                      delete linkParams.filters[aggregation.attribute_code]
                    } else {
                      linkParams.filters[aggregation.attribute_code] = {
                        eq: option.value,
                      } as GQLFilterEqualTypeInput
                    }

                    return (
                      <Chip
                        key={option.value}
                        clickable
                        color={
                          (currentFilter as GQLFilterEqualTypeInput).eq === option.value
                            ? 'primary'
                            : 'default'
                        }
                        onDelete={
                          (currentFilter as GQLFilterEqualTypeInput).eq === option.value
                            ? () => {}
                            : undefined
                        }
                        label={option.label}
                        component={(chipProps) => (
                          <ProductListLink
                            {...chipProps}
                            {...linkParams}
                            color='inherit'
                            underline='none'
                          />
                        )}
                      />
                    )
                  case 'FilterMatchTypeInput':
                    linkParams.filters[aggregation.attribute_code] = {
                      match: option.value,
                    } as GQLFilterMatchTypeInput

                    return (
                      <Chip
                        key={option.value}
                        clickable
                        variant='outlined'
                        label={option.label}
                        component={(chipProps) => (
                          <ProductListLink
                            {...chipProps}
                            {...linkParams}
                            color='inherit'
                            underline='none'
                          />
                        )}
                      />
                    )
                  case 'FilterRangeTypeInput':
                    linkParams.filters[aggregation.attribute_code] = {
                      from,
                      to,
                    } as GQLFilterRangeTypeInput

                    // eslint-disable-next-line no-case-declarations
                    const label = (
                      <>
                        {from === '*' && to !== '*' && <>0 - {to}</>}
                        {from !== '*' && to === '*' && <>&gt; {from}</>}
                        {from !== '*' && to !== '*' && (
                          <>
                            {from} - {to}
                          </>
                        )}
                      </>
                    )
                    return (
                      <Chip
                        key={option.value}
                        clickable
                        color={
                          (currentFilter as GQLFilterRangeTypeInput).from === from &&
                          (currentFilter as GQLFilterRangeTypeInput).to === to
                            ? 'primary'
                            : 'default'
                        }
                        onDelete={
                          (currentFilter as GQLFilterRangeTypeInput).from === from &&
                          (currentFilter as GQLFilterRangeTypeInput).to === to
                            ? () => {}
                            : undefined
                        }
                        label={label}
                        component={(chipProps) => (
                          <ProductListLink
                            {...chipProps}
                            {...linkParams}
                            color='inherit'
                            underline='none'
                          />
                        )}
                      />
                    )
                }

                return null
              })}
            </ul>
          </li>
        )
      })}
    </List>
  )
}

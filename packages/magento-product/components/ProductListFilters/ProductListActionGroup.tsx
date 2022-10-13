import { useForm, useFormPersist } from '@graphcommerce/ecommerce-ui'
import { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { ChipMenuProps } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useState } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListQuery } from '../ProductList/ProductList.gql'
import { ProductListActions } from '../ProductListActions/ProductListActions'
import { FilterTypes } from '../ProductListItems/filterTypes'
import { ProductListSort } from '../ProductListSort/ProductListSort'
import { useFilterForm } from './FilterFormContext'
import { ProductListFilters } from './ProductListFilters'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

export type ProductListActionGroupProps = {
  filters: ProductListFiltersFragment | undefined | null
  filterTypes: FilterTypes
} & Omit<
  ChipMenuProps,
  'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete' | 'openEl' | 'setOpenEl'
> &
  ProductListQuery

export function ProductListActionGroup(props: ProductListActionGroupProps) {
  const { products, filters, filterTypes, ...chipMenuProps } = props
  const { form } = useFilterForm()
  const { handleSubmit } = form
  const { params } = useProductListParamsContext()
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  const [showAll, setShowAll] = useState<boolean>(false)

  useFormPersist({ form, name: 'ProductListFilterForm' })

  const submit = handleSubmit((e) => {
    replaceRoute({ ...params, filters: e })
  })

  const aggregations = filters?.aggregations?.slice(0, showAll ? undefined : 4)

  return (
    <form id='filter-form' noValidate onSubmit={submit} style={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginX: 'auto',
        }}
      >
        <ProductListSort sort_fields={products?.sort_fields} total_count={products?.total_count} />
        <ProductListFilters
          products={products}
          aggregations={aggregations}
          filterTypes={filterTypes}
        />
        <ProductListActions showAll={showAll} setShowAll={setShowAll} />
      </Box>
    </form>
  )
}

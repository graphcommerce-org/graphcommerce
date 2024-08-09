import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useMemo } from 'react'
import { AlgoliaQueryContext } from '../hooks/useAlgoliaQueryContext'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-product',
  type: 'component',
}

export function ProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props

  return (
    <AlgoliaQueryContext.Provider
      value={useMemo(() => ({ queryID: rest.algolia_queryID }), [rest.algolia_queryID])}
    >
      <Prev {...rest} />
    </AlgoliaQueryContext.Provider>
  )
}

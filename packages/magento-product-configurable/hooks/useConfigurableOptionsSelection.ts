import { useQuery } from '@graphcommerce/graphql'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { findByTypename, nonNullable } from '@graphcommerce/next-ui'
import { ConfigurableOptionsSelectionFragment } from '../graphql/ConfigurableOptionsSelection.gql'
import { GetConfigurableOptionsSelectionDocument } from '../graphql/GetConfigurableOptionsSelection.gql'

export type UseConfigurableTypeProductOptions = ConfigurableOptionsSelectionFragment

export function useConfigurableOptionsSelection() {
  const { watch, urlKey } = useFormAddProductsToCart()

  const selectedOptions = (watch('cartItems.0.selected_options') ?? [])
    .filter(nonNullable)
    .filter(Boolean)

  const cpc = useQuery(GetConfigurableOptionsSelectionDocument, {
    variables: { urlKey, selectedOptions },
    skip: !urlKey || !selectedOptions.length,
    ssr: false,
  })

  const configured = findByTypename(
    cpc.data?.products?.items ?? cpc.previousData?.products?.items,
    'ConfigurableProduct',
  )
  return { ...cpc, configured }
}

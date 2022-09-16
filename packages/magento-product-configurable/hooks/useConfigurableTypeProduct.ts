import { useQuery } from '@graphcommerce/graphql'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { findByTypename, nonNullable } from '@graphcommerce/next-ui'
import { ConfigurableProductConfigurationsFragment } from '../graphql/ConfigurableProductConfigurations.gql'
import { GetConfigurableProductConfigurationsDocument } from '../graphql/GetConfigurableProductConfigurations.gql'

export type UseConfigurableTypeProductOptions = ConfigurableProductConfigurationsFragment

export function useConfigurableTypeProduct() {
  const { watch, urlKey } = useFormAddProductsToCart()

  const selectedOptions = (watch('cartItems.0.selected_options') ?? [])
    .filter(nonNullable)
    .filter(Boolean)

  const cpc = useQuery(GetConfigurableProductConfigurationsDocument, {
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

import { useQuery } from '@graphcommerce/graphql'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { findByTypename, nonNullable } from '@graphcommerce/next-ui'
import { ConfigurableProductConfigurationsFragment } from '../graphql/ConfigurableProductConfigurations.gql'
import { GetConfigurableProductConfigurationsDocument } from '../graphql/GetConfigurableProductConfigurations.gql'

export function useConfigurableTypeProduct() {
  const form = useFormAddProductsToCart<ConfigurableProductConfigurationsFragment>()
  const { watch, urlKey, typeProduct: typeProductDefault } = form

  const selectedOptions = (watch('cartItems.0.selected_options') ?? [])
    .filter(nonNullable)
    .filter(Boolean)

  const cpc = useQuery(GetConfigurableProductConfigurationsDocument, {
    variables: { urlKey, selectedOptions },
    skip: !urlKey || !selectedOptions.length,
    ssr: false,
  })

  const typeProduct =
    findByTypename(
      cpc.data?.typeProducts?.items ?? cpc.previousData?.typeProducts?.items,
      'ConfigurableProduct',
    ) ?? typeProductDefault
  return { ...cpc, typeProduct }
}

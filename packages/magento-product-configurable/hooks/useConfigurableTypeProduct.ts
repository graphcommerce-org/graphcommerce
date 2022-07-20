import { useQuery } from '@graphcommerce/graphql'
import { useFormProductAddToCart } from '@graphcommerce/magento-product'
import { findByTypename } from '@graphcommerce/next-ui'
import { ConfigurableProductConfigurationsFragment } from '../graphql/ConfigurableProductConfigurations.gql'
import { GetConfigurableProductConfigurationsDocument } from '../graphql/GetConfigurableProductConfigurations.gql'

export function useConfigurableTypeProduct() {
  const { watch, urlKey, typeProduct } =
    useFormProductAddToCart<ConfigurableProductConfigurationsFragment>()

  const watchSelectedOptions = watch('selectedOptions')

  const selectedOptions = (
    Array.isArray(watchSelectedOptions) ? watchSelectedOptions : [watchSelectedOptions ?? '']
  ).filter(Boolean)

  const cpc = useQuery(GetConfigurableProductConfigurationsDocument, {
    variables: { urlKey, selectedOptions },
    skip: !urlKey || !selectedOptions.length,
    ssr: false,
  })

  return (
    findByTypename(
      cpc.data?.typeProducts?.items ?? cpc.previousData?.typeProducts?.items,
      'ConfigurableProduct',
    ) ?? typeProduct
  )
}

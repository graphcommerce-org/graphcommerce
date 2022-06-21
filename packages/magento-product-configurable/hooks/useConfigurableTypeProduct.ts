import { useQuery } from '@graphcommerce/graphql'
import { useFormProductAddToCart } from '@graphcommerce/magento-product/components'
import { findByTypename } from '@graphcommerce/next-ui'
import { GetConfigurableProductConfigurationsDocument } from '../graphql'

export function useConfigurableTypeProduct() {
  const { watch, urlKey } = useFormProductAddToCart()

  const watchSelectedOptions = watch('selectedOptions')

  const selectedOptions = (
    Array.isArray(watchSelectedOptions) ? watchSelectedOptions : [watchSelectedOptions ?? '']
  ).filter(Boolean)

  const cpc = useQuery(GetConfigurableProductConfigurationsDocument, {
    variables: { urlKey, selectedOptions },
  })
  const typeProduct = findByTypename(
    'ConfigurableProduct',
    cpc.data?.typeProducts?.items ?? cpc.previousData?.typeProducts?.items,
  )

  return typeProduct
}

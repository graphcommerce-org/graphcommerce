import { useQuery } from '@graphcommerce/graphql'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { findByTypename, nonNullable } from '@graphcommerce/next-ui'
import { GetConfigurableOptionsSelectionDocument } from '../graphql/GetConfigurableOptionsSelection.gql'

export function useConfigurableOptionsSelection({
  url_key,
  index = 0,
}: {
  url_key?: string | null
  index: number
}) {
  const { watch } = useFormAddProductsToCart()

  const selectedOptions = (watch(`cartItems.${index}.selected_options`) ?? [])
    .filter(nonNullable)
    .filter(Boolean)

  const cpc = useQuery(GetConfigurableOptionsSelectionDocument, {
    variables: { urlKey: url_key ?? '', selectedOptions },
    skip: !url_key || !selectedOptions.length,
  })

  const configured = findByTypename(
    cpc.data?.products?.items ?? cpc.previousData?.products?.items,
    'ConfigurableProduct',
  )
  return { ...cpc, configured }
}

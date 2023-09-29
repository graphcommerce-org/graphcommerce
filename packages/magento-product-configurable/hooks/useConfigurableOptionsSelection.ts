import { useQuery } from '@graphcommerce/graphql'
import { AddToCartItemSelector, useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { findByTypename, nonNullable } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { GetConfigurableOptionsSelectionDocument } from '../graphql/GetConfigurableOptionsSelection.gql'

export type UseConfigurableOptionsSelection = { url_key?: string | null } & AddToCartItemSelector

type UseConfigurableOptionsForSelection = {
  url_key?: string | null
  selectedOptions: string[]
}

export function useConfigurableOptionsForSelection(variables: UseConfigurableOptionsForSelection) {
  const { url_key, selectedOptions } = variables

  const selection = useQuery(GetConfigurableOptionsSelectionDocument, {
    variables: { urlKey: url_key ?? '', selectedOptions },
    skip: !url_key,
  })

  const configured = findByTypename(
    selection.data?.products?.items ?? selection.previousData?.products?.items,
    'ConfigurableProduct',
  )
  return { ...selection, configured }
}

export function useConfigurableOptionsSelection(props: UseConfigurableOptionsSelection) {
  const { url_key, index = 0 } = props

  const { control } = useFormAddProductsToCart()
  const selectedOptions = (useWatch({ control, name: `cartItems.${index}.selected_options` }) ?? [])
    .filter(nonNullable)
    .filter(Boolean)

  return useConfigurableOptionsForSelection({ url_key, selectedOptions })
}

export function useConfigurableSelectedVariant(props: UseConfigurableOptionsSelection) {
  return useConfigurableOptionsSelection(props).configured?.configurable_product_options_selection
    ?.variant
}

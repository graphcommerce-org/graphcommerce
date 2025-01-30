import { useQuery } from '@graphcommerce/graphql'
import type { AddToCartItemSelector } from '@graphcommerce/magento-product'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { findByTypename, nonNullable } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { GetConfigurableOptionsSelectionDocument } from '../graphql/GetConfigurableOptionsSelection.gql'
import type { UseConfigurableOptionsFragment } from '../graphql/UseConfigurableOptions.gql'

type UseConfigurableOptionsForSelection = {
  selectedOptions: string[]
} & UseConfigurableOptionsFragment

export function useConfigurableOptionsForSelection(variables: UseConfigurableOptionsForSelection) {
  const { __typename, url_key, selectedOptions } = variables

  const selection = useQuery(GetConfigurableOptionsSelectionDocument, {
    variables: { urlKey: url_key ?? '', selectedOptions },
    skip: __typename !== 'ConfigurableProduct' || !url_key,
  })

  const configured = selection.error
    ? undefined
    : findByTypename(
        selection.data?.products?.items ?? selection.previousData?.products?.items,
        'ConfigurableProduct',
      )
  return { ...selection, configured }
}

export type UseConfigurableOptionsSelection = UseConfigurableOptionsFragment & AddToCartItemSelector

export function useConfigurableOptionsSelection(props: UseConfigurableOptionsSelection) {
  const { __typename, url_key, index = 0 } = props

  const { control } = useFormAddProductsToCart()
  const selectedOptions = (useWatch({ control, name: `cartItems.${index}.selected_options` }) ?? [])
    .filter(nonNullable)
    .filter(Boolean)

  return useConfigurableOptionsForSelection({ __typename, url_key, selectedOptions })
}

export function useConfigurableSelectedVariant(props: UseConfigurableOptionsSelection) {
  return useConfigurableOptionsSelection(props).configured?.configurable_product_options_selection
    ?.variant
}

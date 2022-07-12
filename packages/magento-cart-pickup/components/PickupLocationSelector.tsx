import { ApolloErrorAlert } from '@graphcommerce/ecommerce-ui'
import { ProductInfoInput } from '@graphcommerce/graphql-mesh'
import { GetShippingMethodsDocument } from '@graphcommerce/magento-cart-shipping-method/components/ShippingMethodForm/GetShippingMethods.gql'
import { useCartQuery } from '@graphcommerce/magento-cart/hooks'
import { PickupLocationActionCardListFormProps } from './PickupLocationActionCardListForm'
import { PickupLocationSearch } from './PickupLocationSearch'

type PickupProps = Pick<PickupLocationActionCardListFormProps, 'step'>

export function PickupLocationSelector(props: PickupProps) {
  const { step } = props
  const availableMethods = useCartQuery(GetShippingMethodsDocument, { fetchPolicy: 'cache-only' })

  const productInput = (availableMethods.data?.cart?.items ?? [])?.map<ProductInfoInput>((i) =>
    i?.__typename === 'ConfigurableCartItem'
      ? { sku: i.configured_variant.sku ?? '' }
      : { sku: i?.product.sku ?? '' },
  )

  const address = availableMethods.data?.cart?.shipping_addresses?.[0]
  const isAvailable =
    address?.selected_shipping_method?.carrier_code === 'instore' &&
    address?.selected_shipping_method?.method_code === 'pickup' &&
    productInput.length > 0

  if (!isAvailable || !address?.country.code || !address.postcode) return null

  return (
    <>
      <PickupLocationSearch
        countryCode={address.country.code}
        searchTerm={address.postcode}
        productInput={productInput}
        step={step}
      />
      <ApolloErrorAlert error={availableMethods.error} />
    </>
  )
}

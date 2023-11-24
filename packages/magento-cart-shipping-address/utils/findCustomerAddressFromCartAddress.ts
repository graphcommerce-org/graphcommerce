import { CartAddressFragment } from '@graphcommerce/magento-cart/components/CartAddress/CartAddress.gql'
import { CustomerAddressFragment } from '@graphcommerce/magento-customer/components/CreateCustomerAddressForm/CustomerAddress.gql'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

export function findCustomerAddressFromCartAddress<CustomerAddress extends CustomerAddressFragment>(
  customerAddresses: (CustomerAddress | null | undefined)[] | null | undefined,
  cartAddress: CartAddressFragment | null | undefined,
): CustomerAddress | undefined {
  if (!customerAddresses || !cartAddress) return undefined

  return filterNonNullableKeys(customerAddresses, [])?.find(
    (customerAddr) =>
      [
        customerAddr.firstname === cartAddress.firstname,
        customerAddr.lastname === cartAddress.lastname,
        customerAddr.city === cartAddress.city,
        customerAddr.postcode === cartAddress.postcode,
        customerAddr.company === cartAddress.company,
        customerAddr.street?.[0] === cartAddress.street[0],
        customerAddr.street?.[1] === cartAddress.street[1],
        customerAddr.street?.[2] === cartAddress.street[2],
        customerAddr.country_code === cartAddress.country.code,
        customerAddr.region?.region_code === cartAddress.region?.code,
        customerAddr.telephone === cartAddress.telephone,
      ].filter((v) => !v).length === 0,
  )
}

export function isCartAddressACustomerAddress<CustomerAddress extends CustomerAddressFragment>(
  customerAddresses: (CustomerAddress | null | undefined)[] | null | undefined,
  cartAddress: CartAddressFragment | null | undefined,
): boolean {
  return !!findCustomerAddressFromCartAddress(customerAddresses, cartAddress)
}

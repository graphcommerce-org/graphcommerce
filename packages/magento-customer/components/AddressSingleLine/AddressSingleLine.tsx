import { useFindCountry } from '@graphcommerce/magento-store'
import { CustomerAddressFragment } from '../CreateCustomerAddressForm/CustomerAddress.gql'

export function AddressSingleLine(props: CustomerAddressFragment) {
  const {
    company,
    prefix,
    firstname,
    lastname,
    middlename,
    suffix,
    street,
    region,
    city,
    postcode,
    country_code,
  } = props
  const countryName = useFindCountry(country_code)?.full_name_locale ?? ''
  const regionName = typeof region === 'string' ? region : region?.region || ''

  // todo: detect correct format by locale
  // for now, US format will be returned by default

  const addressLine = [
    company,
    `${prefix} ${firstname} ${middlename} ${lastname} ${suffix}`,
    `${street?.[0]} ${street?.[1]}`,
    ...(street?.slice(2) ?? []),
    `${postcode} ${city}`,
    `${regionName} ${countryName}`,
  ]
    .map((v) => (v ?? '').replaceAll('null', '').replace(/\s\s+/g, ' ').trim())
    .filter(Boolean)

  return <>{addressLine.join(', ')}</>
}

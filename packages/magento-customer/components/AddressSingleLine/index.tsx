import { useFindCountry } from '@reachdigital/magento-store'
import { CustomerAddressFragment } from '../../Api'

export default function AddressSingleLine(props: CustomerAddressFragment) {
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
  const countryName = useFindCountry(country_code)?.full_name_locale
  const regionName = typeof region === 'string' ? region : region?.region

  // todo: detect correct format by locale
  // for now, US format will be returned by default

  let address = `$company ${prefix}, ${firstname}, $middlename ${lastname}, $suffix ${
    street?.[0]
  }, ${street?.slice(1).join(' ')}, ${postcode}, ${city}, ${regionName} $countryName`

  address = address.replace('$company', company ? `${company},` : '')
  address = address.replace('$middlename', middlename ? `${middlename},` : '')
  address = address.replace('$suffix', suffix ? `${suffix},` : '')
  address = address.replace('$countryName', countryName ? `${countryName},` : '')

  return <>{address}</>
}
